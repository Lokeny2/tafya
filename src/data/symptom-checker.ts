export type Outcome = {
  type: "self-care" | "see-gp" | "urgent";
  title: string;
  description: string;
  advice: string[];
};

export type Question = {
  id: string;
  text: string;
  choices: {
    label: string;
    next: string; // id of next question, or "outcome:self-care|see-gp|urgent"
  }[];
};

export type Tree = {
  startId: string;
  questions: Record<string, Question>;
  outcomes: Record<string, Outcome>;
};

export const symptomTree: Tree = {
  startId: "start",
  questions: {
    start: {
      id: "start",
      text: "What is your main symptom right now?",
      choices: [
        { label: "Fever or high temperature", next: "fever" },
        { label: "Chest pain or tightness", next: "chest" },
        { label: "Headache", next: "headache" },
        { label: "Stomach or digestive issues", next: "stomach" },
        { label: "Skin irritation or rash", next: "skin" },
        { label: "Cough or sore throat", next: "cough" },
      ],
    },

    // --- FEVER BRANCH ---
    fever: {
      id: "fever",
      text: "How high is your temperature, and how long have you had it?",
      choices: [
        { label: "Very high (above 39°C) or for more than 3 days", next: "outcome:see-gp" },
        { label: "Accompanied by a stiff neck or rash", next: "outcome:urgent" },
        { label: "Mild and less than 2 days", next: "fever-other" },
      ],
    },
    "fever-other": {
      id: "fever-other",
      text: "Are you in a high-risk group — pregnant, elderly, or with a chronic condition?",
      choices: [
        { label: "Yes", next: "outcome:see-gp" },
        { label: "No", next: "outcome:self-care" },
      ],
    },

    // --- CHEST BRANCH ---
    chest: {
      id: "chest",
      text: "How would you describe the chest pain?",
      choices: [
        { label: "Severe, crushing, or spreading to my arm or jaw", next: "outcome:urgent" },
        { label: "Sharp when breathing in", next: "outcome:see-gp" },
        { label: "Mild tightness, possibly stress-related", next: "chest-other" },
      ],
    },
    "chest-other": {
      id: "chest-other",
      text: "Do you have any shortness of breath alongside it?",
      choices: [
        { label: "Yes", next: "outcome:see-gp" },
        { label: "No", next: "outcome:self-care" },
      ],
    },

    // --- HEADACHE BRANCH ---
    headache: {
      id: "headache",
      text: "How would you describe the headache?",
      choices: [
        { label: "Sudden and extremely severe — the worst of my life", next: "outcome:urgent" },
        { label: "With a stiff neck, fever, or sensitivity to light", next: "outcome:urgent" },
        { label: "Persistent, lasting more than 3 days", next: "outcome:see-gp" },
        { label: "Dull ache, stress or tension-related", next: "outcome:self-care" },
      ],
    },

    // --- STOMACH BRANCH ---
    stomach: {
      id: "stomach",
      text: "What is the main digestive symptom?",
      choices: [
        { label: "Severe abdominal pain", next: "stomach-severe" },
        { label: "Diarrhoea or vomiting", next: "stomach-dv" },
        { label: "Bloating or indigestion", next: "outcome:self-care" },
      ],
    },
    "stomach-severe": {
      id: "stomach-severe",
      text: "Is the pain constant and getting worse?",
      choices: [
        { label: "Yes", next: "outcome:urgent" },
        { label: "No, it comes and goes", next: "outcome:see-gp" },
      ],
    },
    "stomach-dv": {
      id: "stomach-dv",
      text: "Are you showing signs of dehydration — very dry mouth, no urination, dizziness?",
      choices: [
        { label: "Yes", next: "outcome:see-gp" },
        { label: "No", next: "outcome:self-care" },
      ],
    },

    // --- SKIN BRANCH ---
    skin: {
      id: "skin",
      text: "What does the skin issue look like?",
      choices: [
        { label: "A spreading rash with fever", next: "outcome:urgent" },
        { label: "Itchy, dry, or inflamed patches", next: "outcome:self-care" },
        { label: "A new or changing mole or growth", next: "outcome:see-gp" },
      ],
    },

    // --- COUGH BRANCH ---
    cough: {
      id: "cough",
      text: "How long have you had the cough or sore throat?",
      choices: [
        { label: "More than 3 weeks", next: "outcome:see-gp" },
        { label: "Coughing up blood", next: "outcome:urgent" },
        { label: "Less than a week, mild", next: "outcome:self-care" },
      ],
    },
  },

  outcomes: {
    "self-care": {
      type: "self-care",
      title: "Self-care at home",
      description: "Based on your answers, your symptoms are likely manageable at home.",
      advice: [
        "Rest and stay well hydrated",
        "Use over-the-counter remedies appropriate to your symptoms",
        "Monitor your symptoms — if they worsen or persist beyond a few days, contact a doctor",
      ],
    },
    "see-gp": {
      type: "see-gp",
      title: "See a doctor soon",
      description: "Your symptoms suggest you should speak to a healthcare professional.",
      advice: [
        "Book an appointment with your GP or local clinic",
        "If you cannot get an appointment quickly and symptoms worsen, visit an urgent care centre",
        "Keep a note of your symptoms and when they started",
      ],
    },
    urgent: {
      type: "urgent",
      title: "Seek urgent help",
      description: "Your symptoms may need immediate medical attention.",
      advice: [
        "Go to your nearest A&E department or call emergency services",
        "Do not drive yourself if you are in severe pain or feel faint",
        "If in doubt, always call for emergency help",
      ],
    },
  },
};