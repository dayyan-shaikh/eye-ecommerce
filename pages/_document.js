import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          src="https://checkout.razorpay.com/v1/checkout.js"
          async
        ></script>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-X26YL3EQ19"
        ></Script>
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date());
 
            gtag('config', 'G-X26YL3EQ19');
        `}
        </Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
