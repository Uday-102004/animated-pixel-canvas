import React, { useEffect } from 'react';
import MainLayout from '@/components/MainLayout';
import TypeWriter from '@/components/TypeWriter';
import ParticlesBackground from '@/components/ParticlesBackground';
import ContactForm from '@/components/ContactForm';
import { Github, Linkedin, Mail } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import AOS from 'aos';

const MobilePortfolio = () => {
  const [profileImage, setProfileImage] = React.useState('/placeholder.svg');

  useEffect(() => {
    // Refresh AOS when component mounts
    AOS.refresh();
  }, []);

  const handleGithubExplore = () => {
    window.open('https://github.com/yourusername', '_blank');
    toast({
      title: "Exploring more content",
      description: "Opening GitHub profile in a new tab",
    });
  };

  return (
    <MainLayout>
      <ParticlesBackground />
      
      {/* Home Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6" data-aos="fade-up">
              Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 dark:from-blue-400 dark:to-purple-400">
                <TypeWriter text="Your Name" speed={150} />
              </span>
            </h1>
            <div className="flex justify-center mb-4">
              <p className="text-xl md:text-2xl text-muted-foreground" data-aos="fade-up" data-aos-delay="200">
                Software Engineer | Python Developer
              </p>
            </div>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="400">
              I build interactive, efficient, and modern applications that solve real-world problems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="600">
              <a 
                href="#projects" 
                className="px-8 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                View Projects
              </a>
              <a 
                href="#contact" 
                className="px-8 py-3 border border-primary text-primary dark:text-primary-foreground rounded-md hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center px-4 py-16">
        <div className="container mx-auto py-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-left" data-aos="fade-up">About Me</h2>
          
          <div className="grid grid-cols-1 gap-12 items-center">
            <div className="flex justify-center" data-aos="fade-up" data-aos-delay="200">
              <div className="relative w-full max-w-md">
                <div className="w-full aspect-square md:aspect-[3/4] rounded-lg overflow-hidden bg-muted shadow-xl hover:scale-105 transition-transform duration-300 border-4 border-background">
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
          </div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section id="skills" className="min-h-screen flex items-center justify-center px-4 py-16 bg-secondary/30 dark:bg-secondary/10">
        <div className="container mx-auto py-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-left" data-aos="fade-up">Skills</h2>
          
          <div className="max-w-3xl mx-auto">
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

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center justify-center px-4 py-16">
        <div className="container mx-auto py-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-left" data-aos="fade-up">Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {/* Project 1 */}
            <div className="bg-background/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-border hover:shadow-lg hover:scale-105 transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
              <h3 className="text-xl font-semibold mb-2">Project Title 1</h3>
              <p className="text-muted-foreground mb-4">A short description of this amazing project and what it does.</p>
              <div className="mb-4">
                <span className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded mr-2 mb-2">Python</span>
                <span className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded mr-2 mb-2">SQL</span>
                <span className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded mr-2 mb-2">NumPy</span>
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
            <div className="bg-background/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-border hover:shadow-lg hover:scale-105 transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
              <h3 className="text-xl font-semibold mb-2">Project Title 2</h3>
              <p className="text-muted-foreground mb-4">A short description of this amazing project and what it does.</p>
              <div className="mb-4">
                <span className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded mr-2 mb-2">Python</span>
                <span className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded mr-2 mb-2">Pandas</span>
                <span className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded mr-2 mb-2">Matplotlib</span>
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
            <div className="bg-background/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-border hover:shadow-lg hover:scale-105 transition-all duration-300" data-aos="fade-up" data-aos-delay="300">
              <h3 className="text-xl font-semibold mb-2">Project Title 3</h3>
              <p className="text-muted-foreground mb-4">A short description of this amazing project and what it does.</p>
              <div className="mb-4">
                <span className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded mr-2 mb-2">HTML</span>
                <span className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded mr-2 mb-2">CSS</span>
                <span className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded mr-2 mb-2">Python</span>
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

      {/* Education Section */}
      <section id="education" className="min-h-screen flex items-center justify-center px-4 py-16">
        <div className="container mx-auto py-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-left" data-aos="fade-up">Education</h2>
          
          <div className="max-w-3xl mx-auto mt-8 space-y-8">
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
      <section id="certificates" className="min-h-screen flex items-center justify-center px-4 py-16 bg-secondary/30 dark:bg-secondary/10">
        <div className="container mx-auto py-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-left" data-aos="fade-up">Certificates</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* Certificate cards */}
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
                </a>
              </div>
            </div>
            
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
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center px-4 py-16">
        <div className="container mx-auto py-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-left" data-aos="fade-up">Contact</h2>
          
          <div className="max-w-3xl mx-auto">
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
              </div>
              
              <div data-aos="fade-up" data-aos-delay="200">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default MobilePortfolio;
