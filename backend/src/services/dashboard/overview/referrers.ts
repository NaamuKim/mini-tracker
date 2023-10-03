import { findReferrers } from "@/models/dashboard/overview/referrers";

export const retrieveReferrers = async ({
  queriedUrl,
}: {
  queriedUrl: string;
}) => {
  const referrers = await findReferrers({ queriedUrl });
  return getReferrersWithPercent(getFlatReferrers(referrers));
};

const getFlatReferrers = (
  referrers: Awaited<ReturnType<typeof findReferrers>>,
) => {
  return referrers.map(({ referrer, _count: { referrer: count } }) => ({
    referrer: referrer || "Direct",
    count,
  }));
};

const getReferrersWithPercent = (
  referrers: { count: number; referrer: string }[],
) => {
  const total = referrers.reduce((acc, { count }) => acc + Number(count), 0);
  return referrers.map((referrer) => ({
    ...referrer,
    percent: ((Number(referrer.count) / total) * 100).toFixed(2),
  }));
};
