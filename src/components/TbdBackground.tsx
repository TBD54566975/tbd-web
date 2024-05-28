import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

const hexToRgb = (hex: string): [number, number, number] => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return [r, g, b];
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
};

const darkenColor = (color: string, factor: number = 0.1): string => {
  const [r, g, b] = hexToRgb(color);
  const newR = Math.max(0, Math.min(255, Math.floor(r * (1 - factor))));
  const newG = Math.max(0, Math.min(255, Math.floor(g * (1 - factor))));
  const newB = Math.max(0, Math.min(255, Math.floor(b * (1 - factor))));
  return rgbToHex(newR, newG, newB);
};

interface Square {
  width: number;
  height: number;
  top: number;
  left: number;
  backgroundColor: string;
  position: 'absolute';
}

const generateRandomSquares = (
  count: number,
  maxWidth: number,
  maxHeight: number,
  darkerColor: string
): Square[] => {
  const squares: Square[] = [];

  const doesOverlap = (square: Square, squares: Square[]): boolean => {
    for (let other of squares) {
      if (
        !(
          square.left + square.width < other.left ||
          square.left > other.left + other.width ||
          square.top + square.height < other.top ||
          square.top > other.top + other.height
        )
      ) {
        return true;
      }
    }
    return false;
  };

  for (let i = 0; i < count; i++) {
    let square: Square;
    do {
      const size = Math.floor(Math.random() * 50) + 20; // Random size between 20px and 70px
      const top = Math.floor(Math.random() * (maxHeight - size));
      const left = Math.floor(Math.random() * (maxWidth - size));

      square = {
        width: size,
        height: size,
        top,
        left,
        backgroundColor: darkerColor,
        position: 'absolute',
      };
    } while (doesOverlap(square, squares));

    squares.push(square);
  }
  return squares;
};

interface TbdBackgroundProps {
  width: number;
  height: number;
  primaryColor: string;
}

const TbdBackground: React.FC<TbdBackgroundProps> = ({
  width,
  height,
  primaryColor,
}) => {
  const totalSize = width + height;
  const squareCount = Math.floor(totalSize / 4);

  const darkerColor = darkenColor(primaryColor);
  const squares = generateRandomSquares(
    squareCount,
    (width * window.innerWidth) / 100,
    (height * window.innerHeight) / 100,
    darkerColor
  );

  return (
    <BrowserOnly>
      {() => {
        return (
          <div
            style={{
              position: 'relative',
              width: `${width}vw`,
              height: `${height}vh`,
              backgroundColor: primaryColor,
              overflow: 'hidden',
            }}
          >
            {squares.map((square, index) => (
              <div key={index} style={square}></div>
            ))}
          </div>
        );
      }}
    </BrowserOnly>
  );
};

export default TbdBackground;
