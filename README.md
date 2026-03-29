# CampusCompass

Stop leaving money on the table. CampusCompass helps NYC students discover personalized scholarships, grants, and financial aid in one map.

CampusCompass is an AI-powered financial navigator for NYC college students. Students sign in once, tell us who they are, and instantly see a personalized map of scholarships, campus support, and aid resources near them, along with an AI chat experience that helps them dig deeper.

## Inspiration

Every year, billions of dollars in scholarships, grants, and financial aid go unclaimed. Too many students, especially first-generation and low-income students, never find the support available to them because the information is scattered, hard to search, and rarely personalized.

We built CampusCompass because finding financial support should not require knowing the right person or spending hours piecing together resources across dozens of websites.

## What It Does

- Personalized scholarship discovery based on a student's school and profile
- Interactive map view of resources near campus and across NYC
- AI financial mentor that answers questions in plain language and surfaces relevant opportunities
- Savings and insights dashboard that shows where opportunities are concentrated and what a student has already uncovered
- Saved resources flow so students can build a shortlist and come back later

## How We Built It

CampusCompass is built with Next.js 14 and the App Router for a fast, modern web experience. Authentication is handled with WorkOS AuthKit, giving us secure sign-in with minimal setup.

Our resource discovery flow combines two AI-powered layers:

1. OpenRouter filters and personalizes a curated set of opportunities based on the student's profile.
2. Tavily enriches those results with live URLs, descriptions, and metadata from real web sources.

We paired that backend flow with React Leaflet for the resource map, TypeScript for reliability, and Tailwind CSS for a clean, approachable interface.

## Challenges We Faced

- Real-time resource freshness is hard. Scholarships open and close, and URLs change often, so we needed a flow that could pull live information instead of relying only on static datasets.
- Personalization without overfitting took iteration. We wanted recommendations that felt tailored without becoming so narrow that students missed broadly useful opportunities.
- Trust matters in financial products. The experience had to feel clear and grounded enough that students would actually rely on it.

## What We Learned

- Pairing a smart ranking layer with live web enrichment produces much stronger results than search alone.
- WorkOS made it possible to add production-grade authentication quickly without slowing down the build.
- In student finance tools, signal and clarity matter as much as raw features.

## What's Next

- Deadline tracking and notifications for expiring scholarships
- AI application assistance for essays and supporting materials
- Counselor-facing dashboards to spot support gaps across student groups
- Expansion beyond NYC into other cities and school ecosystems

## Built With

- Next.js
- OpenRouter
- React
- React Leaflet
- Tailwind CSS
- Tavily
- TypeScript
- WorkOS

## Getting Started

### Prerequisites

You'll need API keys for:

- [WorkOS](https://workos.com) for authentication
- [OpenRouter](https://openrouter.ai) for AI ranking and chat
- [Tavily](https://tavily.com) for live web search and enrichment

### Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the project root:

```env
WORKOS_API_KEY=your_workos_api_key
WORKOS_CLIENT_ID=your_workos_client_id
NEXT_PUBLIC_WORKOS_REDIRECT_URI=http://localhost:3000/api/auth/callback
WORKOS_COOKIE_PASSWORD=your_32_plus_char_secret

OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=openrouter/free

TAVILY_API_KEY=your_tavily_api_key
```

3. Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 to view the app locally.
