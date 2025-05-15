
import MainLayout from '@/components/MainLayout';
import { GraduationCap, CalendarDays, School, BookOpen } from 'lucide-react';

const Education = () => {
  return (
    <MainLayout withGrid>
      <section className="full-screen-section">
        <div className="section-container max-w-4xl mx-auto px-4 py-12">
          <h2 className="section-title text-center mb-8" data-aos="fade-up">Education</h2>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            My academic journey and continuous learning path in technology and engineering.
          </p>
          
          <div className="space-y-8 pb-4">
            {/* B.Tech */}
            <div className="bg-background/80 dark:bg-secondary/5 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-border" data-aos="fade-up" data-aos-delay="100">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl font-semibold">Bachelor of Technology in Electronics and Communication Engineering</h3>
                    <div className="flex items-center text-muted-foreground">
                      <CalendarDays className="h-4 w-4 mr-1 inline" />
                      <span>2020-2024</span>
                    </div>
                  </div>
                  <p className="text-primary font-medium">MVGR College of Engineering, Vizianagaram, Andhra Pradesh</p>
                  <p className="mt-3">Focused on Cybersecurity, IoT, and Embedded Systems. Engaged in projects involving STM32 Boards, RPLIDAR, ROS2, and smart autonomous systems.</p>
                </div>
              </div>
            </div>
            
            {/* Intermediate */}
            <div className="bg-background/80 dark:bg-secondary/5 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-border" data-aos="fade-up" data-aos-delay="200">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl font-semibold">Intermediate (Class 12)</h3>
                    <div className="flex items-center text-muted-foreground">
                      <CalendarDays className="h-4 w-4 mr-1 inline" />
                      <span>2018-2020</span>
                    </div>
                  </div>
                  <p className="text-primary font-medium">Apex Junior College</p>
                  <p className="mt-3">Studied foundational courses in Physics, Mathematics, and Chemistry with a focus on engineering entrance preparation.</p>
                </div>
              </div>
            </div>
            
            {/* School */}
            <div className="bg-background/80 dark:bg-secondary/5 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-border" data-aos="fade-up" data-aos-delay="300">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <School className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl font-semibold">Schooling (Class 5–10)</h3>
                    <div className="flex items-center text-muted-foreground">
                      <CalendarDays className="h-4 w-4 mr-1 inline" />
                      <span>2014-2018</span>
                    </div>
                  </div>
                  <p className="text-primary font-medium">Fort City School</p>
                  <p className="mt-3">Built academic fundamentals and early interests in technology and innovation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Education;
