import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Award, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import ContactForm from '@/components/ContactForm';
import ParticlesBackground from '@/components/ParticlesBackground';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import TypeWriter from '@/components/TypeWriter';
import Chatbot from '@/components/Chatbot';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});
  const isMobile = useIsMobile();
  const isScrollingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideWrapperRef = useRef<HTMLDivElement>(null);
  const [profileImage, setProfileImage] = useState('/placeholder.svg');

  const sections = [
    'home',
    'about',
    'projects',
    'skills',
    'education',
    'certificates',
    'contact'
  ];

  useEffect(() => {
    // Simulating loading for a smooth intro
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Disable default scroll behavior
    const preventScroll = (e: WheelEvent) => {
      e.preventDefault();
    };

    const container = document.documentElement;
    container.addEventListener('wheel', preventScroll, { passive: false });
    
    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        navigateToNextSection();
      } else if (e.key === 'ArrowLeft') {
        navigateToPrevSection();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Check initial hash
    const hash = window.location.hash.replace('#', '');
    if (hash && sections.includes(hash)) {
      setTimeout(() => {
        setCurrentSection(hash);
        scrollToSection(hash);
      }, 500);
    }
    
    return () => {
      container.removeEventListener('wheel', preventScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Wheel event for horizontal scroll
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        if (e.deltaY > 0) {
          navigateToNextSection();
        } else {
          navigateToPrevSection();
        }
      }
    };

    const container = document.documentElement;
    
    // Use a debounced version of wheel handler to prevent too many transitions
    let wheelTimer: ReturnType<typeof setTimeout> | null = null;
    container.addEventListener('wheel', (e) => {
      e.preventDefault();
      
      if (wheelTimer === null) {
        wheelTimer = setTimeout(() => {
          handleWheel(e);
          wheelTimer = null;
        }, 300); // Debounce time
      }
    }, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      if (wheelTimer) clearTimeout(wheelTimer);
    };
  }, [currentSection]);

  const navigateToNextSection = () => {
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex < sections.length - 1) {
      const nextSection = sections[currentIndex + 1];
      scrollToSection(nextSection);
    }
  };

  const navigateToPrevSection = () => {
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex > 0) {
      const prevSection = sections[currentIndex - 1];
      scrollToSection(prevSection);
    }
  };

  const scrollToSection = (sectionId: string) => {
    setCurrentSection(sectionId);
    
    if (slideWrapperRef.current) {
      isScrollingRef.current = true;
      
      const sectionIndex = sections.indexOf(sectionId);
      const translateX = -100 * sectionIndex;
      
      slideWrapperRef.current.style.transform = `translateX(${translateX}vw)`;
      
      // Update URL without scrolling
      history.pushState(null, '', `#${sectionId}`);
      
      // Reset the flag after animation completes
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  };
  
  const handleExploreMore = () => {
    scrollToSection('about');
  };
  
  const handleGithubExplore = () => {
    window.open('https://github.com/yourusername', '_blank');
    toast({
      title: "Exploring more content",
      description: "Opening GitHub profile in a new tab",
    });
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
        <div className="animate-pulse text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <ParticlesBackground />
      <Navigation 
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
        scrollToSection={scrollToSection}
      />
      
      <div className="fixed inset-0 overflow-hidden" ref={containerRef}>
        {/* Slide navigation controls */}
        <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40">
          <button
            onClick={navigateToPrevSection}
            className={`p-3 rounded-full bg-background/40 backdrop-blur-sm hover:bg-background/60 transition-all border border-border ${currentSection === 'home' ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentSection === 'home'}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40">
          <button
            onClick={navigateToNextSection}
            className={`p-3 rounded-full bg-background/40 backdrop-blur-sm hover:bg-background/60 transition-all border border-border ${currentSection === 'contact' ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentSection === 'contact'}
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        
        {/* Slide indicator dots */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 flex space-x-2">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSection === section 
                  ? 'bg-primary w-6' 
                  : 'bg-muted hover:bg-primary/50'
              }`}
              aria-label={`Go to ${section}`}
            />
          ))}
        </div>
        
        {/* Horizontal slides wrapper */}
        <div 
          ref={slideWrapperRef}
          className="flex transition-transform duration-1000 ease-in-out h-full"
          style={{ width: `${sections.length * 100}vw` }}
        >
          {/* Home Section */}
          <section 
            ref={(el) => (sectionsRef.current['home'] = el)}
            id="home" 
            className="h-full w-screen flex items-center justify-center px-4"
            data-aos="fade-up"
          >
            <div className="container mx-auto">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-left">
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
                  <a 
                    href="#about" 
                    className="explore-projects-btn px-8 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('about');
                    }}
                  >
                    View Projects
                  </a>
                  <a 
                    href="#contact" 
                    className="px-8 py-3 border border-primary text-primary dark:text-primary-foreground rounded-md hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('contact');
                    }}
                  >
                    Contact Me
                  </a>
                </div>
                <div className="mt-16" data-aos="fade-up" data-aos-delay="800">
                  <button
                    onClick={handleExploreMore}
                    className="group flex items-center gap-2 mx-auto text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span>Explore More</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </section>
          
          {/* About Me Section */}
          <section 
            ref={(el) => (sectionsRef.current['about'] = el)}
            id="about" 
            className="h-full w-screen flex items-center justify-center px-4"
          >
            <div className="container mx-auto py-20">
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
                    <Button
                      onClick={handleGithubExplore}
                      className="flex items-center gap-2"
                      variant="outline"
                    >
                      <span>Explore More</span>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
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
          
          {/* Projects Section */}
          <section 
            ref={(el) => (sectionsRef.current['projects'] = el)}
            id="projects" 
            className="h-full w-screen flex items-center justify-center px-4"
          >
            <div className="container mx-auto py-20">
              <h2 className="section-title text-left" data-aos="fade-up">Projects</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {/* Project 1 */}
                <div className="project-card" data-aos="fade-up" data-aos-delay="100">
                  <h3 className="text-xl font-semibold mb-2">Project Title 1</h3>
                  <p className="text-muted-foreground mb-4">A short description of this amazing project and what it does.</p>
                  <div className="mb-4">
                    <span className="tech-badge">Python</span>
                    <span className="tech-badge">SQL</span>
                    <span className="tech-badge">NumPy</span>
                  </div>
                  <div className="flex space-x-3 mt-auto">
                    <a 
                      href="#" 
                      className="text-sm px-3 py-1 rounded bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                    <a 
                      href="#" 
                      className="text-sm px-3 py-1 rounded bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </a>
                  </div>
                </div>
                
                {/* Project 2 */}
                <div className="project-card" data-aos="fade-up" data-aos-delay="200">
                  <h3 className="text-xl font-semibold mb-2">Project Title 2</h3>
                  <p className="text-muted-foreground mb-4">A short description of this amazing project and what it does.</p>
                  <div className="mb-4">
                    <span className="tech-badge">Python</span>
                    <span className="tech-badge">Pandas</span>
                    <span className="tech-badge">Matplotlib</span>
                  </div>
                  <div className="flex space-x-3 mt-auto">
                    <a 
                      href="#" 
                      className="text-sm px-3 py-1 rounded bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                    <a 
                      href="#" 
                      className="text-sm px-3 py-1 rounded bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </a>
                  </div>
                </div>
                
                {/* Project 3 */}
                <div className="project-card" data-aos="fade-up" data-aos-delay="300">
                  <h3 className="text-xl font-semibold mb-2">Project Title 3</h3>
                  <p className="text-muted-foreground mb-4">A short description of this amazing project and what it does.</p>
                  <div className="mb-4">
                    <span className="tech-badge">HTML</span>
                    <span className="tech-badge">CSS</span>
                    <span className="tech-badge">Python</span>
                  </div>
                  <div className="flex space-x-3 mt-auto">
                    <a 
                      href="#" 
                      className="text-sm px-3 py-1 rounded bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                    <a 
                      href="#" 
                      className="text-sm px-3 py-1 rounded bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Skills Section */}
          <section 
            ref={(el) => (sectionsRef.current['skills'] = el)}
            id="skills" 
            className="h-full w-screen flex items-center justify-center px-4 bg-secondary/30 dark:bg-secondary/10"
          >
            <div className="container mx-auto py-20">
              <h2 className="section-title text-left" data-aos="fade-up">Skills</h2>
              
              <div className="max-w-3xl mx-auto mt-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Programming Languages */}
                  <div className="bg-background/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-border" data-aos="fade-up" data-aos-delay="100">
                    <h3 className="text-xl font-semibold mb-4">Programming Languages</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                        <span>Python</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                        <span>SQL</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                        <span>Excel</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Libraries/Tools */}
                  <div className="bg-background/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-border" data-aos="fade-up" data-aos-delay="200">
                    <h3 className="text-xl font-semibold mb-4">Libraries/Tools</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                        <span>NumPy</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                        <span>Pandas</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                        <span>Matplotlib</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Web Technologies */}
                  <div className="bg-background/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-border" data-aos="fade-up" data-aos-delay="300">
                    <h3 className="text-xl font-semibold mb-4">Web Technologies</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                        <span>HTML</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                        <span>CSS</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                        <span>GitHub</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Education Section */}
          <section 
            ref={(el) => (sectionsRef.current['education'] = el)}
            id="education" 
            className="h-full w-screen flex items-center justify-center px-4"
          >
            <div className="container mx-auto py-20">
              <h2 className="section-title text-left" data-aos="fade-up">Education</h2>
              
              <div className="max-w-3xl mx-auto mt-12 space-y-8">
                {/* B.Tech */}
                <div className="relative pl-8 pb-8" data-aos="fade-up" data-aos-delay="100">
                  <div className="absolute top-0 left-0 h-full w-0.5 bg-border"></div>
                  <div className="absolute top-0 left-0 w-4 h-4 rounded-full bg-primary -translate-x-1/2"></div>
                  <div className="bg-background/80 dark:bg-secondary/5 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-border">
                    <h3 className="text-xl font-semibold">Bachelor of Technology</h3>
                    <p className="text-muted-foreground">University Name, 2020-2024</p>
                    <p className="mt-2">Computer Science & Engineering</p>
                  </div>
                </div>
                
                {/* Intermediate */}
                <div className="relative pl-8 pb-8" data-aos="fade-up" data-aos-delay="200">
                  <div className="absolute top-0 left-0 h-full w-0.5 bg-border"></div>
                  <div className="absolute top-0 left-0 w-4 h-4 rounded-full bg-primary -translate-x-1/2"></div>
                  <div className="bg-background/80 dark:bg-secondary/5 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-border">
                    <h3 className="text-xl font-semibold">Intermediate</h3>
                    <p className="text-muted-foreground">School Name, 2018-2020</p>
                    <p className="mt-2">Science Stream</p>
                  </div>
                </div>
                
                {/* School */}
                <div className="relative pl-8" data-aos="fade-up" data-aos-delay="300">
                  <div className="absolute top-0 left-0 h-1/2 w-0.5 bg-border"></div>
                  <div className="absolute top-0 left-0 w-4 h-4 rounded-full bg-primary -translate-x-1/2"></div>
                  <div className="bg-background/80 dark:bg-secondary/5 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-border">
                    <h3 className="text-xl font-semibold">Secondary Education</h3>
                    <p className="text-muted-foreground">School Name, Graduated 2018</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Certificates Section */}
          <section 
            ref={(el) => (sectionsRef.current['certificates'] = el)}
            id="certificates" 
            className="h-full w-screen flex items-center justify-center px-4 bg-secondary/30 dark:bg-secondary/10"
          >
            <div className="container mx-auto py-20">
              <h2 className="section-title text-left" data-aos="fade-up">Certificates</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                {/* Certificate 1 */}
                <div className="certificate-card bg-background/80 backdrop-blur-sm p-6 rounded-lg shadow-md border border-border hover:shadow-lg hover:scale-105 transition-all duration-300 flex flex-col" data-aos="fade-up" data-aos-delay="100">
                  <h3 className="text-xl font-semibold mb-2">Python Programming Certificate</h3>
                  <p className="text-muted-foreground mb-6 flex-grow">Advanced Python programming techniques and best practices certification.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Issued: May 2023</span>
                    <a 
                      href="https://drive.google.com/file/d/example1/view" 
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="flex items-center text-primary hover:text-primary/80 transition-colors gap-1"
                    >
                      <span>View Certificate</span>
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
                
                {/* Certificate 2 */}
                <div className="certificate-card bg-background/80 backdrop-blur-sm p-6 rounded-lg shadow-md border border-border hover:shadow-lg hover:scale-105 transition-all duration-300 flex flex-col" data-aos="fade-up" data-aos-delay="200">
                  <h3 className="text-xl font-semibold mb-2">Web Development Fundamentals</h3>
                  <p className="text-muted-foreground mb-6 flex-grow">Core concepts in HTML, CSS, and JavaScript for responsive web development.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Issued: January 2023</span>
                    <a 
                      href="https://drive.google.com/file/d/example2/view" 
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="flex items-center text-primary hover:text-primary/80 transition-colors gap-1"
                    >
                      <span>View Certificate</span>
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
                
                {/* Certificate 3 */}
                <div className="certificate-card bg-background/80 backdrop-blur-sm p-6 rounded-lg shadow-md border border-border hover:shadow-lg hover:scale-105 transition-all duration-300 flex flex-col" data-aos="fade-up" data-aos-delay="300">
                  <h3 className="text-xl font-semibold mb-2">Database Management</h3>
                  <p className="text-muted-foreground mb-6 flex-grow">Comprehensive SQL and database design principles for efficient data management.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Issued: August 2022</span>
                    <a 
                      href="https://drive.google.com/file/d/example3/view" 
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="flex items-center text-primary hover:text-primary/80 transition-colors gap-1"
                    >
                      <span>View Certificate</span>
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
                
                {/* Certificate 4 */}
                <div className="certificate-card bg-background/80 backdrop-blur-sm p-6 rounded-lg shadow-md border border-border hover:shadow-lg hover:scale-105 transition-all duration-300 flex flex-col" data-aos="fade-up" data-aos-delay="400">
                  <h3 className="text-xl font-semibold mb-2">Agile Project Management</h3>
                  <p className="text-muted-foreground mb-6 flex-grow">Effective agile methodologies and project management best practices.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Issued: November 2022</span>
                    <a 
                      href="https://drive.google.com/file/d/example4/view" 
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="flex items-center text-primary hover:text-primary/80 transition-colors gap-1"
                    >
                      <span>View Certificate</span>
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Contact Section */}
          <section 
            ref={(el) => (sectionsRef.current['contact'] = el)}
            id="contact" 
            className="h-full w-screen flex items-center justify-center px-4"
          >
            <div className="container mx-auto py-20">
              <h2 className="section-title text-left" data-aos="fade-up">Contact</h2>
              
              <div className="max-w-3xl mx-auto mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div data-aos="fade-up" data-aos-delay="100">
                    <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                    <p className="mb-6 text-muted-foreground">
                      I'm always open to new opportunities and collaborations. Feel free to reach out!
                    </p>
                    
                    <div className="flex flex-col space-y-4">
                      <a
                        href="mailto:udaykumar102004@gmail.com"
                        className="flex items-center text-foreground hover:text-primary transition-colors"
                      >
                        <Mail className="w-5 h-5 mr-2" />
                        udaykumar102004@gmail.com
                      </a>
                      <a
                        href="https://github.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-foreground hover:text-primary transition-colors"
                      >
                        <Github className="w-5 h-5 mr-2" />
                        github.com/yourusername
                      </a>
                      <a
                        href="https://linkedin.com/in/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-foreground hover:text-primary transition-colors"
                      >
                        <Linkedin className="w-5 h-5 mr-2" />
                        linkedin.com/in/yourusername
                      </a>
                    </div>
                    
                    {/* Explore More Button */}
                    <button
                      onClick={handleGithubExplore}
                      className="mt-8 px-8 py-3 bg-gradient-to-r from-primary to-blue-600 dark:from-blue-500 dark:to-purple-600 text-white rounded-md hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50 flex items-center gap-2"
                    >
                      <span>Explore More</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div data-aos="fade-up" data-aos-delay="200">
                    <ContactForm />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      
      {/* Chatbot */}
      <Chatbot />
      
      {/* Footer - positioned at the bottom of the last slide */}
      <footer className="fixed bottom-0 left-0 w-full py-4 border-t border-border bg-background/80 backdrop-blur-sm z-30">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Your Name. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
