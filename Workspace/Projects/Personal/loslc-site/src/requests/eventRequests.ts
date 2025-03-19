import { API_VERSION, SERVER_URL } from "@/env";
import axios from "axios";
import type { EventSchema } from "./schemas/eventSchemas";
import type { CommunityEvent } from "@/types/event";

const UPCOMING_EVENTS_URI = `${SERVER_URL}/${API_VERSION}/events/upcoming`;
const EVENTS_COUNT_URI = `${SERVER_URL}/${API_VERSION}/events/upcoming`;
const ALL_EVENTS_URI = `${SERVER_URL}/${API_VERSION}/events/`;
const EVENT_URI = `${SERVER_URL}/${API_VERSION}/events/`;
const CREATE_EVENT_URI = `${SERVER_URL}/${API_VERSION}/event/`;

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
  const events = response.data.map((evSchema: EventSchema) => {
    const ev: CommunityEvent = {
      id: evSchema.id,
      title: evSchema.title,
      description: evSchema.description,
      location: evSchema.location,
      date: evSchema.date,
      authorEmail: evSchema.author_email,
      coverImageUrl: evSchema.cover_image_url,
    };
    return ev;
  });
  return events;
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
  const events = response.data.map((evSchema: EventSchema) => {
    const ev: CommunityEvent = {
      id: evSchema.id,
      title: evSchema.title,
      description: evSchema.description,
      location: evSchema.location,
      date: evSchema.date,
      authorEmail: evSchema.author_email,
      coverImageUrl: evSchema.cover_image_url,
    };
    return ev;
  });
  return events;
}

export async function getEvent(id: string): Promise<CommunityEvent> {
  const response = await axios<EventSchema>({
    method: "GET",
    withCredentials: true,
    url: `${EVENT_URI}/${id}`,
  });
  const evSchema = response.data;
  const ev: CommunityEvent = {
    id: evSchema.id,
    title: evSchema.title,
    description: evSchema.description,
    location: evSchema.location,
    date: evSchema.date,
    authorEmail: evSchema.author_email,
    coverImageUrl: evSchema.cover_image_url,
  };
  return ev;
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
  const evSchema = response.data;
  const ev: CommunityEvent = {
    id: evSchema.id,
    title: evSchema.title,
    description: evSchema.description,
    location: evSchema.location,
    date: evSchema.date,
    authorEmail: evSchema.author_email,
    coverImageUrl: evSchema.cover_image_url,
  };
  return ev;
}
