import type { MouseEvent, ReactNode } from 'react';
import { useState } from 'react';
import Image from 'next/image';

import DefaultLayout from '@/components/layouts';

import MainFeed from './component/main-feed';
import SortContainer from './component/sort-container';
import useGetFeed from './hooks/useGetFeed';

import s from '../../components/layouts/style.module.scss';

export default function Main() {
  const [sort, setSort] = useState<'recently' | 'popularly'>('recently');
  const { data } = useGetFeed();

  const handleListToSort = (e: MouseEvent<HTMLButtonElement>) => {
    setSort(e.currentTarget.id as 'recently' | 'popularly');
  };

  if (!data) {
    return <div />;
  }

  return (
    <main className={s.layoutContainer}>
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 375,
          justifyContent: 'center',
          alignItems: 'center',
          background: '#1e1f23',
          height: '100%',
        }}
      >
        <div style={{ display: 'block', marginBottom: 20, position: 'relative' }}>
          <Image alt="header" src="/image-sample.webp" width={360} height={171} />
        </div>
        <SortContainer handle={handleListToSort} sort={sort} />
        <MainFeed data={data} />
      </section>
      \
    </main>
  );
}
