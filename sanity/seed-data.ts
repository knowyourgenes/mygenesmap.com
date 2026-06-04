/**
 * Single source of truth for mygenesmap.com (the "Decode-Yourself Explorer").
 * Pushed into Sanity by `pnpm seed`; the site renders entirely from Sanity.
 * Content transcribed from content.docx (Batch 04).
 */

export const homepageContent = {
  brandName: "mygenesmap",
  brandTld: ".com",
  tagline: "the decode-yourself explorer",
  navLinks: [
    { label: "Explore", href: "/#grid" },
    { label: "By area", href: "/#areas" },
    { label: "Full map", href: "/map" },
    { label: "How it works", href: "/#how" },
  ],
  navCtaLabel: "Start tapping",
  navCtaHref: "/#grid",

  heroEyebrow: "Tap what your body does. Find the gene behind it.",
  heroHeadline: "Your body has been dropping hints. Tap one.",
  heroSubhead:
    "An interactive map from what you feel to the gene that explains it. Tap the things your body actually does, the afternoon crash, the coffee that ruins your sleep, the diet that never works, and see the science behind each one, in plain language, with one thing to try. No reading required. Just point at yourself.",
  heroPrimaryCtaLabel: "Start tapping",
  heroPrimaryCtaHref: "/#grid",
  heroSecondaryLabel: "Or browse by part of life",

  gridTitle: "Tap what sounds like you",
  gridIntro:
    "Each tap opens a decode card: the gene behind it, why it happens, and one thing to try. Tap a few and build a small map of how your body is wired.",

  areasTitle: "Browse by part of life",
  areasIntro:
    "Prefer a map to a grid? The same decodes are grouped by area of life.",

  howTitle: "How the explorer works",
  howBody:
    "Tap a feeling. See the gene behind it, explained plainly. Read why it happens and one thing to try. Every decode is a real, research-backed tendency, not a diagnosis, and there is nothing to buy and nothing to sign. Just a clearer picture of the body you already live in.",
  disclaimer:
    "Each decode is a research-backed tendency, not a diagnosis. A tap tells you how your body is likely wired and what to try, it does not label you, and nothing here is a substitute for a doctor where a medical question is involved.",

  mapTitle: "The full symptom-to-gene map",
  mapIntro:
    "Every decode in one place, the index to scan for your exact thing. Each row is a one-line answer written to be lifted directly.",

  newsletterTitle: "One new decode in your inbox every week",
  newsletterBody:
    "A thing your body does and the gene behind it. Five minutes, no jargon, weirdly satisfying.",
  newsletterPlaceholder: "your@email.com",
  newsletterCta: "Subscribe",

  missionLine:
    "Tap what you feel, find the gene behind it, learn what to do, plain-language, India-aware, free for everyone.",
  footerLinks: [
    { label: "Explore", href: "/#grid" },
    { label: "Full map", href: "/map" },
    { label: "How it works", href: "/#how" },
    { label: "Newsletter", href: "/#newsletter" },
  ],
  footerCopy: "mygenesmap.com · the decode-yourself explorer",
};

export const areas = [
  {
    slug: "energy-and-sleep",
    title: "Energy & sleep",
    blurb: "The 3pm crash, waking tired, night-owl wiring",
    iconKey: "sleep",
    order: 1,
  },
  {
    slug: "coffee-and-caffeine",
    title: "Coffee & caffeine",
    blurb: "Coffee ruining sleep, jitters from a tiny cup",
    iconKey: "coffee",
    order: 2,
  },
  {
    slug: "food-and-gut",
    title: "Food & gut",
    blurb: "Blood sugar spikes, bloating, supplements that do nothing",
    iconKey: "food",
    order: 3,
  },
  {
    slug: "fitness-and-recovery",
    title: "Fitness & recovery",
    blurb: "No results from training, easy injury, slow recovery",
    iconKey: "fitness",
    order: 4,
  },
  {
    slug: "stress-and-mood",
    title: "Stress & mood",
    blurb: "A bad week that flattens you for days",
    iconKey: "stress",
    order: 5,
  },
  {
    slug: "family-patterns",
    title: "Family patterns",
    blurb: "The trait everyone at home seems to share",
    iconKey: "family",
    order: 6,
  },
];

