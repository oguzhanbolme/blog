import Link from 'next/link';
import { useRouter } from 'next/router';
import LanguageSelection from './components/LanguageSelection';
import ThemeSelection from './components/ThemeSelection';

export default function Navbar() {
  const { locale } = useRouter();

  return (
    <header className="flex justify-between pb-6">
      <Link href="/" locale={locale}>
        <span className="text-2xl text-white p-2 cursor-pointer rounded-lg bg-gradient-to-br from-purple-600 to-blue-500">
          Oğuzhan Bölme Blog
        </span>
      </Link>

      <div className="flex items-center gap-4">
        <LanguageSelection />
        <ThemeSelection />
      </div>
    </header>
  );
}
