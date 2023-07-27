import { UserPostedInfo } from "@/models/userPostedInfo";
import { sendPageInfoToServer } from "@/services/collector";
import { IStorage } from "@/services/storage/IStorage";

export const handlePageChange = (storage: IStorage) => {
  const previousPage = storage.getItem("previousPage") || window.location.href;
  const currentPage = window.location.href;
  if (currentPage !== previousPage) {
    sendPageInfoToServer<UserPostedInfo>({
      previousPage,
      currentPage,
      scrollY: window.scrollY,
      scrollX: window.scrollX,
    });
    localStorage.setItem("previousPage", currentPage);
  }
};
