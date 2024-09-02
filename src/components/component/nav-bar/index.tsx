import Button from '../button';
import { useRouter } from 'next/router';
import type { MouseEvent } from 'react';

export default function NavBar() {
  const router = useRouter();

  const handleMoveToPage = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    return router.push(`/${id}`);
  };

  return (
    <nav className="navbar">
      <Button id="main" buttonType="nav" onClick={handleMoveToPage}>
        홈
      </Button>
      <Button id="search" buttonType="nav" onClick={handleMoveToPage}>
        검색
      </Button>
      <Button id="write" buttonType="nav" onClick={handleMoveToPage}>
        작성
      </Button>
      <Button id="mypage" buttonType="nav" onClick={handleMoveToPage}>
        마이페이지
      </Button>
    </nav>
  );
}
