import { API_VERSION, SERVER_URL } from "@/env";
import type { Survey } from "@/types/survey";
import axios from "axios";
import type {
  SurveyQuestionSchema,
  SurveySchema,
} from "./schemas/surveySchemas";

const SURVEY_GET_URL = `${SERVER_URL}/${API_VERSION}/surveys`;
const SURVEY_CREATE_URL = `${SERVER_URL}/${API_VERSION}/survey/create`;

export async function getSurvey(surveyId: string) {
  const surveyRequest = await axios<SurveySchema>({
    method: "GET",
    url: `${SURVEY_GET_URL}/${surveyId}`,
    withCredentials: true,
  });
  const surveyQuestionsRequest = await axios<SurveyQuestionSchema[]>({
    method: "GET",
    url: `${SURVEY_GET_URL}/${surveyId}/questions`,
    withCredentials: true,
  });
  const surveyResponse = surveyRequest.data;
  const survey: Survey = {
    id: surveyResponse.id,
    title: surveyResponse.title,
    description: surveyResponse.description,
    active: surveyResponse.active,
    author: {
      id: surveyResponse.author.id,
      username: surveyResponse.author.username,
      email: surveyResponse.author.email,
      accountType: surveyResponse.author.account_type,
    },
  };
  return survey;
}

export async function createSurvey(survey: Survey): Promise<Survey> {
  const surveySchema: SurveySchema = {
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
  const surveyRequest = await axios<SurveySchema>({
    method: "POST",
    url: SURVEY_CREATE_URL,
    withCredentials: true,
    data: surveySchema,
  });
  return {
    id: surveyRequest.data.id,
    title: surveyRequest.data.title,
    description: surveyRequest.data.description,
    active: surveyRequest.data.active,
    author: {
      id: surveyRequest.data.author.id,
      username: surveyRequest.data.author.username,
      email: surveyRequest.data.author.email,
      accountType: surveyRequest.data.author.account_type,
    },
  };
}
