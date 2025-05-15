
import { useEffect, useState } from 'react';
import MainLayout from '@/components/MainLayout';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { ChartContainer } from '@/components/ui/chart';
import { Computer, Database, FileCode, Terminal } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';

const skillsData = [
  {
    category: "Programming Languages",
    icon: <FileCode className="h-6 w-6" />,
    description: "Core programming languages I work with",
    skills: [
      { name: "Python", level: 90, description: "Data analysis, scripting, and automation" },
      { name: "SQL", level: 85, description: "Database queries and data manipulation" },
      { name: "Excel", level: 80, description: "Advanced formulas, macros, and data modeling" }
    ],
    color: "#9b87f5"
  },
  {
    category: "Libraries/Tools",
    icon: <Computer className="h-6 w-6" />,
    description: "Essential tools in my data science toolkit",
    skills: [
      { name: "NumPy", level: 88, description: "Numerical computing and array operations" },
      { name: "Pandas", level: 92, description: "Data manipulation and analysis" },
      { name: "Matplotlib", level: 82, description: "Data visualization and plotting" }
    ],
    color: "#7E69AB"
  },
  {
    category: "Web Technologies",
    icon: <Terminal className="h-6 w-6" />,
    description: "Web development technologies I use",
    skills: [
      { name: "HTML", level: 75, description: "Creating structured web content" },
      { name: "CSS", level: 70, description: "Styling and responsive design" },
      { name: "GitHub", level: 80, description: "Version control and collaboration" }
    ],
    color: "#6E59A5"
  }
];

// Data for the chart
const chartData = [
  { name: 'Programming', value: 35, fill: '#9b87f5' },
  { name: 'Tools', value: 30, fill: '#7E69AB' },
  { name: 'Web', value: 25, fill: '#6E59A5' },
  { name: 'Other', value: 10, fill: '#D6BCFA' },
];

const SkillCard = ({ category, skills, icon, description, color }: any) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimated(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="transition-all duration-300 hover:shadow-lg dark:hover:shadow-primary/10 backdrop-blur-sm border-border hover:border-primary/30">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-bold">{category}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground mt-1">
            {description}
          </CardDescription>
        </div>
        <div className="rounded-full bg-primary/10 p-3 text-primary dark:text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent className="pt-3">
        <div className="space-y-6">
          {skills.map((skill: any, index: number) => (
            <HoverCard key={skill.name} openDelay={200} closeDelay={100}>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <HoverCardTrigger asChild>
                    <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer hover:text-primary transition-colors duration-200">
                      {skill.name}
                    </span>
                  </HoverCardTrigger>
                  <span className="text-sm text-muted-foreground">
                    {animated ? `${skill.level}%` : '0%'}
                  </span>
                </div>
                <Progress 
                  value={animated ? skill.level : 0} 
                  className="h-2 transition-all duration-1000 ease-out"
                  style={{ 
                    "--progress-background": `${color}20`,
                    "--progress-foreground": color
                  } as React.CSSProperties}
                />
                <HoverCardContent className="w-64 text-sm" side="top">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">{skill.name}</h4>
                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                  </div>
                </HoverCardContent>
              </div>
            </HoverCard>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const Skills = () => {
  const isMobile = useIsMobile();
  
  return (
    <MainLayout withGrid>
      <section className="full-screen-section bg-secondary/30 dark:bg-secondary/10">
        <div className="section-container px-4 py-12">
          <h2 
            className="section-title text-left" 
            data-aos="fade-up"
          >
            Skills
          </h2>
          
          <div className={`grid grid-cols-1 ${isMobile ? 'gap-6' : 'lg:grid-cols-3 gap-8'} mt-12`}>
            <div className={`${isMobile ? '' : 'lg:col-span-2'} space-y-8`}>
              {skillsData.map((category, index) => (
                <div 
                  key={category.category} 
                  data-aos="fade-up" 
                  data-aos-delay={100 + (index * 100)}
                >
                  <SkillCard {...category} />
                </div>
              ))}
            </div>
            
            {/* Chart Section - Always visible on mobile and desktop */}
            <div 
              className={`${isMobile ? 'mt-8' : 'lg:row-span-1 mt-8 lg:mt-0'}`} 
              data-aos="fade-up" 
              data-aos-delay="400"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg backdrop-blur-sm border-border hover:border-primary/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Skills Distribution
                  </CardTitle>
                  <CardDescription className="text-sm mt-2">
                    Relative time spent using different skill categories
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className={`${isMobile ? 'h-[250px]' : 'h-[320px]'}`}>
                    <ChartContainer config={{ key: { theme: { light: '#000', dark: '#fff' } } }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={isMobile ? 60 : 80}
                            innerRadius={isMobile ? 30 : 40}
                            fill="#8884d8"
                            dataKey="value"
                            animationBegin={300}
                            animationDuration={1500}
                          >
                            {chartData.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={entry.fill}
                                className="transition-opacity duration-300 hover:opacity-80"
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Skills;
