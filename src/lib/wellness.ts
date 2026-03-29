interface WellnessSource {
  readonly domain: string;
  readonly name: string;
  readonly tags: readonly string[];
}

export const WELLNESS_SOURCES: readonly WellnessSource[] = [
  // Crisis & immediate support
  { domain: "988lifeline.org", name: "988 Suicide & Crisis Lifeline", tags: ["general"] },
  { domain: "crisistextline.org", name: "Crisis Text Line", tags: ["general"] },
  { domain: "thetrevorproject.org", name: "The Trevor Project", tags: ["LGBTQ+"] },
  { domain: "translifeline.org", name: "Trans Lifeline", tags: ["LGBTQ+"] },
  { domain: "suicidepreventionlifeline.org", name: "Suicide Prevention Lifeline", tags: ["general"] },
  { domain: "samaritans.org", name: "Samaritans", tags: ["general"] },
  { domain: "imalive.org", name: "IMAlive", tags: ["general"] },

  // Free / low-cost therapy & counseling
  { domain: "openpathcollective.org", name: "Open Path Collective", tags: ["general"] },
  { domain: "betterhelp.com", name: "BetterHelp", tags: ["general"] },
  { domain: "talkspace.com", name: "Talkspace", tags: ["general"] },
  { domain: "7cups.com", name: "7 Cups (Free Listening)", tags: ["general"] },
  { domain: "nami.org", name: "NAMI (National Alliance on Mental Illness)", tags: ["general"] },
  { domain: "mhanational.org", name: "Mental Health America", tags: ["general"] },
  { domain: "therapyforblackgirls.com", name: "Therapy for Black Girls", tags: ["Black", "African American", "Female"] },
  { domain: "therapyforblackmen.org", name: "Therapy for Black Men", tags: ["Black", "African American", "Male"] },
  { domain: "inclusivetherapists.com", name: "Inclusive Therapists", tags: ["LGBTQ+", "general"] },
  { domain: "aakoma.org", name: "AAKOMA Project", tags: ["Black", "African American"] },
  { domain: "latinxtherapy.com", name: "Latinx Therapy", tags: ["Hispanic", "Latino", "Latina"] },
  { domain: "asianmentalhealthcollective.com", name: "Asian Mental Health Collective", tags: ["Asian"] },
  { domain: "stronghearts.org", name: "StrongHearts Native Helpline", tags: ["Native American", "Indigenous"] },
  { domain: "psychologytoday.com", name: "Psychology Today Therapist Finder", tags: ["general"] },
  { domain: "goodtherapy.org", name: "GoodTherapy", tags: ["general"] },
  { domain: "mantherapy.org", name: "Man Therapy", tags: ["Male"] },
  { domain: "postpartum.net", name: "Postpartum Support International", tags: ["Female"] },
  { domain: "postpartumprogress.com", name: "Postpartum Progress", tags: ["Female"] },

  // NYC-specific resources
  { domain: "nyc.gov", name: "NYC Well", tags: ["general"] },
  { domain: "nyumc.org", name: "NYU Mental Health", tags: ["general"] },
  { domain: "columbiapsychiatry.org", name: "Columbia Psychiatry", tags: ["general"] },
  { domain: "mountsinai.org", name: "Mount Sinai Behavioral Health", tags: ["general"] },
  { domain: "nypl.org", name: "NYPL Social Services", tags: ["general"] },

  // Wellness & mindfulness apps
  { domain: "headspace.com", name: "Headspace (Student Plan)", tags: ["general"] },
  { domain: "calm.com", name: "Calm", tags: ["general"] },
  { domain: "insighttimer.com", name: "Insight Timer", tags: ["general"] },
  { domain: "wakingup.com", name: "Waking Up", tags: ["general"] },
  { domain: "tenpercent.com", name: "Ten Percent Happier", tags: ["general"] },
  { domain: "sanvello.com", name: "Sanvello", tags: ["general"] },
  { domain: "mindful.org", name: "Mindful.org", tags: ["general"] },
  { domain: "stopbreathethink.com", name: "Stop, Breathe & Think", tags: ["general"] },

  // Campus-adjacent wellness
  { domain: "jedfoundation.org", name: "JED Foundation", tags: ["general"] },
  { domain: "activeminds.org", name: "Active Minds", tags: ["general"] },

  // Substance use & recovery
  { domain: "samhsa.gov", name: "SAMHSA Helpline", tags: ["general"] },
  { domain: "collegiaterecovery.org", name: "Association of Recovery in Higher Education", tags: ["general"] },
  { domain: "shatterproof.org", name: "Shatterproof", tags: ["general"] },
  { domain: "facesandvoicesofrecovery.org", name: "Faces & Voices of Recovery", tags: ["general"] },
  { domain: "smartrecovery.org", name: "SMART Recovery", tags: ["general"] },
  { domain: "thecollegiaterecovery.org", name: "Collegiate Recovery", tags: ["general"] },

  // Sleep & stress
  { domain: "sleepfoundation.org", name: "Sleep Foundation", tags: ["general"] },
];

