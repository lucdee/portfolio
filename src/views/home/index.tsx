import { DefaultLayout } from '../../layouts/DefaultLayout';
import Aos from 'aos';
import { Hero } from './components/Hero';
import { Blog } from './components/Blog';
import { ExpertiseBrinov } from './components/ExpertiseBrinov';
import { SuccessCases } from './components/SuccessCases';
import { FooterBanner } from './components/FooterBanner';
import { useEffect } from 'react';
import 'aos/dist/aos.css';

export const HomeView: React.FC = () => {
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  return (
    <DefaultLayout>
      <Hero />
      <SuccessCases />
      <ExpertiseBrinov />
      <Blog />
    </DefaultLayout>
  );
};
