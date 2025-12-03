import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import axios from "axios";
import { ProductFilter, ProductPropsType, ProductType } from "../interfaces/Product_Interfaces"
import ProductManagement from "./ProductManagement";
import { endpoints } from "../api";

export default function Products({ onSuccess }: ProductPropsType) {

  const [addProduct, setAddProduct] = useState(false);
  const [allProducts, setAllProducts] = useState<ProductType[]>([])
  const [isOpen, setIsOpen] = useState(true)
  const [filters, setFilters] = useState<ProductFilter>({
    category: "all",
    minPrice: null,
    maxPrice: null
  })
  const [submitFilter, setSubmitFilter] = useState(false)
  const menuItems = [
      { type: "Select all category", value: "all" },
      { type: "Solar Panels", value: "solar-panels" },
      { type: "Battery Storage", value: "battery-storage" },
      { type: "Hybrid Inverters", value: "inverters" }
  ];

  async function fetchFilteredProducts() {
      await axios
          .post(`${endpoints.product.getFiltered}`, filters)
          .then((res) => {
              console.log(res);
              setAllProducts(res.data);
          })
          .catch((error) => {
              console.log("Error fetching data : ", error);
          });
          onSuccess();
  }
  
  async function fetchAllProducts() {
      await axios
          .get(`${endpoints.product.getAllProducts}`)
          .then((res) => {
              console.log(res);
              setAllProducts(res.data);
          })
          .catch((error) => {
              console.log("Error fetching data : ", error);
          });
          onSuccess();
  }

  useEffect(() => {

        if (submitFilter) {
            fetchFilteredProducts();
            setSubmitFilter(false)
        }

        if(!submitFilter && filters.category == 'all') {
            fetchAllProducts();
        }
    }, [submitFilter, addProduct]);
  
  // async function fetchAllProducts() {

  //   await axios.get(endpoints.product.getAllProducts)
  //   .then((res) => {
  //     console.log(res.data);
  //     setAllProducts(res.data);
  //   })
  //   .catch((error) => {
  //     console.log("Error fetching data : ", error);
  //   })
  //   onSuccess();
  // }
  
  // useEffect(() => {
  //   fetchAllProducts();
  // }, [addProduct]);

  function deleteProduct(id: number) {
    const response = allProducts.filter((item) => item.id != id);
    setAllProducts(response);
    onSuccess();
  }

  return (
    <>
      {!isOpen && (
        <div className="fixed top-25 w-2/3 h-1/3 md:w-1/5 md:h-1/2 backdrop-blur-sm z-50 flex items-center justify-center">
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
                                <option key={index} value={item.value}>
                                    {item.type}
                                </option>
                            ))}
                        </select>

                        <input
                            type="text"
                            disabled={filters.category == 'all'}
                            inputMode="numeric"
                            pattern="[0-9]*"
                            placeholder="Min Price"
                            value={filters.minPrice || ""}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*$/.test(value)) {
                                setFilters({ ...filters, minPrice: parseInt(value) });
                                }
                            }}
                            className="w-full md:w-64 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
                        />

                        <input
                            type="text"
                            disabled={filters.category == 'all'}
                            inputMode="numeric"
                            pattern="[0-9]*"
                            placeholder="Max Price"
                            value={filters.maxPrice || ""}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*$/.test(value)) {
                                setFilters({ ...filters, maxPrice: parseInt(value) });
                                }
                            }}
                            className="w-full md:w-64 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
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
                                    minPrice: null,
                                    maxPrice: null
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
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b flex items-center justify-between">
            <button
              onClick={() => { 
                  setIsOpen(!isOpen)
              }}
              className="text-sm md:text-lg text-center transition-all duration-300 flex items-center justify-center px-3 scale-100 hover:scale-110 -translate-y-1 font-semibold text-black"
            >
              Filter
            </button>
            <h3 className="text-xl font-semibold text-gray-800">
              Product Management
            </h3>
            <button
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => { setAddProduct(true) }}
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          </div>
          <div className="p-6 h-[30rem] overflow-y-scroll">
              <ProductManagement 
                products={allProducts}
                deleteProduct={deleteProduct}
                onSuccess={fetchAllProducts} 
              />
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {addProduct && (
        <AddProduct
          existFormData={null}
          isOpen={addProduct}
          onClose={() => setAddProduct(false)}
          type={"Add"}
          title="Add New Product"
          statement="Fill in the details to add a new product to your inventory"
          onSuccess={fetchAllProducts}
        />
      )}
    </>
  );
}