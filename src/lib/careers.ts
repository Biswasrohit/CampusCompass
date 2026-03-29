export interface CareerSource {
  readonly domain: string;
  readonly name: string;
  readonly tags: readonly string[];
}

export const CAREER_SOURCES: readonly CareerSource[] = [
  // Hackathons & developer communities
  { domain: "mlh.io", name: "Major League Hacking", tags: ["general"] },
  { domain: "devpost.com", name: "Devpost Hackathons", tags: ["general"] },
  { domain: "hackerearth.com", name: "HackerEarth", tags: ["general"] },
  { domain: "hackathon.com", name: "Hackathon.com", tags: ["general"] },
  { domain: "angelhack.com", name: "AngelHack", tags: ["general"] },
  { domain: "techcrunch.com", name: "TechCrunch Disrupt", tags: ["general"] },

  // Coding programs & bootcamps for college students
  { domain: "codepath.org", name: "CodePath", tags: ["general"] },
  { domain: "colorstack.org", name: "ColorStack", tags: ["general", "Black", "Hispanic", "Latino"] },
  { domain: "codeday.org", name: "CodeDay", tags: ["general"] },
  { domain: "freecodecamp.org", name: "freeCodeCamp", tags: ["general"] },
  { domain: "thecodingtrain.com", name: "The Coding Train", tags: ["general"] },
  { domain: "theodinproject.com", name: "The Odin Project", tags: ["general"] },

  // Tech conferences & professional orgs
  { domain: "ghc.anitab.org", name: "Grace Hopper Celebration", tags: ["general", "Female"] },
  { domain: "anitab.org", name: "AnitaB.org", tags: ["general", "Female"] },
  { domain: "shpe.org", name: "SHPE", tags: ["general", "Hispanic", "Latino", "Latina"] },
  { domain: "nsbe.org", name: "NSBE", tags: ["general", "Black", "African American"] },
  { domain: "sacnas.org", name: "SACNAS", tags: ["general", "Hispanic", "Native American"] },
  { domain: "onestem.org", name: "OneStem", tags: ["general"] },
  { domain: "swe.org", name: "Society of Women Engineers", tags: ["general", "Female"] },
  { domain: "wics.acm.org", name: "ACM-W", tags: ["general", "Female"] },
  { domain: "afrotech.com", name: "AfroTech", tags: ["general", "Black", "African American"] },
  { domain: "tapia.cmd-it.org", name: "Tapia Conference", tags: ["general"] },
  { domain: "out4undergrad.org", name: "Out for Undergrad Tech", tags: ["general", "LGBTQ+"] },
  { domain: "lesbianswhotech.org", name: "Lesbians Who Tech", tags: ["general", "LGBTQ+", "Female"] },
  { domain: "ieee.org", name: "IEEE", tags: ["general"] },
  { domain: "acm.org", name: "ACM", tags: ["general"] },
  { domain: "goto.com", name: "GOTO Conference", tags: ["general"] },
  { domain: "qconferences.com", name: "QCon", tags: ["general"] },

  // Fellowships & student programs
  { domain: "headstarter.co", name: "Headstarter AI Fellowship", tags: ["general"] },
  { domain: "fellowship.mlh.io", name: "MLH Fellowship", tags: ["general"] },
  { domain: "neo.com", name: "Neo Scholars", tags: ["general"] },
  { domain: "kleinerperkins.com", name: "Kleiner Perkins Fellows", tags: ["general"] },
  { domain: "8vc.com", name: "8VC Fellowship", tags: ["general"] },
  { domain: "roughdraft.vc", name: "Rough Draft Ventures", tags: ["general"] },
  { domain: "break-through-tech.org", name: "Break Through Tech", tags: ["general", "Female"] },
  { domain: "rewritingthecode.org", name: "Rewriting the Code", tags: ["general", "Female"] },
  { domain: "intuit.com", name: "Intuit Apprenticeship", tags: ["general"] },
  { domain: "stripe.com", name: "Stripe Fellowship", tags: ["general"] },
  { domain: "aws.amazon.com", name: "AWS Educate", tags: ["general"] },

  // Open source & mentorship
  { domain: "summerofcode.withgoogle.com", name: "Google Summer of Code", tags: ["general"] },
  { domain: "outreachy.org", name: "Outreachy", tags: ["general"] },
  { domain: "opensourcefellows.org", name: "Open Source Fellows", tags: ["general"] },
  { domain: "github.com/sponsors", name: "GitHub Sponsors", tags: ["general"] },
  { domain: "linuxfoundation.org", name: "Linux Foundation", tags: ["general"] },
  { domain: "apache.org", name: "Apache Foundation", tags: ["general"] },
  { domain: "mozilla.org", name: "Mozilla", tags: ["general"] },
  { domain: "wikimediafoundation.org", name: "Wikimedia", tags: ["general"] },

  // Leadership & general academic programs
  { domain: "thrivescholars.org", name: "Thrive Scholars", tags: ["general"] },
  { domain: "managementleadershipforsociety.com", name: "MLT (Management Leadership for Tomorrow)", tags: ["general", "Black", "Hispanic", "Native American"] },
  { domain: "posse.org", name: "Posse Foundation", tags: ["general"] },
  { domain: "braven.org", name: "Braven", tags: ["general"] },
  { domain: "seoinc.org", name: "SEO (Sponsors for Educational Opportunity)", tags: ["general", "Black", "Hispanic", "Native American"] },
  { domain: "laspau.harvard.edu", name: "LASPAU", tags: ["general", "Hispanic", "Latino"] },
  { domain: "emerging-leaders.org", name: "Emerging Leaders", tags: ["general"] },
  { domain: "leadershipacademy.org", name: "Leadership Academy", tags: ["general"] },
  { domain: "coro.org", name: "Coro Fellowship", tags: ["general"] },
  { domain: "girlsleadership.org", name: "Girls Leadership", tags: ["Female"] },

  // Research & science (non-SWE)
  { domain: "nsfreu.org", name: "NSF REU Programs", tags: ["general"] },
  { domain: "undergradresearch.org", name: "Council on Undergraduate Research", tags: ["general"] },
  { domain: "nih.gov", name: "NIH Research Programs", tags: ["general"] },
  { domain: "amgen.com/responsibility/amgen-scholars", name: "Amgen Scholars", tags: ["general"] },
  { domain: "nsf.gov", name: "NSF Programs", tags: ["general"] },
  { domain: "energy.gov", name: "DOE Office of Science", tags: ["general"] },
  { domain: "nasa.gov", name: "NASA STEM", tags: ["general"] },
  { domain: "noaa.gov", name: "NOAA Opportunities", tags: ["general"] },
  { domain: "epa.gov", name: "EPA Research", tags: ["general"] },
  { domain: "usda.gov", name: "USDA Programs", tags: ["general"] },
  { domain: "usgs.gov", name: "USGS Opportunities", tags: ["general"] },
  { domain: "si.edu", name: "Smithsonian", tags: ["general"] },
  { domain: "cdc.gov", name: "CDC Research", tags: ["general"] },
  { domain: "nist.gov", name: "NIST Programs", tags: ["general"] },
  { domain: "fas.org", name: "FAS Fellowships", tags: ["general"] },
  { domain: "aaas.org", name: "AAAS Fellowships", tags: ["general"] },

  // Business & finance student programs
  { domain: "inroads.org", name: "INROADS", tags: ["general", "Black", "Hispanic", "Native American"] },
  { domain: "alphakappaalphaaka.com", name: "AKA Programs", tags: ["general", "Black", "Female"] },

  // Pre-health & pre-law
  { domain: "snma.org", name: "Student National Medical Association", tags: ["general", "Black", "African American"] },
  { domain: "lsac.org", name: "LSAC Prelaw Programs", tags: ["general"] },
  { domain: "jnjinnovation.com", name: "J&J STEM Programs", tags: ["general"] },
  { domain: "aanmc.org", name: "Naturopathic Medical Schools", tags: ["general"] },
  { domain: "aacom.org", name: "Osteopathic Medicine", tags: ["general"] },
  { domain: "aamc.org", name: "Medical School Admissions", tags: ["general"] },
  { domain: "optomcas.org", name: "Optometry School", tags: ["general"] },
  { domain: "ptcas.org", name: "Physical Therapy School", tags: ["general"] },
  { domain: "paeaonline.org", name: "Physician Assistant", tags: ["general"] },
  { domain: "ada.org", name: "Dental School", tags: ["general"] },
  { domain: "veterinaryschools.com", name: "Vet School", tags: ["general"] },
  { domain: "pharmcas.org", name: "Pharmacy School", tags: ["general"] },
  { domain: "nursingcas.org", name: "NursingCAS", tags: ["general"] },

  // Public service & civic
  { domain: "peacecorps.gov", name: "Peace Corps Prep", tags: ["general"] },
  { domain: "americorps.gov", name: "AmeriCorps", tags: ["general"] },
  { domain: "teach.org", name: "Teach.org", tags: ["general"] },
  { domain: "citizenshipfund.org", name: "Citizenship Fund", tags: ["general"] },
  { domain: "teachforamerica.org", name: "Teach For America", tags: ["general"] },
  { domain: "cityyear.org", name: "City Year", tags: ["general"] },
  { domain: "publicallies.org", name: "Public Allies", tags: ["general"] },
  { domain: "youthbuild.org", name: "YouthBuild", tags: ["general"] },
  { domain: "vista.gpo.gov", name: "AmeriCorps VISTA", tags: ["general"] },
  { domain: "nccc.gov", name: "National Civilian Community Corps", tags: ["general"] },
  { domain: "state.gov", name: "State Department Fellowships", tags: ["general"] },
  { domain: "treasury.gov", name: "Treasury Department Programs", tags: ["general"] },
  { domain: "defense.gov", name: "DoD Programs", tags: ["general"] },

  // Arts & humanities
  { domain: "arts.gov", name: "National Endowment for the Arts", tags: ["general"] },
  { domain: "neh.gov", name: "National Endowment for the Humanities", tags: ["general"] },
  { domain: "yourartscouncil.org", name: "Arts Council Programs", tags: ["general"] },
  { domain: "behance.net", name: "Adobe Behance", tags: ["general"] },
  { domain: "dribbble.com", name: "Dribbble", tags: ["general"] },
  { domain: "adobe.com", name: "Adobe Creative Residency", tags: ["general"] },
  { domain: "rhizome.org", name: "Rhizome", tags: ["general"] },
  { domain: "creative-capital.org", name: "Creative Capital", tags: ["general"] },
  { domain: "artists.org", name: "Artists Community Alliance", tags: ["general"] },
  { domain: "kennedy-center.org", name: "Kennedy Center", tags: ["general"] },
  { domain: "lincolncenter.org", name: "Lincoln Center", tags: ["general"] },
  { domain: "carnegiehall.org", name: "Carnegie Hall", tags: ["general"] },

  // Journalism, media & communications
  { domain: "nalac.org", name: "National Association of Latino Arts and Cultures", tags: ["Hispanic", "Latino", "Latina"] },
  { domain: "nabj.org", name: "National Association of Black Journalists", tags: ["Black", "African American"] },
  { domain: "naahj.org", name: "National Association of Hispanic Journalists", tags: ["Hispanic", "Latino", "Latina"] },
  { domain: "aaja.org", name: "Asian American Journalists Association", tags: ["Asian"] },
  { domain: "nlgja.org", name: "NLGJA: The Association of LGBTQ Journalists", tags: ["LGBTQ+"] },
  { domain: "rtdna.org", name: "Radio Television Digital News Association", tags: ["general"] },
  { domain: "spj.org", name: "Society of Professional Journalists", tags: ["general"] },
  { domain: "ona.org", name: "Online News Association", tags: ["general"] },
  { domain: "poynter.org", name: "Poynter Institute", tags: ["general"] },
  { domain: "niemanlab.org", name: "Nieman Foundation", tags: ["general"] },
  { domain: "columbiajournalism.org", name: "Columbia Journalism School", tags: ["general"] },
  { domain: "cunyjournalism.org", name: "CUNY Graduate School of Journalism", tags: ["general"] },

  // Museum, library & cultural heritage
  { domain: "aam-us.org", name: "American Alliance of Museums", tags: ["general"] },
  { domain: "imls.gov", name: "Institute of Museum and Library Services", tags: ["general"] },
  { domain: "ala.org", name: "American Library Association", tags: ["general"] },
  { domain: "clir.org", name: "Council on Library and Information Resources", tags: ["general"] },
  { domain: "ncaa.org", name: "National Collegiate Honors Council", tags: ["general"] },

  // Education, teaching & youth development
  { domain: "teach.org", name: "Teach.org", tags: ["general"] },
  { domain: "teachforamerica.org", name: "Teach For America", tags: ["general"] },
  { domain: "breakthroughcollaborative.org", name: "Breakthrough Collaborative", tags: ["general"] },
  { domain: "highway2teaching.org", name: "Highway to Teaching", tags: ["general"] },
  { domain: "readingpartners.org", name: "Reading Partners", tags: ["general"] },
  { domain: "americorps.gov", name: "AmeriCorps Education", tags: ["general"] },
  { domain: "jumpstart.org", name: "Jumpstart", tags: ["general"] },
  { domain: "summeracademy.org", name: "Summer Academy", tags: ["general"] },
  { domain: "boysandgirlsclubs.org", name: "Boys & Girls Clubs", tags: ["general"] },
  { domain: "ymca.net", name: "YMCA Youth Programs", tags: ["general"] },
  { domain: "girlsinc.org", name: "Girls Inc.", tags: ["Female"] },
  { domain: "mightywriters.org", name: "Mighty Writers", tags: ["general"] },
  { domain: "826national.org", name: "826 National Writing Centers", tags: ["general"] },
  { domain: "pencil.org", name: "PENCIL Partnership", tags: ["general"] },

  // Consulting, business & social impact
  { domain: "bridgespan.org", name: "Bridgespan Group", tags: ["general"] },
  { domain: "nonprofitquarterly.org", name: "Nonprofit Quarterly", tags: ["general"] },
  { domain: "urban.org", name: "Urban Institute", tags: ["general"] },
  { domain: "brookings.edu", name: "Brookings Institution", tags: ["general"] },
  { domain: "cfr.org", name: "Council on Foreign Relations", tags: ["general"] },

  // Nonprofit & community development
  { domain: "aspirationtech.org", name: "Aspiration", tags: ["general"] },
  { domain: "rockpa.org", name: "Rockwood Leadership Program", tags: ["general"] },
  { domain: "compasspoint.org", name: "CompassPoint", tags: ["general"] },
  { domain: "boardsource.org", name: "BoardSource", tags: ["general"] },
  { domain: "managingvision.com", name: "Common Good", tags: ["general"] },
  { domain: "fsg.org", name: "FSG Consulting", tags: ["general"] },
  { domain: "ssir.org", name: "Stanford Social Innovation Review", tags: ["general"] },
  { domain: "generocity.org", name: "Generocity", tags: ["general"] },

  // Writing, publishing & literature
  { domain: "poets.org", name: "Academy of American Poets", tags: ["general"] },
  { domain: "writingcontests.org", name: "Writing Contests Database", tags: ["general"] },
];

export function getCareerDomains(
  raceEthnicity: string,
  gender: string
): readonly string[] {
  return CAREER_SOURCES.filter((s) => {
    const matchesGeneral = s.tags.includes("general");
    const matchesRace = s.tags.some((tag) =>
      raceEthnicity.toLowerCase().includes(tag.toLowerCase())
    );
    const matchesGender = s.tags.some((tag) =>
      gender.toLowerCase().includes(tag.toLowerCase())
    );
    return matchesGeneral || matchesRace || matchesGender;
  }).map((s) => s.domain);
}
