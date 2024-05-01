import dayjs from 'dayjs';
import { atom } from 'recoil';

const selectedDateState = atom({
  key: 'selectedDate',
  default: dayjs().format('MM/DD/YY'),
});

export default selectedDateState;
