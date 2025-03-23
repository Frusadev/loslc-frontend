import type {
  SurveyQuestionSchema,
  SurveyResponseSchema,
  SurveySchema,
} from "@/requests/schemas/surveySchemas";
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

export type SurveyResponse = {
  id?: string;
  surveyId: string;
  questionId: string;
  answers: string[];
  responseType: "text" | "multiselect" | "select";
  responderEmail: string;
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

export function surveyToSchema(survey: Survey): SurveySchema {
  return {
    id: survey.id,
    title: survey.title,
    description: survey.description,
    active: survey.active,
    author: {
      id: survey.author.id,
      username: survey.author.username,
      email: survey.author.email,
      account_type: survey.author.accountType,
    },
  };
}

export function surveyQuestionFromSchema(
  schema: SurveyQuestionSchema,
): SurveyQuestion {
  return {
    id: schema.id,
    title: schema.title,
    questionType: schema.question_type,
    choices: schema.choices,
    surveyId: schema.survey_id,
    author: {
      id: schema.author.id,
      username: schema.author.username,
      email: schema.author.email,
      accountType: schema.author.account_type,
    },
  };
}

export function surveyQuestionToSchema(
  question: SurveyQuestion,
): SurveyQuestionSchema {
  return {
    id: question.id,
    title: question.title,
    question_type: question.questionType,
    choices: question.choices,
    survey_id: question.surveyId,
    author: {
      id: question.author.id,
      username: question.author.username,
      email: question.author.email,
      account_type: question.author.accountType,
    },
  };
}

export function surveyResponseFromSchema(
  schema: SurveyResponseSchema,
): SurveyResponse {
  return {
    id: schema.id,
    surveyId: schema.survey_id,
    questionId: schema.question_id,
    answers: schema.answers,
    responseType: schema.response_type,
    responderEmail: schema.responder_email,
  };
}

export function surveyResponseToSchema(
  response: SurveyResponse,
): SurveyResponseSchema {
  return {
    id: response.id,
    survey_id: response.surveyId,
    question_id: response.questionId,
    answers: response.answers,
    response_type: response.responseType,
    responder_email: response.responderEmail,
  };
}
