export type ConditionCategory =
  | "Cold & Flu"
  | "Digestive"
  | "Skin"
  | "Mental Wellbeing"
  | "Aches & Pains"
  | "Allergies";

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