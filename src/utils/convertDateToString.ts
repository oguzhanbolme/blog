import { useRouter } from 'next/router';
import 'dayjs/locale/en';
import 'dayjs/locale/tr';
import dayjs from 'dayjs';

export default function convertDateToString(date: string) {
  const { locale } = useRouter();
  return dayjs(date).locale(locale || 'en').format('MMMM DD YYYY');
}
