"""WCAG 2.x contrast of each text token on each ground, read from app/globals.css.

    python3 scripts/contrast-table.py
"""
import re
from pathlib import Path

css = Path(__file__).resolve().parent.parent.joinpath("app/globals.css").read_text()


def block(selector):
    m = re.search(re.escape(selector) + r"\s*\{(.*?)\n\}", css, re.S)
    return dict(re.findall(r"--([\w-]+):\s*(#[0-9a-fA-F]{6})", m.group(1)))


def luminance(hex_):
    def chan(c):
        c = int(c, 16) / 255
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4

    r, g, b = (chan(hex_[i : i + 2]) for i in (1, 3, 5))
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def ratio(a, b):
    la, lb = sorted((luminance(a), luminance(b)), reverse=True)
    return (la + 0.05) / (lb + 0.05)


grounds = ["paper", "surface", "surface-sunk"]
texts = ["ink", "graphite", "slate", "baseline", "measure"]

print("| Theme | Token | Value | paper | surface | sunk |")
print("|---|---|---|---|---|---|")
for theme, sel in (("light", ":root"), ("dark", ".dark")):
    t = block(sel)
    for name in texts:
        cells = [f"{ratio(t[name], t[g]):.2f}" for g in grounds]
        flag = "" if min(map(float, cells)) >= 4.5 else " ✗"
        print(f"| {theme} | `--{name}` | `{t[name]}` | " + " | ".join(cells) + f" |{flag}")
