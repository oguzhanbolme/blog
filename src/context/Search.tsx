import React, {
  createContext, ReactElement, useState, useMemo,
} from 'react';

type Context = {
  text: string;
  setText: Function;
  selectedTags: string[];
  setSelectedTags: Function;
};

export const SearchContext = createContext<Context>({} as Context);

export function SearchProvider({ children }: { children: ReactElement }) {
  const [text, setText] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const value = useMemo(
    () => ({
      text,
      setText,
      selectedTags,
      setSelectedTags,
    }),
    [text, selectedTags],
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}
