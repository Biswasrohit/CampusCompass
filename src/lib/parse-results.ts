import { Category, Resource, SchoolInfo } from "@/types";
import { CategorizedResults } from "./tavily";
import { NYC_SCHOOLS } from "./schools";

function generateId(): string {
  return Math.random().toString(36).slice(2, 11);
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "Unknown";
  }
}

function extractBaseDomain(url: string): string {
  const hostname = extractDomain(url);
  const parts = hostname.split(".");
  return parts.length > 2 ? parts.slice(-2).join(".") : hostname;
}

function normalizeUrl(url: string): string {
  try {
    const u = new URL(url);
    return (u.hostname.replace("www.", "") + u.pathname).replace(/\/+$/, "").toLowerCase();
  } catch {
    return url.toLowerCase();
  }
}

function normalizeTitle(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function offsetCoordinate(base: number, range: number = 0.008): number {
  return base + (Math.random() - 0.5) * range;
}

const LIST_PAGE_PATTERN =
  /\btop\s+\d+\b|\bbest\s+\d+\b|\d+\s+scholarships\b|\d+\s+grants\b|\bscholarship\s+list\b|\branking\b/i;

const JOB_PATTERN =
  /\bintern\b|\binternship\b|\bjob\b|\bcareer\b|\bemployment\b|\bhire\b|\bposition\b|\bopportunity\b.*\bapply\b/i;

function isListPage(title: string): boolean {
  return LIST_PAGE_PATTERN.test(title);
}

function isJobPosting(title: string): boolean {
  return JOB_PATTERN.test(title);
}

const BLOCKED_DOMAINS = new Set([
  // Scholarship aggregators
  "scholarships.com",
  "fastweb.com",
  "bold.org",
  "niche.com",
  "scholarshipowl.com",
  "unigo.com",
  "cappex.com",
  "goingmerry.com",
  "scholly.com",
  "petersons.com",
  "collegedata.com",
  // Health/wellness content aggregators
  "healthline.com",
  "webmd.com",
  "medicalnewstoday.com",
  "verywellmind.com",
  "verywellhealth.com",
  "health.com",
  "everydayhealth.com",
  "mindbodygreen.com",
  "wellnessmama.com",
  "livescience.com",
  "healthgrades.com",
  "sharecare.com",
  "psychcentral.com",
  "news-medical.net",
  "medscape.com",
  "drugs.com",
  "rxlist.com",
  "medicinenet.com",
  "emedicinehealth.com",
  "health.usnews.com",
  "medhelp.org",
  "patientslikeme.com",
  "healthunlocked.com",
  "inspire.com",
  "dailystrength.org",
  "mdjunction.com",
  "healthboards.com",
  "ehealthforum.com",
  "patient.info",
  "netdoctor.co.uk",
  "prevention.com",
  "womenshealthmag.com",
  "menshealth.com",
  "self.com",
  "shape.com",
  "fitnessmagazine.com",
  "healthymagazine.com",
  "naturalnews.com",
  "mercola.com",
  "wellness.com",
  "healthcentral.com",
  "diabetesdaily.com",
  "healingwell.com",
  "cancerforums.net",
  "healthexperience.ca",
  "realself.com",
  "steadyhealth.com",
  "healthcaremagic.com",
  "lybrate.com",
  "practo.com",
  "healthtap.com",
  "justanswer.com",
  "askthedoctor.com",
  "ratemds.com",
  "vitals.com",
  "zocdoc.com",
  "opentable.com",
  "yelp.com",
  "healthgorilla.com",
  // Food security aggregators
  "foodpantries.org",
  "foodpantries.com",
  "feedingamerica.org",
  "foodfinder.us",
  "ampleharvest.org",
  "freeshare.org",
  "communityfoodtank.com",
  "foodbanknyc.org",
  "mealconnect.org",
  "foodhelpline.org",
  "shelterlistings.org",
  "homelessshelterdirectory.org",
  // Housing aggregators
  "apartments.com",
  "zillow.com",
  "trulia.com",
  "realtor.com",
  "hotpads.com",
  "apartmentlist.com",
  "rent.com",
  "rentcafe.com",
  "apartmentguide.com",
  "streeteasy.com",
  "padmapper.com",
  "roommates.com",
  "spareroom.com",
  "sublet.com",
  "airbnb.com",
  "vrbo.com",
  "booking.com",
  "craigslist.org",
  "facebook.com/marketplace",
  // Career aggregators
  "indeed.com",
  "linkedin.com/jobs",
  "glassdoor.com",
  "monster.com",
  "simplyhired.com",
  "ziprecruiter.com",
  "careerbuilder.com",
  "snagajob.com",
  "wayup.com",
  "handshake.com",
  "aftercollege.com",
  "internships.com",
  "idealist.org",
  "volunteermatch.org",
  "usajobs.gov",
  "federaljobsearch.com",
  "higheredjobs.com",
  "chronicle.com/jobs",
  "academicjobs.org",
  "stemjob.com",
  "angel.co",
  "wellfound.com",
  "startup.jobs",
  "ycombinator.com/jobs",
  "whitetruffle.com",
  "hired.com",
  "triplebyte.com",
  "vettery.com",
  "smartrecruiters.com",
  "workday.com",
  "jobvite.com",
  "icims.com",
  "greenhouse.io",
  "lever.co",
  "ashbyhq.com",
  "comeet.co",
  "recruitee.com",
  "breezy.hr",
  "workable.com",
  "jazzhr.com",
  "freshteam.com",
  "namely.com",
  "paylocity.com",
  "adp.com",
  "ultipro.com",
  "bamboohr.com",
  "gusto.com",
  "zenefits.com",
  "rippling.com",
  "justworks.com",
  "deel.com",
  "remote.com",
  "papayaglobal.com",
  "oysterhr.com",
  // Social media
  "instagram.com",
  "facebook.com",
  "twitter.com",
  "x.com",
  "reddit.com",
  "tiktok.com",
  "youtube.com",
  "linkedin.com",
  "wikipedia.org",
]);

function isBlockedDomain(url: string): boolean {
  const domain = extractDomain(url);
  return BLOCKED_DOMAINS.has(domain);
}

function buildOtherSchoolKeywords(userSchool: string): readonly string[] {
  const keywords: string[] = [];
  for (const school of NYC_SCHOOLS) {
    if (school.name === userSchool) continue;
    // Extract meaningful keywords from school name
    const parts = school.name
      .replace(/^CUNY\s*-\s*/, "")
      .replace(/\(.*\)/, "")
      .trim()
      .toLowerCase();
    keywords.push(parts);
  }
  return keywords;
}

const TITLE_STOPWORDS = new Set([
  "the", "a", "an", "and", "or", "of", "for", "in", "to", "at", "by",
  "on", "is", "are", "was", "be", "how", "what", "your", "with", "from",
  "pdf", "program", "programs", "college",
  "university", "students", "student", "apply", "application", "free",
  "resources", "resource", "online", "guide", "about", "home", "main",
  "page", "site", "official", "website", "2024", "2025", "2026",
]);

function extractTitleKeywords(title: string): string[] {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 2 && !TITLE_STOPWORDS.has(w));
}

