
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import Chatbot from './Chatbot';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
  withGrid?: boolean;
}

const MainLayout = ({ children, withGrid = false }: MainLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const navItems = [
    { path: '/', label: 'Home', section: 'home' },
    { path: '/about', label: 'About Me', section: 'about' },
    { path: '/skills', label: 'Skills', section: 'skills' },
    { path: '/projects', label: 'Projects', section: 'projects' },
    { path: '/education', label: 'Education', section: 'education' },
    { path: '/certificates', label: 'Certificates', section: 'certificates' },
    { path: '/contact', label: 'Contact', section: 'contact' },
  ];
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Determine if current page is home
  const isHomePage = location.pathname === '/';

  // Function to handle smooth scrolling
  const scrollToSection = (sectionId: string) => {
    if (isMobile) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
      } else if (location.pathname !== '/') {
        // If section not found on current page, navigate to home and then scroll
        window.location.href = `/#${sectionId}`;
      }
    }
  };

  // Add scroll spy effect to highlight active section in mobile menu
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (isMobile) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        { threshold: 0.3 }
      );

      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => {
        observer.observe(section);
      });

      return () => {
        sections.forEach((section) => {
          observer.unobserve(section);
        });
      };
    }
  }, [isMobile, location]);

  return (
    <div className={`min-h-screen flex flex-col ${withGrid && !isHomePage ? 'bg-grid-pattern' : ''}`}>
      {/* Navigation */}
      <nav className="sticky top-0 w-full z-50 bg-background/80 backdrop-blur-lg py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            Dev<span className="text-primary">Portfolio</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`nav-item px-3 py-2 rounded-md transition-colors hover:text-primary hover:bg-primary/10 ${
                      location.pathname === item.path ? 'text-primary font-medium' : ''
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ThemeToggle />
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-4">
            <ThemeToggle />
            {isMobile ? (
              <Sheet>
                <SheetTrigger asChild>
                  <button 
                    className="text-foreground p-2 rounded-md hover:bg-primary/10"
                    aria-label="Open menu"
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[75vw] sm:w-[350px]">
                  <nav className="flex flex-col gap-4 mt-8">
                    {navItems.map((item) => (
                      <a
                        key={item.section}
                        href={`#${item.section}`}
                        className={cn(
                          "flex items-center gap-2 py-2 px-4 rounded-md transition-colors",
                          activeSection === item.section 
                            ? "bg-primary/10 text-primary font-medium" 
                            : "hover:bg-primary/5"
                        )}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(item.section);
                        }}
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            ) : (
              <button 
                className="text-foreground p-2 rounded"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                <div className="w-6 flex flex-col space-y-1.5">
                  <span 
                    className={`block h-0.5 bg-current transform transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
                  />
                  <span 
                    className={`block h-0.5 bg-current transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                  />
                  <span 
                    className={`block h-0.5 bg-current transform transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
                  />
                </div>
              </button>
            )}
          </div>
        </div>
        
        {/* Legacy Mobile Menu (will be replaced by Sheet) */}
        <div 
          className={`fixed inset-0 z-40 bg-background/95 dark:bg-background/95 backdrop-blur-lg transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          style={{ top: '60px' }}
        >
          <div className="container mx-auto px-4 py-8">
            <ul className="flex flex-col space-y-6 items-center">
              {navItems.map((item) => (
                <li key={item.path} className="w-full text-center">
                  <Link
                    to={item.path}
                    className={`text-xl block py-2 ${location.pathname === item.path ? 'text-primary font-medium' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 transition-all duration-500 ease-in-out">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-4 border-t border-border bg-background/80 backdrop-blur-sm">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Uday Kumar. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a
                href="mailto:udaykumar102004@gmail.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default MainLayout;
