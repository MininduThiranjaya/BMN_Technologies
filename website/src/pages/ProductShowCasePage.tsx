import { useRef, useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ShoppingCart, Plus, Minus } from 'lucide-react';
import BannerImages from '../components/BannerImages';
import Footer from '../components/Footer';
// import { useCart, CartItem } from '../context/CartContext';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import axios from 'axios';
import { endpoints } from '../api';
import { useParams } from 'react-router-dom';

interface ItemType {
    productId: number,
    productName: string,
    imageUrl: string[],
    productDescription: string,
    productPrice: number,
    category: string
}

// Main Showcase Component
export default function ProductShowCasePage() {

    const { category } = useParams();
    const { pathname } = useLocation();
    const introRef = useRef(null);
    const servicesRef = useRef(null);
    const contactRef = useRef(null);
    const aboutRef = useRef(null);
    const [allItems, setAllItems] = useState<ItemType[]>([]);
    // State variables
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [itemQuantity, setItemQuantity] = useState(1);
    const itemsPerPage = 8;
    const totalPages = Math.ceil(allItems.length / itemsPerPage);
    // Use cart context
    // const { addToCart } = useCart();

    useEffect(() => {
        window.scrollTo(0, 0); // scroll to top
        async function fetchAllProducts() {
            await axios.get(`${endpoints.product.get}/${category}`)
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
    const openModal = (item: ItemType) => {
        setSelectedItem(item);
        setCurrentImageIndex(0); // Reset to first image when opening modal
        setItemQuantity(1); // Reset quantity when opening modal
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

    // Increase quantity in modal
    const handleIncreaseQuantity = () => {
        setItemQuantity(prev => prev + 1);
    };

    // Decrease quantity in modal
    const handleDecreaseQuantity = () => {
        setItemQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };

    // Add to cart with selected quantity
    // const handleAddToCart = () => {
    //     if (!selectedItem) return;

    //     // Format the item as expected by the cart context
    //     const cartItem: Omit<CartItem, 'quantity'> = {
    //         productId: selectedItem.productId,
    //         name: selectedItem.productName,
    //         productPrice: selectedItem.productPrice,
    //         image: selectedItem.imageUrl[0]
    //     };

    //     // Add item to cart with the selected quantity
    //     for (let i = 0; i < itemQuantity; i++) {
    //         addToCart(cartItem);
    //     }

    //     closeModal();
    // };

    return (
        <div className="flex flex-col min-h-screen absolute left-0 right-0">
            <NavBar refs={{ introRef, servicesRef, contactRef, aboutRef }} />
            <BannerImages />

            <main className="flex-grow bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    {/* Page Title */}
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-bold text-gray-800">OUR PRODUCTS</h2>
                    </div>

                    {/* Grid Layout - Replace your existing grid section with this */}
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
                                    <h3 className="font-semibold text-lg text-gray-800 mb-2">{item.productName}</h3>
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-xl text-blue-600">${item.productPrice.toFixed(2)}</span>
                                    </div>
                                    <p className="text-gray-500 text-sm mt-2">Click to view details</p>
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
                                        (
                                            <div
                                                key={index}
                                                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer ${currentImageIndex === index ? 'border-blue-500 shadow-md scale-105' : 'border-transparent hover:border-gray-300'}`}
                                                onClick={() => selectImage(index)}
                                            >
                                                <img
                                                    src={img}
                                                    alt={`${selectedItem.productName} - ${index}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                        )))}
                                </div>
                            </div>

                            {/* Right sproductIde - productDescription */}
                            <div className="p-6 bg-gray-50 rounded-r-lg flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-2xl font-bold">{selectedItem.productName}</h2>
                                        <span className="text-2xl font-bold text-blue-600">${selectedItem.productPrice.toFixed(2)}</span>
                                    </div>
                                    <p className="text-gray-700 mb-8">{selectedItem.productDescription}</p>

                                    {/* Quantity selector */}
                                    {/* <div className="mt-6">
                                        <label className="block text-gray-700 mb-2">Quantity:</label>
                                        <div className="flex items-center">
                                            <button
                                                aria-label="decreaseQuantityButton"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDecreaseQuantity();
                                                }}
                                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l"
                                            >
                                                <Minus size={18} />
                                            </button>
                                            <span className="bg-gray-100 py-2 px-6 text-center">
                                                {itemQuantity}
                                            </span>
                                            <button
                                                aria-label="IncreaseQuantityButton"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleIncreaseQuantity();
                                                }}
                                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r"
                                            >
                                                <Plus size={18} />
                                            </button>
                                        </div>
                                    </div> */}
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
                            {/* <button
                                aria-label="addToCartButton"
                                onClick={handleAddToCart}
                                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
                            >
                                <ShoppingCart size={18} className="mr-2" />
                                Add to Cart - ${(selectedItem.productPrice * itemQuantity).toFixed(2)}
                            </button> */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}