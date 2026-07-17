import type { PeptideProfile } from "./types";

/** Easy-to-update FDA PCAC status for BPC-157.
 * TODO(editorial): Recheck official FDA outcome after 23–24 July 2026 meeting.
 * Do not describe the May 2026 proposal as a final decision until verified.
 */
export const bpc157FdaBulksStatus = {
  evidenceAsOf: "2026-07-17",
  meetingWindow: "23–24 July 2026",
  proposal:
    "FDA briefing materials proposed that BPC-157 free base and BPC-157 acetate not be included on the 503A Bulks List.",
  isFinalDecision: false,
} as const;

export const bpc157Profile: PeptideProfile = {
  slug: "bpc-157",
  path: "/peptides/bpc-157",
  title: "BPC-157: Evidence, Uses, Safety & Current Status | PepExact",
  metaDescription:
    "Learn what BPC-157 is, its research history, proposed uses, limited human evidence, safety uncertainties and current FDA, TGA and sport status.",
  ogTitle: "BPC-157: What the Research Actually Shows",
  ogDescription:
    "An evidence-led review of BPC-157 research, potential applications, safety uncertainties and regulatory status.",
  h1: "BPC-157: What the Research Actually Shows",
  breadcrumbLabel: "BPC-157",
  statusLabel: "Investigational peptide — not an approved medicine",
  datePublished: "2026-07-17",
  dateModified: "2026-07-17",
  evidenceReviewedDisplay: "17 July 2026",
  lead: [
    "BPC-157 is an experimental synthetic peptide that has attracted attention for possible effects on tissue repair, the gastrointestinal tract and inflammation. Most of those claims come from laboratory and animal research. Human evidence remains limited, and BPC-157 has no established clinical use, approved treatment indication or regulator-approved dose.",
    "This page separates what researchers have observed from what has actually been demonstrated in people.",
  ],
  glance: [
    {
      label: "What it is",
      value:
        "A synthetic chain of 15 amino acids, commonly described as a gastric pentadecapeptide.",
    },
    {
      label: "Why it is discussed",
      value:
        "Preclinical studies have examined gastrointestinal protection, wound healing, blood-vessel signalling and musculoskeletal repair.",
    },
    {
      label: "Strongest evidence",
      value:
        "Predominantly laboratory and animal research, with only small and limited human studies.",
    },
    {
      label: "FDA status",
      value:
        "Not FDA approved. FDA reviewers have proposed that BPC-157 free base and acetate should not be included on the US 503A Bulks List; an advisory-committee meeting was scheduled for 23–24 July 2026.",
    },
    {
      label: "Australian status",
      value:
        "Listed by the TGA among unapproved peptide products that have not been evaluated for safety, quality or effectiveness.",
    },
    {
      label: "Sport status",
      value:
        "Prohibited at all times under the World Anti-Doping Agency's S0 category.",
    },
    {
      label: "Evidence reviewed",
      value: "17 July 2026.",
    },
  ],
  importantNote:
    "This page summarises published research and regulatory information. It is not medical advice, does not recommend using BPC-157, and does not provide a dose or treatment protocol.",
  sections: [
    {
      id: "what-is",
      heading: "What is BPC-157?",
      paragraphs: [
        "BPC-157 is a synthetic pentadecapeptide—a short chain made from 15 amino acids. Research papers from the early 1990s described the sequence while investigating a substance associated with protective activity in gastric juice. The name is usually expanded as \"Body Protection Compound 157.\"",
        "That name is not evidence that BPC-157 protects the entire human body. It is also misleading to describe injectable BPC-157 as a naturally occurring human medicine. The products discussed online are manufactured peptides based on a researched sequence; they are not an approved extract taken from the human stomach.",
        "BPC-157 has been examined in experimental models involving the gastrointestinal tract, tendons, ligaments, muscle, bone, wounds, blood vessels and inflammatory signalling. A broad preclinical research footprint does not establish that the same effects occur in people.",
      ],
    },
    {
      id: "history",
      heading: "History and development",
      subsections: [
        {
          heading: "Early gastric-protection research",
          paragraphs: [
            "An early paper indexed in 1993 described a 15-amino-acid fragment and investigated it within a broader hypothesis about gastric protection and the body's response to injury. Subsequent work—much of it conducted in animals—explored whether the peptide influenced tissue protection beyond the stomach.",
          ],
        },
        {
          heading: "Expansion into repair research",
          paragraphs: [
            "Later studies examined tendon, ligament, muscle, bone, wound and vascular models. Reviews describe proposed interactions with nitric-oxide signalling, blood-vessel formation, fibroblast activity and other repair pathways. These findings helped create BPC-157's reputation as a \"healing peptide,\" but the reputation has moved much faster than human clinical evidence.",
          ],
        },
        {
          heading: "Online popularity and regulatory scrutiny",
          paragraphs: [
            "BPC-157 later became popular in bodybuilding, injury-recovery and online peptide communities. That use did not follow regulatory approval. Regulators have instead raised concerns about limited safety information, peptide-related impurities, immune reactions, product characterisation and the uncertain composition or sterility of unapproved products.",
            "In 2022, BPC-157 was explicitly added as an example under WADA's S0 category for non-approved substances. It remains prohibited under the 2026 Prohibited List.",
          ],
        },
      ],
    },
    {
      id: "mechanism",
      heading: "How researchers think BPC-157 might work",
      paragraphs: [
        "There is no clinically confirmed mechanism that explains a proven therapeutic effect in humans.",
        "Experimental studies have proposed several pathways:",
      ],
      bullets: [
        {
          text: "changes in nitric-oxide signalling and blood-vessel function;",
        },
        {
          text: "effects on angiogenesis, the process through which new blood vessels form;",
        },
        {
          text: "fibroblast activity and collagen organisation in healing tissue;",
        },
        { text: "inflammatory signalling;" },
        {
          text: "protection of the gastrointestinal lining in injury models.",
        },
      ],
      subsections: [
        {
          heading: "",
          paragraphs: [
            "These mechanisms come mainly from cell and animal experiments. A mechanism that appears plausible in a model does not show that a product is effective, safe or appropriately dosed in people.",
          ],
        },
      ],
    },
    {
      id: "studied-for",
      heading: "What is BPC-157 being studied for?",
      subsections: [
        {
          heading: "Gastrointestinal injury",
          paragraphs: [
            "BPC-157's history is closely connected with gastric and intestinal research. Animal studies have examined ulcers, intestinal injury, inflammation and tissue healing.",
            "Human evidence is much thinner. In its May 2026 evaluation, the FDA identified one small meeting abstract describing a short randomized study in people with ulcerative colitis. Important information about the study design, outcome definition, statistical methods and follow-up was missing. The FDA concluded that the available data were inadequate to establish effectiveness or safety for ulcerative colitis.",
          ],
        },
        {
          heading: "Tendon, ligament and muscle repair",
          paragraphs: [
            "Animal studies have reported changes in tendon, ligament and muscle healing. These studies are the main source of claims that BPC-157 can accelerate recovery from sports injuries.",
            "There is not yet reliable clinical-trial evidence showing that BPC-157 heals tendon, ligament or muscle injuries in people. Reviews of the musculoskeletal literature repeatedly call for properly designed human trials.",
          ],
        },
        {
          heading: "Bone and wound healing",
          paragraphs: [
            "Preclinical studies have also investigated fractures, wounds, blood supply and tissue repair. They may help researchers decide whether further study is justified, but they cannot establish a treatment benefit for patients.",
          ],
        },
        {
          heading: "Pain and other exploratory uses",
          paragraphs: [
            "FDA reviewers identified very small exploratory human reports involving knee pain, interstitial cystitis and intravenous administration. These studies involved small numbers, short observation periods or limited safety reporting. They do not provide enough evidence to define an accepted clinical use.",
          ],
        },
      ],
    },
    {
      id: "potential",
      heading: "What could BPC-157 potentially help with?",
      paragraphs: [
        "The honest answer is that no therapeutic benefit has been established in people.",
        "BPC-157 may be worth further research because preclinical findings repeatedly point toward tissue-protection and repair pathways. That creates hypotheses—not medical conclusions. At present, claims about healing injuries, repairing the gut, reducing inflammation or speeding recovery are stronger than the human evidence supporting them.",
      ],
    },
    {
      id: "human-evidence",
      heading: "How strong is the human evidence?",
      paragraphs: [
        "The human evidence is not zero, but it is insufficient.",
        "The FDA's 2026 review found five small clinical studies or reports involving BPC-157. Reported exposure included healthy volunteers and small groups with ulcerative colitis, knee pain or interstitial cystitis. The studies were short, involved small numbers and often provided limited information about safety monitoring.",
        "No serious adverse events appeared to have been reported in those small studies, but that should not be read as proof of safety. Small studies are poorly suited to detecting uncommon harms, long-term effects or problems linked to different products and administration routes.",
        "The FDA also noted that reporting systems have limitations and that adverse events linked to compounded products may not always be reported. Absence of a strong signal is not the same as a well-characterised safety profile.",
      ],
    },
    {
      id: "regulatory",
      heading: "Current approval and regulatory status",
      subsections: [
        {
          heading: "United States",
          paragraphs: [
            "BPC-157 is not an FDA-approved drug. In a May 2026 evaluation, FDA reviewers reported that no approved product containing BPC-157-related bulk drug substances existed in any country identified by their review.",
            "The FDA evaluation found insufficient evidence to establish effectiveness for the nominated use and highlighted gaps in physicochemical characterisation, immunogenicity and safety information. FDA briefing materials for a Pharmacy Compounding Advisory Committee meeting scheduled for 23–24 July 2026 proposed that BPC-157 free base and BPC-157 acetate not be included on the 503A Bulks List.",
            "That was a proposal awaiting committee consideration as of this page's review date, not a final post-meeting decision. This status should be checked again after 24 July 2026.",
          ],
        },
        {
          heading: "Australia",
          paragraphs: [
            "On 19 June 2026, the Therapeutic Goods Administration and Australia's Chief Medical Officer named BPC-157 among unapproved peptide products of public-health concern. Products not included in the Australian Register of Therapeutic Goods have not been evaluated by the TGA for safety, quality or effectiveness.",
            "The joint warning referred to reports of serious adverse effects associated with unapproved peptides as a category. It did not establish that every listed event was caused specifically by BPC-157.",
          ],
        },
        {
          heading: "Competitive sport",
          paragraphs: [
            "BPC-157 is prohibited at all times under WADA's S0 category for non-approved substances. Athletes subject to anti-doping rules should not assume that a clinic, prescription or \"research\" label makes a substance permitted.",
          ],
        },
      ],
    },
    {
      id: "risks",
      heading: "Known risks and important uncertainties",
      paragraphs: [
        "BPC-157 does not have an approved product label defining contraindications, interactions, manufacturing specifications or a validated safety profile.",
        "Important concerns include:",
      ],
      bullets: [
        {
          label: "Product identity",
          text: "an unapproved vial may not contain the substance or amount shown on its label.",
        },
        {
          label: "Sterility and contamination",
          text: "injectable products require controlled sterile manufacturing; an online seller's claim is not independent verification.",
        },
        {
          label: "Peptide impurities",
          text: "manufacturing and degradation can produce related substances that require careful characterisation.",
        },
        {
          label: "Immunogenicity",
          text: "peptide products may trigger immune responses, and route-specific risk is not well established.",
        },
        {
          label: "Short human follow-up",
          text: "small exploratory reports cannot reveal reliable long-term safety.",
        },
        {
          label: "Unknown interactions",
          text: "interactions with medicines, health conditions and other peptides have not been adequately characterised.",
        },
        {
          label: "No accepted dose or protocol",
          text: "online regimens are not regulator-approved instructions.",
        },
      ],
    },
  ],
  editorialNotes:
    "TODO(editorial): Recheck FDA Pharmacy Compounding Advisory Committee outcome after the 23–24 July 2026 meeting. As of 17 July 2026 the FDA briefing materials proposed that BPC-157 free base and acetate not be included on the 503A Bulks List — that was a proposal awaiting committee consideration, not a final post-meeting decision.",
  evidenceTable: {
    headers: [
      "Research area",
      "Evidence available",
      "What has been observed",
      "What remains unknown",
    ],
    rows: [
      {
        area: "Gastrointestinal protection",
        available:
          "Extensive animal research; one limited ulcerative-colitis meeting abstract",
        observed:
          "Protective and healing effects in experimental gastrointestinal injury models",
        unknown:
          "Whether it is effective or safe for any human gastrointestinal condition",
      },
      {
        area: "Tendons and ligaments",
        available: "Mainly animal studies and reviews",
        observed:
          "Changes in healing markers and tissue organisation in experimental injuries",
        unknown:
          "Whether it improves pain, function or healing time in people",
      },
      {
        area: "Muscle and bone",
        available: "Mainly animal studies",
        observed:
          "Experimental findings involving muscle injury and bone repair",
        unknown:
          "Human effectiveness, appropriate formulation, long-term safety and meaningful clinical outcomes",
      },
      {
        area: "Wounds and blood-vessel signalling",
        available: "Laboratory and animal research",
        observed:
          "Proposed effects involving angiogenesis, nitric oxide and fibroblast activity",
        unknown:
          "Whether these mechanisms translate into a net human benefit or introduce other risks",
      },
      {
        area: "Pain and urological symptoms",
        available: "Very small exploratory human reports",
        observed: "Preliminary observations in limited groups",
        unknown:
          "Reliability, placebo effect, comparative effectiveness and safety",
      },
      {
        area: "General safety",
        available: "Small, short human exposures plus animal toxicology",
        observed:
          "No clear safety profile can be established from the available data",
        unknown:
          "Immune reactions, impurities, interactions, long-term effects and route-specific risks",
      },
    ],
  },
  timeline: [
    {
      when: "Early 1990s",
      text: "Researchers describe a gastric-juice-related protective compound and characterise a 15-amino-acid fragment called BPC-157.",
    },
    {
      when: "1990s–2010s",
      text: "Animal research expands into gastrointestinal, wound, vascular and musculoskeletal models.",
    },
    {
      when: "2010s–2020s",
      text: "BPC-157 gains popularity in online injury-recovery and peptide communities despite the lack of regulatory approval.",
    },
    {
      when: "2022",
      text: "WADA explicitly identifies BPC-157 under the S0 non-approved-substances category.",
    },
    {
      when: "2023",
      text: "FDA publicly lists concerns involving limited safety information, potential immunogenicity, peptide impurities and product characterisation for compounded BPC-157.",
    },
    {
      when: "19 June 2026",
      text: "The TGA and Australia's Chief Medical Officer include BPC-157 in a warning concerning unapproved peptide products.",
    },
    {
      when: "17 July 2026",
      text: "BPC-157 remains unapproved; FDA advisory consideration is scheduled for 23–24 July 2026.",
    },
  ],
  faqs: [
    {
      q: "Is BPC-157 FDA approved?",
      a: "No. BPC-157 is not an FDA-approved drug. It does not have an FDA-approved indication, product label or dosing instructions.",
    },
    {
      q: "What is BPC-157 being researched for?",
      a: "Research has examined gastrointestinal protection, wounds, tendons, ligaments, muscle, bone, inflammation and blood-vessel signalling. Most supportive findings come from animal or laboratory studies.",
    },
    {
      q: "Is there good human evidence for BPC-157?",
      a: "No high-quality body of human evidence has established that BPC-157 safely and effectively treats a medical condition. The available human reports are small, short or incompletely reported.",
    },
    {
      q: "Has BPC-157 been proven to heal tendons or ligaments in people?",
      a: "No. Animal studies have generated interest, but there is not reliable clinical-trial evidence proving faster tendon or ligament healing in people.",
    },
    {
      q: "Is BPC-157 naturally produced by the human body?",
      a: "BPC-157 is a manufactured 15-amino-acid peptide based on a sequence studied in connection with gastric juice. Describing commercial or injectable BPC-157 as a naturally produced human medicine is inaccurate.",
    },
    {
      q: "Is BPC-157 a steroid?",
      a: "No. It is a peptide, not an anabolic steroid. That does not make it approved, proven or risk-free.",
    },
    {
      q: "Is BPC-157 banned in sport?",
      a: "Yes. WADA lists BPC-157 under S0, meaning it is prohibited at all times for athletes covered by the World Anti-Doping Code.",
    },
    {
      q: "What are the main safety unknowns?",
      a: "Long-term effects, immune reactions, medicine interactions, route-specific risks, product impurities and the real composition or sterility of unapproved products remain uncertain.",
    },
  ],
  sources: [
    {
      label: "FDA evaluation of BPC-157-related bulk drug substances, 11 May 2026",
      url: "https://www.fda.gov/media/193343/download",
    },
    {
      label: "FDA Pharmacy Compounding Advisory Committee briefing, July 2026",
      url: "https://www.fda.gov/media/193342/download",
    },
    {
      label:
        "FDA: bulk drug substances that may present significant safety risks",
      url: "https://www.fda.gov/drugs/human-drug-compounding/certain-bulk-drug-substances-use-compounding-may-present-significant-safety-risks",
    },
    {
      label:
        "TGA and Australian Chief Medical Officer: unapproved peptide products, 19 June 2026",
      url: "https://www.tga.gov.au/news/media-releases/concerns-regarding-public-health-risks-associated-unapproved-peptide-products",
    },
    {
      label: "World Anti-Doping Agency: 2026 Prohibited List",
      url: "https://www.wada-ama.org/en/resources/world-anti-doping-program/prohibited-list",
    },
    {
      label: "Early BPC research indexed by PubMed",
      url: "https://pubmed.ncbi.nlm.nih.gov/8298609/",
    },
    {
      label: "Review of BPC-157 and musculoskeletal soft-tissue healing",
      url: "https://pubmed.ncbi.nlm.nih.gov/30915550/",
    },
    {
      label: "Recent review calling for well-designed human trials",
      url: "https://pubmed.ncbi.nlm.nih.gov/40789979/",
    },
  ],
  calculator: {
    href: "/calculator/bpc-157",
    title: "BPC-157 calculator",
    body: "Already have independently supplied measurement inputs? The BPC-157 calculator performs unit arithmetic only. It does not recommend an amount, product or protocol.",
  },
  closingDisclaimer:
    "PepExact is an independent educational measurement resource. This article does not diagnose, treat or recommend a substance, amount or protocol. Investigational and unapproved products may have unknown composition, sterility, safety and legal status. Speak with a licensed healthcare professional and consult the relevant regulator for your jurisdiction.",
};
