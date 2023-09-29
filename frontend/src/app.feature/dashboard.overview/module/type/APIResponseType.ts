export type TTopStayed = {
  topStayed: Array<{
    pageLocation: string;
    duration: number;
  }>;
};

export type TTopVisited = {
  topVisited: Array<{
    pageLocation: string;
    count: number;
  }>;
};
