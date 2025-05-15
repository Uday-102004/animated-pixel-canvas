
import MainLayout from '@/components/MainLayout';
import ContactForm from '@/components/ContactForm';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Navigate } from 'react-router-dom';

const Contact = () => {
  const isMobile = useIsMobile();
  
  // If mobile, redirect to the home page with the contact section
  if (isMobile) {
    return <Navigate to="/#contact" replace />;
  }

  return (
    <MainLayout withGrid>
      <section className="full-screen-section">
        <div className="section-container">
          <h2 className="section-title text-center" data-aos="fade-up">Contact</h2>
          
          <div className="max-w-3xl mx-auto mt-8">
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

export default Contact;
