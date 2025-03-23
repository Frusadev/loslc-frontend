import { API_VERSION, SERVER_URL } from "@/env";
import axios from "axios";
import type { EventSchema } from "./schemas/eventSchemas";
import {
  eventFromSchema,
  eventToSchema,
  type CommunityEvent,
} from "@/types/event";

const UPCOMING_EVENTS_URI = `${SERVER_URL}/${API_VERSION}/events/upcoming`;
const EVENTS_COUNT_URI = `${SERVER_URL}/${API_VERSION}/events/upcoming`;
const ALL_EVENTS_URI = `${SERVER_URL}/${API_VERSION}/events/`;
const EVENT_URI = `${SERVER_URL}/${API_VERSION}/events/`;
const CREATE_EVENT_URI = `${SERVER_URL}/${API_VERSION}/event/`;
const EDIT_EVENT_URI = `${SERVER_URL}/${API_VERSION}/event`;

export async function getEventCount(): Promise<number> {
  const response = await axios<number>({
    method: "GET",
    withCredentials: true,
    url: `${EVENTS_COUNT_URI}`,
  });
  return response.data;
}

export async function getUpcomingEvents(
  offset: number,
  limit: number,
): Promise<CommunityEvent[]> {
  const response = await axios<EventSchema[]>({
    method: "GET",
    params: {
      offset: offset,
      limit: limit,
    },
    withCredentials: true,
    url: UPCOMING_EVENTS_URI,
  });
  return response.data.map(eventFromSchema);
}

export async function getAllEvents(
  offset: number,
  limit: number,
): Promise<CommunityEvent[]> {
  const response = await axios<EventSchema[]>({
    method: "GET",
    params: {
      offset: offset,
      limit: limit,
    },
    withCredentials: true,
    url: ALL_EVENTS_URI,
  });
  return response.data.map(eventFromSchema);
}

export async function getEvent(id: string): Promise<CommunityEvent> {
  const response = await axios<EventSchema>({
    method: "GET",
    withCredentials: true,
    url: `${EVENT_URI}/${id}`,
  });
  return eventFromSchema(response.data);
}

export async function createEvent(
  cEvent: CommunityEvent,
): Promise<CommunityEvent> {
  const response = await axios<EventSchema>({
    method: "POST",
    withCredentials: true,
    url: CREATE_EVENT_URI,
    data: cEvent,
  });
  return eventFromSchema(response.data);
}

export async function editEvent(communityEvent: CommunityEvent) {
  const axiosResponse = await axios<EventSchema>({
    method: "PUT",
    url: `${EDIT_EVENT_URI}`,
    withCredentials: true,
    data: eventToSchema(communityEvent),
  });
  return eventFromSchema(axiosResponse.data);
}

export async function deleteEvent(eventId: string) {
  await axios({
    method: "DELETE",
    url: `${EDIT_EVENT_URI}`,
    withCredentials: true,
    params: {
      event_id: eventId,
    },
  });
}
