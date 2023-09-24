import { Session } from "@prisma/client";
import { createSession } from "@/models/sdk/session";

export const handleNewSession = async ({
  createSessionFn,
  reqBody,
  baseUrl,
}: {
  createSessionFn: typeof createSession;
  reqBody: Session;
  baseUrl: string;
}): Promise<string> => {
  const { os, device, sessionStartTime } = reqBody;
  const session = await createSessionFn({
    os,
    device,
    baseUrl,
    sessionStartTime,
  });
  return session.id;
};
