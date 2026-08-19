# internal/

Board records that support the site but are not part of it.

Everything in this folder is **excluded from version control** except this
README and the `*.example.yaml` templates. Nothing here is read at build
time, and nothing here reaches the published site.

Keep the filled-in files wherever the board keeps its other records (a
shared drive works). Copy them back into this folder when you need to
work on the site, and they will stay out of any commit.

## Files

| File                       | Tracked | What it holds                                        |
| -------------------------- | ------- | ---------------------------------------------------- |
| `clearance.example.yaml`   | yes     | Template for the record below                        |
| `clearance.yaml`           | no      | Who confirmed we may name each client, and when       |

## Why clearance is recorded

`src/content/data/clients.yaml` carries a `cleared` flag per client, and
only clients with `cleared: true` are ever rendered. That flag is the
switch; it does not say who threw it. If a client is ever queried, the
record in `clearance.yaml` is the answer to "on whose authority did we
publish this name, and when".

Set a client back to `cleared: false` and it leaves the site on the next
build.
