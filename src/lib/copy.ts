import { site, stats } from '../config';

/*
 * Placeholders you can use inside any string in src/content/pages/*.md.
 * They are filled in at build time, so a fact lives in exactly one place
 * and every sentence quoting it stays in step.
 *
 *   {projectsCompleted}  {industriesServed}  {activeMembers}
 *       The verified club numbers, from `stats` in src/config.ts.
 *
 *   {foundedYear}
 *       From `site.foundedYear` in src/config.ts.
 *
 *   {clients}          every cleared client, written out as a list
 *   {clientsFeatured}  just the ones flagged `featured` in clients.yaml
 *
 *       Only clients marked `cleared: true` are ever included in
 *       either. Use {clientsFeatured} in meta descriptions — the full
 *       list is far too long for one.
 *
 *       ⚠ If there is nothing to name — no cleared clients, or
 *       `clientDisplay` is 'off' — the WHOLE SENTENCE containing the
 *       placeholder is removed, rather than leaving "…for clients
 *       including ." behind. So write the client name-drop as its own
 *       sentence and it simply vanishes when there is nothing to say.
 *
 * An unknown placeholder is left visible rather than blanked, so a typo
 * shows up as itself instead of silently deleting a number.
 */
const NUMBERS: Record<string, number> = {
  projectsCompleted: stats.projectsCompleted,
  industriesServed: stats.industriesServed,
  activeMembers: stats.activeMembers,
  foundedYear: site.foundedYear,
};

/** "A", "A and B", "A, B, and C" */
export function listNames(names: string[]): string {
  if (names.length === 0) return '';
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`;
}

interface Options {
  /** Cleared client names, already filtered. Empty means "name none". */
  clients?: string[];
  /** The featured subset, for meta descriptions. */
  clientsFeatured?: string[];
}

export function fillCopy(text: string, opts: Options = {}): string {
  const lists: Record<string, string> = {
    clients: listNames(opts.clients ?? []),
    clientsFeatured: listNames(
      opts.clientsFeatured ?? opts.clients ?? []
    ),
  };

  let out = text;

  for (const [key, value] of Object.entries(lists)) {
    const token = `{${key}}`;
    if (!out.includes(token)) continue;
    out =
      value === ''
        ? // Drop the sentence rather than leave a hole in it.
          out
            .split(/(?<=\.)\s+/)
            .filter((sentence) => !sentence.includes(token))
            .join(' ')
        : out.replaceAll(token, value);
  }

  return out.replace(/\{(\w+)\}/g, (whole, key: string) =>
    key in NUMBERS ? String(NUMBERS[key]) : whole
  );
}

/** Numbers only — for copy that never name-drops clients. */
export function fillStats(text: string): string {
  return fillCopy(text);
}
