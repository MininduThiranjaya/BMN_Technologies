import { Home, Building, Factory } from 'lucide-react';
import ServiceCard from './ServiceCard';

function AllProjects() {
  // Sample data for projects
  const projects = [
    {
      id: 1,
      title: "Residential Solar",
      description: "Complete home solar installations with custom designs for optimal energy production.",
      icon: <Home size={40} className="text-orange-500" />,
      link: "#residential"
    },
    {
      id: 2,
      title: "Commercial Buildings",
      description: "Large-scale solar solutions for office buildings and commercial properties.",
      icon: <Building size={40} className="text-blue-500" />,
      link: "#commercial"
    },
    {
      id: 3,
      title: "Industrial Solutions",
      description: "Power solutions for factories and industrial complexes with high energy demands.",
      icon: <Factory size={40} className="text-gray-600" />,
      link: "#industrial"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-16">Our Services</h1>

        {/* Projects Section */}
        <section>
          <div className="flex items-center mb-8">
            <div className="w-10 h-1 bg-blue-500 mr-4"></div>
            <h2 className="text-3xl font-bold text-gray-700">Projects We Did</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map(project => (
              <ServiceCard
                key={project.id}
                title={project.title}
                description={project.description}
                icon={project.icon}
                link={project.link}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default AllProjects;