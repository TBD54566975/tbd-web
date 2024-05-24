import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

type BlogCardProps = {
  date?: string;
  author?: string;
  title?: string;
  tags?: string[];
  image?: string | null;
  description?: string;
  size?: 'large' | 'small';
};
const hexToRgb = (hex) => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return [r, g, b];
};

const rgbToHex = (r, g, b) => {
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

const darkenColor = (color, factor = 0.1) => {
  const [r, g, b] = hexToRgb(color);
  const newR = Math.max(0, Math.min(255, Math.floor(r * (1 - factor))));
  const newG = Math.max(0, Math.min(255, Math.floor(g * (1 - factor))));
  const newB = Math.max(0, Math.min(255, Math.floor(b * (1 - factor))));
  return rgbToHex(newR, newG, newB);
};

const generateRandomSquares = (count, maxWidth, maxHeight, darkerColor) => {
  const squares = [];

  const doesOverlap = (square, squares) => {
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
    let square;
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

const BackgroundColor = ({ width, height, primaryColor }) => {
  const totalSize = width + height;
  const squareCount = totalSize / 4;

  const darkerColor = darkenColor(primaryColor);
  const squares = generateRandomSquares(
    squareCount,
    (width * window.innerWidth) / 100,
    (height * window.innerHeight) / 100,
    darkerColor
  );

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
};

function BlogCard({
  date = 'date',
  author = 'author',
  title = 'Title',
  tags = [],
  image = require('/static/img/test-image.png').default,
  description = 'Some description here',
  size = 'small',
}: BlogCardProps) {
  const cardSizeClass = size === 'large' ? 'max-w-[840px]' : 'max-w-[400px]';

  return (
    <div
      className={clsx(
        'group border-[gray] border-2 border-solid bg-dark-grey hover:bg-tbd-yellow text-[#FFF] hover:text-[black]',
        cardSizeClass
      )}
    >
      <img className="h-auto max-w-full block" src={image} />
      <div className="p-4">
        <div>{date}</div>
        <div className="text-tbd-yellow group-hover:text-[black]">{`@${author}`}</div>
        <h2 className="text-4xl tracking-wide">{title}</h2>
        <div className="flex">
          {tags.map((t) => (
            <div className="border-[#FFF] group-hover:border-dark-grey border-2 border-solid p-2 m-1.5 h-8 justify-center flex items-center">
              <span className="text-[gray] mr-2">#</span>
              {`${t}`}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <header className=" flex justify-center items-center">
        <h1>TBD Components</h1>
      </header>

      <main className="flex flex-col items-center">
        <h3>Blog Card - Large</h3>
        <BlogCard tags={['Test1', 'Test2', 'Test3']} size="large" />
        <h3>Blog Card - Small</h3>
        <BlogCard tags={['Test1', 'Test2', 'Test3']} />
        <h3>Square Background component (WIP)</h3>
        <BackgroundColor width={50} height={50} primaryColor="#FFEC19" />
        <BackgroundColor width={50} height={50} primaryColor="#00E5FA" />
        <BackgroundColor width={50} height={50} primaryColor="#9A1AFF" />
      </main>
    </Layout>
  );
}
