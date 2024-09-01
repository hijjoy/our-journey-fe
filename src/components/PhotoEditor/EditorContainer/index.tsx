import s from './style.module.scss';

interface EditorContainerProps {
  children: React.ReactNode;
}

export default function EditorContainer({ children }: EditorContainerProps) {
  return <div className={s.container}>{children}</div>;
}
