#!/usr/bin/env python3
"""Rewrite internal links, canonicals, og:url, sitemap and JSON-LD to extensionless URLs.

The host serves /about for about.html and redirects /about.html to /about, so links and
canonical tags must use the clean URL. Safe to run repeatedly. Run after generating pages.
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://www.stonewardconstruction.com"

def clean(text: str) -> str:
    # absolute site URLs (canonical, og:url, sitemap, JSON-LD)
    text = re.sub(re.escape(SITE) + r"/index\.html", SITE + "/", text)
    text = re.sub(re.escape(SITE) + r"/([a-z0-9-]+)\.html", SITE + r"/\1", text)
    # relative href/action attributes
    text = re.sub(r'(href|action)="index\.html(#[^"]*)?"', lambda m: f'{m.group(1)}="/{m.group(2) or ""}"', text)
    text = re.sub(r'(href|action)="([a-z0-9-]+)\.html((?:[#?])[^"]*)?"', lambda m: f'{m.group(1)}="{m.group(2)}{m.group(3) or ""}"', text)
    # data-href used by the gallery lightbox
    text = re.sub(r'(data-href)="([a-z0-9-]+)\.html', r'\1="\2', text)
    return text

for path in list(ROOT.glob("*.html")) + [ROOT / "sitemap.xml"]:
    original = path.read_text(encoding="utf-8")
    updated = clean(original)
    if updated != original:
        path.write_text(updated, encoding="utf-8")
