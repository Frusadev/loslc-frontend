import { API_VERSION, SERVER_URL } from "@/env";
import {
  surveyFromSchema,
  surveyQuestionFromSchema,
  surveyQuestionToSchema,
  type SurveyResponse,
  surveyResponseToSchema,
  surveyToSchema,
  type Survey,
  type SurveyQuestion,
  surveyResponseFromSchema,
} from "@/types/survey";
import axios from "axios";
import type {
  SurveyResponseSchema,
  SurveyQuestionSchema,
  SurveySchema,
} from "./schemas/surveySchemas";

const SURVEY_GET_URI = `${SERVER_URL}/${API_VERSION}/surveys`;
const SURVEY_CREATE_URI = `${SERVER_URL}/${API_VERSION}/survey`;
const SURVEY_QUESTION_CREATE_URL_BASE = `${SERVER_URL}/${API_VERSION}/surveys`;
const SURVEY_EDIT_URI = `${SERVER_URL}/${API_VERSION}/survey`;
const SURVEY_DELETE_URI = `${SERVER_URL}/${API_VERSION}/survey`;
const SURVEY_QUESTIONS_URI = `${SERVER_URL}/${API_VERSION}/surveys`;
const SURVEY_QUESTION_EDIT_URI = `${SERVER_URL}/${API_VERSION}/survey/question`;
const SURVEY_QUESTION_DELETE_URI = `${SERVER_URL}/${API_VERSION}/survey/question`;
const SURVEY_COUNT_URI = `${SERVER_URL}/${API_VERSION}/surveys/count`;
const SURVEY_RESPONSE_ADD_URI = `${SERVER_URL}/${API_VERSION}/surveys`;
const SURVEY_RESPONSE_GET_URI = `${SERVER_URL}/${API_VERSION}/survey/response`;
const SURVEY_RESPONSES_GET_URI = `${SERVER_URL}/${API_VERSION}/surveys`;
const SURVEY_RESPONSE_EDIT_URI = `${SERVER_URL}/${API_VERSION}/survey/response/edit`;
const SURVEY_RESPONSE_DELETE_URI = `${SERVER_URL}/${API_VERSION}/survey/response/delete`;

export async function countSurveys(active: boolean): Promise<number> {
  const request = await axios<number>({
    method: "GET",
    url: SURVEY_COUNT_URI,
    withCredentials: true,
    params: {
      active: active,
    },
  });
  return request.data;
}

export async function getAllActiveSurveys(
  offset: number,
  limit: number,
): Promise<Survey[]> {
  const request = await axios<SurveySchema[]>({
    method: "GET",
    url: SURVEY_GET_URI,
    withCredentials: true,
    params: {
      offset: offset,
      limit: limit,
      active: true,
    },
  });
  return request.data.map(surveyFromSchema);
}

export async function getAllSurveys(
  offset: number,
  limit: number,
): Promise<Survey[]> {
  const request = await axios<SurveySchema[]>({
    method: "GET",
    url: SURVEY_GET_URI,
    withCredentials: true,
    params: {
      offset: offset,
      limit: limit,
      active: false,
    },
  });
  return request.data.map(surveyFromSchema);
}
export async function getSurvey(surveyId: string) {
  const surveyRequest = await axios<SurveySchema>({
    method: "GET",
    url: `${SURVEY_GET_URI}/${surveyId}`,
    withCredentials: true,
  });
  const surveyResponse = surveyRequest.data;
  const survey: Survey = surveyFromSchema(surveyResponse);
  return survey;
}

export async function createSurvey(survey: Survey): Promise<Survey> {
  const surveySchema: SurveySchema = surveyToSchema(survey);
  const surveyRequest = await axios<SurveySchema>({
    method: "POST",
    url: SURVEY_CREATE_URI,
    withCredentials: true,
    data: surveySchema,
  });
  return surveyFromSchema(surveyRequest.data);
}

export async function updateSurvey(survey: Survey): Promise<Survey> {
  const surveySchema: SurveySchema = surveyToSchema(survey);
  const request = await axios<SurveySchema>({
    method: "PUT",
    url: `${SURVEY_EDIT_URI}`,
    data: surveySchema,
    withCredentials: true,
  });
  return surveyFromSchema(request.data);
}

