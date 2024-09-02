import { useState } from 'react';
import Cropper from 'react-easy-crop';

import { getCroppedImg } from '@/utils/getCroppingImg';

import EditorContainer from '../EditorContainer';

import s from './style.module.scss';

interface PhotoCropProps {
  image: string;
  setEditMode: (mode: 'default') => void;
  setImage: (image: string) => void;
}

interface Crop {
  height: number;
  width: number;
  x: number;
  y: number;
}

export default function PhotoCrop({ image, setImage, setEditMode }: PhotoCropProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Crop | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleCropComplete = (croppedArea: Crop, croppedAreaPixels: Crop) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleSaveCrop = async () => {
    if (image && croppedAreaPixels) {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      setImage(croppedImage);
      setEditMode('default');
    }
  };

  const handleCancelCrop = () => {
    setEditMode('default');
  };

  return (
    <div className={s.photoCrop}>
      <EditorContainer>
        <div className={s.photoCrop__editor}>
          <Cropper image={image} crop={crop} zoom={zoom} aspect={4 / 3} onCropChange={setCrop} onZoomChange={setZoom} onCropComplete={handleCropComplete} />
        </div>
        <div className={s.photoCrop__controls}>
          <button type="button" onClick={handleSaveCrop} className={s.saveButton}>
            Save
          </button>
          <button type="button" onClick={handleCancelCrop} className={s.saveButton}>
            Cancel
          </button>
        </div>
      </EditorContainer>
    </div>
  );
}
