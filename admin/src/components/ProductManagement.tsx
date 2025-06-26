import React, { useState, useMemo } from "react";
import {
  Edit2,
  Trash2,
  Package,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ProductDetailsProps } from "../interfaces/Product_Interfaces";
import AddProduct from "./AddProduct";
import DeleteConfirmation from "./DeleteConfirmation";
import axios from "axios";
import { endpoints } from "../api";
import { toast } from "react-toastify";

const ProductManagement = ({
  products,
  deleteProduct,
  onSuccess,
}: ProductDetailsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = products.length;
  const [editProduct, setEditProduct] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    show: false,
    id: null,
  });

  function fetchAllProducts() {
    onSuccess();
  }

  const handleEdit = (id: any) => {
    setEditProduct(true);
    console.log(id);
    //fetch for updating exist product
  };

  const handleDelete = (id: any) => {
    setDeleteConfirmation({ show: true, id: id });
  };

  const confirmDelete = () => {
    console.log("Deleting product:", deleteConfirmation.id);
    const token = localStorage.getItem("accessToken");

    async function fetchAllProducts() {
      await axios
        .delete(
          endpoints.product.deleteProduct.replace(
            ":productId",
            deleteConfirmation.id ?? ""
          ),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          toast.success("Product deleted successfuly...");
          deleteProduct(res.data.object.id);
        })
        .catch((error) => {
          console.log("Error fetching data : ", error);
          toast.error("Error deleting product...");
        });
    }
    if (deleteConfirmation.id) {
      fetchAllProducts();
    }
    setDeleteConfirmation({ show: false, id: null });
  };

  const cancelDelete = () => {
    setDeleteConfirmation({ show: false, id: null });
  };

  // Calculate pagination
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = useMemo(
    () => products.slice(startIndex, endIndex),
    [products, startIndex, endIndex]
  );

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-500">
        <Package className="w-16 h-16 mb-4 text-gray-300" />
        <h3 className="text-lg font-medium mb-2">No products yet</h3>
        <p className="text-sm">Add your first product to get started</p>
      </div>
    );
  }

  return (
    <div>
      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {currentProducts.length > 0 &&
          currentProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden border border-gray-200"
            >
              {/* Product Image */}
              <div className="relative h-48 bg-gray-100">
                {product.imageUrl.length > 0 && product.productName ? (
                  <img
                    src={product.imageUrl[0].imageUrl}
                    alt={product.productName}
                    className="w-full h-full object-cover"
                  />
                ) : null}
                <div
                  className={`${
                    product.imageUrl ? "hidden" : "flex"
                  } absolute inset-0 items-center justify-center bg-gray-100`}
                >
                  <Package className="w-12 h-12 text-gray-400" />
                </div>
              </div>

              {/* Product Details */}
              <div className="p-4">
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                    {product.productName}
                  </h3>
                  {product.productDescription && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {product.productDescription}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-blue-600">
                      ${product.productPrice}
                    </span>
                    {product.category && (
                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                        {product.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="flex items-center justify-center gap-1 px-2 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors duration-200 text-xs font-medium"
                  >
                    <Edit2 className="w-3 h-3" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex items-center justify-center gap-1 px-2 py-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors duration-200 text-xs font-medium"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </button>
                </div>
                {/* Edit Product */}
                {editProduct && (
                  <AddProduct
                    existFormData={product}
                    isOpen={editProduct}
                    onClose={() => setEditProduct(false)}
                    type={"Edit"}
                    title="Edit Product"
                    statement="Fill in the details to Edit a exits product"
                    onSuccess={fetchAllProducts}
                  />
                )}

                {/* Delete Confirmation Modal */}
                {deleteConfirmation.show && (
                  <DeleteConfirmation
                    data={product}
                    cancelDelete={() => {
                      cancelDelete();
                    }}
                    confirmDelete={() => {
                      confirmDelete();
                    }}
                    categoty={"Product"}
                  />
                )}
              </div>
            </div>
          ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-200">
          {/* Results Info */}
          <div className="flex items-center text-sm text-gray-700">
            <span>
              Showing {startIndex + 1} to {Math.min(endIndex, products.length)}{" "}
              of {products.length} products
            </span>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center space-x-2">
            {/* Previous Button */}
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex space-x-1">
              {getPageNumbers().map((page, index) => (
                <React.Fragment key={index}>
                  {page === "..." ? (
                    <span className="px-3 py-2 text-sm text-gray-500">...</span>
                  ) : (
                    <button
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
