import type { Topic } from "../types/topic";

export const topics: Topic[] = [
  {
    slug: "staying-active",
    title: "Staying Active",
    category: "Physical Health",
    summary: "Simple ways to build more movement into your day.",
    body: "You don't need an intense workout to benefit from physical activity. Short walks, taking the stairs, and regular stretching breaks all add up over the course of a day and support long-term health, mood, and energy levels.",
    tips: [
      "Aim for at least 150 minutes of moderate activity a week, spread across several days",
      "Break activity into shorter chunks if a long session feels daunting",
      "Choose activities you actually enjoy, so they're easier to stick with",
      "Involve a friend or family member for accountability",
    ],
  },
  {
    slug: "eating-well",
    title: "Eating Well",
    category: "Physical Health",
    summary: "Building balanced, sustainable eating habits.",
    body: "Focusing on variety, rather than restriction, tends to be more sustainable long-term. A mix of vegetables, whole grains, and protein supports steady energy throughout the day and reduces the temptation of quick, less balanced choices.",
    tips: [
      "Fill half your plate with vegetables or fruit where you can",
      "Choose whole grains over refined ones when possible",
      "Stay hydrated throughout the day",
      "Plan meals ahead to avoid relying on convenience food",
    ],
  },
  {
    slug: "sleep-and-wellbeing",
    title: "Sleep and Wellbeing",
    category: "Mental Wellbeing",
    summary: "Why consistent sleep matters for both body and mind.",
    body: "Aiming for a consistent sleep and wake time, even on weekends, helps regulate your body's internal clock. Good sleep supports mood, concentration, and your immune system, while poor sleep can make everyday stress feel harder to manage.",
    tips: [
      "Keep a consistent bedtime and wake time",
      "Limit screens for an hour before bed",
      "Keep your bedroom cool, dark, and quiet",
      "Avoid large meals or caffeine late in the day",
    ],
  },
  {
    slug: "managing-everyday-stress",
    title: "Managing Everyday Stress",
    category: "Mental Wellbeing",
    summary: "Practical ways to manage stress before it builds up.",
    body: "Some stress is a normal part of life, but ongoing, unmanaged stress can affect both your mood and physical health. Building small habits — rather than waiting for a crisis point — makes it easier to stay on top of.",
    tips: [
      "Break large tasks into smaller, manageable steps",
      "Make time for something enjoyable each day, even briefly",
      "Practice slow, deep breathing when you notice tension rising",
      "Talk to someone you trust when things feel overwhelming",
    ],
  },
  {
    slug: "handwashing-and-infection-prevention",
    title: "Handwashing and Infection Prevention",
    category: "Preventive Care",
    summary: "Simple habits that reduce the spread of common infections.",
    body: "Many everyday illnesses, from colds to stomach bugs, spread through contact with contaminated hands and surfaces. A few consistent habits go a long way toward reducing your risk and protecting people around you.",
    tips: [
      "Wash hands with soap for at least 20 seconds, especially before eating",
      "Cover coughs and sneezes with your elbow, not your hands",
      "Avoid touching your face with unwashed hands",
      "Clean frequently touched surfaces regularly",
    ],
  },
  {
    slug: "routine-health-checks",
    title: "Routine Health Checks",
    category: "Preventive Care",
    summary: "Why regular check-ups matter, even when you feel well.",
    body: "Routine health checks can catch potential issues early, often before symptoms appear. Staying on top of check-ups, screenings, and vaccinations relevant to your age and circumstances is one of the simplest ways to protect your long-term health.",
    tips: [
      "Keep track of when your last check-ups and screenings were",
      "Don't wait for symptoms to book a routine appointment",
      "Keep vaccinations up to date",
      "Ask your healthcare provider what's recommended for your age group",
    ],
  },
];