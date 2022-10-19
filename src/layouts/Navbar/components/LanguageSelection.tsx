/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import { mdiTranslate } from '@mdi/js';
import Icon from '@mdi/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useTimeout from '../../../hooks/useTimeout';

export default function LanguageSelection() {
  const { locales, asPath } = useRouter();
  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  const { reset } = useTimeout(() => setDropdownVisibility(false), 250);

  return (
    <div className="flex">
      <button
        type="submit"
        className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        onFocus={() => setDropdownVisibility(true)}
        onBlur={() => reset()}
      >
        <span className="relative p-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          <Icon path={mdiTranslate} size={1} />
        </span>
      </button>

      <div
        className={`${
          !dropdownVisibility && 'hidden'
        } z-10 w-28 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 absolute -ml-20 mt-10`}
      >
        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
          {locales?.map((localeItem) => (
            <Link key={localeItem} href={asPath} locale={localeItem}>
              <div className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
                <Image
                  height="24"
                  width="24"
                  src={require(`../../../assets/images/flags/${localeItem.toLowerCase()}.png`)}
                  alt={localeItem}
                />
                <span>{localeItem.toUpperCase()}</span>
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
