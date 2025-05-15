
import MainLayout from '@/components/MainLayout';
import { Github, Linkedin } from 'lucide-react';
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Navigate } from 'react-router-dom';

const About = () => {
  const [profileImage, setProfileImage] = useState('/placeholder.svg');
  const isMobile = useIsMobile();
  
  // If mobile, redirect to the home page with the about section
  if (isMobile) {
    return <Navigate to="/#about" replace />;
  }

  return (
    <MainLayout withGrid>
      <section className="full-screen-section">
        <div className="section-container">
          <h2 className="section-title text-left" data-aos="fade-up">About Me</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 items-center">
            <div className="space-y-6" data-aos="fade-up" data-aos-delay="100">
              <p className="text-lg leading-relaxed">
                Hello! I'm a passionate Software Engineer and Python Developer with expertise in building efficient, 
                user-friendly applications. With a strong foundation in computer science and a love for solving complex 
                problems, I enjoy bringing ideas to life through code.
              </p>
              <p className="text-lg leading-relaxed">
                My journey in technology started during my university years, and since then, I have been consistently 
                expanding my knowledge in the ever-evolving tech landscape. I particularly enjoy working with Python, SQL, 
                and modern web technologies to create impactful solutions.
              </p>
              <p className="text-lg leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or 
                sharing my knowledge through mentoring and community engagement.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href="https://linkedin.com/in/yourusername" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
                <a 
                  href="https://github.com/yourusername" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  <Github className="h-4 w-4" /> GitHub
                </a>
              </div>
            </div>
            <div className="flex justify-center" data-aos="fade-up" data-aos-delay="200">
              <div className="relative w-full max-w-md">
                <div className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-muted shadow-xl hover:scale-105 transition-transform duration-300 border-4 border-background">
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                    onError={() => setProfileImage('/placeholder.svg')}
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-6 py-2 rounded shadow-lg">
                  <span className="font-medium">Python Developer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
