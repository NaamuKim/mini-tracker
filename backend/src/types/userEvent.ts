import { RowDataPacket } from "mysql2";

type EventType = "page-transition" | "click" | "input" | "scroll" | "page-view";

export interface UserEvent {
  user_id?: string;
  session_id?: string;
  url: string;
  event_type: EventType;
  referrer_url: string;
}

export interface PageTransitionEvent extends RowDataPacket {
  scrollY: number;
  scrollX: number;
  previous_page: string;
  current_page: string;
}

export interface JoinedPageTransitionEvent extends PageTransitionEvent {
  event_timestamp: string;
}

export interface BestPageTransitionEvent extends RowDataPacket {
  current_page: string;
  previous_page: string;
  transition_count: number;
}
