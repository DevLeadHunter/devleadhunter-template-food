#!/usr/bin/env python3
"""Export contact underline (zvdEa) + testimonial stars (f4WDH7) correctly."""
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


def write(name: str, svg: str):
    for dest in (PUB, PLAY):
        (dest / name).write_text(svg, encoding="utf-8")
    print("wrote", name)


def hex7(c, default="#000"):
    if isinstance(c, str) and len(c) >= 7:
        return c[:7]
    return default


# Contact flat underline under "book your table"
n = fa(d, lambda x: x.get("id") == "zvdEa")[0]
w, h = n["width"], n["height"]
fill = hex7(n.get("fill"), "#f3c395")
# Path is multiple open subpaths that look like a thick wavy stroke when filled
svg = (
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" fill="none">'
    f'<path d="{n["geometry"]}" fill="{fill}"/></svg>\n'
)
write("underline-contact.svg", svg)
(OUT / "underline-contact.meta.json").write_text(
    json.dumps(
        {
            "id": "zvdEa",
            "x": n.get("x"),
            "y": n.get("y"),
            "w": w,
            "h": h,
            "rotation": n.get("rotation"),
            "fill": fill,
            "enabled": n.get("enabled"),
        },
        indent=2,
    ),
    encoding="utf-8",
)
print("contact", fill, w, h, "rot", n.get("rotation"), "enabled", n.get("enabled"))

# Stars cluster
n = fa(d, lambda x: x.get("id") == "f4WDH7")[0]
w, h = n["width"], n["height"]
fill = hex7(n.get("fill"), "#f3c395")
svg = (
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" fill="none">'
    f'<path d="{n["geometry"]}" fill="{fill}"/></svg>\n'
)
write("testimonial-stars.svg", svg)
(OUT / "testimonial-stars.meta.json").write_text(
    json.dumps(
        {
            "id": "f4WDH7",
            "x": n.get("x"),
            "y": n.get("y"),
            "w": w,
            "h": h,
            "rotation": n.get("rotation"),
            "fill": fill,
            "name": n.get("name"),
        },
        indent=2,
    ),
    encoding="utf-8",
)
print("stars", w, h, "xy", n.get("x"), n.get("y"), "name", n.get("name"))

# Also dump parent Object-4 if exists
obj = fa(d, lambda x: x.get("name") == "Object-4" or x.get("id") == "Object-4")
print("Object-4 matches", len(obj))
for o in obj[:3]:
    print(" ", o.get("id"), o.get("name"), o.get("x"), o.get("y"), o.get("width"), o.get("height"))
