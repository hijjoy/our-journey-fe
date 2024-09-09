import type { InterfaceFeed } from '@/types';

import s from '../styles/card.module.scss';

export default function Card({ data }: { data: InterfaceFeed }) {
  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}.${month}.${day}`;
  }

  if (!data) {
    return <div />;
  }

  return (
    <article style={{ display: 'flex', flexDirection: 'column', gap: 8, background: '#2E2E2E', boxSizing: 'border-box', padding: '10px' }}>
      <figure style={{ position: 'relative' }}>
        <img alt={data.title} src={data.thumbnail} style={{ width: 140, height: 164, borderRadius: 4 }} />
        <span className={s.date}>{formatDate(new Date(data.createdAt))}</span>
      </figure>
      <h3 style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.5, color: '#ffffff' }}>{data.title}</h3>
      <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 8 }}>
        <img src={data.writer.profile} alt={`${data.writer.name}의 사진`} style={{ width: 20, height: 20 }} />
        <span style={{ fontSize: 12, fontWeight: 400, lineHeight: 1.5, color: '#ffffff' }}>{data.writer.name}</span>
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.5, color: '#44c7ff', display: 'flex', gap: 8 }}>
        <span>#오사카</span>
        <span>#오사카</span>
        <span>#오사카</span>
      </div>
    </article>
  );
}
