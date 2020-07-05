import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <meta
          name="viewport"
          content="width=device-width,user-scalable=no, initial-scale=1.0, viewport-fit=cover"
        />
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;700&display=swap"
            rel="stylesheet"
          />

          <title>Ekkawin Viriyapak</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
