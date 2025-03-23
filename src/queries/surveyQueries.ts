import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  countSurveys,
  getAllActiveSurveys,
  getAllSurveys,
  getSurvey,
  createSurvey,
  updateSurvey,
  deleteSurvey,
  getSurveyQuestion,
  getSurveyQuestions,
  addQuestionToSurvey,
  updateSurveyQuestions,
  deleteSurveyQuestion,
  getSurveyResponse,
  getSurveyResponses,
  addResponseToSurvey,
  editSurveyResponse,
  deleteSurveyResponse,
} from "@/requests/surveyRequests";
import type { Survey, SurveyQuestion, SurveyResponse } from "@/types/survey";

// Keys for query caching
export const surveyKeys = {
  all: ["surveys"] as const,
  count: (active: boolean) => [...surveyKeys.all, "count", active] as const,
  list: (active: boolean) => [...surveyKeys.all, "list", active] as const,
  details: (id: string) => [...surveyKeys.all, "detail", id] as const,
  questions: {
    all: (surveyId: string) =>
      [...surveyKeys.all, "questions", surveyId] as const,
    detail: (surveyId: string, questionId: string) =>
      [...surveyKeys.all, "questions", surveyId, questionId] as const,
  },
  responses: {
    all: (surveyId: string) =>
      [...surveyKeys.all, "responses", surveyId] as const,
    detail: (responseId: string) =>
      [...surveyKeys.all, "response", responseId] as const,
  },
};

// Survey Queries
export function useSurveyCount(active: boolean) {
  return useQuery({
    queryKey: surveyKeys.count(active),
    queryFn: () => countSurveys(active),
  });
}

export function useActiveSurveys(offset = 0, limit = 10) {
  return useQuery({
    queryKey: [...surveyKeys.list(true), offset, limit],
    queryFn: () => getAllActiveSurveys(offset, limit),
  });
}

export function useAllSurveys(offset = 0, limit = 10) {
  return useQuery({
    queryKey: [...surveyKeys.list(false), offset, limit],
    queryFn: () => getAllSurveys(offset, limit),
  });
}

export function useSurvey(surveyId: string) {
  return useQuery({
    queryKey: surveyKeys.details(surveyId),
    queryFn: () => getSurvey(surveyId),
    enabled: !!surveyId,
  });
}

// Survey Mutations
export function useCreateSurvey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (survey: Survey) => createSurvey(survey),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: surveyKeys.all });
    },
  });
}

export function useUpdateSurvey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (survey: Survey) => updateSurvey(survey),
    onSuccess: (updatedSurvey) => {
      queryClient.invalidateQueries({
        queryKey: surveyKeys.details(updatedSurvey.id),
      });
      queryClient.invalidateQueries({ queryKey: surveyKeys.all });
    },
  });
}

export function useDeleteSurvey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (surveyId: string) => deleteSurvey(surveyId),
    onSuccess: (_data, surveyId) => {
      queryClient.invalidateQueries({ queryKey: surveyKeys.all });
      queryClient.removeQueries({ queryKey: surveyKeys.details(surveyId) });
    },
  });
}

// Survey Question Queries
export function useSurveyQuestions(surveyId: string) {
  return useQuery({
    queryKey: surveyKeys.questions.all(surveyId),
    queryFn: () => getSurveyQuestion(surveyId),
    enabled: !!surveyId,
  });
}

export function useSurveyQuestion(surveyId: string, questionId: string) {
  return useQuery({
    queryKey: surveyKeys.questions.detail(surveyId, questionId),
    queryFn: () => getSurveyQuestions(surveyId, questionId),
    enabled: !!surveyId && !!questionId,
  });
}

// Survey Question Mutations
export function useAddQuestionToSurvey(surveyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (question: SurveyQuestion) =>
      addQuestionToSurvey(surveyId, question),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: surveyKeys.questions.all(surveyId),
      });
    },
  });
}

export function useUpdateSurveyQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (question: SurveyQuestion) => updateSurveyQuestions(question),
    onSuccess: (updatedQuestion) => {
      queryClient.invalidateQueries({
        queryKey: surveyKeys.questions.all(updatedQuestion.surveyId),
      });
      queryClient.invalidateQueries({
        queryKey: surveyKeys.questions.detail(
          updatedQuestion.surveyId,
          updatedQuestion.id,
        ),
      });
    },
  });
}

export function useDeleteSurveyQuestion(surveyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (questionId: string) => deleteSurveyQuestion(questionId),
    onSuccess: (_data, questionId) => {
      queryClient.invalidateQueries({
        queryKey: surveyKeys.questions.all(surveyId),
      });
      queryClient.removeQueries({
        queryKey: surveyKeys.questions.detail(surveyId, questionId),
      });
    },
  });
}

// Survey Response Queries
export function useSurveyResponse(responseId: string) {
  return useQuery({
    queryKey: surveyKeys.responses.detail(responseId),
    queryFn: () => getSurveyResponse(responseId),
    enabled: !!responseId,
  });
}

export function useSurveyResponses(surveyId: string, offset = 0, limit = 10) {
  return useQuery({
    queryKey: [...surveyKeys.responses.all(surveyId), offset, limit],
    queryFn: () => getSurveyResponses(surveyId, offset, limit),
    enabled: !!surveyId,
  });
}

// Survey Response Mutations
export function useAddResponseToSurvey(surveyId: string, questionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (response: SurveyResponse) =>
      addResponseToSurvey(surveyId, questionId, response),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: surveyKeys.responses.all(surveyId),
      });
    },
  });
}

export function useEditSurveyResponse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      surveyId,
      questionId,
    }: { surveyId: string; questionId: string }) =>
      editSurveyResponse(surveyId, questionId),
    onSuccess: (_data, { surveyId }) => {
      queryClient.invalidateQueries({
        queryKey: surveyKeys.responses.all(surveyId),
      });
    },
  });
}

export function useDeleteSurveyResponse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (surveyId: string) => deleteSurveyResponse(surveyId),
    onSuccess: (_data, surveyId) => {
      queryClient.invalidateQueries({
        queryKey: surveyKeys.responses.all(surveyId),
      });
    },
  });
}
