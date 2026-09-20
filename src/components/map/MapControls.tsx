import { Plus, Minus, RotateCcw, Maximize, Minimize } from "lucide-react";

export default function MapControls({
  onZoomIn,
  onZoomOut,
  onReset,
  onToggleFullscreen,
  isFullscreen,
}: {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
}) {
  const buttonClass =
    "flex h-9 w-9 items-center justify-center rounded-md border border-yellow-700/40 bg-black/85 text-yellow-400 shadow-[0_0_20px_rgba(0,0,0,0.6)] backdrop-blur-sm transition hover:border-yellow-500 hover:bg-black/95 hover:text-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-yellow-400";

  return (
    <div className="absolute bottom-3 right-3 z-20 flex gap-2 sm:bottom-4 sm:right-4">
      <button type="button" onClick={onZoomOut} aria-label="Zoom out" className={buttonClass}>
        <Minus size={16} />
      </button>
      <button type="button" onClick={onZoomIn} aria-label="Zoom in" className={buttonClass}>
        <Plus size={16} />
      </button>
      <button type="button" onClick={onReset} aria-label="Reset map view" className={buttonClass}>
        <RotateCcw size={14} />
      </button>
      <button
        type="button"
        onClick={onToggleFullscreen}
        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        className={buttonClass}
      >
        {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
      </button>
    </div>
  );
}
