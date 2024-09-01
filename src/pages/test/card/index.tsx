import Card from '@/components/Card';
import PhotoEditor from '@/components/PhotoEditor';

import s from './style.module.scss';

export default function CardTestPage() {
  return (
    <div className={s.cardTestPageContainer}>
      <Card>a</Card>
      <Card>
        <PhotoEditor />
      </Card>
    </div>
  );
}
