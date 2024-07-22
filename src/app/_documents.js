// pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

const cordovaUrl =
  process.env.NODE_ENV === "development"
    ? "/cordova_platforms/browser/cordova.js"
    : "/cordova_platforms/android/cordova.js";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link href="https://use.typekit.net/nmz1unv.css" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src={cordovaUrl} />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
