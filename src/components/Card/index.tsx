import s from './style.module.scss';

interface CardProps {
  children: React.ReactNode;
}

export default function Card({ children }: CardProps) {
  return <div className={s.cardFrame}>{children}</div>;
}
