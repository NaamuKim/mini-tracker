export interface PageTransition {
  user_event_id: number;
  current_page: string | null;
  previous_page: string | null;
  scrollY: number;
  scrollX: number;
  event_timestamp: string;
}

export interface BestPageTransition {
  current_page: string;
  previous_page: string;
  transition_count: number;
}
