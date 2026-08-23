import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import axios from "axios";
import { ProductFilter, ProductPropsType, ProductType } from "../interfaces/Product_Interfaces"
import ProductManagement from "./ProductManagement";
import { endpoints } from "../api";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

interface ProductsProps extends ProductPropsType {
  darkMode?: boolean;
}

export default function Products({ onSuccess, darkMode = false }: ProductsProps) {

const navigate = useNavigate();

  const { logout } = useAuth();

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

  // Theme tokens — mirrors the AdminUserManagement / CustomerComplains / CustomerTestimonials pattern
  const theme = darkMode
    ? {
        panel: "bg-[#111827]",
        panelBorder: "border-white/10",
        text: "text-white",
        textSub: "text-gray-300",
        textMuted: "text-gray-400",
        textFaint: "text-gray-500",
        inputBg: "bg-black/20",
        inputBorder: "border-white/10",
        inputText: "text-white",
        placeholder: "placeholder-gray-500",
        modalOverlay: "bg-black/60",
        modalPanel: "bg-[#111827]/95 border-white/10",
        hoverIcon: "hover:bg-white/10",
        filterText: "text-white",
        primaryBtn: "bg-blue-500 text-white hover:bg-blue-600",
        secondaryBtn: "bg-white/10 text-gray-200 hover:bg-white/20",
      }
    : {
        panel: "bg-white",
        panelBorder: "border-gray-200",
        text: "text-gray-800",
        textSub: "text-gray-700",
        textMuted: "text-gray-600",
        textFaint: "text-gray-500",
        inputBg: "bg-white",
        inputBorder: "border-gray-300",
        inputText: "text-gray-700",
        placeholder: "placeholder-gray-400",
        modalOverlay: "bg-black/30",
        modalPanel: "bg-white/90 border-gray-200",
        hoverIcon: "hover:bg-gray-100",
        filterText: "text-black",
        primaryBtn: "bg-blue-600 text-white hover:bg-blue-700",
        secondaryBtn: "bg-gray-100 text-gray-700 hover:bg-gray-200",
      };

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

  function deleteProduct(id: number) {
    const response = allProducts.filter((item) => item.id != id);
    setAllProducts(response);
    onSuccess();
  }

  return (
    <>
      {!isOpen && (
        <div className={`fixed inset-0 ${theme.modalOverlay} backdrop-blur-sm z-50 flex items-center justify-center p-4`}>
            {/* Modal container */}
            <div className={`relative w-full max-w-md ${theme.modalPanel} rounded-lg border shadow-lg p-6`}>

                {/* Close button (top-left) */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`absolute top-4 left-4 p-2 ${theme.hoverIcon} rounded-full transition-colors`}
                >
                    <X size={24} className={theme.textMuted} />
                </button>

                {/* Content */}
                <div className="text-center mt-10">
                    <h2 className={`text-2xl font-bold ${theme.text}`}>Filter Products</h2>
                    <div className="flex flex-col justify-between items-center gap-4 w-full mt-6">
                        <select
                            value={filters.category || ""}
                            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                            className={`w-full px-4 py-2 border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
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
                            className={`w-full border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} ${theme.placeholder} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed`}
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
                            className={`w-full border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} ${theme.placeholder} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed`}
                        />

                        <div className="w-full flex flex-row justify-between gap-3 mt-4">
                            <button
                                onClick={() => {setSubmitFilter(true)}}
                                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${theme.primaryBtn}`}
                            >
                                Set Filters
                            </button>

                            <button
                                onClick={() => {setFilters({
                                    category: 'all',
                                    minPrice: null,
                                    maxPrice: null
                                })}}
                                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${theme.secondaryBtn}`}
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
        <div className={`${theme.panel} rounded-lg shadow-sm border ${theme.panelBorder} flex flex-col`}>
          <div className={`p-6 border-b ${theme.panelBorder} shrink-0 flex flex-col sm:flex-row items-center justify-between gap-4`}>
            <button
              onClick={() => { 
                  setIsOpen(!isOpen)
              }}
              className={`text-sm md:text-lg text-center transition-all duration-300 flex items-center justify-center px-3 scale-100 hover:scale-110 -translate-y-0 sm:-translate-y-1 font-semibold ${theme.filterText}`}
            >
              Filter
            </button>
            <h3 className={`text-xl font-semibold ${theme.text} order-first sm:order-none`}>
              Product Management
            </h3>
            <button
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${theme.primaryBtn}`}
              onClick={() => { setAddProduct(true) }}
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          </div>
          <div
            className="p-6 overflow-y-auto overflow-x-auto"
            style={{ height: "calc(100vh - 14rem)" }}
          >
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