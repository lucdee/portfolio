import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOProps {
  tabName: string;
}

export const SEO: React.FC<SEOProps> = ({ tabName }) => {
  const { asPath } = useRouter();

  return (
    <Head>
      <title>{tabName} • Dev</title>
      <meta property="og:url" content={`${asPath}`} />
    </Head>
  );
};
