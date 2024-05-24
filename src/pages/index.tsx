import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import BlogCard from '../components/BlogCard';
import TbdBackground from '../TbdBackground';

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
        <TbdBackground width={50} height={50} primaryColor="#FFEC19" />
        <TbdBackground width={50} height={50} primaryColor="#00E5FA" />
        <TbdBackground width={50} height={50} primaryColor="#9A1AFF" />
      </main>
    </Layout>
  );
}
