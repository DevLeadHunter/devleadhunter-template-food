#!/usr/bin/env python3
import json
import shutil
from pathlib import Path

PEN = Path(r"C:\Users\leogu\Desktop\Projects\devleadhunter\devleadhunter-pencil\Food\maquette.pen")
ROOT = Path(__file__).resolve().parents[1]
PUB = ROOT / "public" / "images"
PLAY = ROOT / ".playground" / "public" / "images"
OUT = ROOT / ".design-extract"
for p in (PUB, PLAY, OUT):
    p.mkdir(parents=True, exist_ok=True)

d = json.loads(PEN.read_text(encoding="utf-8"))


def find_all(n, pred, acc=None):
    if acc is None:
        acc = []
    if pred(n):
        acc.append(n)
    for c in n.get("children") or []:
        find_all(c, pred, acc)
    return acc


def find(n, name):
    if n.get("name") == name:
        return n
    for c in n.get("children") or []:
        r = find(c, name)
        if r:
            return r
    return None


def hex7(c):
    if isinstance(c, str) and len(c) >= 7:
        return c[:7]
    return "#000"


root = d["children"][0]
by_id = {}
for n in find_all(d, lambda x: x.get("type") == "path" and x.get("geometry")):
    pid = n["id"]
    w = n.get("width") or 100
    h = n.get("height") or 100
    fill = hex7(n.get("fill"))
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" fill="none">'
        f'<path d="{n["geometry"]}" fill="{fill}"/></svg>\n'
    )
    by_id[pid] = n
    for dest in (PUB, PLAY, OUT):
        (dest / f"path-{pid}.svg").write_text(svg, encoding="utf-8")

aliases = {
    "deco-hero-leaf": "aXoxN",
    "deco-hero-blob": "qjoes",
    "wave-white": "gwzOQ",
    "wave-light": "x61IEk",
    "wave-dark": "w9JL6",
    "deco-contact": "WzcJP",
}

obj3 = find(root, "Object-3")
if obj3:
    ps = find_all(obj3, lambda x: x.get("type") == "path")
    if ps:
        aliases["deco-menu"] = ps[0]["id"]

# Object-1 under ABOUT
about = find(root, "ABOUT")
if about:
    for n in find_all(about, lambda x: x.get("name") == "Object-1"):
        ps = find_all(n, lambda x: x.get("type") == "path")
        if ps:
            aliases["deco-about-leaf"] = ps[0]["id"]

contact = find(root, "CONTACT FORM")
if contact:
    social = find(contact, "social")
    if social:
        for i, frame in enumerate(social.get("children") or []):
            ps = find_all(frame, lambda x: x.get("type") == "path")
            if ps:
                aliases[f"social-{i}"] = ps[0]["id"]
    # heading decorative objects
    for n in find_all(contact, lambda x: x.get("name") == "Object-5"):
        ps = find_all(n, lambda x: x.get("type") == "path")
        if ps:
            aliases["deco-contact"] = ps[0]["id"]

# quote icon in testimonial
testi = find(root, "TESTIMONIAL")
if testi:
    for n in find_all(testi, lambda x: x.get("type") == "path"):
        w = n.get("width") or 0
        h = n.get("height") or 0
        if 30 < w < 60 and 20 < h < 50:
            aliases["quote-mark"] = n["id"]
            break
    # feature icons inside icon boxes at bottom
    featured = None
    for n in find_all(testi, lambda x: x.get("name") == "featured"):
        featured = n
    if featured:
        boxes = find_all(featured, lambda x: x.get("name") == "icon box")
        for i, box in enumerate(boxes):
            ps = find_all(box, lambda x: x.get("type") == "path")
            if ps:
                aliases[f"feature-icon-{i}"] = ps[0]["id"]

# about icon boxes (info row at top)
if about:
    featured = find(about, "featured")
    if featured:
        boxes = [c for c in featured.get("children") or [] if c.get("name") == "icon box"]
        for i, box in enumerate(boxes):
            ps = find_all(box, lambda x: x.get("type") == "path")
            if ps:
                aliases[f"about-icon-{i}"] = ps[0]["id"]

for alias, pid in aliases.items():
    src = PUB / f"path-{pid}.svg"
    if src.exists():
        for dest in (PUB, PLAY):
            shutil.copy(src, dest / f"{alias}.svg")
        print("ok", alias, pid)
    else:
        print("missing", alias, pid)

# about collage
image = find(about, "image") if about else None
items = []
if image:
    for n in find_all(image, lambda x: isinstance(x.get("fill"), dict) and x["fill"].get("url")):
        items.append(
            {
                "name": n.get("name"),
                "url": n["fill"]["url"],
                "x": n.get("x"),
                "y": n.get("y"),
                "w": n.get("width"),
                "h": n.get("height"),
                "r": n.get("cornerRadius"),
            }
        )
(OUT / "about-collage.json").write_text(json.dumps(items, indent=2), encoding="utf-8")
print("collage", len(items))
