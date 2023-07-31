import { UserPostedInfo } from "@/models/userPostedInfo";
import { fetcher } from "@/services/http/fetcher";

export const sendPageInfoToServer = <T extends UserPostedInfo>({
  previous_page,
  current_page,
  scrollY,
  scrollX,
}: T) => {
  const data = { previous_page, current_page, scrollY, scrollX };
  fetcher("http://localhost:8080/event/page-transition", {
    method: "POST",
    body: {
      ...data,
      event_type: "page-transition",
      url: window.location.href,
      referrer_url: document.referrer,
    },
  });
};
