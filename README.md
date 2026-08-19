# Nova Consulting website (berkeleynova.org)

The website for Nova Consulting — the student-run strategy consulting club at
UC Berkeley. It's a fast, static site built with [Astro](https://astro.build)
and designed to be **edited by future boards without writing code**.

---

## 📌 The editorial rule

Everything the site states as fact — a number, a client name, a date, a
member, an email address — is something the board has confirmed. There is no
placeholder copy standing in for real content anywhere.

Where a piece of content does not exist yet, the site **says so** or **hides
the section**. It never shows a plausible-looking stand-in, because on a live
recruitment site a stand-in reads as a claim and a visitor cannot tell the
difference. Sections switch themselves on the moment real content is added,
so keeping to this rule costs nothing.

---

## 🧭 The golden rule — who does what

| You want to…                                            | Do this                                    |
| ------------------------------------------------------- | ------------------------------------------ |
| **Change words, dates, people, projects, FAQ, links**   | Edit content on **GitHub's website** (below) |
| **Tweak layout, spacing, or fix a bug**                 | Ask **Claude Code** to make the change      |
| **Design a brand-new page or a big visual redesign**    | Start in **Claude Design**, then hand it to Claude Code to build |

99% of what a board needs — new members, new case studies, new recruitment
dates — is the first row. **You never need to install anything to do it.**

---

## ✏️ How to edit content (no coding, all in your browser)

All the site's words and data live in the **`src/content/`** folder as simple
text files. To change something:

1. Go to this repository on **GitHub.com** and open the file you want (use the
   guide below to find it).
2. Click the **pencil ✏️ icon** (top-right of the file) to edit.
3. Make your change. Keep the `label: value` format — only change the part
   after the colon, and keep the quotes if they're already there.
4. Scroll down, write a short note like "Update Fall 2026 dates", and click
   **Commit changes**.
5. That's it. The site rebuilds and goes live automatically in ~1 minute.

> 💡 Tip: if you're nervous, GitHub keeps every past version — nothing you do
> is permanent, and anything can be undone.

### Where each thing lives

| To change…                          | Edit this file / folder                       |
| ----------------------------------- | --------------------------------------------- |
| **Team roster** (add/remove people) | `src/content/data/team.yaml`                  |
| **Clients** (add / clear one)       | `src/content/data/clients.yaml`               |
| **Recruitment dates** (timeline)    | `src/content/data/timeline.yaml`              |
| **Case studies / projects**         | `src/content/projects/` (one file per project) |
| **FAQ questions & answers**         | `src/content/faq/` (one file per question)    |
| **Page headlines & intro copy**     | `src/content/pages/` (home, join, projects, team, coffee-chats) |
| **Page titles & SEO descriptions**  | `src/content/pages/` (the `title` / `description` at the top) |
| **Alumni placements**               | `src/content/data/alumni.yaml`                |
| **Member / client quotes**          | `src/content/voices/` (one file per quote)    |
| **The club's numbers**              | `stats` in `src/config.ts`                    |
| **Client logos**                    | `public/clients/` (see `SOURCES.md` there)    |

### Common tasks

- **Add a team member** → open `src/content/data/team.yaml`, copy an existing
  block, and change the details. Give them a unique `id`. Set `coffeeChat: true`
  to also list them on the Coffee Chats page.
- **Add a case study** → in `src/content/projects/`, click **Add file → Create
  new file**, name it `my-project.md`, and copy the format from `_template.md`.
  ⚠️ Only publish a client name once someone has confirmed the contract or NDA
  allows it. If it does not, leave the project out — do not invent a
  descriptor like "a Fortune 500 retailer" instead.
- **Update recruitment dates** → edit `src/content/data/timeline.yaml`. Each
  stage has a `date:` (what people read, e.g. "Wed Aug 26") and an `on:` (the
  same day as `2026-08-26`). A date left empty shows as **TBA**, so you can
  fill them in one at a time. **You never mark which stage is current** — the
  site works out "Happening now" and "Next up" from `on:` against today's
  real date in Berkeley, and re-checks it in the browser so an old build
  still highlights the right stage.
