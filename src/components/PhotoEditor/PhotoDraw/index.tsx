import { useCallback, useEffect, useRef, useState } from 'react';

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
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [history, setHistory] = useState<string[]>([]);

  const [color, setColor] = useState('#000000');
  const [penWidth, setWidth] = useState<number>(2);

  const saveToHistory = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL();
      setHistory((prevHistory) => [...prevHistory, dataURL]);
    }
  }, []);

  const loadImageToCanvas = useCallback(() => {
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
        saveToHistory();
      };
      img.src = image;
    }
  }, [image, saveToHistory]);

  useEffect(() => {
    loadImageToCanvas();
  }, [loadImageToCanvas]);

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      const { x, y } = getMousePos(e);

      ctx.strokeStyle = color;
      ctx.lineWidth = penWidth;
      ctx.lineCap = 'round';
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (ctx) {
        ctx.beginPath();
      }
      saveToHistory();
    }
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
      newHistory.pop();
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
