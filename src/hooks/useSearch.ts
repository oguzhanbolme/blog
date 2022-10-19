import { useContext } from 'react';
import { SearchContext } from '../context/Search';

export default function useSearch() {
  const searchContext = useContext(SearchContext);
  return searchContext;
}
