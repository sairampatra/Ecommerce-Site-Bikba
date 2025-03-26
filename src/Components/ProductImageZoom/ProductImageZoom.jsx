import React, { useState, useRef } from "react";

const ProductImageZoom = ({
  imageSrc,
  alt,
  width = "100%",
  height = "100%",
  zoomScale = 2.5,
}) => {
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Function to calculate the position of the zoomed image
  const calculateZoomPosition = (e) => {
    if (!containerRef.current) return;

    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();

    // Get cursor position relative to the image container
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    // Ensure values are between 0 and 1
    const boundedX = Math.max(0, Math.min(1, x));
    const boundedY = Math.max(0, Math.min(1, y));

    setZoomPosition({ x: boundedX, y: boundedY });
  };

  // Handle mouse enter
  const handleMouseEnter = (e) => {
    // Only enable zoom on larger screens
    if (window.innerWidth >= 1024) {
      setShowZoom(true);
      calculateZoomPosition(e);
    }
  };

  // Handle mouse move
  const handleMouseMove = (e) => {
    if (window.innerWidth >= 1024) {
      calculateZoomPosition(e);
    }
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setShowZoom(false);
  };

  return (
    <div className="relative w-full h-full">
      {/* Main product image container */}
      <div
        ref={containerRef}
        className="w-full h-full overflow-hidden relative cursor-crosshair"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img 
          src={imageSrc} 
          alt={alt} 
          className="w-full h-full object-cover" 
        />

        {/* Zoom highlight */}
        {showZoom && (
          <div
            className="absolute border-2 border-[#00BADB] pointer-events-none"
            style={{
              width: `${(1 / zoomScale) * 100}%`,
              height: `${(1 / zoomScale) * 100}%`,
              left: `${zoomPosition.x * 100}%`,
              top: `${zoomPosition.y * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </div>

      {showZoom && (
        <div
          className="hidden lg:block absolute top-0 left-full ml-4 
          w-[400px] h-[400px] 
          border rounded-lg overflow-hidden 
          shadow-md z-50 "
        >
          <img
            src={imageSrc}
            alt={`${alt} zoomed`}
            className="absolute w-full h-full object-cover"
            style={{
              transform: `scale(${zoomScale})`,
              transformOrigin: `${zoomPosition.x * 100}% ${
                zoomPosition.y * 100
              }%`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ProductImageZoom;