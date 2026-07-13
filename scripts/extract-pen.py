#!/usr/bin/env python3
"""Extract structure/text/colors/images from a Pencil .pen JSON file."""
from __future__ import annotations

import json
import re
from pathlib import Path

PEN = Path(r"C:\Users\leogu\Desktop\Projects\devleadhunter\devleadhunter-pencil\Food\maquette.pen")
OUT = Path(__file__).resolve().parents[1] / ".design-extract"
OUT.mkdir(exist_ok=True)


def fill_str(fill):
    if fill is None:
        return None
    if isinstance(fill, str):
        return fill
    if isinstance(fill, list):
        return [fill_str(f) for f in fill]
    if isinstance(fill, dict):
        if "url" in fill:
            return {"url": fill.get("url"), "mode": fill.get("mode")}
        if "color" in fill:
            return fill.get("color")
        return {k: fill.get(k) for k in ("type", "colors", "angle") if k in fill}
    return str(type(fill))


def brief(n, depth=0, maxd=4):
    lines = []
    t = n.get("type")
    name = n.get("name")
    nid = n.get("id")
    layout = n.get("layout") or {}
    gap = layout.get("gap") if isinstance(layout, dict) else n.get("gap")
    pad = n.get("padding")
    fill = fill_str(n.get("fill"))
    cr = n.get("cornerRadius")
    indent = "  " * depth
    s = (
        f"{indent}{t} id={nid} name={name!r} "
        f"xy=({n.get('x')},{n.get('y')}) wh=({n.get('width')},{n.get('height')}) "
        f"gap={gap} pad={pad} r={cr} fill={fill!r}"
    )
    if t == "text":
        s += (
            f" font={n.get('fontFamily')} {n.get('fontSize')}/"
            f"{n.get('lineHeight')} w{n.get('fontWeight')} "
            f"ls={n.get('letterSpacing')} text={n.get('content')!r}"
        )
    lines.append(s)
    if depth < maxd:
        for c in n.get("children") or []:
            lines.extend(brief(c, depth + 1, maxd))
    return lines


def collect(n, acc):
    t = n.get("type")
    if t == "text":
        acc["texts"].append(
            {
                "name": n.get("name"),
                "content": n.get("content"),
                "fontFamily": n.get("fontFamily"),
                "fontSize": n.get("fontSize"),
                "fontWeight": n.get("fontWeight"),
                "lineHeight": n.get("lineHeight"),
                "letterSpacing": n.get("letterSpacing"),
                "fill": fill_str(n.get("fill")),
                "width": n.get("width"),
                "height": n.get("height"),
            }
        )
        if n.get("fontFamily"):
            acc["fonts"].add(n["fontFamily"])
    fill = n.get("fill")
    if isinstance(fill, str) and fill.startswith("#"):
        acc["colors"].add(fill.lower())
    elif isinstance(fill, dict) and isinstance(fill.get("url"), str):
        acc["images"].append(
            {
                "name": n.get("name"),
                "url": fill.get("url"),
                "width": n.get("width"),
                "height": n.get("height"),
                "cornerRadius": n.get("cornerRadius"),
            }
        )
    elif isinstance(fill, list):
        for f in fill:
            if isinstance(f, str) and f.startswith("#"):
                acc["colors"].add(f.lower())
            elif isinstance(f, dict) and f.get("url"):
                acc["images"].append(
                    {
                        "name": n.get("name"),
                        "url": f.get("url"),
                        "width": n.get("width"),
                        "height": n.get("height"),
                    }
                )
    for c in n.get("children") or []:
        collect(c, acc)


def section_by_name(root, name):
    for c in root.get("children") or []:
        if c.get("name") == name:
            return c
    return None


def main():
    d = json.loads(PEN.read_text(encoding="utf-8"))
    root = d["children"][0]
    (OUT / "tree.txt").write_text("\n".join(brief(root, 0, 4)), encoding="utf-8")

    acc = {"texts": [], "fonts": set(), "colors": set(), "images": []}
    collect(root, acc)

    payload = {
        "frame": {
            "name": root.get("name"),
            "width": root.get("width"),
            "height": root.get("height"),
            "fill": fill_str(root.get("fill")),
        },
        "sections": [c.get("name") for c in root.get("children") or []],
        "fonts": sorted(acc["fonts"]),
        "colors": sorted(acc["colors"]),
        "texts": acc["texts"],
        "images": acc["images"],
    }
    (OUT / "summary.json").write_text(
        json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8"
    )

    for name in ("HERO", "ABOUT", "MENU", "TESTIMONIAL", "CONTACT FORM"):
        sec = section_by_name(root, name)
        if not sec:
            continue
        (OUT / f"section-{re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')}.json").write_text(
            json.dumps(sec, indent=2, ensure_ascii=False)[:500000],
            encoding="utf-8",
        )

    print("sections:", payload["sections"])
    print("fonts:", payload["fonts"])
    print("colors:", payload["colors"])
    print("texts:", len(payload["texts"]), "images:", len(payload["images"]))
    for t in payload["texts"]:
        print("-", repr(t["content"])[:90], t["fontFamily"], t["fontSize"], t["fontWeight"])


if __name__ == "__main__":
    main()