- **Add a client** → see **Clients** below. Flag flip, optional file drop.
- **Add a photo** → upload the image into the **`public/`** folder (e.g.
  `public/team/sarah.jpg`), then set `photo: /team/sarah.jpg` on that person.
  No photo? It shows their initials automatically.

---

## ⚙️ Settings you change once in a while — `src/config.ts`

`src/config.ts` holds the handful of site-wide links. It has comments
explaining each one. The important ones:

- **`applyUrl`** — where **every "Apply now" button** goes. Point it at the
  mailing-list signup while applications are closed; paste the application form
  link when they open. Change it in this one place and every button updates.
- **`bookingEmbedUrl`** — the Coffee Chats booking embed. Paste your Airtable
  (or Calendly / Google Form) embed link here.
- **`stats`** — the three verified club numbers (projects, industries, members).
  Every place the site states a number reads them from here. In page copy you
  can write `{projectsCompleted}`, `{industriesServed}` or `{activeMembers}`
  inside a sentence and it fills in automatically, so a corrected figure
  updates every sentence at once.
- **`mailingListEndpoint`** — where the "Recruitment reminders" form sends
  emails (e.g. a free Formspree or Buttondown form).
- **`social`** — Instagram / LinkedIn links shown in the footer. There is no
  LinkedIn page yet, so that one is UNSET and simply does not render.
- **`clientDisplay`** — how the "selected clients" row appears: `'logos'`,
  `'names'`, or `'off'`. See **Clients** below.
- **`mailingListEndpoint`** — the club has no mailing list, so this is UNSET
  and the signup section does not exist on the site. No copy anywhere implies
  one. If a list is ever created, paste the endpoint in and the section
  returns by itself.

### The UNSET convention

Any setting whose value is an **empty string (`''`) is UNSET** — we do not
have a confirmed value for it. Nothing invents a stand-in: the component that
uses it collapses to an honest state instead.

| UNSET value                     | What the site does instead                     |
| ------------------------------- | ---------------------------------------------- |
| `site.partnersEmail`            | "Work with us" section on /projects is hidden   |
| `social.linkedin`               | That footer link is not rendered                |
| `applyUrl` (or `applicationsOpen: false`) | Every apply button becomes an "Applications open soon" chip |
| `bookingEmbedUrl`               | Booking calendar becomes a "Booking opens soon" panel |
| `mailingListEndpoint`           | The whole "recruitment reminders" section is absent from /join |

**To turn any of them on: fill in the empty string.** That is the whole
change — no code edits, no template edits.

---

## 🏛 Clients

The client list lives in **`src/content/data/clients.yaml`**, and how it is
shown is one word in `src/config.ts`:

```ts
export const clientDisplay: 'names' | 'logos' | 'off' = 'logos';
```

**Only clients marked `cleared: true` are ever rendered — in any mode.** The
uncleared ones sit in the file as a record and reach no page: no logo, no
name, not even a count. If we cannot name a client, the site says nothing
about them at all.

### Adding a client

1. Add them to `clients.yaml` with `cleared: false`.
2. When someone confirms we may name them publicly, flip it to `cleared: true`.
   They appear immediately, as a styled name tile.
3. Optionally drop their logo SVG into `public/clients/` and set
   `logo: /clients/<file>.svg`. The tile becomes the mark.

That is the whole workflow — a flag flip and a file drop. Setting
`clientDisplay` to `'names'` or `'off'` reverts the whole section instantly.

Record **who** confirmed each name and **when** in `internal/clearance.yaml`.
That file is not tracked in git and never reaches the site; see
`internal/README.md` for the template and why it is kept.

### About the logos

Logos appear in **full brand colour on a white tile**, in both light and dark
mode — white is the surface these marks were designed for. In light mode the
tile takes a hairline edge so it does not vanish into the near-white page.

