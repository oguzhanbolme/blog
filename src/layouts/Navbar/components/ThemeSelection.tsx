import { mdiBrightness6 } from '@mdi/js';
import Icon from '@mdi/react';
import { useTheme } from 'next-themes';

export default function ThemeSelection() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <button
        type="submit"
        className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        <span className="relative p-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          <Icon path={mdiBrightness6} size={1} />
        </span>
      </button>
    </div>
  );
}
