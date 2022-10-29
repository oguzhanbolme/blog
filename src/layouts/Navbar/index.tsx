import Link from 'next/link';
import ThemeSelection from './components/ThemeSelection';

export default function Navbar() {
  return (
    <header className="flex justify-between pb-6">
      <Link href="/">
        <span className="text-2xl text-white p-2 cursor-pointer rounded-lg bg-gradient-to-br from-purple-600 to-blue-500">
          Oğuzhan Bölme Blog
        </span>
      </Link>

      <div className="flex items-center gap-4">
        <ThemeSelection />
      </div>
    </header>
  );
}
