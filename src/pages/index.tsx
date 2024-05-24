import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

type BlogCardProps = {
  date?: string;
  author?: string;
  title?: string;
  tags?: string[];
  image?: string | null;
  description?: string;
  size?: 'large' | 'small';
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
      </main>
    </Layout>
  );
}
