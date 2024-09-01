import s from './style.module.scss';

interface TagChipProps {
  removeTag: (tag: string) => void;
  text: string;
}

export default function TagChip({ text, removeTag }: TagChipProps) {
  const handleRemove = () => {
    removeTag(text);
  };

  return (
    <span className={s.tagChip}>
      #{text}
      <button type="button" onClick={handleRemove} className={s.removeTag} aria-label={`Remove tag ${text}`}>
        ×
      </button>
    </span>
  );
}
