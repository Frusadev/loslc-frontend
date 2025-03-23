import type { EventSchema } from "@/requests/schemas/eventSchemas";

export type CommunityEvent = {
  id?: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  coverImageUrl: string;
  authorEmail: string;
};

export function eventFromSchema(schema: EventSchema): CommunityEvent {
  return {
    id: schema.id,
    title: schema.title,
    description: schema.description,
    date: new Date(schema.date),
    location: schema.location,
    coverImageUrl: schema.cover_image_url,
    authorEmail: schema.author_email,
  };
}

export function eventToSchema(event: CommunityEvent): EventSchema {
  return {
    id: event.id,
    title: event.title,
    description: event.description,
    date: event.date,
    location: event.location,
    cover_image_url: event.coverImageUrl,
    author_email: event.authorEmail,
  };
}
