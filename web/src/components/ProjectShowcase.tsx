import { useEffect, useState } from "react";
import type { ProjectFilter, ProjectItemType } from "../types/Project";
import { endpoints } from "../api";
import axios from "axios";
import { X, ChevronLeft, ChevronRight, Folder, User, Tags, Calendar, MapPin, FileText } from "lucide-react";

function ProjectShowcase() {

    // State variables
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedItem, setSelectedItem] = useState<ProjectItemType | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [allItems, setAllItems] = useState<ProjectItemType[]>([]);
    const itemsPerPage = 8; // 4x2 grid
    const totalPages = Math.ceil(allItems.length / itemsPerPage);
    const [isOpen, setIsOpen] = useState(true)
    const [filters, setFilters] = useState<ProjectFilter>({
        category: 'all',
        location: null,
        projectMinDate: null,
        projectMaxDate: null,
    })
    const [submitFilter, setSubmitFilter] = useState(false)
    const menuItems = [
        { type: "Select all category", value: "all" },
        { type: "Residential Solar", value: "residential" },
        { type: "Commercial Buildings", value: "commercial" },
        { type: "Industrial Solutions", value: "industry" }
    ];
    const provinces = [
        { type: "All Provinces", value: "all" },
        { type: "Central Province", value: "central" },
        { type: "Eastern Province", value: "eastern" },
        { type: "Northern Province", value: "northern" },
        { type: "North Central Province", value: "north_central" },
        { type: "North Western Province", value: "north_western" },
        { type: "Sabaragamuwa Province", value: "sabaragamuwa" },
        { type: "Southern Province", value: "southern" },
        { type: "Uva Province", value: "uva" },
        { type: "Western Province", value: "western" }
    ];


    useEffect(() => {
        async function fetchFilteredProducts() {
            await axios
                .post(`${endpoints.project.getFiltered}`, filters)
                .then((res) => {
                    console.log(res);
                    setAllItems(res.data);
                })
                .catch((error) => {
                    console.log("Error fetching data : ", error);
                });
        }
        
        async function fetchAllProducts() {
            await axios
                .get(`${endpoints.project.getAll}`)
                .then((res) => {
                    console.log(res);
                    setAllItems(res.data);
                })
                .catch((error) => {
                    console.log("Error fetching data : ", error);
                });
        }

        if (submitFilter) {
            fetchFilteredProducts();
            setSubmitFilter(false)
        }

        if(!submitFilter && filters.category == 'all') {
            fetchAllProducts();
        }
    }, [submitFilter]);

   

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
    const openModal = (item: ProjectItemType) => {
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
        <div className="w-full h-full p-3 md:p-5 overflow-y-scroll scrollbar-hide">

            {!isOpen && (
                <div className="fixed top-25 w-2/3 h-2/5 md:w-1/5 md:h-3/5 backdrop-blur-sm z-50 flex items-center justify-center">
                    {/* Modal container */}
                    <div className="relative w-full h-full bg-white/90 rounded-lg border-2 shadow-lg max-w-md p-6">

                        {/* Close button (top-left) */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="absolute top-4 left-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X size={28} className="text-gray-800" />
                        </button>

                        {/* Content */}
                        <div className="text-center mt-4">
                            <h2 className="text-2xl font-bold text-gray-800">Filter Products</h2>
                            <div className="flex flex-col md:flex-col justify-between items-center gap-4 w-full mt-5 md:mt-10">
                                <select
                                    value={filters.category || ""}
                                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                                    className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-700"
                                >    
                                    {menuItems.map((item, index) => (
                                        <option className="text-xs md:text-sm" key={index} value={item.value}>
                                                {item.type}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={filters.location || ""}
                                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                                    className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-700"
                                >   
                                    {provinces.map((item, index) => (
                                        <option className="text-xs md:text-sm" key={index} value={item.value}>
                                            {item.type}
                                        </option>
                                    ))}
                                </select>

                                <input
                                    type="date"
                                    value={filters.projectMinDate || ""}
                                    onChange={(e) => setFilters({...filters, projectMinDate: e.target.value})}
                                    className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 w-full md:w-64"
                                />

                                <input
                                    type="date"
                                    value={filters.projectMaxDate || ""}
                                    onChange={(e) => setFilters({...filters, projectMaxDate: e.target.value})}
                                    className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 w-full md:w-64"
                                />

                                <div className="w-3/4 md:w-2/3 flex flex-row justify-between md:mt-5">
                                    <button
                                        onClick={() => {setSubmitFilter(true)}}
                                    >
                                        Set Filters
                                    </button>

                                    <button
                                        onClick={() => {setFilters({
                                            category: 'all',
                                            location: null,
                                            projectMinDate: null,
                                            projectMaxDate: null,
                                        })}}
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            <div className="flex w-full h-10 justify-start">
                <button
                    onClick={() => { setIsOpen(!isOpen) }}
                    className="text-sm md:text-lg text-center transition-all duration-300 flex items-center justify-center px-3 scale-100 hover:scale-110 -translate-y-1 font-semibold text-black"
                >
                    Filter
                </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {getCurrentItems().map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow hover:shadow-lg cursor-pointer transition-shadow"
                        onClick={() => openModal(item)}
                    >
                        <img 
                            src={typeof(item.imageUrl[0]) == 'string' ? item.imageUrl[0] : item.imageUrl[0].imageUrl}
                            alt={item.projectName} 
                            className="w-full h-36 object-cover rounded-t-lg" 
                        />
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
                                        src={typeof(getCurrentImage()) == 'string' ? getCurrentImage() : getCurrentImage().imageUrl}
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
                                    {selectedItem.imageUrl.map((img:any, index:number) => (
                                        <div
                                            key={index}
                                            className={`w-16 h-16 cursor-pointer ${currentImageIndex === index ? 'ring-2 ring-blue-500' : ''}`}
                                            onClick={() => selectImage(index)}
                                        >
                                            <img
                                                src={typeof(img) == 'string' ? img : img.imageUrl}
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
    )
}

export default ProjectShowcase