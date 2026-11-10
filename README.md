# palefire

## Editing

- `index.html` — page content (text, sections, links).
- `assets/css/palefire.css` — **the Palefire theme** (colors and fonts are variables at the top). Loaded after `main.css`, so it overrides the template.
- `assets/css/main.css` — original template styles (best left alone).
- `assets/js/` — scripts (`main.js` is the template's own logic; `lightbox.js` opens media full size with swipe or arrow keys between items and pinch-to-zoom on phones; a tile's link can be a full-size photo, a video file (.mp4) or a YouTube/Vimeo link).
- `assets/css/images/` — gothic shapes: `arch.svg` (pointed arch behind show dates), `ornament-eye.png` (eye-symbol divider under every heading).
- `images/logo.png`, `images/symbol.png`, `images/favicon.png` — band logo, the eye symbol from its top, and the browser-tab icon (rendered from the 3D logo).
- `images/hero-stage.jpg` — wide photo behind the logo at the top. It's cropped to fit, so keep the important part near the middle.
- `images/` — photos; to add one to Media, copy a tile line in `index.html` (small square in `src`, full photo or video link in `href`).

Preview locally by opening `index.html` in a browser.

## Licensing

The original template's license is in `LICENSE-miniport.txt`. It requires keeping the credit in the footer and the copyright notes at the top of the template's CSS and JS files.
