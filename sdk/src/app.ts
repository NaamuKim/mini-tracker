import IOCContainer from "@/lib/core/container/IOCContatiner";
import SDKInitializer from "@/lib/core/SDKInitializer";
import Storage from "@/lib/core/storage";

const main = () => {
  const availableStorage = Storage.getAvailableStorage();
  if (!availableStorage) {
    throw new Error("No available storage");
  }

  IOCContainer.getInstance().register("Storage", availableStorage);

  new SDKInitializer();
};

export default main;
