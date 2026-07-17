import { bpc157Profile } from "./bpc-157";
import { retatrutideProfile } from "./retatrutide";
import type { PeptideProfile } from "./types";

export const peptideProfiles: PeptideProfile[] = [
  bpc157Profile,
  retatrutideProfile,
];

export const peptideProfileBySlug = new Map(
  peptideProfiles.map((p) => [p.slug, p]),
);

export { bpc157Profile, bpc157FdaBulksStatus } from "./bpc-157";
export { retatrutideProfile } from "./retatrutide";
export type { PeptideProfile } from "./types";
export { flattenProfileText, readingTimeMinutes } from "./types";
