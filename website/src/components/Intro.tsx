import { useState, useEffect } from 'react';
import { Sun, Wind, Battery, Zap } from 'lucide-react';

export default function Intro() {
  const [visible, setVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  
  // Vision/Mission statements for the banner
  const bannerContent = [
    {
      title: "Our Vision",
      text: "Powering a sustainable Sri Lanka through innovative solar solutions",
      icon: <Sun size={48} className="text-yellow-500" />
    },
    {
      title: "Our Mission",
      text: "To reduce carbon footprints while delivering economic benefits through clean energy",
      icon: <Wind size={48} className="text-blue-500" />
    },
    {
      title: "Innovation",
      text: "Leveraging cutting-edge technology to maximize energy efficiency",
      icon: <Zap size={48} className="text-orange-500" />
    },
    {
      title: "Sustainability",
      text: "Building a greener future for generations to come",
      icon: <Battery size={48} className="text-green-500" />
    }
  ];

  // Text animation effect
  useEffect(() => {
    setVisible(true);
  }, []);

  // Banner image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === bannerContent.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-1/2 bg-gray-50">
      <div className="w-4/5 mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-32 items-center">
          
          {/* Column 1: Company Description with Animation */}
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-6 overflow-hidden">
              <span className={`inline-block transform ${visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} transition-all duration-1000 delay-300 mb-4`}>
                About B M N Technologies (Pvt) Ltd
              </span>
            </h1>
            
            <div className="space-y-2">
              <p className={`text-gray-700 leading-relaxed overflow-hidden ${visible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 delay-500 text-lg`}>
                B M N Technologies (Pvt) Ltd is a forward-thinking solar energy solutions provider committed to powering a sustainable future. Specializing in solar panel installation, maintenance, and energy-efficient systems, we bring clean, reliable, and affordable energy solutions to homes, businesses, and communities.
              </p>
              
              <p className={`text-gray-700 leading-relaxed overflow-hidden ${visible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 delay-700 text-lg`}>
                With a strong focus on innovation, quality, and customer satisfaction, B M N Technologies is at the forefront of Sri Lanka's renewable energy transformation. Our mission is to reduce carbon footprints and empower our clients with smart solar technologies that drive both environmental and economic benefits.
              </p>
            </div>
            
            <div className={`mt-8 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-1000 delay-1000`}>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg transition-colors duration-300 flex items-center">
                <Sun size={20} className="mr-2" />
                Discover Our Solutions
              </button>
            </div>
          </div>
          
          {/* Column 2: Sweeping Banner Image */}
          <div className="w-full md:w-1/2">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden h-96 relative">
              {/* Banner content */}
              <div className="h-full w-full bg-gradient-to-r from-blue-50 to-green-50 flex items-center justify-center p-8">
                <div className="text-center transition-all duration-700 transform scale-100 opacity-100">
                  <div className="flex justify-center mb-6">
                    {bannerContent[currentImage].icon}
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-gray-800">
                    {bannerContent[currentImage].title}
                  </h2>
                  <p className="text-lg text-gray-600">
                    {bannerContent[currentImage].text}
                  </p>
                </div>
              </div>
              
              {/* Banner indicators */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {bannerContent.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${currentImage === index ? 'bg-green-600 w-6' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}