- The logo file must have a **transparent background** and be a real SVG.
- Sizes are worked out automatically from each SVG's own proportions, so every
  logo carries roughly **the same amount of ink** rather than the same width —
  a long wordmark and a round badge end up looking equally weighted. Nobody
  hand-tunes anything, and a new logo is sized correctly the moment it lands.
- Two bands: a large **featured** row (the `featured: true` flag) and a denser
  band below it, both on the same column rhythm so part-full rows line up.
  Moving a client between bands is one flag in `clients.yaml`.
- At phone width both bands go two across and the logos stay legible.

Files and their sources are listed in `public/clients/SOURCES.md`.

---

## 📋 Adding a section

Several sections are content-driven and appear on their own once there is
something to show. None of them need a developer.

| Section                          | How to add it                                       |
| -------------------------------- | --------------------------------------------------- |
| **Case studies** (/projects)     | Add a file to `src/content/projects/` — copy `_template.md`. ⚠️ Client names need publication clearance first. |
| **Clients**                      | Add an entry to `src/content/data/clients.yaml`, then optionally drop a logo into `public/clients/`. See **Clients** above. |
| **Recruitment dates**            | Fill `date:` and `on:` in `src/content/data/timeline.yaml`. Empty dates show as "TBA", so you can add them one at a time. |
| **Alumni placements** (/team)    | Add entries to `src/content/data/alumni.yaml` (company names only). |
| **Member & client quotes**       | Add a file to `src/content/voices/` — copy `_template.md`. Requires `consent: true`. |
| **Project managers** (/team)     | Add people to `team.yaml` with `tier: pm`.          |
| **Coffee chat availability**     | Set `coffeeChat: true` on people in `team.yaml`.     |
| **URM coffee chats**             | Set `urm: true` on the relevant people in `team.yaml`. |
| **Headshots**                    | Upload to `public/team/` and set `photo:` on that person. Falls back to initials. |
| **Hero and candid photos**       | Upload to `public/photos/`, then set `heroPhoto:` (home, coffee chats) or `candids:` (join) in `src/content/pages/`. |

> **Expected build warnings.** Collections that hold no entries yet make every
> build print a line like *"The collection X does not exist or is empty"*.
> That is Astro noting an empty collection, not an error — the build still
> succeeds, and the warnings stop as content is added.

---

## 🎨 Design tokens (colors)

Every color is defined once in **`src/styles/tokens.css`**. Dark is the
canonical brand look and shows by default; visitors whose device is in light
mode automatically get the light palette. There is no manual theme switch —
the operating system decides. The logo swaps automatically to match.

---

## 💻 For developers

```sh
npm install       # install dependencies (first time only)
npm run dev       # local dev server at http://localhost:4321
npm run build     # production build to ./dist
npm run preview   # preview the production build locally
```

**Tech:** Astro (static output), self-hosted Hammersmith One font, content
collections for all copy, no client framework. Mobile-first (verified at 390px).

**Structure**

```
src/
├── config.ts            # site-wide links & settings (see above)
├── content/             # ALL editable copy (see the table above)
├── content.config.ts    # validation rules for the content
├── styles/tokens.css    # every color, one file (dark + light)
├── styles/global.css    # shared "hairline grid" styles
├── layouts/             # page shells (base + inner-page)
├── components/          # Nav, Footer, cards, FAQ, forms, etc.
└── pages/               # the 5 pages + 404 (route = file name)
```

**Deployment:** Hosted on [Vercel](https://vercel.com). Every push to the main
branch builds and deploys automatically. Config lives in `vercel.json`. SEO
essentials — per-page titles/descriptions, Open Graph tags, JSON-LD, a
generated `sitemap-index.xml`, and `robots.txt` — are all wired up.

---

## 🆘 Something looks broken?

- **A page won't build after an edit** → you probably removed a quote or a
  colon, or broke the indentation in a YAML file. GitHub shows the failed build;
  undo your last commit (or fix the punctuation) and it'll recover.
- **Need a hand?** Open the repo in Claude Code and describe what you want —
  it can make layout changes, fix errors, and explain anything here.
