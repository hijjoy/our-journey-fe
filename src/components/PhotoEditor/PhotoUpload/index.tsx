import { useRef, useState } from 'react';

import s from './style.module.scss';

interface PhotoUploadProps {
  setEditMode: (mode: 'default') => void;
  setImage: (image: string) => void;
}

export default function PhotoUpload({ setImage, setEditMode }: PhotoUploadProps) {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = <T extends HTMLElement>(e: React.DragEvent<T>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleFiles = (files: FileList) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === 'string') {
        setImage(e.target.result);
        setEditMode('default');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className={s.photoUpload}>
      <form
        className={`photoUpload__dropzone ${dragActive ? 'photo-upload__dropzone--active' : ''}`}
        onDragEnter={(e) => handleDrag(e)}
        onSubmit={(e) => e.preventDefault()}
      >
        <input ref={inputRef} type="file" accept="image/*" onChange={handleChange} style={{ display: 'none' }} />
        <div
          style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onDragEnter={(e) => handleDrag(e)}
          onDragLeave={(e) => handleDrag(e)}
          onDragOver={(e) => handleDrag(e)}
          onDrop={handleDrop}
          onClick={onButtonClick}
        >
          <p>사진을 드래그하여 놓거나 클릭하여 선택하세요</p>
        </div>
      </form>
    </div>
  );
}
