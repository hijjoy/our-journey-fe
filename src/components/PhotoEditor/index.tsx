import { useState } from 'react';
import Image from 'next/image';

import PhotoCrop from './PhotoCrop';
import PhotoDraw from './PhotoDraw';
import PhotoUpload from './PhotoUpload';

import s from './style.module.scss';

type EditMode = 'default' | 'upload' | 'crop' | 'draw';

export default function PhotoEditor() {
  const [image, setImage] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<EditMode>('upload');

  return (
    <div className={s.photoEditor}>
      <div>{image && <Image src={image} alt="image" width={600} height={400} />}</div>
      <div className={s.editorContainer}>
        {editMode === 'upload' && <PhotoUpload setImage={setImage} setEditMode={setEditMode} />}
        {editMode === 'crop' && image && (
          <div className={s.editorContainer__content}>
            <PhotoCrop image={image} setImage={setImage} setEditMode={setEditMode} />
          </div>
        )}
        <div className={s.editorContainer__content}>
          {editMode === 'draw' && image && <PhotoDraw image={image} setImage={setImage} setEditMode={setEditMode} />}
        </div>
      </div>
      <div>
        <button type="button" onClick={() => setEditMode('crop')}>
          Crop
        </button>
        <button type="button" onClick={() => setEditMode('draw')}>
          Draw
        </button>
      </div>
    </div>
  );
}
