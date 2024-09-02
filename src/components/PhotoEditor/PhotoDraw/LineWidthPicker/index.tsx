interface LintWidthPickerProps {
  onWidthChange: (width: number) => void;
  width: number;
}

export default function LintWidthPicker({ width, onWidthChange }: LintWidthPickerProps) {
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = e.target.value;
    onWidthChange(Number(newWidth));
  };

  return <input id="lintWidth" type="range" min="1" max="100" value={width} onChange={handleWidthChange} />;
}
