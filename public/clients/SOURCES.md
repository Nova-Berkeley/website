# Client logo files

Each logo here is the company's own mark, used unmodified except where
noted, to identify a client Nova has worked with. They are rendered in
**full brand colour on a white tile** — the surface each mark was drawn
for — so the files themselves need no recolouring.

| File               | Client        | Source (Wikimedia Commons file) | License on source |
| ------------------ | ------------- | ------------------------------- | ----------------- |
| `nasa.svg`         | NASA          | `NASA logo.svg` (insignia)      | Public domain     |
| `coca-cola.svg`    | Coca-Cola     | `Coca-Cola logo.svg`            | Public domain     |
| `mcdonalds.svg`    | McDonald's    | `McDonald's Golden Arches.svg`  | Public domain     |
| `fifa.svg`         | FIFA          | `FIFA logo without slogan.svg`  | Public domain     |
| `wells-fargo.svg`  | Wells Fargo   | `Wells Fargo Bank.svg`          | Public domain     |
| `oracle.svg`       | Oracle        | `Oracle logo.svg`               | Public domain     |
| `zoom.svg`         | Zoom          | `Zoom Logo 2022.svg`            | Public domain     |
| `att.svg`          | AT&T          | `AT&T logo 2016.svg`            | Public domain     |
| `nbc.svg`          | NBC           | `NBC logo 2022.svg`             | Public domain     |
| `epic-games.svg`   | Epic Games    | `Epic Games logo.svg`           | Public domain     |
| `aston-martin.svg` | Aston Martin  | `Aston Martin wordmark.svg`     | Public domain     |
| `conde-nast.svg`   | Condé Nast    | `Condé Nast logo.svg`           | Public domain     |

## Modifications

- **`oracle.svg`** — the Commons file ships with no `fill`, so it would
  render black. Restored Oracle's brand red (`#C74634`) on the single
  path. Nothing else changed.
- **`fifa.svg`** — the Commons file writes its viewBox height in
  scientific notation (`1e3`). Rewritten as `1000` so the build's size
  reader can parse it. Geometry is identical.

## Missing

- **Equinox** — Wikimedia Commons carries no Equinox logo, and none was
  sourced. It renders as a styled name tile in the grid, which is a
  designed fallback rather than a bug. To fix: grab the SVG from
  Equinox's brand or press page, drop it here, and set
  `logo: /clients/equinox.svg` in `src/content/data/clients.yaml`.

## Adding a logo

1. Drop the `.svg` into this folder.
2. Set `logo: /clients/<file>.svg` on that client in
   `src/content/data/clients.yaml`.

Requirements: a real SVG (not a PNG renamed) with a transparent
background. The tile behind it is white in both light and dark mode, so
a mark designed for white will look right without any adjustment. Size
is worked out automatically from the SVG's own viewBox — there is
nothing to tune.
