#!/usr/bin/env python3
"""
Rebuild the header navigation on every page from one definition.

Standard library only. Run after adding a page, especially a city page:

    python3 scripts/build_nav.py

It replaces the <nav class="site-nav"> block and the mega menu panel in each
.html file. The top bar keeps a few main links; the menu button opens the
panel with everything else, including every {city}-adu.html page A to Z.
"""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

TOP = [
    ("adus", "ADUs"),
    ("utah-adu-cities", "City rules"),
    ("utah-adu-law-sb284", "ADU law"),
    ("how-it-works", "How it works"),
    ("contact", "Contact"),
]

SECTIONS = [
    ("Plans", [("adus", "All ADU plans"), ("gallery", "Gallery"), ("finishes", "Finishes"), ("adu-guides", "Free ADU guides")]),
    ("Learn", [("utah-adu-law-sb284", "Utah ADU law (SB 284)"), ("how-it-works", "How it works"), ("faq", "FAQ")]),
    ("Company", [("about", "About"), ("contact", "Contact")]),
]

SEARCH_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>'


def link(slug: str, label: str) -> str:
    return f'<a href="{slug}" data-nav="{slug}.html">{label}</a>'


def city_links() -> str:
    cities = []
    for path in sorted(ROOT.glob("*-adu.html")):
        slug = path.stem
        name = slug[: -len("-adu")].replace("-", " ").title()
        cities.append((name, slug))
    cities.sort()
    return "\n".join(f'          <a href="{slug}" data-nav="{slug}.html">{name}</a>' for name, slug in cities)


def build() -> tuple[str, str]:
    nav = '<nav class="site-nav" id="site-nav" aria-label="Primary">\n' + "\n".join(
        "      " + link(s, l) for s, l in TOP
    ) + "\n    </nav>"
    cols = []
    for title, items in SECTIONS:
        cols.append(
            f'      <div class="mega__col">\n        <h2 class="mega__head">{title}</h2>\n'
            + "\n".join("        " + link(s, l) for s, l in items)
            + "\n      </div>"
        )
    mega = f"""<div class="mega" id="mega-menu">
  <div class="shell mega__inner">
    <form class="mega__search" action="search" method="get" role="search">
      <input type="search" name="q" placeholder="Search cities, plans, sizes" aria-label="Search cities, plans and guides" autocomplete="off">
      <button type="submit" aria-label="Search">{SEARCH_ICON}</button>
    </form>
    <div class="mega__grid">
{chr(10).join(cols)}
      <div class="mega__col mega__col--cities">
        <h2 class="mega__head">ADU rules by city</h2>
        <a class="mega__all" href="utah-adu-cities" data-nav="utah-adu-cities.html">All cities and Utah overview</a>
        <div class="mega__cities">
{city_links()}
        </div>
      </div>
    </div>
    <div class="mega__foot">
      <a class="btn btn--primary" href="contact">Start your ADU project</a>
      <a data-phone-link data-phone-text href="tel:+18018880136"></a>
      <p class="nav-note">Serving <span data-service-area></span>.</p>
    </div>
  </div>
</div>"""
    return nav, mega


NAV_RE = re.compile(r'<nav class="site-nav".*?</nav>', re.S)
MEGA_RE = re.compile(r'\s*<div class="mega" id="mega-menu">.*?\n</div>(?=\s*</header>)', re.S)


def main() -> None:
    nav, mega = build()
    changed = 0
    for path in sorted(ROOT.glob("*.html")):
        html = path.read_text(encoding="utf-8")
        if '<nav class="site-nav"' not in html:
            continue
        new = MEGA_RE.sub("", html)
        new = NAV_RE.sub(lambda m: nav, new, count=1)
        new = new.replace('aria-controls="site-nav"', 'aria-controls="mega-menu"')
        new = new.replace("</header>", "  " + mega + "\n</header>", 1)
        if new != html:
            path.write_text(new, encoding="utf-8")
            changed += 1
    print(f"nav rebuilt on {changed} pages")


if __name__ == "__main__":
    main()
