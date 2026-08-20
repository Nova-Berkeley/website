import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

/*
 * Content collections — the editable heart of the site.
 * ----------------------------------------------------------------
 * Boards edit the Markdown / YAML files under src/content/. These
 * schemas just validate the shape so a typo surfaces as a build error
 * instead of a broken page.
 *
 * EMPTY IS A VALID STATE. Several collections ship empty on purpose,
 * because we do not yet have verified content for them. The pages that
 * read them collapse to an honest "coming soon" or hide the section
 * entirely — they never show a fabricated stand-in. Dropping a file in
 * brings the section back automatically; nothing else has to change.
 *
 * Files whose name starts with an underscore are ignored, so each
 * folder can carry a `_template.md` showing exactly what to fill in.
 *
 * Photos: drop an image into /public (e.g. public/team/sarah.jpg) and
 * reference it by path ("/team/sarah.jpg"). Leave the field out and the
 * slot falls back to a neutral placeholder — never to someone else's
 * photo or a stock image.
 */

/* Per-page copy + SEO. One Markdown file per page under content/pages.
   The `copy` block is an open key/value bag of the headings, intros and
   CTA labels each page uses — edit the values freely. */
const pages = defineCollection({
  loader: glob({ pattern: ['*.md', '!_*.md'], base: './src/content/pages' }),
  schema: z.object({
    /** The full <title> for the page (used verbatim). Keep each unique. */
    title: z.string(),
    /** Meta description — keep it under ~160 characters. */
    description: z.string(),
    /** Optional per-page social-share image (defaults to the site OG image). */
    ogImage: z.string().optional(),
    /** Free-form structured copy referenced by the page template. */
    copy: z.record(z.string(), z.any()).default({}),
  }),
});

/* Team roster — a single YAML list. Exec board and project managers
   only; general members are deliberately not published. */
const team = defineCollection({
  loader: file('./src/content/data/team.yaml'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    /** Board title, e.g. "President". */
    role: z.string().optional(),
    tier: z.enum(['leadership', 'pm']),
    /** e.g. "Political Science · Junior" */
    detail: z.string(),
    order: z.number().default(0),
    linkedin: z.string().url().optional(),
    /** Optional headshot path under /public; falls back to initials. */
    photo: z.string().optional(),
    /** Show this person on the Coffee Chats "who's available" grid.
        Leave false until their availability is actually confirmed. */
    coffeeChat: z.boolean().default(false),
    /** Also list them under the URM coffee-chats section. */
    urm: z.boolean().default(false),
    /** Shorter detail used on the coffee page (defaults to `detail`). */
    coffeeDetail: z.string().optional(),
  }),
});

/* Case studies / engagements. One Markdown file per project so each can
   grow a full write-up in its body later. While the folder holds no
   entries the case-study sections on /projects are not rendered at all.
   See _template.md in that folder for the shape of one. */
const projects = defineCollection({
  loader: glob({ pattern: ['*.md', '!_*.md'], base: './src/content/projects' }),
  schema: z.object({
    client: z.string(),
    semester: z.string(),
    /** One-line result, e.g. "Pricing overhaul: 9% → 21% trial-to-paid." */
    outcome: z.string(),
    /** The single big case study at the top of the Projects page. */
    featured: z.boolean().default(false),
    /** Featured only — the question the engagement answered. */
    problem: z.string().optional(),
    /** Headline metric, e.g. "+18%". */
    metric: z.string().optional(),
    metricLabel: z.string().optional(),
    /** The larger lead card in the "more engagements" grid. */
    lead: z.boolean().default(false),
    anonymized: z.boolean().default(false),
    /** Optional image path under /public. */
    image: z.string().optional(),
    order: z.number().default(0),
  }),
});

/* FAQ entries. The answer is the Markdown body. `category` decides which
   page an entry appears on. */
const faq = defineCollection({
  loader: glob({ pattern: ['*.md', '!_*.md'], base: './src/content/faq' }),
  schema: z.object({
    question: z.string(),
    category: z.enum(['join', 'coffee-chats']),
    order: z.number().default(0),
  }),
});

/* Recruitment timeline — a single ordered YAML list.
   A stage with no `date` renders as "TBA". The "happening now" /
   "next up" highlight is computed from `on` against the current date in
   Berkeley, so it is not a flag anyone has to remember to move. */
const timeline = defineCollection({
  loader: file('./src/content/data/timeline.yaml'),
  schema: z.object({
    id: z.string(),
    /** Two-digit label, e.g. "01". */
    n: z.string(),
    name: z.string(),
    /** Human date as displayed, e.g. "Wed Aug 26". Empty shows "TBA". */
    date: z.string().default(''),
    /** Machine date, YYYY-MM-DD, used to work out what is happening now.
        Leave empty when the date is not settled. */
    on: z.string().regex(/^(\d{4}-\d{2}-\d{2})?$/).default(''),
    /** Optional time of day, e.g. "8:00–10:00 PM". */
    time: z.string().default(''),
    /** Optional place, e.g. "SOCS 136". */
    location: z.string().default(''),
    desc: z.string(),
    /** Optional. Set it to a short phrase and the stage shows a small
        marker carrying that text, for a detail not yet settled. */
    pending: z.string().default(''),
  }),
});

/* Alumni placements. Company names only, never individual names without
   their consent. The section on /team is hidden while the list is empty.
   Add entries to src/content/data/alumni.yaml. */
const alumni = defineCollection({
  loader: file('./src/content/data/alumni.yaml'),
  schema: z.object({
    id: z.string(),
    /** Company name as it should appear, e.g. "BCG". */
    company: z.string(),
    order: z.number().default(0),
  }),
});

/* Member and client quotes. The quote itself is the Markdown body. The
   section is hidden while the folder is empty, and a quote is only
   published once its author has consented. See _template.md there. */
const voices = defineCollection({
  loader: glob({ pattern: ['*.md', '!_*.md'], base: './src/content/voices' }),
  schema: z.object({
    /** Who said it. */
    name: z.string(),
    /** e.g. "Economics · Junior", or a role + company for a client. */
    detail: z.string(),
    /** member = current Nova member · client = someone we worked for. */
    kind: z.enum(['member', 'client']).default('member'),
    /** Only publish with explicit consent on file. */
    consent: z.literal(true),
    order: z.number().default(0),
  }),
});

/* Clients. Only entries with `cleared: true` are rendered, in any mode.
   Whether the cleared ones appear as logos, as names, or not at all is
   `clientDisplay` in src/config.ts. */
const clients = defineCollection({
  loader: file('./src/content/data/clients.yaml'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    /** Confirmed publishable. Anything else renders nowhere. */
    cleared: z.boolean().default(false),
    /** Large top row. Everything else falls into the denser row below. */
    featured: z.boolean().default(false),
    /** Optional logo path under /public. Falls back to a name tile. */
    logo: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = {
  pages,
  team,
  projects,
  faq,
  timeline,
  alumni,
  voices,
  clients,
};
