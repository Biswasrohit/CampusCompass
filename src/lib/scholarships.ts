export interface ScholarshipSource {
  readonly domain: string;
  readonly name: string;
  readonly tags: readonly string[];
}

export const SCHOLARSHIP_SOURCES: readonly ScholarshipSource[] = [
  // General / open to all
  { domain: "thegatesscholarship.org", name: "Gates Scholarship", tags: ["general"] },
  { domain: "coca-colascholars.org", name: "Coca-Cola Scholars", tags: ["general"] },
  { domain: "jkcf.org", name: "Jack Kent Cooke Foundation", tags: ["general"] },
  { domain: "questbridge.org", name: "QuestBridge", tags: ["general"] },
  { domain: "cokeurl.com", name: "Coca-Cola First Generation", tags: ["general"] },
  { domain: "collegeboard.org", name: "College Board Scholarships", tags: ["general"] },
  { domain: "danielsfund.org", name: "Daniels Scholarship", tags: ["general"] },
  { domain: "horatiogalger.org", name: "Horatio Alger Scholarship", tags: ["general"] },
  { domain: "elks.org", name: "Elks National Foundation", tags: ["general"] },
  { domain: "studentaidpolicy.com", name: "Student Aid Policy", tags: ["general"] },
  { domain: "dream.us", name: "TheDream.US Scholarship", tags: ["general"] },
  { domain: "georgemitchell.edu", name: "Mitchell Scholarship", tags: ["general"] },
  { domain: "sunshine-scholarship.org", name: "Sunshine Lady Foundation", tags: ["general"] },
  { domain: "scholarshipamerica.org", name: "Scholarship America", tags: ["general"] },
  { domain: "studentscholarships.org", name: "Student Scholarships Inc", tags: ["general"] },
  { domain: "proton.foundation", name: "Proton Foundation", tags: ["general"] },
  { domain: "greenhouse.com", name: "Greenhouse Scholars", tags: ["general"] },
  { domain: "risefoundation.org", name: "Rise Foundation", tags: ["general"] },
  { domain: "finaid.org", name: "FinAid Scholarship Database", tags: ["general"] },
  { domain: "scholarshipexpress.com", name: "Scholarship Express", tags: ["general"] },

  // Asian / Pacific Islander
  { domain: "apiascholars.org", name: "APIA Scholars", tags: ["Asian", "Pacific Islander"] },
  { domain: "aauw.org", name: "AAUW Fellowships", tags: ["general", "Female"] },
  { domain: "oapisf.org", name: "OCA-Asian Pacific American", tags: ["Asian", "Pacific Islander"] },
  { domain: "goleli.org", name: "GoLELI Scholarships", tags: ["Asian"] },
  { domain: "ascendfoundation.org", name: "Ascend Foundation", tags: ["Asian"] },
  { domain: "korean-american-scholarship.org", name: "KASF", tags: ["Asian"] },
  { domain: "jacl.org", name: "JACL Scholarships", tags: ["Asian"] },
  { domain: "uspan.org", name: "US Pan Asian American Chamber", tags: ["Asian"] },

  // Black / African American
  { domain: "uncf.org", name: "UNCF", tags: ["Black", "African American"] },
  { domain: "tmcf.org", name: "Thurgood Marshall College Fund", tags: ["Black", "African American"] },
  { domain: "ronbrown.org", name: "Ron Brown Scholar Program", tags: ["Black", "African American"] },
  { domain: "jackierobinson.org", name: "Jackie Robinson Foundation", tags: ["Black", "African American"] },
  { domain: "naceweb.org", name: "National Association of Black Engineers", tags: ["Black", "African American"] },
  { domain: "naacp.org", name: "NAACP Scholarships", tags: ["Black", "African American"] },
  { domain: "100blackmen.org", name: "100 Black Men of America", tags: ["Black", "African American"] },
  { domain: "nbmbaa.org", name: "National Black MBA Association", tags: ["Black", "African American"] },
  { domain: "linksfoundation.org", name: "Links Foundation", tags: ["Black", "African American", "Female"] },
  { domain: "deltasigmatheta.org", name: "Delta Sigma Theta", tags: ["Black", "Female"] },
  { domain: "alphakappaalpha1908.com", name: "Alpha Kappa Alpha", tags: ["Black", "Female"] },

  // Hispanic / Latino
  { domain: "hsf.net", name: "Hispanic Scholarship Fund", tags: ["Hispanic", "Latino", "Latina"] },
  { domain: "lnesc.org", name: "LNESC/LULAC Scholarships", tags: ["Hispanic", "Latino", "Latina"] },
  { domain: "hacu.net", name: "HACU Scholarships", tags: ["Hispanic", "Latino", "Latina"] },
  { domain: "maldef.org", name: "MALDEF Scholarships", tags: ["Hispanic", "Latino", "Latina"] },
  { domain: "chci.org", name: "Congressional Hispanic Caucus Institute", tags: ["Hispanic", "Latino", "Latina"] },
  { domain: "nclr.org", name: "UnidosUS (NCLR)", tags: ["Hispanic", "Latino", "Latina"] },
  { domain: "hames.org", name: "Hispanic Association of Engineers", tags: ["Hispanic", "Latino", "Latina"] },
  { domain: "nahb.org", name: "National Association of Hispanic Broadcasters", tags: ["Hispanic", "Latino", "Latina"] },
  { domain: "lalatinacc.org", name: "LA Latino Chamber", tags: ["Hispanic", "Latino", "Latina"] },

  // Native American / Indigenous
  { domain: "aigcs.org", name: "American Indian Graduate Center", tags: ["Native American", "Indigenous"] },
  { domain: "catchingthedream.org", name: "Catching the Dream", tags: ["Native American", "Indigenous"] },
  { domain: "indigenouspeoples.org", name: "Indigenous Peoples Fund", tags: ["Native American", "Indigenous"] },
  { domain: "nativescholarships.org", name: "Native American Scholarship Fund", tags: ["Native American", "Indigenous"] },
  { domain: "firstnations.org", name: "First Nations Development Institute", tags: ["Native American", "Indigenous"] },
  { domain: "cobell.org", name: "Cobell Scholarship", tags: ["Native American", "Indigenous"] },
  { domain: "navajonationparks.org", name: "Navajo Nation Higher Education", tags: ["Native American", "Indigenous"] },
  { domain: "aigtfdn.org", name: "American Indian Graduate Center", tags: ["Native American", "Indigenous"] },

  // Women
  { domain: "buick.com/achievers", name: "Buick Achievers", tags: ["general"] },
  { domain: "pfrdf.org", name: "P.E.O. Foundation", tags: ["Female"] },
  { domain: "jeannettrankin.org", name: "Jeannette Rankin Foundation", tags: ["Female"] },
  { domain: "soroptimist.org", name: "Soroptimist Live Your Dream", tags: ["Female"] },
  { domain: "societywomenengineers.org", name: "SWE Scholarships", tags: ["Female"] },
  { domain: "girlsintech.org", name: "Girls in Tech", tags: ["Female"] },
  { domain: "womenintech.org", name: "Women in Tech", tags: ["Female"] },
  { domain: "anitab.org", name: "AnitaB.org", tags: ["Female"] },
  { domain: "nsf.gov", name: "NSF Graduate Research Fellowships", tags: ["general", "Female"] },

  // LGBTQ+
  { domain: "pointfoundation.org", name: "Point Foundation", tags: ["LGBTQ+"] },
  { domain: "lesfund.org", name: "Lesbian Health Fund", tags: ["LGBTQ+", "Female"] },
  { domain: "pridefoundation.org", name: "Pride Foundation", tags: ["LGBTQ+"] },
  { domain: "collegescholarships.org", name: "LGBTQ+ Scholarships Database", tags: ["LGBTQ+"] },
  { domain: "liveoutloud.org", name: "Live Out Loud", tags: ["LGBTQ+"] },
  { domain: "alphabetasigma.org", name: "Alpha Beta Sigma", tags: ["LGBTQ+"] },
  { domain: "pflag.org", name: "PFLAG Scholarships", tags: ["LGBTQ+"] },

  // STEM focused
  { domain: "societyforscience.org", name: "Regeneron STS", tags: ["general"] },
  { domain: "hertzfoundation.org", name: "Hertz Fellowship", tags: ["general"] },
  { domain: "goldwaterscholarship.gov", name: "Goldwater Scholarship", tags: ["general"] },
  { domain: "nsf.gov", name: "NSF Graduate Fellowship", tags: ["general"] },
  { domain: "doed.gov", name: "DOE Scholars Program", tags: ["general"] },
  { domain: "dodstem.us", name: "DoD STEM", tags: ["general"] },
  { domain: "nasa.gov", name: "NASA STEM Engagement", tags: ["general"] },
  { domain: "noaa.gov", name: "NOAA Scholarships", tags: ["general"] },
  { domain: "energy.gov", name: "DOE Office of Science", tags: ["general"] },
  { domain: "smithsonian.com", name: "Smithsonian Fellowships", tags: ["general"] },

  // Leadership & academic (non-SWE)
  { domain: "thrivescholars.org", name: "Thrive Scholars", tags: ["general"] },
  { domain: "posse.org", name: "Posse Foundation Scholarship", tags: ["general"] },
  { domain: "truman.gov", name: "Truman Scholarship", tags: ["general"] },
  { domain: "udall.gov", name: "Udall Scholarship", tags: ["general", "Native American"] },
  { domain: "rhodeshouse.ox.ac.uk", name: "Rhodes Scholarship", tags: ["general"] },
  { domain: "marshallscholarship.org", name: "Marshall Scholarship", tags: ["general"] },
  { domain: "us.fulbrightonline.org", name: "Fulbright Program", tags: ["general"] },
  { domain: "pickering.iie.org", name: "Pickering Fellowship", tags: ["general"] },
  { domain: "rangelprogram.org", name: "Rangel Fellowship", tags: ["general"] },
  { domain: "bensonscholars.org", name: "Benson Scholarship", tags: ["general"] },

  // Business & public service
  { domain: "forte.org", name: "Forté Foundation", tags: ["general", "Female"] },
  { domain: "dellscholars.org", name: "Dell Scholars", tags: ["general"] },
  { domain: "kpmg.com", name: "KPMG Foundation", tags: ["general"] },
  { domain: "ey.com", name: "EY Foundation", tags: ["general"] },
  { domain: "pwc.com", name: "PwC Foundation", tags: ["general"] },
  { domain: "deloitte.com", name: "Deloitte Foundation", tags: ["general"] },

  // Arts & humanities
  { domain: "youngarts.org", name: "YoungArts", tags: ["general"] },
  { domain: "scholasticart.com", name: "Scholastic Art & Writing Awards", tags: ["general"] },
  { domain: "davidsonfellows.org", name: "Davidson Fellows", tags: ["general"] },
  { domain: "kennedy-center.org", name: "Kennedy Center", tags: ["general"] },
  { domain: "arts.gov", name: "NEA Arts Grants", tags: ["general"] },
  { domain: "neh.gov", name: "NEH Fellowships", tags: ["general"] },

  // Pre-health
  { domain: "nhsc.hrsa.gov", name: "National Health Service Corps", tags: ["general"] },
  { domain: "ama-assn.org", name: "AMA Foundation Scholarships", tags: ["general"] },
  { domain: "aanmc.org", name: "Naturopathic Medicine Scholarships", tags: ["general"] },
  { domain: "aacom.org", name: "Osteopathic Medicine", tags: ["general"] },
  { domain: "adea.org", name: "Dental Education", tags: ["general"] },
  { domain: "aacn.org", name: "Nursing Scholarships", tags: ["general"] },
  { domain: "optometry.org", name: "Optometry Scholarships", tags: ["general"] },
  { domain: "nationaleyecenter.org", name: "Eye Care Scholarships", tags: ["general"] },
];

export function getScholarshipDomains(
  raceEthnicity: string,
  gender: string
): readonly string[] {
  return SCHOLARSHIP_SOURCES.filter((s) => {
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
