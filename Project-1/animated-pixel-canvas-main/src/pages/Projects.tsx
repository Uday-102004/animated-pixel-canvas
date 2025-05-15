
import MainLayout from '@/components/MainLayout';

const Projects = () => {
  return (
    <MainLayout withGrid>
      <section className="full-screen-section">
        <div className="section-container">
          <h2 className="section-title text-center" data-aos="fade-up">Projects</h2>
          
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
    </MainLayout>
  );
};

export default Projects;
