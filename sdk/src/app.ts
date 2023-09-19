import IOCContainer from "@/core/container/IOCContatiner";
import SDKInitializer from "@/core/SDKInitializer";
import AbstractStorage from "@/core/storage";

const main = () => {
  const availableStorage = AbstractStorage.getAvailableStorage();
  if (!availableStorage) {
    throw new Error("No available storage");
  }

  IOCContainer.getInstance().register("Storage", availableStorage);

  new SDKInitializer();
};

export default main;
