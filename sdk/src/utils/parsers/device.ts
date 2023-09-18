type DevicePatterns = {
  [key: string]: RegExp;
};

const devicePatterns: DevicePatterns = {
  "Android Device": /Android/i,
  iPhone: /iPhone/i,
  iPad: /iPad/i,
  iPod: /iPod/i,
  "Windows PC": /Windows NT/i,
  Mac: /Macintosh/i,
  "Linux Device": /Linux/i,
};

export const parseDevice = (userAgent: string): string => {
  const device = Object.keys(devicePatterns).find((device) =>
    devicePatterns[device].test(userAgent),
  );
  return device || "Unknown";
};
