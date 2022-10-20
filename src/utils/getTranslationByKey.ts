import { useRouter } from 'next/router';
import en from '../data/translations/en.json';
import tr from '../data/translations/tr.json';

export default function getTranslationByKey(key: string) {
  const { locale } = useRouter();

  switch (locale?.toLowerCase()) {
    case 'tr':
      return tr[key.toUpperCase() as keyof typeof tr];
    case 'en':
      return en[key.toUpperCase() as keyof typeof en];
    default:
      return en[key.toUpperCase() as keyof typeof en];
  }
}
