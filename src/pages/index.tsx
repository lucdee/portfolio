import type { GetStaticProps, NextPage } from 'next';
import { SEO } from 'components/SEO';
import { HomeView } from '../views/home';

const Home: NextPage = () => {
  return (
    <>
      <SEO tabName="Lucas Thomazella" />
      <HomeView />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default Home;