export type SeedDecode = {
  slug: string;
  chip: string;
  symptom: string;
  areaSlug: string;
  genes: string[];
  answer: string;
  why: string;
  doThis: string;
  oneLine: string;
  order: number;
};

export const decodes: SeedDecode[] = [
  // Energy & sleep
  {
    slug: "crash-at-3pm",
    chip: "I crash at 3pm",
    symptom: "I crash every afternoon around 3pm",
    areaSlug: "energy-and-sleep",
    genes: ["MTHFR", "TMPRSS6", "PER3"],
    answer:
      "The classic 3pm crash often traces to how your body absorbs B12 and iron and how deeply you sleep, all of which are partly genetic.",
    why: "Three common variants stack up. MTHFR can blunt how well you activate B12. TMPRSS6 can lower iron uptake. PER3 can shorten the deep sleep that should clear your head overnight. Any one alone is mild, together they read as a foggy afternoon, and because each looks normal on a standard report, the pattern is easy to miss.",
    doThis:
      "Track your 3pm energy for five days alongside what you ate and how you slept. A pattern you can see is a pattern you can change.",
    oneLine: "B12, iron, and deep-sleep handling stack into afternoon fog",
    order: 1,
  },
  {
    slug: "tired-after-8-hours",
    chip: "8 hours, still tired",
    symptom: "I sleep eight hours and still wake up tired",
    areaSlug: "energy-and-sleep",
    genes: ["PER3", "CLOCK", "ADA"],
    answer:
      "Time in bed is not the same as deep sleep, and variants in PER3 and CLOCK can compress the restorative phases so eight hours delivers far less recovery.",
    why: "Deep sleep is when your body and brain actually repair. Some people's wiring shortens those windows, so they clock the recommended hours and still wake unrefreshed. The number on the clock looks fine, the recovery underneath it is short.",
    doThis:
      "Keep your bedroom cooler tonight and put screens away 45 minutes before bed. Deep sleep responds to both.",
    oneLine: "Your deep-sleep phases may be genetically short",
    order: 2,
  },
  {
    slug: "wired-at-midnight",
    chip: "Wired at midnight",
    symptom: "I am wired at midnight and useless at 7am",
    areaSlug: "energy-and-sleep",
    genes: ["PER3", "CRY1", "CLOCK"],
    answer:
      "You are likely a genuine night owl, a late chronotype is a real inherited setting, and forcing an early schedule fights your own hormones rather than fixing anything.",
    why: "Night owls produce melatonin later and peak in alertness later. In a world built around early starts this gets misread as a discipline problem. It is not, it is circadian wiring, and roughly half of it is set by genes. The other half, light, wake times, meal timing, gives you some room to shift.",
    doThis:
      "Get ten minutes of bright daylight within an hour of waking. It is the single strongest lever for nudging a late clock earlier.",
    oneLine: "A real late chronotype, not a discipline problem",
    order: 3,
  },

  // Coffee & caffeine
  {
    slug: "coffee-ruins-my-sleep",
    chip: "Coffee ruins my sleep",
    symptom: "Coffee after lunch ruins my sleep but not my friend's",
    areaSlug: "coffee-and-caffeine",
    genes: ["CYP1A2"],
    answer:
      "You are likely a slow caffeine metaboliser, and the CYP1A2 gene keeps caffeine active in your body for up to ten hours instead of four.",
    why: "If you carry the slow variant, a 2pm coffee can still be circulating at midnight, while your friend with the fast variant cleared the same cup by dinner. Same drink, opposite night. Around half of all adults are slow metabolisers, so this is extremely common.",
    doThis:
      "Cut all caffeine after noon for one week. If you fall asleep noticeably faster, you have your answer about your own wiring.",
    oneLine: "Slow metabolisers keep caffeine active up to ten hours",
    order: 1,
  },
  {
    slug: "tiny-coffee-jitters",
    chip: "Tiny coffee, big jitters",
    symptom: "Even a tiny coffee makes me anxious and jittery",
    areaSlug: "coffee-and-caffeine",
    genes: ["ADORA2A"],
    answer:
      "A gene called ADORA2A controls how sensitive your brain's receptors are to caffeine, so some people feel jittery on a dose that barely registers for others.",
    why: "Caffeine works by blocking adenosine receptors. If your ADORA2A variant makes those receptors especially responsive, even a small coffee can spike your heart rate and tip you into anxiety. This is separate from how fast you clear caffeine, you can be sensitive even as a fast metaboliser.",
    doThis:
      "Try half your usual dose tomorrow, or switch to green tea. Sensitivity often responds to amount more than you would expect.",
    oneLine: "Extra-sensitive caffeine receptors, even if you clear it fast",
    order: 2,
  },

  // Food & gut
  {
    slug: "rice-spikes-blood-sugar",
    chip: "Rice spikes my sugar",
    symptom: "The same rice spikes my blood sugar but not my sister's",
    areaSlug: "food-and-gut",
    genes: ["AMY1", "TCF7L2", "FTO"],
    answer:
      "How fast you turn carbohydrates into blood sugar is partly genetic, shaped by genes like AMY1 that vary a lot even between siblings.",
    why: "AMY1 controls how much carb-digesting enzyme your saliva makes. Some people carry many copies and break starch down fast, others few. Two siblings can eat the same rice and see very different blood-sugar curves an hour later. For a population with India's diabetes burden, this matters.",
    doThis:
      "Add protein or fibre to your highest-carb meal, a bowl of dahi, a side of sprouts. Same meal, slower curve.",
    oneLine: "How fast you turn carbs to blood sugar is partly inherited",
    order: 1,
  },
  {
    slug: "milk-bloats-me",
    chip: "Milk bloats me",
    symptom: "Milk bloats me even though everyone says it is healthy",
    areaSlug: "food-and-gut",
    genes: ["LCT", "MCM6"],
    answer:
      "Most Indian adults stop making the enzyme that digests milk sugar after childhood, only about one in eight carries the variant for lifelong tolerance.",
    why: "The LCT gene decides whether you keep producing lactase into adulthood. Across South Asia, most people do not. The bloating after the second chai is not in your head, it is the default state of the subcontinent's digestion. It is not a reason to fear dairy, just to choose the right form.",
    doThis:
      "Swap one glass of milk for a bowl of dahi or a glass of chaas. Fermentation has already broken down much of the lactose.",
    oneLine: "Most Indian adults lose the milk-digesting enzyme",
    order: 2,
  },
  {
    slug: "supplements-do-nothing",
    chip: "Supplements do nothing",
    symptom: "My shelf of supplements does not seem to do anything",
    areaSlug: "food-and-gut",
    genes: ["MTHFR", "VDR", "FUT2"],
    answer:
      "Most people absorb only some of what they take, and which ones depend on genes like MTHFR for B12 and VDR for vitamin D, so half the bottles may be passing straight through you.",
    why: "The standard form of B12 does little if you carry the MTHFR variant, and your vitamin D response is shaped by VDR. Fewer, better-matched supplements beat a crowded shelf. The goal is not to take more, it is to take the two or three your particular body actually uses.",
    doThis:
      "Pick the supplement you are least sure about and pause it for two weeks. If nothing changes, you have your answer.",
    oneLine: "You may not absorb the standard forms you are taking",
    order: 3,
  },

  // Fitness & recovery
  {
    slug: "no-muscle-from-training",
    chip: "No muscle from training",
    symptom: "Same workout, my friend builds muscle and I barely change",
    areaSlug: "fitness-and-recovery",
    genes: ["ACTN3", "ACE", "PPARGC1A"],
    answer:
      "Roughly half of how you respond to training is genetic, and ACTN3 helps decide whether you are built more for power or for endurance.",
    why: "ACTN3 makes a protein in fast-twitch fibres, the ones that fire in sprints and heavy lifts. People with the working version gain explosive strength quickly. Many South Asians carry two non-working copies and lean toward endurance. Doing the wrong style for your wiring is training against yourself.",
    doThis:
      "Do one strength session and one endurance session this week. Notice which leaves you energised and which wrecks you. That gap is data.",
    oneLine: "You may be wired for endurance, not power",
    order: 1,
  },
  {
    slug: "injured-when-i-run",
    chip: "I get injured running",
    symptom: "I keep getting injured whenever I increase my running",
    areaSlug: "fitness-and-recovery",
    genes: ["COL1A1", "COL5A1", "GDF5"],
    answer:
      "Part of injury risk is genetic, variants in collagen genes like COL1A1 affect tendon and ligament resilience, which is why some bodies tolerate high mileage and others break down.",
    why: "Collagen-related genes influence how your connective tissue handles repeated load. If you carry lower-resilience variants, ramping mileage too fast is more likely to end in a niggle. It does not mean you cannot run, it means a slower safe progression and non-optional strength work around the joints.",
    doThis:
      "Increase your weekly running distance by no more than ten percent. Boring, and the single best way to stay uninjured.",
    oneLine: "Collagen genes set tendon and ligament resilience",
    order: 2,
  },
  {
    slug: "workouts-wreck-me",
    chip: "Workouts wreck me",
    symptom: "Workouts that energise everyone else leave me wrecked",
    areaSlug: "fitness-and-recovery",
    genes: ["COMT", "IL6", "ACTN3"],
    answer:
      "Recovery capacity is partly genetic, how fast you clear exercise stress and rebuild depends on genes affecting inflammation and stress-hormone clearance.",
    why: "Two people can do the same session and walk away in opposite states. If your body clears the stress chemistry of hard exercise slowly, daily intense training digs a hole instead of building fitness. The fatigue is a signal, not a weakness.",
    doThis:
      "Put a genuine rest day between your two hardest sessions this week. Watch whether your performance rises rather than drops.",
    oneLine: "Slow clearance of exercise stress slows recovery",
    order: 3,
  },

  // Stress & mood
  {
    slug: "bad-week-flattens-me",
    chip: "A bad week flattens me",
    symptom: "A bad week flattens me for days while my colleague bounces back",
    areaSlug: "stress-and-mood",
    genes: ["COMT", "FKBP5"],
    answer:
      "Your body clears stress hormones at a genetically set speed, and the COMT and FKBP5 genes mean some people recover in hours while others take days.",
    why: "COMT helps break down adrenaline and dopamine. A slower variant means stress chemistry lingers in your system. The same deadline that energises a fast-clearing colleague can keep you wired and depleted into the weekend. If you are a slow clearer, you do not need to toughen up, you need a longer recovery runway.",
    doThis:
      "After your next hard day, block 30 minutes of genuinely low-stimulation time, a walk without your phone. Treat recovery as part of the work.",
    oneLine: "Your nervous system clears stress chemistry slowly",
    order: 1,
  },
  {
    slug: "crash-when-i-get-home",
    chip: "I crash when I get home",
    symptom: "I hold it together at work and then crash the moment I get home",
    areaSlug: "stress-and-mood",
    genes: ["COMT", "FKBP5"],
    answer:
      "Stress-clearance genes set your baseline, but context decides when you feel it, many slow-clearing people hold together under structure and crash once it drops.",
    why: "If your wiring clears stress slowly, the load does not vanish when the workday ends, it surfaces. The collapse at home is often the delayed cost of a held-together day, not a separate problem, and it is worth naming with the people you live with.",
    doThis:
      "Build a ten-minute buffer between work and home, a walk, a shower, silence in the car. Give the crash somewhere to land before you walk in.",
    oneLine: "The held-together day's delayed cost lands at home",
    order: 2,
  },

  // Family patterns
  {
    slug: "whole-family-is-tired",
    chip: "My whole family is tired",
    symptom: "My whole family is always tired and we assume it is just us",
    areaSlug: "family-patterns",
    genes: ["MTHFR", "TMPRSS6"],
    answer:
      "Often it is both habit and biology, families share kitchens but they also share variants like MTHFR that quietly affect how everyone absorbs B12 and folate.",
    why: "The MTHFR variant, common across Indian families, can reduce how well the body activates B12 and folate. When it runs through a household, three generations can carry the same low-energy pattern and assume it is simply their nature. Once one person notices, the whole family can act on it.",
    doThis:
      "At your next family meal, ask one question: does afternoon low energy run on one side of the family? You may be naming a pattern out loud for the first time.",
    oneLine: "A shared variant affecting B12 and folate uptake",
    order: 1,
  },
];
