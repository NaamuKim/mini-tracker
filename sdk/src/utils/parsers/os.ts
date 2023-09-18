type OSPatterns = {
  [key: string]: RegExp;
};

const osPatterns: OSPatterns = {
  Android: /Android/i,
  iOS: /iPhone|iPad|iPod/i,
  Windows: /Windows NT/i,
  MacOS: /Mac OS X/i,
  Linux: /Linux/i,
};

export const parseOS = (userAgent: string): string => {
  const os = Object.keys(osPatterns).find((os) =>
    osPatterns[os].test(userAgent),
  );
  return os || "Unknown";
};
