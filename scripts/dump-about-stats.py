import json
from pathlib import Path
d=json.loads(Path(r"C:\Users\leogu\Desktop\Projects\devleadhunter\devleadhunter-pencil\Food\maquette.pen").read_text(encoding="utf-8"))

def fa(n,p,a=None):
    a=[] if a is None else a
    if p(n): a.append(n)
    for c in n.get("children") or []: fa(c,p,a)
    return a
def f(n,name):
    if n.get("name")==name: return n
    for c in n.get("children") or []:
        r=f(c,name)
        if r: return r

about=f(d["children"][0],"ABOUT")
for fname in ["Frame 216","Frame 217","Frame 215","Frame 214","Frame 213","featured"]:
    fr=f(about,fname)
    if not fr: print("missing", fname); continue
    print("====", fname, "xy", fr.get("x"), fr.get("y"), "wh", fr.get("width"), fr.get("height"), "fill", fr.get("fill"), "r", fr.get("cornerRadius"), "gap", (fr.get("layout") or {}).get("gap") if isinstance(fr.get("layout"),dict) else fr.get("gap"), "pad", fr.get("padding"))
    for t in fa(fr, lambda x: x.get("type")=="text"):
        print("  TEXT", t.get("content"), t.get("fontSize"), t.get("fontFamily"), t.get("fontWeight"), t.get("fill"))
    for n in fa(fr, lambda x: x.get("type") in ("ellipse","rectangle","frame") and (isinstance(x.get("fill"),str) or isinstance(x.get("fill"),dict))):
        if n is fr: continue
        print("  NODE", n.get("type"), n.get("name"), "fill", n.get("fill"), "wh", n.get("width"), n.get("height"), "r", n.get("cornerRadius"))
