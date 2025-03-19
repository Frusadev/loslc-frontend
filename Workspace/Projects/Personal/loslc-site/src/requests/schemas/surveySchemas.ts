import type { User as UserSchema } from "./userSchemas";

export type SurveySchema = {
  id?: string;
  title: string;
  description: string;
  active: boolean;
  author: UserSchema;
};

export type SurveyQuestionSchema = {
  id?: string;
  author: UserSchema;
  survey_id: string;
  title: string;
  choices: string[]
  question_type: "text" | "multiselect" | "select";
};

export type SurveyResponseSchema = {
  id?: string;
  survey_id: string;
  question_id: string;
  answers: string[];
  response_type: "text" | "multiselect" | "select";
  responder_email: string;
};
