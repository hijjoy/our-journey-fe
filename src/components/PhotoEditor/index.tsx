import { useState } from 'react';
import Image from 'next/image';

import PhotoCrop from './PhotoCrop';
import PhotoDraw from './PhotoDraw';
import PhotoUpload from './PhotoUpload';
import DateOverlay from '../DatePicker';

import s from './style.module.scss';

type EditMode = 'default' | 'upload' | 'crop' | 'draw';

export default function PhotoEditor() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<EditMode>('upload');

  const handleSetImage = (newImage: string) => {
    setOriginalImage(newImage);
    setImage(newImage);
  };

  const handleEnterCropMode = () => {
    // Ensure you are not reverting to the original image unintentionally
    setEditMode('crop');
  };

  return (
    <div className={s.photoEditor}>
      {editMode !== 'upload' && (
        <div className={s.photoEditor__imageWrapper}>
          <div className={s.photoEditor__btnWrapper}>
            <div>
              <button type="button" onClick={handleEnterCropMode}>
                Crop
              </button>
              <button type="button" onClick={() => setEditMode('draw')}>
                Draw
              </button>
            </div>

            <button
              className={s.deleteBtn}
              type="button"
              onClick={() => {
                setEditMode('upload');
                setOriginalImage(null);
                setImage(null);
              }}
            >
              X
            </button>
          </div>
          <div className={s.photoEditor__timeWrapper}>
            <DateOverlay />
          </div>
          <div className={s.photoEditor__img}>{image && <Image src={image} alt="image" width={400} height={600} />}</div>
        </div>
      )}
      <div className={s.editorContainer}>
        {editMode === 'upload' && <PhotoUpload setImage={handleSetImage} setEditMode={setEditMode} />}
        {editMode === 'crop' && image && (
          <div className={s.editorContainer__content}>
            <PhotoCrop image={image} setImage={setImage} setEditMode={setEditMode} />
          </div>
        )}
        <div className={s.editorContainer__content}>
          {editMode === 'draw' && image && <PhotoDraw image={image} setImage={setImage} setEditMode={setEditMode} />}
        </div>
      </div>
    </div>
  );
}
