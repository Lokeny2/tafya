export type ConditionCategory =
  | "Cold & Flu"
  | "Digestive"
  | "Skin"
  | "Mental Wellbeing"
  | "Aches & Pains"
  | "Allergies"
  | "Eye"
  | "Urinary"
  | "Respiratory"
  | "Heart & Circulatory"
  | "Ear, Nose & Throat"
  | "Neurological"
  | "Infectious Diseases"
  | "Bone & Joint"
  | "Endocrine & Metabolic"
  | "Women's Health"
  | "Men's Health";

export type Condition = {
  slug: string;
  title: string;
  category: ConditionCategory;
  summary: string;
  symptoms: string[];
  causes: string;
  selfCare: string[];
  whenToSeekHelp: string;
  relatedConditions: string[];
};