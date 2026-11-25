import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProjectsGrid } from '@/components/ProjectsGrid';
import { About } from '@/components/About';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="portfolio-home">
      <Header wide />
      <Hero />
      <ProjectsGrid />
      <About />
      <Footer />
    </main>
  );
}
