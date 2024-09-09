import type { InterfaceFeed } from '@/types';

import Card from './card';

export default function MainFeed({ data }: { data?: InterfaceFeed[] }) {
  return (
    <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 8px', margin: '0 16px' }}>
      {data?.map((post) => <Card key={post.id} data={post} />)}
    </section>
  );
}
