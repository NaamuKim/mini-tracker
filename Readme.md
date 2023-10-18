<p align="center">
  <img src="https://github.com/NaamuKim/mini-tracker/assets/83356118/04bee710-fc05-40b6-aee1-a50d64222571" width="128" height="128" alt="mini-tracker logo">
</p>
<h2 align="center">Mini-Tracker</h2>

<h4 align="center">스크립트 한 줄이면 서비스 유저의 행동 패턴을 파악할 수 있는 Mini-Tracker SDK</h4>

<div align="center">간단한 스크립트 삽입만으로 사용 가능: 복잡한 설정 없이 웹페이지에 스크립트를 삽입하는 것만으로 바로 사용 가능합니다.</div>
<div align='center'>SPA 및 일반 웹페이지 모두 호환: SPA(Single Page Application) 뿐만 아니라 SPA가 아닌 웹페이지에서도 동작합니다.</div>

## 바로 시작하기
Next.js 사용자라면?

v13 app directory<br/>
`layout.tsx`
```tsx
import Script from "next/script";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Script
        src="https://dljue2p0jo5rq.cloudfront.net/mini-tracker-sdk.js"
        strategy="beforeInteractive"
      ></Script>
    </>
  );
}
```

pages directory<br/>
`pages/_document.tsx`
```tsx
import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head/>
      <body>
        <Main />
        <NextScript />
        <Script
          src="https://dljue2p0jo5rq.cloudfront.net/mini-tracker-sdk.js"
          strategy="beforeInteractive"
        />
      </body>
    </Html>
  );
}

export default MyDocument;
```

일반적인 블로그 혹은 SPA 이외의 서비스 운영자라면?
```html
<head>
  <script src="https://dljue2p0jo5rq.cloudfront.net/mini-tracker-sdk.js"></script>` 한 줄 추가로 사용 가능합니다.
</head>
```
ps. CORS 에러 해결법은 대시보드 페이지에서 확인바랍니다.


## Mini-Tracker 구성

<p align="center">
    <img width="400" alt="mini-tracker-architecture" src="https://github.com/NaamuKim/mini-tracker/assets/83356118/6bccebe9-f26a-495c-af9d-de10dab08604">
</p>


