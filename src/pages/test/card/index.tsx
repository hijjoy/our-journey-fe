import Card from '@/components/Card';
import CardTextArea from '@/components/Card/TextArea';
import PhotoEditor from '@/components/PhotoEditor';

import s from './style.module.scss';

export default function CardTestPage() {
  return (
    <div className={s.cardTestPageContainer}>
      <Card>
        <PhotoEditor />
        <CardTextArea />
      </Card>
    </div>
  );
}
