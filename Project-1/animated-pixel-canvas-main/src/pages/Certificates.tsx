
import MainLayout from '@/components/MainLayout';
import { ExternalLink } from 'lucide-react';

const Certificates = () => {
  return (
    <MainLayout withGrid>
      <section className="full-screen-section bg-secondary/30 dark:bg-secondary/10">
        <div className="section-container">
          <h2 className="section-title text-center" data-aos="fade-up">Certificates</h2>
          
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
    </MainLayout>
  );
};

export default Certificates;
