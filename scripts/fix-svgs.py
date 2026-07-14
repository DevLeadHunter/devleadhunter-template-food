#!/usr/bin/env python3
"""Re-export Pencil icons/underlines/stars with correct viewBoxes + rotation metadata."""
from __future__ import annotations

import json
from pathlib import Path

PEN = Path(r"C:\Users\leogu\Desktop\Projects\devleadhunter\devleadhunter-pencil\Food\maquette.pen")
ROOT = Path(__file__).resolve().parents[1]
PUB = ROOT / "public" / "images"
PLAY = ROOT / ".playground" / "public" / "images"
OUT = ROOT / ".design-extract"
for p in (PUB, PLAY, OUT):
    p.mkdir(parents=True, exist_ok=True)

d = json.loads(PEN.read_text(encoding="utf-8"))


def fa(n, pred, acc=None):
    if acc is None:
        acc = []
    if pred(n):
        acc.append(n)
    for c in n.get("children") or []:
        fa(c, pred, acc)
    return acc


def f(n, name=None, nid=None):
    if name and n.get("name") == name:
        return n
    if nid and n.get("id") == nid:
        return n
    for c in n.get("children") or []:
        r = f(c, name=name, nid=nid)
        if r:
            return r
    return None


def hex7(c, default="#000"):
    if isinstance(c, str) and len(c) >= 7:
        return c[:7]
    return default


def write(name: str, svg: str):
    for dest in (PUB, PLAY):
        (dest / name).write_text(svg, encoding="utf-8")
    print("wrote", name)


root = d["children"][0]

# --- Icon circles: path geometry is in ~256 design space ---
ICON_MAP = {
    "about-icon-0.svg": "h1dnZ",  # locate
    "about-icon-1.svg": "oQ7oX",  # clock
    "about-icon-2.svg": "kHk6g",  # calendar
    "feature-icon-0.svg": "Cz1s3",
    "feature-icon-1.svg": "hTdlL",
    "feature-icon-2.svg": "qf826",
}

for filename, pid in ICON_MAP.items():
    node = f(root, nid=pid)
    if not node:
        # search all
        nodes = fa(root, lambda x: x.get("id") == pid)
        node = nodes[0] if nodes else None
    if not node or not node.get("geometry"):
        print("missing icon", filename, pid)
        continue
    fill = hex7(node.get("fill"), "#fff")
    # These Material-like icons use 256×256 canvas
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none">'
        f'<path d="{node["geometry"]}" fill="{fill}"/></svg>\n'
    )
    write(filename, svg)

# --- Quote marks ---
quote = f(root, nid="Aq4c6")
if quote and quote.get("geometry"):
    fill = hex7(quote.get("fill"), "#f3c395")
    # geometry coords ~0-18, design size 44×30.25
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 11" fill="none">'
        f'<path d="{quote["geometry"]}" fill="{fill}"/></svg>\n'
    )
    write("quote-mark.svg", svg)

# --- Underline scribbles (with rotation baked via transform group) ---
UNDERLINES = {
    "underline-hero.svg": ("DSmZ6", "#f3c395"),
    "underline-about.svg": ("TOHzj", "#f3c395"),
    "underline-menu.svg": ("AyptB", "#db9a5b"),
    "underline-testimonial.svg": ("YyvEO", "#f3c395"),
}

for filename, (pid, color) in UNDERLINES.items():
    nodes = fa(root, lambda x, i=pid: x.get("id") == i)
    node = nodes[0] if nodes else None
    if not node or not node.get("geometry"):
        print("missing underline", filename)
        continue
    # Export unrotated path in its local box; CSS will rotate -49.687deg
    w = node.get("width") or 54
    h = node.get("height") or 67
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" fill="none">'
        f'<path d="{node["geometry"]}" fill="{hex7(node.get("fill"), color)}"/></svg>\n'
    )
    write(filename, svg)
    meta = {
        "id": pid,
        "x": node.get("x"),
        "y": node.get("y"),
        "w": w,
        "h": h,
        "rotation": node.get("rotation"),
        "fill": hex7(node.get("fill"), color),
    }
    (OUT / f"{filename}.meta.json").write_text(json.dumps(meta, indent=2), encoding="utf-8")

# Contact heading divider — search under CONTACT FORM
contact = f(root, name="CONTACT FORM")
if contact:
    heading = f(contact, name="heading") or f(contact, name="Frame 218")
    lines = fa(contact, lambda x: x.get("type") == "path" and (x.get("width") or 0) < 100)
    # prefer path near "book your table"
    book_div = None
    for p in lines:
        if p.get("name") in ("line", "divider", "Vector") and p.get("geometry"):
            # skip large wave / deco
            if (p.get("width") or 0) > 100:
                continue
            if p.get("id") in ("WzcJP",):
                continue
            book_div = p
            # prefer peach/white-ish near label
            fill = hex7(p.get("fill"), "")
            if fill in ("#f3c395", "#db9a5b", "#ffffff"):
                break
    # Also look in Frame 218 specifically
    frame218 = f(contact, name="Frame 218")
    if frame218:
        for p in fa(frame218, lambda x: x.get("type") == "path" and x.get("geometry")):
            book_div = p
            break
    if book_div:
        w = book_div.get("width") or 54
        h = book_div.get("height") or 67
        fill = hex7(book_div.get("fill"), "#f3c395")
        svg = (
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" fill="none">'
            f'<path d="{book_div["geometry"]}" fill="{fill}"/></svg>\n'
        )
        write("underline-contact.svg", svg)
        (OUT / "underline-contact.meta.json").write_text(
            json.dumps(
                {
                    "id": book_div.get("id"),
                    "x": book_div.get("x"),
                    "y": book_div.get("y"),
                    "w": w,
                    "h": h,
                    "rotation": book_div.get("rotation"),
                    "fill": fill,
                },
                indent=2,
            ),
            encoding="utf-8",
        )
        print("contact underline", book_div.get("id"), fill, book_div.get("rotation"))

# Stars in testimonial
testi = f(root, name="TESTIMONIAL")
stars = []
if testi:
    for p in fa(testi, lambda x: x.get("type") == "path" and x.get("geometry")):
        name = (p.get("name") or "").lower()
        w = p.get("width") or 0
        h = p.get("height") or 0
        # small star-like shapes
        if w < 40 and h < 40 and w > 5:
            fill = hex7(p.get("fill"), "")
            if fill in ("#f3c395", "#db9a5b"):
                stars.append(p)
                print(
                    "star candidate",
                    p.get("id"),
                    p.get("name"),
                    w,
                    h,
                    "xy",
                    p.get("x"),
                    p.get("y"),
                    "parent-ish",
                )

# dump star geometries
for i, s in enumerate(stars[:4]):
    w = s.get("width") or 20
    h = s.get("height") or 20
    # expand viewBox from path bounds roughly
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" fill="none">'
        f'<path d="{s["geometry"]}" fill="{hex7(s.get("fill"), "#f3c395")}"/></svg>\n'
    )
    write(f"star-{i}.svg", svg)
    (OUT / f"star-{i}.meta.json").write_text(
        json.dumps(
            {
                "id": s.get("id"),
                "x": s.get("x"),
                "y": s.get("y"),
                "w": w,
                "h": h,
                "rotation": s.get("rotation"),
            },
            indent=2,
        ),
        encoding="utf-8",
    )

print("done, stars=", len(stars))
