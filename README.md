# Job standards store

One static page for the Job Standards Pack and the three files sold on their own.

## Open the page

Open `index.html` in a browser. From this folder you can also run:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Where the buy links go

Buy buttons open a sheet on this page. The sheet does not take card numbers.

Checkout URLs live in `checkout.config.js`. Each key maps to one offer:

| Key | Offer |
| --- | --- |
| `pack` | Job Standards Pack, $147 |
| `paint` | Paint & Finish Photo Standard, $97 |
| `sub` | Sub Closeout Agreement, $67 |
| `bid` | Bid or Walk Sheet, $47 |

Leave a value as `""` until the real link exists. The sheet stays on this page and says the link is not set. When a value is an `http://` or `https://` URL, the sheet’s checkout button opens it in the same tab.

## GitHub Pages

Publish this folder as the site root. `.nojekyll` is included so Pages serves the HTML, CSS, and JS as-is.
