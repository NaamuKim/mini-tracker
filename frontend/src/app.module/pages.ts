export const getPages = (length: number) =>
  Array.from({ length }, (_, idx) => ({
    href: "/example/" + Number(idx + 1),
    pageNo: idx + 1,
  }));
