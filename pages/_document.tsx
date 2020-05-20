import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
        <GlobalStyle />
      </Html>
    );
  }
}

const GlobalStyle = () => (
  <style jsx global>{`
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: "Roboto Slab";
      font-weight: 400;
    }

    * {
      font-family: "Arial";
    }

    a {
      text-decoration: none;
      color: black;
    }
  `}</style>
);

export default MyDocument;
