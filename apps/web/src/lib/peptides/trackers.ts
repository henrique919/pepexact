export interface TrackerColumn {
  key: string;
  label: string;
}

export interface BpcTrackerRow {
  date: string;
  jurisdiction: string;
  event: string;
  source: string;
  sourceUrl: string;
  status: string;
}

export interface RetaTrackerRow {
  study: string;
  population: string;
  phase: string;
  statusAtReview: string;
  evidenceAvailability: string;
  source: string;
  sourceUrl: string;
}

export const REVIEW_DATE = "2026-07-17";

/** Facts already on the BPC-157 evidence page — do not invent outcomes. */
export const bpcEvidenceTracker: BpcTrackerRow[] = [
  {
    date: "Early 1990s",
    jurisdiction: "Research literature",
    event:
      "Researchers describe a gastric-juice-related protective compound and characterise BPC-157 as a 15-amino-acid fragment.",
    source: "Early BPC research indexed by PubMed",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/8298609/",
    status: "Historical",
  },
  {
    date: "2022",
    jurisdiction: "Sport / WADA",
    event:
      "WADA explicitly identifies BPC-157 under the S0 non-approved-substances category.",
    source: "World Anti-Doping Agency: 2026 Prohibited List",
    sourceUrl:
      "https://www.wada-ama.org/en/resources/world-anti-doping-program/prohibited-list",
    status: "Prohibited at all times",
  },
  {
    date: "2023",
    jurisdiction: "United States / FDA",
    event:
      "FDA publicly lists concerns involving limited safety information, potential immunogenicity, peptide impurities and product characterisation for compounded BPC-157.",
    source: "FDA: bulk drug substances that may present significant safety risks",
    sourceUrl:
      "https://www.fda.gov/drugs/human-drug-compounding/certain-bulk-drug-substances-use-compounding-may-present-significant-safety-risks",
    status: "Safety concerns listed",
  },
  {
    date: "11 May 2026",
    jurisdiction: "United States / FDA",
    event:
      "FDA evaluation of BPC-157-related bulk drug substances finds insufficient evidence for nominated use and notes characterisation and safety gaps.",
    source: "FDA evaluation of BPC-157-related bulk drug substances, 11 May 2026",
    sourceUrl: "https://www.fda.gov/media/193343/download",
    status: "Not FDA approved",
  },
  {
    date: "19 June 2026",
    jurisdiction: "Australia / TGA",
    event:
      "TGA and Australia's Chief Medical Officer include BPC-157 among unapproved peptide products of public-health concern.",
    source:
      "TGA and Australian Chief Medical Officer: unapproved peptide products, 19 June 2026",
    sourceUrl:
      "https://www.tga.gov.au/news/media-releases/concerns-regarding-public-health-risks-associated-unapproved-peptide-products",
    status: "Unapproved / public-health warning",
  },
  {
    date: "23–24 July 2026",
    jurisdiction: "United States / FDA PCAC",
    event:
      "Pharmacy Compounding Advisory Committee meeting scheduled to consider whether BPC-157 free base and acetate should be included on the 503A Bulks List. Briefing materials proposed not including them.",
    source: "FDA Pharmacy Compounding Advisory Committee briefing, July 2026",
    sourceUrl: "https://www.fda.gov/media/193342/download",
    status: "Scheduled — requires update after meeting",
  },
];

export const retatrutideClinicalTracker: RetaTrackerRow[] = [
  {
    study: "Phase 2 obesity trial (NEJM 2023)",
    population:
      "Adults with obesity, or overweight plus at least one weight-related condition, without diabetes",
    phase: "Phase 2",
    statusAtReview: "Completed",
    evidenceAvailability: "Peer reviewed",
    source: "Phase 2 obesity trial, New England Journal of Medicine",
    sourceUrl: "https://www.nejm.org/doi/full/10.1056/NEJMoa2301972",
  },
  {
    study: "TRANSCEND-T2D-1",
    population:
      "Adults with type 2 diabetes inadequately controlled with diet and exercise alone (n=537)",
    phase: "Phase 3",
    statusAtReview: "Completed",
    evidenceAvailability: "Peer reviewed",
    source: "TRANSCEND-T2D-1 Phase 3 trial, The Lancet, indexed by PubMed",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/42250575/",
  },
  {
    study: "TRIUMPH-1",
    population: "Adults in Phase 3 obesity programme (n=2,339 reported by sponsor)",
    phase: "Phase 3",
    statusAtReview: "Topline announced 21 May 2026",
    evidenceAvailability: "Sponsor topline",
    source: "Lilly: TRIUMPH-1 Phase 3 topline results, 21 May 2026",
    sourceUrl:
      "https://investor.lilly.com/news-releases/news-release-details/lillys-triple-agonist-retatrutide-delivered-powerful-weight-loss",
  },
  {
    study: "TRIUMPH-1 registry",
    population: "Obesity / overweight research population (registry record)",
    phase: "Phase 3",
    statusAtReview: "Registry record",
    evidenceAvailability: "Registry record",
    source: "ClinicalTrials.gov: TRIUMPH-1",
    sourceUrl: "https://clinicaltrials.gov/study/NCT05929066",
  },
  {
    study: "TRIUMPH-4",
    population: "Obesity or overweight with knee osteoarthritis",
    phase: "Phase 3",
    statusAtReview: "Completed (2025)",
    evidenceAvailability: "Registry record",
    source: "ClinicalTrials.gov: TRIUMPH-4",
    sourceUrl: "https://clinicaltrials.gov/study/NCT05931367",
  },
  {
    study: "TRIUMPH-8",
    population: "Defined Phase 3 research population (registry)",
    phase: "Phase 3",
    statusAtReview: "Registry record",
    evidenceAvailability: "Registry record",
    source: "ClinicalTrials.gov: TRIUMPH-8",
    sourceUrl: "https://clinicaltrials.gov/study/NCT07232719",
  },
];

export const evidenceUpdateLog = [
  {
    date: "17 July 2026",
    text: "Initial evidence review published using regulator, anti-doping, trial-registry and peer-reviewed sources.",
  },
] as const;
