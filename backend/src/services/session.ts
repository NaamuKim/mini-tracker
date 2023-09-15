import { Session } from "@prisma/client";
import { createSession } from "@/models/session";

export const handleNewSession = async ({
  createSessionFn,
  reqBody,
  baseUrl,
}: {
  createSessionFn: typeof createSession;
  reqBody: Session;
  baseUrl: string;
}): Promise<string> => {
  const { userAgent, appVersion, sessionStartTime } = reqBody;
  const session = await createSessionFn({
    userAgent,
    appVersion,
    baseUrl,
    sessionStartTime,
  });
  return session.id;
};
