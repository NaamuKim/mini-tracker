export const ENV_CONSTANTS = {
  APP_URL: process.env.NEXT_PUBLIC_APP_URL as string,
  APP_EXAMPLE_PAGE_URL: (process.env.NEXT_PUBLIC_APP_URL +
    "/example") as string,
  APP_SDK_URL: process.env.NEXT_PUBLIC_SDK_URL as string,
  API_DASHBOARD_URL: process.env.NEXT_PUBLIC_API_DASHBOARD_URL as string,
  API_URL: process.env.NEXT_PUBLIC_API_URL as string,
} as const;
