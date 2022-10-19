import '../assets/css/global.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import Navbar from '../layouts/Navbar';
import { SearchProvider } from '../context/Search';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider enableSystem defaultTheme="dark" attribute="class">
      <SearchProvider>
        <div className="min-h-screen bg-white text-[#101827] dark:bg-[#101827] dark:text-white">
          <div className="max-w-4xl mx-auto">
            <header className="px-2 py-6">
              <Navbar />
            </header>
            <main className="px-5 pt-2 pb-8 md:px-10 md:pt-4">
              <Component {...pageProps} />
            </main>
          </div>
        </div>
      </SearchProvider>
    </ThemeProvider>
  );
}
