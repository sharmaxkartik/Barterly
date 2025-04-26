import type React from "react";
interface ShapeProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Cube({ className, style }: ShapeProps) {
  return (
    <div className={`relative w-24 h-24 ${className}`} style={style}>
      <div className="absolute rounded-xl w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 shadow-lg transform rotate-45 animate-float"></div>
    </div>
  );
}

export function Star({ className, style }: ShapeProps) {
  return (
    <div className={`relative ${className}`} style={style}>
      <div className="absolute w-24 h-24 bg-gradient-to-br from-blue-300 to-purple-600 rotate-45 rounded-lg shadow-lg animate-rotate-slow"></div>
      <div
        className="absolute w-24 h-24 bg-gradient-to-br from-blue-300 to-purple-600 rounded-lg shadow-lg animate-rotate-slow"
        style={{ animationDelay: "-7s" }}
      ></div>
    </div>
  );
}

export function Cylinder({ className, style }: ShapeProps) {
  return (
    <div className={`relative w-12 h-28 ${className}`} style={style}>
      <div className="absolute w-full h-full rounded-full bg-gradient-to-br from-purple-400 to-blue-500 shadow-lg animate-pulse-soft"></div>
    </div>
  );
}

export function Wheel({ className, style }: ShapeProps) {
  return (
    <div className={`relative ${className}`} style={style}>
      <div className="absolute w-32 h-32">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-6 h-20 bg-gradient-to-b from-purple-500 to-blue-400 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 origin-center shadow-lg animate-pulse-soft"
            style={{
              transform: `translateX(-50%) translateY(-50%) rotate(${
                i * 45
              }deg)`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
        <div className="absolute w-12 h-12 bg-white dark:bg-gray-900 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md"></div>
      </div>
    </div>
  );
}

export function Pyramid({ className, style }: ShapeProps) {
  return (
    <div className={`relative w-24 h-24 ${className}`} style={style}>
      <div className="absolute w-0 h-0 border-l-[50px] border-l-transparent border-r-[50px] border-r-transparent border-b-[100px] border-b-purple-500 shadow-lg animate-float"></div>
    </div>
  );
}

export function Sphere({ className, style }: ShapeProps) {
  return (
    <div className={`relative w-24 h-24 ${className}`} style={style}>
      <div className="absolute w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-purple-500 shadow-lg animate-pulse-soft"></div>
    </div>
  );
}
