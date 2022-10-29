import '../assets/css/global.css';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import { ThemeProvider } from 'next-themes';
import { SearchProvider } from '../context/Search';
import Navbar from '../layouts/Navbar';
import PageLayout from '../layouts/PageLayout';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-VLLNWVQWR2"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-VLLNWVQWR2');
        `}
      </Script>

      <ThemeProvider enableSystem defaultTheme="dark" attribute="class">
        <SearchProvider>
          <PageLayout>
            <>
              <Navbar />
              <Component {...pageProps} />
            </>
          </PageLayout>
        </SearchProvider>
      </ThemeProvider>
    </>
  );
}
