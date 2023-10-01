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

export type TReferrers = {
  referrers: Array<{
    referrer: string;
    count: number;
    percent: string;
  }>;
};

export type TTopPageTransitions = {
  topPageTransitions: Array<{
    from: string;
    to: string;
    count: number;
  }>;
};