export async function deleteSurvey(surveyId: string) {
  await axios({
    method: "DELETE",
    url: SURVEY_DELETE_URI,
    withCredentials: true,
    params: {
      survey_id: surveyId,
    },
  });
}

export async function getSurveyQuestion(surveyId: string) {
  const request = await axios<SurveyQuestionSchema[]>({
    method: "GET",
    url: `${SURVEY_QUESTIONS_URI}/${surveyId}/questions`,
    withCredentials: true,
  });
  return request.data.map(surveyQuestionFromSchema);
}

export async function getSurveyQuestions(surveyId: string, questionId: string) {
  const request = await axios<SurveyQuestionSchema>({
    method: "GET",
    url: `${SURVEY_QUESTIONS_URI}/${surveyId}/questions/${questionId}`,
    withCredentials: true,
  });
  return surveyQuestionFromSchema(request.data);
}

export async function addQuestionToSurvey(
  surveyId: string,
  question: SurveyQuestion,
): Promise<SurveyQuestion> {
  const surveyQuestionSchema: SurveyQuestionSchema =
    surveyQuestionToSchema(question);
  const request = await axios<SurveyQuestionSchema>({
    method: "POST",
    url: `${SURVEY_QUESTION_CREATE_URL_BASE}/${surveyId}/questions/create`,
    withCredentials: true,
    data: surveyQuestionSchema,
  });
  return surveyQuestionFromSchema(request.data);
}

export async function updateSurveyQuestions(
  question: SurveyQuestion,
): Promise<SurveyQuestion> {
  const request = await axios<SurveyQuestionSchema>({
    method: "PUT",
    url: SURVEY_QUESTION_EDIT_URI,
    withCredentials: true,
    data: surveyQuestionToSchema(question),
  });
  return surveyQuestionFromSchema(request.data);
}

export async function deleteSurveyQuestion(questionId: string) {
  await axios({
    method: "DELETE",
    url: `${SURVEY_QUESTION_DELETE_URI}`,
    withCredentials: true,
    params: {
      question_id: questionId,
    },
  });
}

export async function getSurveyResponse(
  responseId: string,
): Promise<SurveyResponse> {
  const request = await axios<SurveyResponseSchema>({
    method: "GET",
    url: `${SURVEY_RESPONSE_GET_URI}/${responseId}`,
    withCredentials: true,
  });
  return surveyResponseFromSchema(request.data);
}

export async function getSurveyResponses(
  surveyId: string,
  offset: number,
  limit: number,
): Promise<SurveyResponse[]> {
  const request = await axios<SurveyResponseSchema[]>({
    method: "GET",
    url: `${SURVEY_RESPONSES_GET_URI}/${surveyId}/responses`,
    withCredentials: true,
    params: {
      offset: offset,
      limit: limit,
    },
  });
  return request.data.map(surveyResponseFromSchema);
}

export async function addResponseToSurvey(
  surveyId: string,
  questionId: string,
  response: SurveyResponse,
): Promise<SurveyResponse> {
  const request = await axios<SurveyResponseSchema>({
    method: "POST",
    url: `${SURVEY_QUESTIONS_URI}/${surveyId}/response/`,
    withCredentials: true,
    params: {
      question_id: questionId,
    },
    data: surveyResponseToSchema(response),
  });
  return surveyResponseFromSchema(request.data);
}

export async function editSurveyResponse(
  surveyId: string,
  questionId: string,
): Promise<SurveyResponse> {
  const request = await axios<SurveyResponseSchema>({
    method: "PUT",
    url: SURVEY_RESPONSE_EDIT_URI,
    withCredentials: true,
    params: {
      survey_id: surveyId,
      question_id: questionId,
    },
  });
  return surveyResponseFromSchema(request.data);
}

export async function deleteSurveyResponse(surveyId: string) {
  await axios({
    method: "DELETE",
    url: SURVEY_RESPONSE_DELETE_URI,
    withCredentials: true,
    params: {
      survey_id: surveyId,
    },
  });
}
