export interface HousingSource {
  readonly domain: string;
  readonly name: string;
  readonly tags: readonly string[];
}

export const HOUSING_SOURCES: readonly HousingSource[] = [
  // Housing
  { domain: "housingconnect.org", name: "Housing Connect (Affordable Housing)", tags: ["general", "housing"] },
  { domain: "collegehousing.org", name: "College Housing Assistance", tags: ["general", "housing"] },
  { domain: "cohousing.org", name: "CoLiving & Housing Resources", tags: ["general", "housing"] },
  { domain: "affordablecollegesonline.org", name: "Affordable Colleges Online", tags: ["general", "housing"] },
  { domain: "coho.org", name: "CoHousing Cooperative Housing", tags: ["general", "housing"] },
  { domain: "homelessshelterdirectory.org", name: "Shelter Directory", tags: ["general", "housing", "emergency"] },
];

export function getHousingDomains(
  raceEthnicity: string,
  gender: string
): readonly string[] {
  return HOUSING_SOURCES.filter((s) => {
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
