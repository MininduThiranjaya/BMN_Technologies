import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

// Reusable card component with hover effect
function ServiceCard({ title, description, icon, link }: any) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <a
            href={link}
            className="block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-64 relative transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="p-6 h-full flex flex-col">
                    <div className={`mb-4 transform transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
                        {icon}
                    </div>

                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>

                    <div className={`overflow-hidden transition-all duration-300 ${isHovered ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <p className="text-gray-600">{description}</p>
                    </div>

                    <div className={`mt-auto flex items-center text-sm font-medium transition-all duration-300 ${isHovered ? 'text-green-600' : 'text-blue-500'}`}>
                        Learn more
                        <ChevronRight size={16} className={`ml-1 transform transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                    </div>
                </div>
            </div>
        </a>
    );
}

export default ServiceCard;