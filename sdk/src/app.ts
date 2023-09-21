import IOCContainer from "@/core/container/IOCContatiner";
import SDKInitializer from "@/core/SDKInitializer";
import AbstractStorage from "@/core/storage";
import { STORAGE_KEYS } from "@/constants/storage";
import { IOC_DEPENDENCIES_KEYS } from "@/constants/ioc";

const main = () => {
  const availableStorage = AbstractStorage.getAvailableStorage();
  if (!availableStorage) {
    throw new Error("No available storage");
  }

  IOCContainer.getInstance().register(
    IOC_DEPENDENCIES_KEYS.STORAGE,
    availableStorage,
  );

  new SDKInitializer();
};

export default main;
