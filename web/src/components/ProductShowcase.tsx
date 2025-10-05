import { useEffect, useState } from "react";
import { endpoints } from "../api";
import axios from "axios";
import {
    X,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import type { ProductItemType } from "../types/Product";

function ProductShowcase() {
    // State variables
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedItem, setSelectedItem] = useState<ProductItemType | null>(
        null
    );
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [allItems, setAllItems] = useState<ProductItemType[]>([]);
    const itemsPerPage = 8;
    const totalPages = Math.ceil(allItems.length / itemsPerPage);
    const [isOpen, setIsOpen] = useState(true)
    const [filter, setFilter] = useState('')
    const menuItems = [
        { type: "Select a Category", value: "" },
        { type: "Solar Panels", value: "solar-panels" },
        { type: "Battery Storage", value: "battery-storage" },
        { type: "Hybrid Inverters", value: "inverters" }
    ];

    useEffect(() => {
        async function fetchAllProducts() {
            await axios
                .get(`${endpoints.product.get}/${filter}`)
                .then((res) => {
                    console.log(res);
                    setAllItems(res.data);
                })
                .catch((error) => {
                    console.log("Error fetching data : ", error);
                });
        }

        if(filter != "") {
            fetchAllProducts();
        }
    }, [filter]);

    // Get current items
    const getCurrentItems = () => {
        if (allItems.length > 0) {
            const startIndex = (currentPage - 1) * itemsPerPage;
            return allItems.slice(startIndex, startIndex + itemsPerPage);
        }
        return [];
    };

    // Handle page change
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // Open modal with selected item
    const openModal = (item: ProductItemType) => {
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
        setCurrentImageIndex(
            (prevIndex) => (prevIndex - 1 + totalImages) % totalImages
        );
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
        <div className="w-full h-full p-10">

            {!isOpen && (
                <div className="fixed top-25 w-2/3 h-1/2 md:w-1/5 md:h-2/3 backdrop-blur-sm z-50 flex items-center justify-center">
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
                            <div className="mt-4">
                                <select
                                    onChange={(e) => setFilter(e.target.value)}
                                    className="w-5/6 md:w-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-700"
                                >     
                                    {menuItems.map((item, index) => (
                                        <option className="w-5/6 md:w-64" key={index} value={item.value}>{item.type}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex w-full h-10 justify-center items-start">
                <button
                    onClick={() => { setIsOpen(!isOpen) }}
                    className="text-sm md:text-lg text-center transition-all duration-300 flex items-center justify-center px-3 scale-100 hover:scale-110 -translate-y-1 font-semibold text-black"
                >
                    Filter
                </button>
            </div>
            {/* Grid Layout*/}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {getCurrentItems().map((item) => (
                    <div
                        key={item.productId}
                        className="bg-white rounded-lg shadow hover:shadow-lg cursor-pointer transition-shadow overflow-hidden"
                        onClick={() => openModal(item)}
                    >
                        {/* Image container */}
                        <div className="w-full h-48 bg-gray-100 overflow-hidden rounded-t-lg">
                            <img
                                src={item.imageUrl[0]}
                                alt={item.productName}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Content section */}
                        <div className="p-4">
                            <h3 className="font-semibold text-lg text-gray-800 mb-2">
                                {item.productName}
                            </h3>
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-xl text-blue-600">
                                    ${item.productPrice.toFixed(2)}
                                </span>
                            </div>
                            <p className="text-gray-500 text-sm mt-2">
                                Click to view details
                            </p>
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
                                aria-label="pageButton"
                                key={i + 1}
                                onClick={() => handlePageChange(i + 1)}
                                className={`px-4 py-2 rounded ${currentPage === i + 1
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 hover:bg-gray-300"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Detail Modal */}
            {selectedItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl h-auto max-h-full overflow-auto">
                        {/* Fixed position close button that's always visible */}
                        <div className="sticky top-0 left-0 right-0 flex justify-end p-2 bg-white bg-opacity-90 rounded-t-lg z-20">
                            <button
                                aria-label="detailedButton"
                                onClick={closeModal}
                                className="bg-white p-1 rounded-full shadow-md hover:bg-gray-100"
                            >
                                <X size={26} />
                            </button>
                        </div>

                        <div className="grproductId grproductId-cols-1 md:grproductId-cols-2">
                            {/* Left sproductIde - Image Carousel */}
                            <div className="p-6 relative">
                                <div className="relative">
                                    <div className="w-full h-80 bg-gray-100 flex items-center justify-center rounded overflow-hidden">
                                        <img
                                            src={getCurrentImage()}
                                            alt={selectedItem.productName}
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>

                                    {/* Navigation arrows */}
                                    <button
                                        aria-label="navigationButtonLeft"
                                        onClick={prevImage}
                                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-1 hover:bg-opacity-100"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>

                                    <button
                                        aria-label="navigationButtonRight"
                                        onClick={nextImage}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-1 hover:bg-opacity-100"
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </div>

                                {/* Thumbnail images */}
                                <div className="flex mt-4 space-x-2 overflow-x-auto py-2 p-1">
                                    {selectedItem.imageUrl.map((img, index) => (
                                        <div
                                            key={index}
                                            className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer ${currentImageIndex === index
                                                ? "border-blue-500 shadow-md scale-105"
                                                : "border-transparent hover:border-gray-300"
                                                }`}
                                            onClick={() => selectImage(index)}
                                        >
                                            <img
                                                src={img}
                                                alt={`${selectedItem.productName} - ${index}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right sproductIde - productDescription */}
                            <div className="p-6 bg-gray-50 rounded-r-lg flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-2xl font-bold">
                                            {selectedItem.productName}
                                        </h2>
                                        <span className="text-2xl font-bold text-blue-600">
                                            ${selectedItem.productPrice.toFixed(2)}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 mb-8">
                                        {selectedItem.productDescription}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Bottom buttons */}
                        <div className="flex justify-end p-4 bg-gray-100 rounded-b-lg border-t">
                            <button
                                aria-label="closeDetailButton"
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

export default ProductShowcase;
