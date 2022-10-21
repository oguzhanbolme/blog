import '../assets/css/global.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { SearchProvider } from '../context/Search';
import Navbar from '../layouts/Navbar';
import PageLayout from '../layouts/PageLayout';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
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
  );
}
