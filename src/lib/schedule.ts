/*
 * Works out where we are in the recruitment cycle, from the real
 * current date rather than a flag anyone has to remember to move.
 *
 * Dates are compared as plain YYYY-MM-DD strings in Berkeley's timezone,
 * so a build running on a UTC server (Vercel) still agrees with what a
 * student in Berkeley sees on their calendar.
 *
 * The same rules run twice: once at build time, so the correct stage is
 * highlighted in the HTML itself, and once in the browser, so a page
 * built days ago still highlights the right stage today. See the script
 * at the bottom of Timeline.astro.
 */

export type StageStatus = 'done' | 'now' | 'next' | 'upcoming' | 'tba';

/** Today's date in Berkeley, as YYYY-MM-DD. */
export function berkeleyToday(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

/**
 * Label every stage:
 *   done     — its date has passed
 *   now      — it is happening today
 *   next     — the soonest dated stage still ahead of us
 *   upcoming — dated, but after that one
 *   tba      — no date set yet, so never highlighted
 */
export function statuses(dates: string[], today: string): StageStatus[] {
  const ahead = dates.filter((d) => d !== '' && d > today).sort();
  const nextDate = ahead[0];

  return dates.map((d) => {
    if (d === '') return 'tba';
    if (d < today) return 'done';
    if (d === today) return 'now';
    return d === nextDate ? 'next' : 'upcoming';
  });
}

/** Wording for the marker shown against the highlighted stage. */
export const STATUS_NOTE: Partial<Record<StageStatus, string>> = {
  now: 'Happening now',
  next: 'Next up',
};
