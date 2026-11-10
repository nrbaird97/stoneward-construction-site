#!/usr/bin/env python3
"""
Stoneward Construction static site check.

Standard library only. Run from anywhere:

    python3 scripts/check.py

It parses every .html file, resolves every internal href/src to a file,
checks for prohibited content and prints OK when everything passes.
"""

from __future__ import annotations

import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent.parent
SITE_HOSTS = {"www.stonewardconstruction.com", "stonewardconstruction.com"}
SCHEMA_HOSTS = {"schema.org", "www.schema.org"}
LEAD_HOSTS = {"script.google.com"}  # Apps Script web app that receives the free-guide sign-ups
ALLOWED_URL_HOSTS = SITE_HOSTS | SCHEMA_HOSTS | LEAD_HOSTS
TEXT_SUFFIXES = {
    ".html",
    ".css",
    ".js",
    ".md",
    ".txt",
    ".xml",
    ".py",
    ".json",
    ".webmanifest",
}
SKIP_DIRS = {".git", "node_modules", "__pycache__"}
IGNORED_SCHEMES = ("mailto:", "tel:", "data:", "javascript:")

issues: list[str] = []
stats = {"pages": 0, "refs": 0, "text_files": 0}


class RefParser(HTMLParser):
    """Collect href/src values from a page."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.refs: list[tuple[str, str, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        for name, value in attrs:
            if name in {"href", "src"} and value is not None:
                self.refs.append((tag, name, value.strip()))


def add_issue(message: str) -> None:
    issues.append(message)


def text_files() -> list[Path]:
    files: list[Path] = []
    for path in sorted(ROOT.rglob("*")):
        if not path.is_file():
            continue
        if any(part in SKIP_DIRS for part in path.relative_to(ROOT).parts):
            continue
        if path.suffix.lower() in TEXT_SUFFIXES or path.name == "robots.txt":
            files.append(path)
    return files


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="ignore")


def check_internal_refs(page: Path, html: str) -> None:
    parser = RefParser()
    parser.feed(html)

    for tag, attribute, value in parser.refs:
        if not value:
            continue
        lowered = value.lower()
        if lowered.startswith(IGNORED_SCHEMES) or lowered.startswith("#"):
            continue
        if lowered.startswith(("http://", "https://")):
            continue

        path_part = value.split("#", 1)[0].split("?", 1)[0]
        if not path_part:
            continue
        path_part = unquote(path_part)
        if path_part.startswith("/"):
            candidate = ROOT / path_part.lstrip("/")
        else:
            candidate = page.parent / path_part

        try:
            resolved = candidate.resolve()
            resolved.relative_to(ROOT.resolve())
        except ValueError:
            add_issue(
                f"{page.relative_to(ROOT)}: {tag} {attribute} points outside the site: {value}"
            )
            continue
        except OSError as error:
            add_issue(f"{page.relative_to(ROOT)}: cannot resolve {value}: {error}")
            continue

        stats["refs"] += 1
        if resolved == ROOT.resolve():
            resolved = ROOT.resolve() / "index.html"
        elif not resolved.is_file() and not resolved.suffix:
            resolved = resolved.with_suffix(".html")
        if not resolved.is_file():
            add_issue(
                f"{page.relative_to(ROOT)}: missing {attribute} target for {value}"
            )


def check_http_urls() -> None:
    url_pattern = re.compile(r"https?://[^\s\"'<>)]+", re.IGNORECASE)
    protocol_relative = re.compile(r"(?:href|src)\s*=\s*[\"']//", re.IGNORECASE)

    for path in text_files():
        if path.suffix.lower() not in {".html", ".css", ".js"}:
            continue
        content = read_text(path)

        for match in url_pattern.finditer(content):
            url = match.group(0).rstrip(".,;:")
            host = (urlsplit(url).hostname or "").lower()
            if host not in ALLOWED_URL_HOSTS:
                add_issue(
                    f"{path.relative_to(ROOT)}: external URL is not allowed: {url}"
                )

        if protocol_relative.search(content):
            add_issue(
                f"{path.relative_to(ROOT)}: protocol-relative URL is not allowed"
            )


def check_page_meta(page: Path, html: str) -> None:
    relative = page.relative_to(ROOT)
    if not re.search(r"<!doctype\s+html", html, re.IGNORECASE):
        add_issue(f"{relative}: missing HTML doctype")
    if not re.search(r"<html\s+lang=\"en\"", html, re.IGNORECASE):
        add_issue(f"{relative}: missing lang=\"en\" on html")

    title = re.search(r"<title>(.*?)</title>", html, re.IGNORECASE | re.DOTALL)
    if not title or not title.group(1).strip():
        add_issue(f"{relative}: missing title")

    description = re.search(
        r"<meta\s+name=\"description\"\s+content=\"([^\"]*)\"", html, re.IGNORECASE
    )
    if not description or not description.group(1).strip():
        add_issue(f"{relative}: missing meta description")

    canonical = re.search(
        r"<link\s+rel=\"canonical\"\s+href=\"([^\"]+)\"", html, re.IGNORECASE
    )
    if not canonical or not canonical.group(1).startswith("https://www.stonewardconstruction.com"):
        add_issue(f"{relative}: missing or unexpected canonical URL")

    for prop in ("og:type", "og:title", "og:description", "og:url"):
        if not re.search(
            rf"<meta\s+property=\"{re.escape(prop)}\"\s+content=\"[^\"]+\"",
            html,
            re.IGNORECASE,
        ):
            add_issue(f"{relative}: missing {prop}")

    if not re.search(
        r"<link\s+rel=\"icon\"[^>]*href=\"(data:image/svg\+xml,|assets/img/favicon\.png)", html, re.IGNORECASE
    ):
        add_issue(f"{relative}: missing favicon")

    if not re.search(r"id=\"business-schema\"", html, re.IGNORECASE):
        add_issue(f"{relative}: missing LocalBusiness JSON-LD slot")

    h1_count = len(re.findall(r"<h1(?:\s|>)", html, re.IGNORECASE))
    if h1_count != 1:
        add_issue(f"{relative}: expected exactly one h1, found {h1_count}")


def check_forbidden_text() -> None:
    dollar_pattern = re.compile(r"\$\s*\d")

    dash_patterns = [
        (chr(0x2013), "en dash"),
        (chr(0x2014), "em dash"),
        ("&" + "ndash;", "en dash entity"),
        ("&" + "mdash;", "em dash entity"),
        ("&#" + "8211;", "en dash entity"),
        ("&#" + "8212;", "em dash entity"),
        ("&#x" + "2013;", "en dash entity"),
        ("&#x" + "2014;", "em dash entity"),
    ]

    for path in text_files():
        stats["text_files"] += 1
        content = read_text(path)
        lowered = content.lower()

        for line_number, line in enumerate(content.splitlines(), start=1):
            if dollar_pattern.search(line):
                add_issue(
                    f"{path.relative_to(ROOT)}:{line_number}: dollar sign followed by a digit"
                )

        for pattern, label in dash_patterns:
            if pattern.lower() in lowered:
                add_issue(
                    f"{path.relative_to(ROOT)}: contains a forbidden {label}"
                )


def main() -> int:
    pages = sorted(
        path
        for path in ROOT.rglob("*.html")
        if not any(part in SKIP_DIRS for part in path.relative_to(ROOT).parts)
    )
    if not pages:
        add_issue("no HTML pages found")
        print("\n".join(issues))
        return 1

    for page in pages:
        stats["pages"] += 1
        html = read_text(page)
        check_page_meta(page, html)
        check_internal_refs(page, html)

    check_http_urls()
    check_forbidden_text()

    for required in ("robots.txt", "sitemap.xml", "README.md"):
        if not (ROOT / required).is_file():
            add_issue(f"missing required file: {required}")

    if issues:
        print("FAILED")
        for issue in issues:
            print(" -", issue)
        print(f"\n{len(issues)} issue(s) found.")
        return 1

    print(f"Parsed {stats['pages']} HTML pages.")
    print(f"Resolved {stats['refs']} internal href/src references.")
    print(f"Checked {stats['text_files']} text files for forbidden content.")
    print("OK")
    return 0


if __name__ == "__main__":
    sys.exit(main())
