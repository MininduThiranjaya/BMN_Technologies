import { useRef, useState, useEffect } from 'react';
import { User, MapPin, Folder, X, ChevronLeft, ChevronRight, Calendar, Tags, FileText   } from 'lucide-react';
import BannerImages from '../components/BannerImages';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import axios from 'axios';

interface tempItemType {
    projectId: string,
    projectName: string,
    personName: string,
    location: string,
    projectDescription: string,
    category: string,
    projectDate: string,
    imageUrl: string[]
}

// Main Showcase Component
export default function ProjectShowCasePage() {

    const { pathname } = useLocation();
    const introRef = useRef(null);
    const servicesRef = useRef(null);
    const contactRef = useRef(null);
    const aboutRef = useRef(null);
    // State variables
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedItem, setSelectedItem] = useState<tempItemType| null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [allItems, setAllItems] = useState<tempItemType[]>([]);
    const itemsPerPage = 8; // 4x2 grid
    const totalPages = Math.ceil(allItems.length / itemsPerPage);

    useEffect(() => {
        window.scrollTo(0, 0); // scroll to top

         window.scrollTo(0, 0); // scroll to top
        async function fetchAllProducts() {
            await axios.get("http://localhost:8080/api/auth/project/get")
                .then((res) => {
                    console.log(res);
                    setAllItems(res.data);
                })
                .catch((error) => {
                    console.log("Error fetching data : ", error);
                })
        }

        fetchAllProducts();
    }, [pathname]);

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
    const openModal = (item: tempItemType) => {
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
        const totalImages = selectedItem.imageUrl.length; // Include main image
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
    };

    // Navigate to next image
    const nextImage = () => {
        if (!selectedItem) return;
        const totalImages = selectedItem.imageUrl.length; // Include main image
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
    };

    // Select specific image by index
    const selectImage = (index: number) => {
        setCurrentImageIndex(index);
    };

    // Get current image based on index
    const getCurrentImage = () => {
        if (!selectedItem) return "";
        if (currentImageIndex === 0) return selectedItem.imageUrl[0];
        return selectedItem.imageUrl[currentImageIndex];
    };

    return (
        <div className="flex flex-col min-h-screen absolute left-0 right-0">
            <NavBar refs={{ introRef, servicesRef, contactRef, aboutRef }}/>
            <BannerImages />

            <main className="flex-grow bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    {/* Page Title */}
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-bold text-gray-800">OUR PROJECTS</h2>
                        <p className="text-gray-600">Browse our collection of premium items</p>
                    </div>

                    {/* Grid Layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {getCurrentItems().map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow hover:shadow-lg cursor-pointer transition-shadow"
                                onClick={() => openModal(item)}
                            >
                                <img src={item.imageUrl[0]} alt={item.projectName} className="w-full h-48 object-cover rounded-t-lg" />
                                <div className="p-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold text-lg">{item.projectName}</h3>
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
                                        alt={selectedItem.projectId}
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
                                    {selectedItem.imageUrl.map((img, index) => (
                                        <div
                                            key={index}
                                            className={`w-16 h-16 cursor-pointer ${currentImageIndex === index ? 'ring-2 ring-blue-500' : ''}`}
                                            onClick={() => selectImage(index)}
                                        >
                                            <img
                                                src={img}
                                                alt={`${selectedItem.projectId} - ${index}`}
                                                className="w-full h-full object-cover rounded"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right side - Project Details */}
                            <div className="p-6 bg-gray-50 rounded-r-lg flex flex-col">
                                <div className="space-y-4">
                                    {/* Project Name */}
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Project Name</h3>
                                        <div className="mt-1 flex items-center">
                                            <Folder className="h-5 w-5 text-gray-400 mr-2" />
                                            <p className="mt-1 text-lg font-bold text-gray-900">{selectedItem.projectName || 'N/A'}</p>
                                        </div>
                                    </div>

                                    {/* Person Name */}
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Person Name</h3>
                                        <div className="mt-1 flex items-center">
                                            <User className="h-5 w-5 text-gray-400 mr-2" />
                                            <p className="text-gray-900 font-semibold">{selectedItem.personName || 'N/A'}</p>
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Location</h3>
                                        <div className="mt-1 flex items-center">
                                            <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                                            <p className="text-gray-900 font-semibold">{selectedItem.location || 'N/A'}</p>
                                        </div>
                                    </div>

                                    {/* Category and Project Date */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Category</h3>
                                            <div className="mt-1 flex items-center">
                                                <Tags className="h-5 w-5 text-gray-400 mr-2" />
                                                <p className="mt-1 text-gray-900 font-semibold capitalize">{selectedItem.category || 'N/A'}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Project Date</h3>
                                            <div className="mt-1 flex items-center">
                                                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                                                <p className="mt-1 text-gray-900 font-semibold">{selectedItem.projectDate || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Project Description */}
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Project Description</h3>
                                        <div className="mt-1 flex items-center">
                                            <FileText className="h-5 w-5 text-gray-400 mr-2" />
                                            <p className="mt-1 text-gray-900 font-semibold leading-relaxed">{selectedItem.projectDescription || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom buttons */}
                        <div className="flex justify-end p-4 bg-gray-100 rounded-b-lg border-t">
                            <button
                                onClick={closeModal}
                                className="px-6 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}