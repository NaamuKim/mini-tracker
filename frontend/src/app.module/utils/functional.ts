export const go = <T>(input: T, ...fns: ((arg: any) => any)[]): any => {
  return fns.reduce((acc, fn) => fn(acc), input);
};
