type TCondition = {
  [key: string]: any;
};
export const whereWithCondition =
  (baseCondition: TCondition) => (additionalCondition: TCondition) => ({
    where: {
      ...baseCondition,
      ...additionalCondition,
    },
  });
