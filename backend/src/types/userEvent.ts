type EventType = "page_transition" | "click" | "input" | "scroll" | "resize";

export interface UserEvent {
  user_id?: string;
  session_id?: string;
  url: string;
  event_type: EventType;
  referrer_url: string;
}

export interface PageTransitionEvent extends UserEvent {
  scrollY: number;
  scrollX: number;
  previous_page: string;
  current_page: string;
}
