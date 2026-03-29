export interface FoodSource {
  readonly domain: string;
  readonly name: string;
  readonly tags: readonly string[];
}

export const FOOD_SOURCES: readonly FoodSource[] = [
  // Food Security
  { domain: "swipehunger.org", name: "Swipe Out Hunger", tags: ["general", "food"] },
  { domain: "thecheahtfoundation.org", name: "The Cheah Foundation", tags: ["general", "food"] },
  { domain: "getfed.org", name: "GetFed (Campus Food Pantries)", tags: ["general", "food"] },
  { domain: "feedingamerica.org", name: "Feeding America", tags: ["general", "food"] },
  { domain: "foodpantries.org", name: "Food Pantries Locator", tags: ["general", "food"] },
  { domain: "campuskitchens.org", name: "Campus Kitchens Project", tags: ["general", "food"] },
  { domain: "supplementalnutrition.org", name: "SNAP for Students", tags: ["general", "food"] },
  { domain: "foodbanknyc.org", name: "Food Bank NYC", tags: ["general", "food"] },
  { domain: "cityharvest.org", name: "City Harvest", tags: ["general", "food"] },
];

export function getFoodDomains(
  raceEthnicity: string,
  gender: string
): readonly string[] {
  return FOOD_SOURCES.filter((s) => {
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
