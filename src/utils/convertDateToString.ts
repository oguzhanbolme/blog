import 'dayjs/locale/en';
import 'dayjs/locale/tr';
import dayjs from 'dayjs';

export default function convertDateToString(date: string, locale: string = 'en') {
  return dayjs(date).locale(locale).format('MMMM DD YYYY');
}
