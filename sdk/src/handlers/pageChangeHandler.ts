import { UserPostedInfo } from "@/models/userPostedInfo";
import { sendPageTransitionInfoToServer } from "@/services/collector";
import { IStorage } from "@/services/storage/IStorage";

export const handlePageChange = (storage: IStorage) => {
  const previousPage = storage.getItem("previousPage") || window.location.href;
  const currentPage = window.location.href;
  if (currentPage !== previousPage) {
    sendPageTransitionInfoToServer<UserPostedInfo>({
      previous_page: previousPage,
      current_page: currentPage,
      scrollY: window.scrollY,
      scrollX: window.scrollX,
    });
    localStorage.setItem("previousPage", currentPage);
  }
};
