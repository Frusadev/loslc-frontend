import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getEventCount,
  getUpcomingEvents,
  getAllEvents,
  getEvent,
  createEvent,
  editEvent,
  deleteEvent,
} from "@/requests/eventRequests";
import type { CommunityEvent } from "@/types/event";

// Keys for query caching
export const eventKeys = {
  all: ["events"] as const,
  count: () => [...eventKeys.all, "count"] as const,
  upcoming: () => [...eventKeys.all, "upcoming"] as const,
  list: () => [...eventKeys.all, "list"] as const,
  details: (id: string) => [...eventKeys.all, "detail", id] as const,
};

// Event Queries
export function useEventCount() {
  return useQuery({
    queryKey: eventKeys.count(),
    queryFn: () => getEventCount(),
  });
}

export function useUpcomingEvents(offset = 0, limit = 10) {
  return useQuery({
    queryKey: [...eventKeys.upcoming(), offset, limit],
    queryFn: () => getUpcomingEvents(offset, limit),
  });
}

export function useAllEvents(offset = 0, limit = 10) {
  return useQuery({
    queryKey: [...eventKeys.list(), offset, limit],
    queryFn: () => getAllEvents(offset, limit),
  });
}

export function useEvent(eventId: string) {
  return useQuery({
    queryKey: eventKeys.details(eventId),
    queryFn: () => getEvent(eventId),
    enabled: !!eventId,
  });
}

// Event Mutations
export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (event: CommunityEvent) => createEvent(event),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: eventKeys.all });
    },
  });
}

export function useEditEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (event: CommunityEvent) => editEvent(event),
    onSuccess: (updatedEvent) => {
      queryClient.invalidateQueries({
        queryKey: eventKeys.details(updatedEvent.id),
      });
      queryClient.invalidateQueries({ queryKey: eventKeys.all });
    },
  });
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventId: string) => deleteEvent(eventId),
    onSuccess: (_data, eventId) => {
      queryClient.invalidateQueries({ queryKey: eventKeys.all });
      queryClient.removeQueries({ queryKey: eventKeys.details(eventId) });
    },
  });
}
