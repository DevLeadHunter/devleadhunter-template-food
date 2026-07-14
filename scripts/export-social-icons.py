#!/usr/bin/env python3
import json
from pathlib import Path

PEN = Path(r"C:\Users\leogu\Desktop\Projects\devleadhunter\devleadhunter-pencil\Food\maquette.pen")
ROOT = Path(__file__).resolve().parents[1]
PUB = ROOT / "public" / "images"
PLAY = ROOT / ".playground" / "public" / "images"
d = json.loads(PEN.read_text(encoding="utf-8"))


def fa(n, p, a=None):
    if a is None:
        a = []
    if p(n):
        a.append(n)
    for c in n.get("children") or []:
        fa(c, p, a)
    return a


def f(n, name):
    if n.get("name") == name:
        return n
    for c in n.get("children") or []:
        r = f(c, name)
        if r:
            return r
    return None


def hex7(c):
    if isinstance(c, str) and len(c) >= 7:
        return c[:7]
    return "#fff"


about = f(d["children"][0], "ABOUT")
for frame_name, alias in [("instagram-icon", "icon-instagram"), ("youtube-icon", "icon-youtube")]:
    fr = f(about, frame_name)
    if not fr:
        print("missing", frame_name)
        continue
    paths = fa(fr, lambda x: x.get("type") == "path" and x.get("geometry"))
    w = fr.get("width") or 42
    h = fr.get("height") or 42
    parts = []
    for p in paths:
        x = p.get("x") or 0
        y = p.get("y") or 0
        parts.append(
            f'<g transform="translate({x},{y})"><path d="{p["geometry"]}" fill="{hex7(p.get("fill"))}"/></g>'
        )
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" fill="none">'
        + "".join(parts)
        + "</svg>\n"
    )
    for dest in (PUB, PLAY):
        dest.mkdir(parents=True, exist_ok=True)
        (dest / f"{alias}.svg").write_text(svg, encoding="utf-8")
    print("wrote", alias, "paths", len(paths))
