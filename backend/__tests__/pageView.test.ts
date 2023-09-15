import request from "supertest";
import app from "../src/app";
import { handleNewSession } from "../src/services/session";
import { insertPageView } from "../src/models/pageView";

jest.mock("../src/services/session");
jest.mock("../src/models/pageView");
const mockCreateSession = handleNewSession as jest.MockedFunction<
  typeof handleNewSession
>;
const mockCreatePageView = insertPageView as jest.MockedFunction<
  typeof insertPageView
>;
describe("POST /page-view", () => {
  it("모든 필수 파라미터가 존재하면 200번을 반환한다.", async () => {
    const mockedSessionId = "some-session-id";
    const mockedCreatePageViewResponse = {
      id: 1,
      pageLocation: "/example/3",
      baseUrl: "http://localhost:3000",
      entryTime: new Date(),
      referrer: "http://www.google.com",
      sessionId: mockedSessionId,
      exitTime: null,
    };

    mockCreateSession.mockResolvedValueOnce(mockedSessionId);
    mockCreatePageView.mockResolvedValueOnce(mockedCreatePageViewResponse);

    const response = await request(app)
      .post("/page-view")
      .send({
        userAgent: "some-agent",
        appVersion: "1.0.0",
        baseUrl: "http://localhost:3000",
        referrer: "http://www.google.com",
        pageLocation: "/example/3",
      })
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Page view created");
  });

  it("page location 정보가 없으면 400번 에러를 반환한다.", async () => {
    const response = await request(app)
      .post("/page-view")
      .send({
        userAgent: "some-agent",
        appVersion: "1.0.0",
        baseUrl: "http://localhost:3000",
        referrer: "http://www.google.com",
      })
      .expect(400);

    expect(response.body.success).toBe(false);
  });
});
