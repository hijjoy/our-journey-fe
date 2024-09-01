import React, { useEffect, useRef, useState } from 'react';

import s from './style.module.scss';

export default function CardTextArea() {
  const [text, setText] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const maxLength = 500;

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    if (inputText.length <= maxLength) {
      setText(inputText);
      adjustHeight();
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [text]);

  return (
    <div className={s.textareaContainer}>
      <textarea ref={textareaRef} className={s.input} placeholder="글씨를 입력하세요" maxLength={maxLength} value={text} onChange={handleChange} rows={1} />
      <div className={s.charCount}>
        {text.length}/{maxLength}
      </div>
    </div>
  );
}
