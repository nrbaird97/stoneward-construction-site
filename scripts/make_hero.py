#!/usr/bin/env python3
"""Generate the hero scenes (Wasatch Front mountains behind a modern modular ADU), night and day.
Usage: python3 scripts/make_hero.py   (writes assets/img/hero-night.svg and hero-day.svg). Replace with real photos any time:
drop assets/img/hero.jpg and it is layered on top automatically."""
import math, random

W, H = 1920, 1080

def ridge(seed, base, amp, peaks, rough=1.0, step=10):
    rnd = random.Random(seed)
    phases = [rnd.uniform(0, 6.28) for _ in range(6)]
    pts = []
    for x in range(-20, W + 40, step):
        y = base
        for px, h, w in peaks:  # sharp triangular peaks
            d = abs(x - px) / w
            if d < 1:
                y -= h * (1 - d) ** 1.35
        n = sum(math.sin(x / (38 + 52 * i) + phases[i]) * (amp / (i + 1.4)) for i in range(6)) * rough
        pts.append((x, y + n))
    d = "M-20,%d " % (H) + " ".join("L%.1f,%.1f" % p for p in pts) + " L%d,%d Z" % (W + 40, H)
    return d, min(p[1] for p in pts)

def pines(seed, x0, x1, base, count, hmin, hmax, fill):
    rnd = random.Random(seed)
    out = []
    for _ in range(count):
        x = rnd.uniform(x0, x1); h = rnd.uniform(hmin, hmax); w = h * 0.34
        out.append(f'<path d="M{x:.0f},{base} L{x - w:.0f},{base} L{x - w * .2:.0f},{base - h * .45:.0f} L{x - w * .75:.0f},{base - h * .45:.0f} L{x:.0f},{base - h:.0f} L{x + w * .75:.0f},{base - h * .45:.0f} L{x + w * .2:.0f},{base - h * .45:.0f} L{x + w:.0f},{base} Z" fill="{fill}"/>')
    return "\n".join(out)

