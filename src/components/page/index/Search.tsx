import { mdiMagnify } from '@mdi/js';
import Icon from '@mdi/react';
import useSearch from '../../../hooks/useSearch';
import getTranslationByKey from '../../../utils/getTranslationByKey';

export default function Search() {
  const search = useSearch();

  return (
    <div className="relative">
      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <Icon
          className="w-5 h-5 text-gray-500 dark:text-gray-400"
          path={mdiMagnify}
          size={1}
        />
      </div>
      <input
        className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="search"
        placeholder={getTranslationByKey('SEARCH')}
        value={search.text}
        onChange={(e) => search.setText(e.target.value)}
      />
    </div>
  );
}
