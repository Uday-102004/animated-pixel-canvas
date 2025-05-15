
import { Link } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import TypeWriter from '@/components/TypeWriter';
import ParticlesBackground from '@/components/ParticlesBackground';
import { useIsMobile } from '@/hooks/use-mobile';
import MobilePortfolio from './MobilePortfolio';

const Home = () => {
  const isMobile = useIsMobile();
  
  // If mobile, render the MobilePortfolio component instead
  if (isMobile) {
    return <MobilePortfolio />;
  }
  
  return (
    <MainLayout>
      <ParticlesBackground />
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-left" data-aos="fade-up">
              Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 dark:from-blue-400 dark:to-purple-400">
                <TypeWriter text="Your Name" speed={150} />
              </span>
            </h1>
            <div className="flex mb-4">
              <p className="text-xl md:text-2xl text-muted-foreground" data-aos="fade-up" data-aos-delay="200">
                Software Engineer | Python Developer
              </p>
            </div>
            <p className="text-lg md:text-xl mb-8 max-w-2xl" data-aos="fade-up" data-aos-delay="400">
              I build interactive, efficient, and modern applications that solve real-world problems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4" data-aos="fade-up" data-aos-delay="600">
              <Link 
                to="/projects"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                View Projects
              </Link>
              <Link 
                to="/contact"
                className="px-8 py-3 border border-primary text-primary dark:text-white rounded-md hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