def scene(night):
    P = {
        "sky": ("#04060C", "#0C1322", "#1A2236", "#3A2C24") if night else ("#4E8CCB", "#8DBDE6", "#CFE2F0", "#F6E7CB"),
        "far": "#1B2438" if night else "#A9BCD6",
        "mid": "#111827" if night else "#7C92B6",
        "near": "#090D15" if night else "#4A5E7E",
        "snow": "#9FB0D0" if night else "#FFFFFF",
        "snow_op": 0.55 if night else 0.95,
        "ground": ("#0B1008", "#05070A") if night else ("#6F8A52", "#3F5A34"),
        "wall": "#0F1214" if night else "#2A2F33",
        "roof": "#15191C" if night else "#2F353A",
        "glow": "#FFC866" if night else "#FFE2A8",
        "tree": "#06090E" if night else "#24402E",
    }
    s = []
    s.append(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Modular ADU in front of the Wasatch mountains, Utah">')
    s.append('<defs>')
    s.append(f'<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{P["sky"][0]}"/><stop offset=".42" stop-color="{P["sky"][1]}"/><stop offset=".72" stop-color="{P["sky"][2]}"/><stop offset="1" stop-color="{P["sky"][3]}"/></linearGradient>')
    for name in ("far", "mid", "near"):
        top = {"far": 250, "mid": 330, "near": 450}[name]
        s.append(f'<linearGradient id="m_{name}" gradientUnits="userSpaceOnUse" x1="0" y1="{top}" x2="0" y2="{top + 330}"><stop offset="0" stop-color="{P["snow"]}" stop-opacity="{P["snow_op"] if name != "near" else P["snow_op"] * .5}"/><stop offset=".22" stop-color="{P["snow"]}" stop-opacity="{(P["snow_op"] if name != "near" else P["snow_op"] * .5) * .75}"/><stop offset=".5" stop-color="{P[name]}" stop-opacity="1"/><stop offset="1" stop-color="{P[name]}"/></linearGradient>')
    s.append(f'<linearGradient id="ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{P["ground"][0]}"/><stop offset="1" stop-color="{P["ground"][1]}"/></linearGradient>')
    s.append(f'<radialGradient id="glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="{P["glow"]}" stop-opacity="{.55 if night else .25}"/><stop offset="1" stop-color="{P["glow"]}" stop-opacity="0"/></radialGradient>')
    s.append(f'<radialGradient id="horizon" cx=".18" cy="1" r=".9"><stop offset="0" stop-color="{"#7A4A22" if night else "#FFD79A"}" stop-opacity="{.35 if night else .65}"/><stop offset="1" stop-color="{"#7A4A22" if night else "#FFD79A"}" stop-opacity="0"/></radialGradient>')
    s.append('<filter id="soft"><feGaussianBlur stdDeviation="14"/></filter>')
    s.append('</defs>')
    s.append(f'<rect width="{W}" height="{H}" fill="url(#sky)"/>')
    s.append(f'<rect width="{W}" height="{H}" fill="url(#horizon)"/>')
    rnd = random.Random(7)
    if night:  # stars and moon
        for _ in range(170):
            x, y = rnd.uniform(0, W), rnd.uniform(0, 520)
            r = rnd.choice([0.7, 0.9, 1.1, 1.4, 1.8]); o = rnd.uniform(.35, .95) * (1 - y / 700)
            s.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{r}" fill="#F4EFE2" opacity="{o:.2f}"/>')
        s.append('<circle cx="1480" cy="190" r="90" fill="#C9D6F2" opacity=".10" filter="url(#soft)"/>')
        s.append('<circle cx="1480" cy="190" r="30" fill="#F2ECDD"/>')
        s.append('<circle cx="1493" cy="184" r="27" fill="#0C1322"/>')
    else:  # sun glow and clouds
        s.append('<circle cx="220" cy="560" r="260" fill="#FFF3D1" opacity=".55" filter="url(#soft)"/>')
        for cx, cy, rx, ry, o in [(520, 170, 260, 30, .55), (900, 120, 200, 22, .45), (1500, 230, 280, 28, .5), (1250, 330, 190, 18, .35), (240, 300, 220, 20, .4)]:
            s.append(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="#FFFFFF" opacity="{o}" filter="url(#soft)"/>')
    # ranges: far (Uintas), mid (Wasatch with Timpanogos), near foothills
    far, _ = ridge(3, 560, 16, [(280, 120, 330), (700, 150, 360), (1180, 190, 430), (1700, 130, 380)], 1.0)
    mid, _ = ridge(11, 640, 12, [(140, 90, 220), (520, 215, 300), (640, 245, 210), (1000, 120, 330), (1380, 235, 360), (1560, 285, 210), (1830, 170, 260)], 1.0)
    near, _ = ridge(23, 760, 9, [(240, 55, 360), (900, 40, 420), (1500, 75, 420)], 0.9)
    s.append(f'<path d="{far}" fill="url(#m_far)"/>')
    s.append(f'<path d="{mid}" fill="url(#m_mid)"/>')
    s.append(f'<path d="{near}" fill="url(#m_near)"/>')
    # distant haze at the foot of the mountains
    s.append(f'<rect x="0" y="700" width="{W}" height="140" fill="{"#1A2236" if night else "#DCE8F2"}" opacity=".35" filter="url(#soft)"/>')
    # ground
    s.append(f'<path d="M0,872 Q480,838 960,858 T1920,846 L1920,{H} L0,{H} Z" fill="url(#ground)"/>')
    s.append(pines(5, 0, 520, 880, 22, 90, 240, P["tree"]))
    s.append(pines(9, 1500, 1940, 870, 18, 80, 220, P["tree"]))
    # the ADU: low modern gable with standing-seam metal roof
    x0, x1, base, eave, apex = 930, 1740, 884, 700, 612
    s.append(f'<ellipse cx="{(x0 + x1) // 2}" cy="{base + 6}" rx="{(x1 - x0) // 2 + 60}" ry="14" fill="#000" opacity=".35"/>')
    s.append(f'<rect x="{x0}" y="{eave}" width="{x1 - x0}" height="{base - eave}" fill="{P["wall"]}"/>')
    s.append(f'<path d="M{x0 - 46},{eave + 10} L{(x0 + x1) // 2},{apex} L{x1 + 46},{eave + 10} L{x1 + 46},{eave + 34} L{x0 - 46},{eave + 34} Z" fill="{P["roof"]}"/>')
    for i in range(0, 25):
        xx = x0 - 30 + i * ((x1 - x0 + 60) / 24)
        s.append(f'<line x1="{xx:.0f}" y1="{eave + 26}" x2="{(xx + (x0 + x1) / 2) / 2 if False else xx:.0f}" y2="{eave + 26}" stroke="none"/>')
    # seams: lines from eave up to the ridge following the roof slope
    cx = (x0 + x1) / 2
    for i in range(0, 22):
        t = i / 21
        ex = x0 - 46 + t * (x1 - x0 + 92)
        ry = apex + abs((ex - cx)) / ((x1 - x0) / 2 + 46) * ((eave + 10) - apex)
        s.append(f'<line x1="{ex:.0f}" y1="{eave + 26:.0f}" x2="{ex:.0f}" y2="{ry:.0f}" stroke="#fff" stroke-opacity=".07" stroke-width="2"/>')
    s.append(f'<rect x="{x1 - 150}" y="{apex - 52}" width="26" height="70" fill="{P["roof"]}"/>')
    # vertical board-and-batten lines
    for xx in range(x0 + 20, x1, 36):
        s.append(f'<line x1="{xx}" y1="{eave + 38}" x2="{xx}" y2="{base}" stroke="#fff" stroke-opacity=".035" stroke-width="2"/>')
    # windows: large sliding glass, tall window, small window
    def win(x, y, w, h, op=1.0):
        out = [f'<rect x="{x - 10}" y="{y - 10}" width="{w + 20}" height="{h + 20}" fill="#000" opacity=".5"/>']
        out.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{P["glow"]}" opacity="{op}"/>')
        out.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="#000" opacity="{.0 if night else .22}"/>')
        out.append(f'<line x1="{x + w / 2}" y1="{y}" x2="{x + w / 2}" y2="{y + h}" stroke="#0B0D0F" stroke-width="5"/>')
        out.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="none" stroke="#0B0D0F" stroke-width="5"/>')
        return "".join(out)
    s.append(f'<circle cx="1395" cy="800" r="230" fill="url(#glow)"/>')
    s.append(win(1290, 730, 200, 154, 0.95))
    s.append(win(1015, 745, 130, 96, 0.85))
    s.append(win(1560, 745, 110, 96, 0.85))
    # interior hints in the big window
    s.append('<rect x="1305" y="840" width="62" height="44" fill="#7A5A32" opacity=".55"/>')
    s.append('<rect x="1428" y="800" width="42" height="84" fill="#5A4226" opacity=".5"/>')
    # patio and path
    s.append(f'<path d="M{x0 + 250},{base} L{x0 + 580},{base} L{x0 + 680},{H} L{x0 + 120},{H} Z" fill="{"#171B1F" if night else "#9AA3A8"}" opacity=".9"/>')
    # lamp posts
    for lx in (1000, 1690):
        s.append(f'<rect x="{lx}" y="{base - 52}" width="6" height="52" fill="#0B0D0F"/><circle cx="{lx + 3}" cy="{base - 56}" r="{12 if night else 5}" fill="{P["glow"]}" opacity="{.9 if night else .55}"/>')
        if night: s.append(f'<circle cx="{lx + 3}" cy="{base - 56}" r="44" fill="url(#glow)"/>')
    # foreground grasses and shrubs
    rnd2 = random.Random(41)
    for _ in range(90):
        x = rnd2.uniform(0, W); y = rnd2.uniform(930, 1070); h = rnd2.uniform(26, 90)
        col = rnd2.choice(["#0D140B", "#141C0D", "#1B1409"] if night else ["#6B8445", "#8A9650", "#7C6A3A"])
        s.append(f'<path d="M{x:.0f},{y + h:.0f} Q{x - 6:.0f},{y + h / 2:.0f} {x + rnd2.uniform(-18, 18):.0f},{y:.0f} Q{x + 6:.0f},{y + h / 2:.0f} {x + 5:.0f},{y + h:.0f} Z" fill="{col}" opacity=".9"/>')
    s.append(f'<rect x="0" y="{H - 150}" width="{W}" height="150" fill="#000" opacity="{.28 if night else .12}"/>')
    s.append('</svg>')
    return "\n".join(s)

for night, name in ((True, "hero-night.svg"), (False, "hero-day.svg")):
    open("assets/img/" + name, "w").write(scene(night))
print("ok")
