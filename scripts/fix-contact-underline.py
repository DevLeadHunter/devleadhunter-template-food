#!/usr/bin/env python3
from pathlib import Path
from PIL import Image
import json

PUB = Path("public/images")
PLAY = Path(".playground/public/images")
PEN = Path(r"C:\Users\leogu\Desktop\Projects\devleadhunter\devleadhunter-pencil\Food\maquette.pen")

# Solid peach contact underline from hero asset
src = Image.open(PUB / "underline-hero.png").convert("RGBA")
out = []
for r, g, b, a in src.getdata():
    if a > 8 and (r + g + b) > 80:
        out.append((0xF3, 0xC3, 0x95, 255))
    else:
        out.append((0, 0, 0, 0))
src.putdata(out)
bb = src.getbbox()
if bb:
    src = src.crop(bb)
for d in (PUB, PLAY):
    src.save(d / "underline-contact.png")
print("png", src.size)

d = json.loads(PEN.read_text(encoding="utf-8"))


def fa(n, pred, acc=None):
    if acc is None:
        acc = []
    if pred(n):
        acc.append(n)
    for c in n.get("children") or []:
        fa(c, pred, acc)
    return acc


n = fa(d, lambda x: x.get("id") == "zvdEa")[0]
w, h = n["width"], n["height"]
svg = (
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" fill="none">'
    f'<path d="{n["geometry"]}" fill="#f3c395" stroke="#f3c395" '
    f'stroke-width="1.4" stroke-linecap="round"/></svg>\n'
)
for dest in (PUB, PLAY):
    (dest / "underline-contact.svg").write_text(svg, encoding="utf-8")
print("svg ok")
