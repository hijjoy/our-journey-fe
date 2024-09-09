import type { Dispatch, MouseEvent, SetStateAction } from 'react';

import { ArrowDownIcon } from '@/assets/icons/icons';

interface InterfaceProps {
  handle: (e: MouseEvent<HTMLButtonElement>) => void;
  sort: 'recently' | 'popularly';
}

export default function SortContainer({ sort, handle }: InterfaceProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', gap: 14, padding: '16px', boxSizing: 'border-box' }}>
      <button
        id="resently"
        type="button"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 0,
          margin: 0,
          outline: 'none',
          border: 'none',
          color: '#ffffff',
          background: 'transparent',
          boxSizing: 'border-box',
          cursor: 'pointer',
          fontSize: 15,
          fontWeight: 600,
          lineHeight: 1.5,
        }}
        onClick={handle}
      >
        최신순
      </button>
      <button
        id="popularly"
        type="button"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 0,
          margin: 0,
          outline: 'none',
          border: 'none',
          color: '#646464',
          background: 'transparent',
          boxSizing: 'border-box',
          cursor: 'pointer',
          fontSize: 15,
          fontWeight: 600,
          lineHeight: 1.5,
        }}
        onClick={handle}
      >
        인기순
      </button>
    </div>
  );
}
