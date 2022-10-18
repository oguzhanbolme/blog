import '../assets/css/global.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import Navbar from '../layouts/Navbar';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider enableSystem defaultTheme="dark" attribute="class">
      <div className="min-h-screen bg-white text-[#101827] dark:bg-[#101827] dark:text-white">
        <div className="max-w-4xl mx-auto">
          <div className="py-6 px-2">
            <Navbar />
          </div>
          <div className="px-4">
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
