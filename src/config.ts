/*
 * ────────────────────────────────────────────────────────────────
 *  NOVA SITE — CENTRAL CONFIG
 * ────────────────────────────────────────────────────────────────
 *  Non-technical boards: these are the handful of values you are most
 *  likely to change from year to year. Everything else that counts as
 *  "content" (case studies, team, FAQ, timeline, page copy) lives in
 *  src/content/ and is editable through GitHub's web UI.
 *
 *  Edit a value below, commit, and the site redeploys automatically.
 *
 *  ── THE "UNSET" CONVENTION ──────────────────────────────────────
 *  An empty string ('') means UNSET. Nothing on the site invents a
 *  stand-in for an unset value: the component that uses it collapses to
 *  an honest state instead (a hidden link, an "opens soon" panel).
 *
 *  To turn a feature on, fill in the empty string. That is the whole
 *  change: no code edits, no template edits.
 *
 *  The settings that are currently '' are listed at the bottom of this
 *  file, with what each one switches on.
 */

/** True when a config string has a real value (see the UNSET convention). */
export const isSet = (value?: string): value is string =>
  typeof value === 'string' && value.trim() !== '';

/** Organisation identity — used in the footer, SEO tags, and JSON-LD. */
export const site = {
  name: 'Nova Consulting',
  legalName: 'Nova Consulting at UC Berkeley',
  /** Production URL. Must match `site` in astro.config.mjs. */
  url: 'https://berkeleynova.org',
  /** The club's contact address, shown in the footer. */
  email: 'berkeleynovaconsulting@gmail.com',
  /** UNSET — the address the "work with us" pitch on /projects goes to. */
  partnersEmail: '',
  tagline: 'Student-run strategy consulting. UC Berkeley.',
  /** Founded December 2023. */
  foundedYear: 2023,
  city: 'Berkeley',
  region: 'CA',
  country: 'US',
};

/*
 * CLUB NUMBERS
 * ----------------------------------------------------------------
 * Every number the site states about Nova comes from here, so there is
 * exactly one place to correct if a figure changes. Do not add a number
 * here that the board cannot defend if an applicant asks.
 */
export const stats = {
  projectsCompleted: 20,
  industriesServed: 9,
  activeMembers: 35,
};

/*
 * SOCIAL LINKS (shown in the footer)
 * ----------------------------------------------------------------
 * An unset link is not rendered at all rather than guessed at.
 */
export const social = {
  instagram: 'https://instagram.com/berkeleynova',
  /** UNSET. Fill in when a LinkedIn page exists. */
  linkedin: '',
};

/*
 * APPLY / RECRUITMENT
 * ----------------------------------------------------------------
 * Every "Apply" button on the site points at this ONE URL.
 *
 * While `applyUrl` is UNSET *or* `applicationsOpen` is false, every
 * apply button renders as a non-clickable "Applications open soon"
 * chip. Paste the application link into `applyUrl` and flip
 * `applicationsOpen` to true and every button goes live at once.
 */
export const applicationsOpen = false;
/** UNSET — the application form link. */
export const applyUrl = '';

/** True only when there is a real, open application to send people to. */
export const applyLive = applicationsOpen && isSet(applyUrl);

/*
 * COFFEE CHATS — booking embed
 * ----------------------------------------------------------------
 * The Coffee Chats page lazy-loads this URL in an <iframe>. Any booking
 * tool works (Airtable, Calendly, Google Forms) — paste its *embed* URL.
 * While UNSET the page shows a "booking opens soon" panel instead of an
 * empty frame.
 */
export const bookingEmbedUrl = '';

/*
 * MAILING LIST — signup form endpoint
 * ----------------------------------------------------------------
 * While this is UNSET the entire "recruitment reminders" section is
 * absent from the Join page, and no copy anywhere implies a signup
 * exists.
 *
 * To switch it on, paste an endpoint here (Formspree, Buttondown,
 * Mailchimp) and the section returns on its own.
 */
export const mailingListEndpoint = '';

/*
 * CLIENTS — how the "selected clients" row is shown
 * ----------------------------------------------------------------
 * The client list lives in src/content/data/clients.yaml, and only
 * entries marked `cleared: true` are rendered, in any mode. This
 * setting picks how those appear:
 *
 *   'logos'  logo grid. A cleared client with no logo file falls back
 *            to a styled name tile, so the row never breaks.
 *   'names'  names only — needs no logo files at all.
 *   'off'    the section does not render anywhere.
 *
 * Flipping this one word is the whole job: no template edits, and no
 * data changes. Adding a client later is a file drop plus one flag.
 */
export const clientDisplay: 'names' | 'logos' | 'off' = 'logos';

/** Default social-share image (Open Graph). Lives in /public. */
export const ogImage = '/og-default.png';

/*
 * ────────────────────────────────────────────────────────────────
 *  SETTINGS CURRENTLY UNSET, AND WHAT EACH ONE SWITCHES ON
 * ────────────────────────────────────────────────────────────────
 *   site.partnersEmail ...... the "work with us" section on /projects
 *   social.linkedin ......... a LinkedIn link in the footer
 *   applyUrl + applicationsOpen ... every apply button on the site
 *   bookingEmbedUrl ......... the booking calendar on /coffee-chats
 *   mailingListEndpoint ..... the recruitment-reminders signup on /join
 *
 *  Sections that appear as soon as content is added, no config needed:
 *   src/content/projects/ ......... case studies on /projects
 *   src/content/voices/ ........... member and client quotes on the home page
 *   src/content/data/alumni.yaml .. alumni placements on /team
 *   src/content/data/timeline.yaml  dates in place of "TBA"
 *   src/content/data/team.yaml .... photos and LinkedIn links per person
 *   public/clients/ ............... a logo for any client showing as a name
 * ────────────────────────────────────────────────────────────────
 */