function titleTooSimilar(
  keywords: string[],
  seenKeywordSets: string[][]
): boolean {
  if (keywords.length === 0) return false;
  const kwSet = new Set(keywords);
  for (const prev of seenKeywordSets) {
    const prevSet = new Set(prev);
    let intersection = 0;
    for (let i = 0; i < keywords.length; i++) {
      if (prevSet.has(keywords[i])) intersection++;
    }
    const union = kwSet.size + prevSet.size - intersection;
    if (union > 0 && intersection / union > 0.25) return true;
  }
  return false;
}

function mentionsOtherSchool(
  title: string,
  url: string,
  otherSchoolKeywords: readonly string[]
): boolean {
  const text = (title + " " + url).toLowerCase();
  return otherSchoolKeywords.some((kw) => text.includes(kw));
}

export function parseResults(
  categorizedResults: readonly CategorizedResults[],
  school: SchoolInfo
): readonly Resource[] {
  const seenUrls = new Set<string>();
  const seenTitles = new Set<string>();
  const seenTitleKeywords: string[][] = [];
  const seenDomainsByCategory = new Map<string, Set<string>>();
  const otherSchoolKeywords = buildOtherSchoolKeywords(school.name);

  const resources: Resource[] = [];

  for (const group of categorizedResults) {
    if (!seenDomainsByCategory.has(group.category)) {
      seenDomainsByCategory.set(group.category, new Set<string>());
    }
    const seenDomains = seenDomainsByCategory.get(group.category)!;

    for (const result of group.results) {
      const normUrl = normalizeUrl(result.url);
      const normTitle = normalizeTitle(result.title);
      const baseDomain = extractBaseDomain(result.url);

      const titleKws = extractTitleKeywords(result.title);

      if (seenUrls.has(normUrl)) continue;
      if (seenTitles.has(normTitle)) continue;
      if (isListPage(result.title)) continue;
      if (isJobPosting(result.title)) continue;
      if (isBlockedDomain(result.url)) continue;
      if (seenDomains.has(baseDomain)) continue;
      if (mentionsOtherSchool(result.title, result.url, otherSchoolKeywords)) continue;
      if (titleTooSimilar(titleKws, seenTitleKeywords)) continue;

      seenUrls.add(normUrl);
      seenTitles.add(normTitle);
      seenTitleKeywords.push(titleKws);
      seenDomains.add(baseDomain);

      resources.push({
        id: generateId(),
        title: truncate(result.title, 120),
        description: truncate(result.content, 200),
        url: result.url,
        category: group.category as Category,
        lat: offsetCoordinate(school.lat),
        lng: offsetCoordinate(school.lng),
        location: extractDomain(result.url),
        date: null,
      });
    }
  }

  return resources;
}
