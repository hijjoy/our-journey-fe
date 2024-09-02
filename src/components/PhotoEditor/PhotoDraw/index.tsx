import { useEffect, useRef, useState } from 'react';

import ColorPicker from './ColorPicker';
import LintWidthPicker from './LineWidthPicker';
import EditorContainer from '../EditorContainer';

import s from './style.module.scss';

interface PhotoDrawProps {
  image: string;
  setEditMode: (mode: 'default') => void;
  setImage: (image: string) => void;
}

export default function PhotoDraw({ image, setImage, setEditMode }: PhotoDrawProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [history, setHistory] = useState<string[]>([]);

  const [color, setColor] = useState('#000000');
  const [penWidth, setWidth] = useState<number>(2);

  useEffect(() => {
    loadImageToCanvas();
  }, [image]);

  const loadImageToCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      const img = new Image();
      img.onload = () => {
        const maxWidth = 400;
        const scaleFactor = maxWidth / img.width;
        const width = maxWidth;
        const height = img.height * scaleFactor;

        canvas.width = width;
        canvas.height = height;
        setCanvasSize({ width, height });
        ctx.drawImage(img, 0, 0, width, height);

        // Save initial state to history
        saveToHistory();
      };
      img.src = image;
    }
  };

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL();
      setHistory((prevHistory) => [...prevHistory, dataURL]);
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const { offsetX, offsetY } = getMousePos(e);
    setLastX(offsetX);
    setLastY(offsetY);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      const { offsetX, offsetY } = getMousePos(e);

      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(offsetX, offsetY);
      ctx.strokeStyle = `${color}`;
      ctx.lineWidth = Number(penWidth);
      ctx.lineCap = 'round';
      ctx.stroke();

      setLastX(offsetX);
      setLastY(offsetY);
    }
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveToHistory();
    }
  };

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { offsetX: 0, offsetY: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    };
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL();
      setImage(dataURL);
      setEditMode('default');
    }
  };

  const handleCancel = () => {
    setEditMode('default');
  };

  const handleRevert = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop(); // Remove the current state
      const previousState = newHistory[newHistory.length - 1];

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (canvas && ctx) {
        const img = new Image();
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = previousState;
      }

      setHistory(newHistory);
    }
  };

  return (
    <div className={s.photoDraw}>
      <EditorContainer>
        <ColorPicker color={color} setColor={setColor} />
        <LintWidthPicker width={penWidth} onWidthChange={setWidth} />
        <div className={s.photoDraw__canvasContainer} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            onBlur={stopDrawing}
            style={{
              width: `${canvasSize.width}px`,
              height: `${canvasSize.height}px`,
              border: '1px solid #ccc',
            }}
          />
        </div>
        <div className={s.photoDraw__controls}>
          <button type="button" onClick={handleSave}>
            Save
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="button" onClick={handleRevert} disabled={history.length <= 1}>
            Revert
          </button>
        </div>
      </EditorContainer>
    </div>
  );
}
