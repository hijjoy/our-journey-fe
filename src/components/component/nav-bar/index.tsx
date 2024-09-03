import type { MouseEvent } from 'react';
import { useRouter } from 'next/router';

import Button from '../button';

import styles from './style.module.scss';

import { HomeIcon, MyPageIcon, SearchIcon, WriteIcon } from '@/assets/icons/icons';

export default function NavBar() {
  const router = useRouter();

  const handleMoveToPage = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    return router.push(`/${id}`);
  };

  return (
    <nav className={styles.navBar}>
      <Button id="main" buttonType="nav" onClick={handleMoveToPage}>
        <HomeIcon />홈
      </Button>
      <Button id="search" buttonType="nav" onClick={handleMoveToPage}>
        <SearchIcon />
        검색
      </Button>
      <Button id="write" buttonType="nav" onClick={handleMoveToPage}>
        <WriteIcon />
        작성
      </Button>
      <Button id="mypage" buttonType="nav" onClick={handleMoveToPage}>
        <MyPageIcon />
        마이페이지
      </Button>
    </nav>
  );
}
