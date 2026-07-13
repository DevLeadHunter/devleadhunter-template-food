#!/usr/bin/env python3
"""Deep extract + SVG export for Food Pencil maquette."""
from __future__ import annotations

import json
from pathlib import Path

PEN = Path(r"C:\Users\leogu\Desktop\Projects\devleadhunter\devleadhunter-pencil\Food\maquette.pen")
OUT = Path(__file__).resolve().parents[1] / ".design-extract"
SRC_IMG = Path(r"C:\Users\leogu\Desktop\Projects\devleadhunter\devleadhunter-pencil\Food")
PUB = Path(__file__).resolve().parents[1] / "public" / "images"
PLAY_PUB = Path(__file__).resolve().parents[1] / ".playground" / "public" / "images"


def find(n, name=None, nid=None):
    if name and n.get("name") == name:
        return n
    if nid and n.get("id") == nid:
        return n
    for c in n.get("children") or []:
        r = find(c, name=name, nid=nid)
        if r:
            return r
    return None


def find_all(n, pred):
    out = []
    if pred(n):
        out.append(n)
    for c in n.get("children") or []:
        out.extend(find_all(c, pred))
    return out


def texts_under(n):
    return find_all(n, lambda x: x.get("type") == "text")


def path_to_svg(path_node, fill="#000"):
    geom = path_node.get("geometry") or path_node.get("d") or ""
    if isinstance(geom, list):
        # pencil sometimes stores geometry as list of commands
        geom = "".join(str(x) for x in geom)
    w = path_node.get("width") or 100
    h = path_node.get("height") or 100
    f = path_node.get("fill") or fill
    if isinstance(f, str) and len(f) == 9 and f.endswith("ff"):
        f = f[:7]
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" fill="none"><path d="{geom}" fill="{f}"/></svg>\n'


def main():
    d = json.loads(PEN.read_text(encoding="utf-8"))
    root = d["children"][0]
    PUB.mkdir(parents=True, exist_ok=True)
    PLAY_PUB.mkdir(parents=True, exist_ok=True)

    # copy local images referenced
    for img in SRC_IMG.glob("image-import*"):
        for dest in (PUB, PLAY_PUB):
            target = dest / img.name
            if not target.exists():
                target.write_bytes(img.read_bytes())
        print("copied", img.name)

    # dump menu wrappers
    menu = find(root, name="MENU")
    menu_dump = []
    for wrap in find_all(menu, lambda x: x.get("name") == "Wrapper"):
        menu_dump.append(
            {
                "id": wrap.get("id"),
                "texts": [
                    {"content": t.get("content"), "size": t.get("fontSize"), "family": t.get("fontFamily"), "weight": t.get("fontWeight"), "fill": t.get("fill")}
                    for t in texts_under(wrap)
                ],
                "images": [
                    {"name": n.get("name"), "fill": n.get("fill"), "w": n.get("width"), "h": n.get("height"), "r": n.get("cornerRadius")}
                    for n in find_all(wrap, lambda x: isinstance(x.get("fill"), dict) and x["fill"].get("url"))
                ],
                "layout": wrap.get("layout"),
                "width": wrap.get("width"),
                "padding": wrap.get("padding"),
                "gap": (wrap.get("layout") or {}).get("gap") if isinstance(wrap.get("layout"), dict) else wrap.get("gap"),
            }
        )
    (OUT / "menu.json").write_text(json.dumps(menu_dump, indent=2, ensure_ascii=False), encoding="utf-8")

    # form fields
    contact = find(root, name="CONTACT FORM")
    form = find(contact, name="form")
    fields = []
    for f in form.get("children") or []:
        fields.append(
            {
                "name": f.get("name"),
                "padding": f.get("padding"),
                "fill": f.get("fill"),
                "stroke": f.get("stroke"),
                "cornerRadius": f.get("cornerRadius"),
                "layout": f.get("layout"),
                "texts": [t.get("content") for t in texts_under(f)],
                "width": f.get("width"),
                "height": f.get("height"),
            }
        )
    (OUT / "form.json").write_text(json.dumps(fields, indent=2, ensure_ascii=False), encoding="utf-8")

    # about info boxes + collage
    about = find(root, name="ABOUT")
    about_info = []
    for box in find_all(about, lambda x: x.get("name") == "icon box"):
        about_info.append({"texts": [t.get("content") for t in texts_under(box)], "gap": (box.get("layout") or {}).get("gap")})
    collage = find(about, name="image")
    collage_imgs = [
        {
            "name": n.get("name"),
            "url": (n.get("fill") or {}).get("url") if isinstance(n.get("fill"), dict) else None,
            "x": n.get("x"),
            "y": n.get("y"),
            "w": n.get("width"),
            "h": n.get("height"),
            "r": n.get("cornerRadius"),
        }
        for n in find_all(collage, lambda x: isinstance(x.get("fill"), dict) and x["fill"].get("url"))
    ]
    (OUT / "about.json").write_text(
        json.dumps({"info": about_info, "collage": collage_imgs, "stats": [t.get("content") for t in texts_under(find(about, name="Frame 216") or {})] + [t.get("content") for t in texts_under(find(about, name="Frame 217") or {})]}, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )

    # export notable path objects
    for label, node_name in [
        ("deco-leaf", "Object-1"),
        ("deco-blob", "Object-2"),
        ("deco-menu", "Object-3"),
        ("deco-contact", "Object-5"),
    ]:
        # find first matching under root with paths
        node = None
        for n in find_all(root, lambda x: x.get("name") == node_name):
            node = n
            break
        if not node:
            continue
        paths = find_all(node, lambda x: x.get("type") == "path")
        if not paths:
            continue
        p0 = paths[0]
        geom = p0.get("geometry")
        meta = {"name": node_name, "w": node.get("width"), "h": node.get("height"), "pathFill": p0.get("fill"), "geometryType": type(geom).__name__, "geometryPreview": str(geom)[:200]}
        (OUT / f"{label}.meta.json").write_text(json.dumps(meta, indent=2), encoding="utf-8")
        if isinstance(geom, str) and geom.strip():
            svg = path_to_svg(p0)
            for dest in (PUB, PLAY_PUB, OUT):
                (dest / f"{label}.svg").write_text(svg, encoding="utf-8")

    # testimonial
    testi = find(root, name="TESTIMONIAL")
    (OUT / "testimonial-texts.json").write_text(
        json.dumps([{"content": t.get("content"), "size": t.get("fontSize"), "family": t.get("fontFamily"), "fill": t.get("fill")} for t in texts_under(testi)], indent=2, ensure_ascii=False),
        encoding="utf-8",
    )

    print("done")


if __name__ == "__main__":
    main()
