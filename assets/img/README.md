# Photo slots

The site ships without photography. Each image slot is a `<figure class="ph" data-photo="...">` with an `<img>` inside. When the JPEG is missing or cannot be read, the `<img>` hides itself and the styled earth-tone gradient and caption show through. Replace an empty placeholder with a real JPEG using the exact filename and the slot will show the photo automatically.

The `.jpg` files in this folder are intentionally empty placeholders so every local link resolves before the real images arrive. They should be replaced, not kept long term.

## Needed photos

| File | Suggested size | Subject |
| --- | --- | --- |
| `hero.jpg` | 1800 x 1200 | A completed Irontown modular ADU set on a landscaped Utah lot, late afternoon. This is the main homepage image. |
| `backyard-adu.jpg` | 900 x 675 | A detached backyard ADU seen from the main house, with a simple roof and a small patio. |
| `casita.jpg` | 900 x 675 | A casita or guest house exterior with a covered entry beside a main house. |
| `small-modular-home.jpg` | 900 x 675 | A small modular home on a rural or narrow Utah lot. |
| `how-it-works.jpg` | 1600 x 1000 | A crane setting a module onto a foundation, or a module arriving on site. |
| `about.jpg` | 1200 x 800 | A Stoneward project contact reviewing plans on a Utah building site. |
| `mysa-500.jpg` | 800 x 600 | Irontown Mysa 500 exterior or rendering. |
| `cabana-500.jpg` | 800 x 600 | Irontown Cabana 500 exterior or rendering. |
| `sledhaus-500.jpg` | 800 x 600 | Irontown Sledhaus 500 exterior or rendering. |
| `cabana-2-bed.jpg` | 800 x 600 | Irontown Cabana 2 Bed exterior or rendering. |
| `torrey-flats.jpg` | 800 x 600 | Irontown Torrey Flats exterior or rendering. |
| `morada-800.jpg` | 800 x 600 | Irontown Morada 800 exterior or rendering. |
| `rabbit-800.jpg` | 800 x 600 | Irontown Rabbit 800 exterior or rendering. |
| `eagle-landing-1000.jpg` | 800 x 600 | Irontown Eagle Landing 1000 exterior or rendering. |
| `morada-1000.jpg` | 800 x 600 | Irontown Morada 1000 exterior or rendering. |
| `rabbit-1000.jpg` | 800 x 600 | Irontown Rabbit 1000 exterior or rendering. |

## Notes

- Use JPEGs, sRGB, compressed for the web. Aim for a sensible file size so pages stay quick.
- Keep the exact filenames above. The HTML pages and `assets/js/plans.js` refer to them by name.
- Plan photos are used on both `adus.html` and the homepage featured strip. A wide landscape crop works best.
- If a plan photo changes, update `photo` in `assets/js/plans.js`. If a page photo changes, update the `data-photo` and `src` values in that page.
- Update the image `alt` text if the subject changes.
- Do not hotlink images from another website. All photos should live in this folder.
