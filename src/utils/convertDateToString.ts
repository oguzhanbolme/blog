import 'dayjs/locale/tr';
import dayjs from 'dayjs';

export default function convertDateToString(date: string) {
  return dayjs(date).locale('tr').format('MMMM DD YYYY');
}
