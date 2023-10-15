/// <reference types="cypress" />

import { SPA_URL } from "../constants/url";

describe("correctly tagging when click back button", () => {
  beforeEach(() => {});

  it("checks request body has page view properties", () => {
    cy.visit(SPA_URL);
    // cypress 내부에서는 자체의 history 사용해 sdk 내부 오버라이딩이 테스팅되지 않음.
    cy.window().then((win) => {
      const originalPushState = win.history.pushState;
      win.history.pushState = function (...args) {
        /* 콘솔 로그 동작 테스트 완료
         * 여기서 sdk 내부 history overriding 함수를 사용하여 테스팅할 수 있으면 sdk의 동작을 테스팅할 수 있어보임
         * TODO: cypress 내부에서 sdk 내부 history overriding 함수를 사용할 수 있도록 수정
         */

        console.log("push state");
        return originalPushState.apply(this, args);
      };
    });
    cy.get("a[href='/example/2']").click();
  });
});
