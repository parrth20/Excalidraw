"use client";

import { useEffect, useRef, useState } from "react";

interface RectArgs {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
}

export default function Home() {
  console.log("re rendering");
  const [tool, settool] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startPos = useRef<{ x: null | number; y: null | number }>({
    x: null,
    y: null,
  });
  const endPos = useRef<{ x: null | number; y: null | number }>({
    x: null,
    y: null,
  });
  const [rects, setRects] = useState<RectArgs[]>([]);
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext("2d");
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
  }, []);

  const drawLine = (e: any) => {
    if (
      !ctx ||
      !canvas ||
      startPos.current.x === null ||
      startPos.current.y === null
    )
      return;
    const x = e.clientX;
    const y = e.clientY;
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(startPos.current.x, startPos.current.y);
    ctx.lineTo(x, y);
    startPos.current.x = x;
    startPos.current.y = y;
    ctx.stroke();
  };
  const finalizeRectangle = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || startPos.current.x === null || startPos.current.y === null) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    setRects((prev:any) => [
      ...prev,
      {
        x: startPos.current.x,
        y: startPos.current.y,
        w: x - startPos.current.x!,
        h: y - startPos.current.y!,
        color: "white",
      },
    ]);
  };

  const drawRect = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (
      !ctx ||
      !canvas ||
      startPos.current.x === null ||
      startPos.current.y === null
    )
      return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    const width = x - startPos.current.x;
    const height = y - startPos.current.y;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Redraw all saved rectangles
    rects.forEach((rect) => {
      ctx.strokeStyle = rect.color;
      ctx.lineWidth = 2;
      ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
    });

    // Draw the current rectangle being created
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeRect(startPos.current.x, startPos.current.y, width, height);
  };

  const initDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (tool === "pencil") drawLine(e);
    if (tool === "rectangle") drawRect(e);
  };

  return (
    <div className="bg-black text-white h-screen w-screen">
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-4 bg-violet-900 p-2 rounded-md shadow-lg select-none">
        <button
          onClick={() => settool("pencil")}
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
        >
          Pencil
        </button>
        <button
          onClick={() => {
            settool("rectangle");
          }}
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
        >
          Rectangle
        </button>
        <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition">
          Circle
        </button>
        <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition">
          Arrow
        </button>
        <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition">
          Eraser
        </button>
        <button
          onClick={() => {
            canvasRef.current
              ?.getContext("2d")
              ?.clearRect(
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height
              );
          }}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition"
        >
          Clear
        </button>
      </div>
      <canvas
        onMouseUp={(e:any) => {
          finalizeRectangle(e);
          setIsDragging(false);
        }}
        onMouseMove={(e) => isDragging && initDrawing(e)}
        onMouseDown={(e: any) => {
          startPos.current = {
            x: e.clientX,
            y: e.clientY,
          };
          setIsDragging(true);
        }}
        ref={canvasRef}
        className="h-full w-full"
      />
    </div>
  );
}
