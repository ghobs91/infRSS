import React, { useEffect, useId, useState } from 'react';

interface LiquidGlassProps {
  className?: string;
  children?: React.ReactNode;
  bezelWidth?: number;
  refractionScale?: number;
  highlightOpacity?: number;
}

export const LiquidGlass: React.FC<LiquidGlassProps> = ({
  className,
  children,
  bezelWidth = 20,
  refractionScale = 20,
  highlightOpacity = 0.5,
}) => {
  const filterId = useId().replace(/:/g, '');
  const [displacementMap, setDisplacementMap] = useState<string>('');
  const [elementSize, setElementSize] = useState({ width: 0, height: 0 });
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateSize = () => {
      const { offsetWidth, offsetHeight } = containerRef.current!;
      setElementSize({ width: offsetWidth, height: offsetHeight });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (elementSize.width === 0 || elementSize.height === 0) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = elementSize;
    canvas.width = width;
    canvas.height = height;

    // Fill with neutral gray (no displacement)
    ctx.fillStyle = 'rgb(128, 128, 128)';
    ctx.fillRect(0, 0, width, height);

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    // Calculate displacement map
    // This is a simplified version of the tutorial's logic
    // We'll iterate over pixels and calculate displacement based on distance from edge
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Calculate distance to nearest edge (considering rounded corners)
        // For simplicity, we'll assume a pill shape or rounded rect matching the container
        // But calculating exact distance field for arbitrary rounded rect is complex per pixel in JS
        // Let's approximate with distance to border
        
        // Distance to left/right/top/bottom
        const distL = x;
        const distR = width - 1 - x;
        const distT = y;
        const distB = height - 1 - y;
        
        // Min distance to any straight edge
        let dist = Math.min(distL, distR, distT, distB);
        
        // Adjust for corners (radius approx 32px based on CSS)
        const radius = 32;
        const inCorner = (x < radius && y < radius) || 
                         (x > width - radius && y < radius) ||
                         (x < radius && y > height - radius) ||
                         (x > width - radius && y > height - radius);
                         
        if (inCorner) {
           // Calculate distance to corner center
           const cx = x < radius ? radius : width - radius;
           const cy = y < radius ? radius : height - radius;
           const d = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
           dist = radius - d;
        }

        if (dist < bezelWidth && dist >= 0) {
          // We are in the bezel
          // Calculate surface normal
          // Profile: Quarter circle (convex)
          // h = sqrt(r^2 - (r-d)^2) where r is bezelWidth
          // But let's use the tutorial's normalized height function approach
          
          // Normalized distance from edge (0 to 1)
          const t = dist / bezelWidth;
          
          // Height function (convex)
          // h(t) = sqrt(1 - (1-t)^2)
          // Derivative h'(t) = (1-t) / sqrt(1 - (1-t)^2)
          
          // Normal vector (nx, ny)
          // The direction of the gradient is towards the center of the element
          // We need the vector pointing OUTWARDS from the center to the edge for the normal calculation?
          // Wait, the tutorial calculates displacement.
          
          // Let's simplify:
          // Displacement should be towards the center for convex lens effect?
          // Or just distort based on normal.
          
          // Direction to nearest edge
          let dirX = 0;
          let dirY = 0;
          
          if (inCorner) {
             const cx = x < radius ? radius : width - radius;
             const cy = y < radius ? radius : height - radius;
             const len = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
             if (len > 0) {
               dirX = (x - cx) / len;
               dirY = (y - cy) / len;
             }
          } else {
             if (dist === distL) dirX = -1;
             else if (dist === distR) dirX = 1;
             else if (dist === distT) dirY = -1;
             else if (dist === distB) dirY = 1;
          }
          
          // Magnitude of displacement
          // Simple curve: max at edge, 0 at bezel end
          const displacement = Math.sin((1 - t) * Math.PI / 2);
          
          // Map to RGB
          // R = X displacement, G = Y displacement
          // 0..255, 128 is 0
          
          const r = 128 + (dirX * displacement * 127);
          const g = 128 + (dirY * displacement * 127);
          
          const idx = (y * width + x) * 4;
          data[idx] = r;
          data[idx + 1] = g;
          data[idx + 2] = 128; // Blue (unused)
          data[idx + 3] = 255; // Alpha
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
    setDisplacementMap(canvas.toDataURL());
  }, [elementSize, bezelWidth]);

  return (
    <>
      <svg style={{ display: 'none' }}>
        <defs>
          <filter id={`liquid-glass-${filterId}`} x="0" y="0" width="100%" height="100%">
            {displacementMap && (
              <>
                <feImage
                  href={displacementMap}
                  result="displacementMap"
                  x="0" y="0" width="100%" height="100%"
                  preserveAspectRatio="none"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="displacementMap"
                  scale={refractionScale}
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result="refracted"
                />
                {/* Specular Highlight */}
                <feGaussianBlur in="displacementMap" stdDeviation="2" result="blurredMap" />
                <feSpecularLighting
                  in="blurredMap"
                  surfaceScale={5}
                  specularConstant={1}
                  specularExponent={20}
                  lightingColor="#ffffff"
                  result="specular"
                >
                  <fePointLight x="-5000" y="-10000" z="20000" />
                </feSpecularLighting>
                <feComposite
                  in="specular"
                  in2="SourceAlpha"
                  operator="in"
                  result="specular"
                />
                <feComposite
                  in="specular"
                  in2="refracted"
                  operator="arithmetic"
                  k1="0" k2="1" k3={highlightOpacity} k4="0"
                />
              </>
            )}
          </filter>
        </defs>
      </svg>
      <div
        ref={containerRef}
        className={className}
        style={{
          backdropFilter: `url(#liquid-glass-${filterId}) blur(10px)`,
          WebkitBackdropFilter: `url(#liquid-glass-${filterId}) blur(10px)`,
        }}
      >
        {children}
      </div>
    </>
  );
};
