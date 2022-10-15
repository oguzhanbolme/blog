import '../assets/css/global.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '../context/Theme';
import Navbar from '../layouts/Navbar';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Navbar />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
