import s from './style.module.scss';

import { LogoIcon, ProfileIcon, SearchIcon } from '@/assets/icons/icons';

export default function Header() {
  return (
    <header className={s.headerContainer}>
      <button aria-label="Our Journey" type="button" style={{ background: 'none', border: 'none', outline: 'none' }}>
        <LogoIcon />
      </button>
      <div style={{ display: 'flex', gap: 4 }}>
        <button aria-label="여행 로그 검색" type="button" style={{ background: 'none', border: 'none', outline: 'none' }}>
          <SearchIcon />
        </button>
        <button aria-label="알림 확인" type="button" style={{ background: 'none', border: 'none', outline: 'none' }}>
          <ProfileIcon />
        </button>
      </div>
    </header>
  );
}
