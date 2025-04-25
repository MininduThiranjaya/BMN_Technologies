import { useRef, useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import BannerImages from '../components/BannerImages';
import Footer from '../components/Footer';
import banner1 from '../assets/bannerImages/banner1.jpg';
import banner2 from '../assets/bannerImages/banner2.jpg';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';

interface ItemType {
    id: number,
    title: string,
    image: string,
    additionalImages: string[],
    description: string,
}

// Main Showcase Component
export default function ProjectShowCasePage() {

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // scroll to top
    }, [pathname]);

    const { category } = useParams<{ category: string }>();
    const introRef = useRef(null);
    const servicesRef = useRef(null);
    const contactRef = useRef(null);
    const aboutRef = useRef(null);

    // Sample data - replace with your actual items
    const allItems = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        title: `Item ${i + 1}`,
        // Main image and additional images for carousel
        image: banner1,
        additionalImages: [
            banner2,
            banner1,
            banner2,
            banner1
        ],
        description: `This is a detailed description for item ${i + 1}. Here you can include all the information about this particular item that would be useful for users to know.`,
    }));

    // State variables
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const itemsPerPage = 8; // 4x2 grid
    const totalPages = Math.ceil(allItems.length / itemsPerPage);

    // Get current items
    const getCurrentItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return allItems.slice(startIndex, startIndex + itemsPerPage);
    };

    // Handle page change
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // Open modal with selected item
    const openModal = (item: ItemType) => {
        setSelectedItem(item);
        setCurrentImageIndex(0); // Reset to first image when opening modal
    };

    // Close modal
    const closeModal = () => {
        setSelectedItem(null);
        setCurrentImageIndex(0);
    };

    // Navigate to previous image
    const prevImage = () => {
        if (!selectedItem) return;
        const totalImages = selectedItem.additionalImages.length + 1; // Include main image
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
    };

    // Navigate to next image
    const nextImage = () => {
        if (!selectedItem) return;
        const totalImages = selectedItem.additionalImages.length + 1; // Include main image
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
    };

    // Select specific image by index
    const selectImage = (index: number) => {
        setCurrentImageIndex(index);
    };

    // Get current image based on index
    const getCurrentImage = () => {
        if (!selectedItem) return "";
        if (currentImageIndex === 0) return selectedItem.image;
        return selectedItem.additionalImages[currentImageIndex - 1];
    };

    return (
        <div className="flex flex-col min-h-screen absolute left-0 right-0">
            <NavBar refs={{ introRef, servicesRef, contactRef, aboutRef }}/>
            <BannerImages />

            <main className="flex-grow bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    {/* Page Title */}
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-bold text-gray-800">OUR PRODUCTS</h2>
                        <p className="text-gray-600">Browse our collection of premium items</p>
                    </div>

                    {/* Grid Layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {getCurrentItems().map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-lg shadow hover:shadow-lg cursor-pointer transition-shadow"
                                onClick={() => openModal(item)}
                            >
                                <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-t-lg" />
                                <div className="p-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold text-lg">{item.title}</h3>
                                    </div>
                                    <p className="text-gray-500 text-sm mt-1">Click to view details</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-8">
                            <div className="flex space-x-2">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => handlePageChange(i + 1)}
                                        className={`px-4 py-2 rounded ${currentPage === i + 1
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 hover:bg-gray-300'
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <div className="mx-4 mb-4">
                <Footer />
            </div>

            {/* Detail Modal */}
            {selectedItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl h-auto max-h-full overflow-auto">
                        {/* Fixed position close button that's always visible */}
                        <div className="sticky top-0 left-0 right-0 flex justify-end p-2 bg-white bg-opacity-90 rounded-t-lg z-20">
                            <button
                                onClick={closeModal}
                                className="bg-white p-1 rounded-full shadow-md hover:bg-gray-100"
                            >
                                <X size={26} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2">
                            {/* Left side - Image Carousel */}
                            <div className="p-6 relative">
                                <div className="relative">
                                    <img
                                        src={getCurrentImage()}
                                        alt={selectedItem.title}
                                        className="w-full h-80 object-cover rounded"
                                    />

                                    {/* Navigation arrows */}
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-1 hover:bg-opacity-100"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>

                                    <button
                                        onClick={nextImage}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-1 hover:bg-opacity-100"
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </div>

                                {/* Thumbnail images */}
                                <div className="flex mt-4 space-x-2 overflow-x-auto py-2">
                                    <div
                                        className={`w-16 h-16 cursor-pointer ${currentImageIndex === 0 ? 'ring-2 ring-blue-500' : ''}`}
                                        onClick={() => selectImage(0)}
                                    >
                                        <img
                                            src={selectedItem.image}
                                            alt={`${selectedItem.title} - main`}
                                            className="w-full h-full object-cover rounded"
                                        />
                                    </div>

                                    {selectedItem.additionalImages.map((img, idx) => (
                                        <div
                                            key={idx}
                                            className={`w-16 h-16 cursor-pointer ${currentImageIndex === idx + 1 ? 'ring-2 ring-blue-500' : ''}`}
                                            onClick={() => selectImage(idx + 1)}
                                        >
                                            <img
                                                src={img}
                                                alt={`${selectedItem.title} - ${idx + 1}`}
                                                className="w-full h-full object-cover rounded"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right side - Description */}
                            <div className="p-6 bg-gray-50 rounded-r-lg flex flex-col justify-between">
                                <div>
                                    <p className="text-gray-700 mb-8">{selectedItem.description}</p>
                                </div>
                            </div>
                        </div>

                        {/* Bottom buttons */}
                        <div className="flex justify-end p-4 bg-gray-100 rounded-b-lg border-t">
                            <button
                                onClick={closeModal}
                                className="px-6 py-2 mr-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}