import type { SurveySchema } from "@/requests/schemas/surveySchemas";
import type { User } from "./user";

export type Survey = {
  id?: string;
  title: string;
  description: string;
  active: boolean;
  author: User;
};

export type SurveyQuestion = {
  id?: string;
  author: User;
  surveyId: string;
  title: string;
  choices: string[];
  questionType: "text" | "multiselect" | "select";
};

export function surveyFromSchema(schema: SurveySchema): Survey {
  return {
    id: schema.id,
    title: schema.title,
    description: schema.description,
    active: schema.active,
    author: {
      id: schema.author.id,
      username: schema.author.username,
      email: schema.author.email,
      accountType: schema.author.account_type,
    },
  };
}
