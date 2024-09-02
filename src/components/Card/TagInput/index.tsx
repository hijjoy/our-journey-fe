import type { ChangeEvent, KeyboardEvent } from 'react';
import { useEffect, useState } from 'react';

import TagChip from '../TagChip';

import s from './style.module.scss';

// 추천 태그 리스트 타입 정의
type SuggestedTag = string;

// 예시 추천 태그 리스트
const suggestedTags: SuggestedTag[] = ['react', 'javascript', 'css', 'html', 'nodejs', 'java'];

export default function TagInput() {
  const [inputValue, setInputValue] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<SuggestedTag[]>([]);

  useEffect(() => {
    if (inputValue.startsWith('#') && inputValue.length > 1) {
      const filtered = suggestedTags.filter((tag) => tag.toLowerCase().startsWith(inputValue.slice(1).toLowerCase()));
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value === '' || value.startsWith('#')) {
      setInputValue(value);
    } else {
      setInputValue(`#${value}`);
    }
  };

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setInputValue('');
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue) {
      addTag(inputValue.slice(1));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className={s.container}>
      <div className={s.tagContainer}>
        {tags.map((tag, index) => (
          <TagChip key={index} text={tag} removeTag={removeTag} />
        ))}
        <input type="text" value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder="태그 입력" className={s.input} />
      </div>
      {suggestions.length > 0 && (
        <ul className={s.suggestions}>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => addTag(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
