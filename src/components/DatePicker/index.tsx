import { useState } from 'react';

import s from './style.module.scss';

export default function DateOverlay() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return <div className={s.date}>{selectedDate.toLocaleDateString()}</div>;
}
