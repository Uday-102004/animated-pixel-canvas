
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

interface NavigationProps {
  currentSection: string;
  setCurrentSection: (section: string) => void;
  scrollToSection: (section: string) => void;
}

const Navigation = ({ currentSection, setCurrentSection, scrollToSection }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Me' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-2 bg-background/80 dark:bg-background/80 backdrop-blur-lg shadow-md' : 'py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a 
          href="#home" 
          className="text-xl font-bold"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
        >
          Dev<span className="text-primary">Portfolio</span>
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`nav-item px-3 py-2 rounded-md transition-colors hover:text-primary hover:bg-primary/10 ${currentSection === item.id ? 'text-primary font-medium' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden space-x-4">
          <ThemeToggle />
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
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-background/95 dark:bg-background/95 backdrop-blur-lg transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ top: '60px' }}
      >
        <div className="container mx-auto px-4 py-8">
          <ul className="flex flex-col space-y-6 items-center">
            {navItems.map((item) => (
              <li key={item.id} className="w-full text-center">
                <a
                  href={`#${item.id}`}
                  className={`text-xl block py-2 ${currentSection === item.id ? 'text-primary font-medium' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
