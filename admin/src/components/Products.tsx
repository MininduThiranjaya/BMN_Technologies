import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import axios from "axios";
import { ProductPropsType, ProductType } from "../interfaces/Product_Interfaces"
import ProductManagement from "./ProductManagement";
import { endpoints } from "../api";

export default function Products({ onSuccess }: ProductPropsType) {

  const [addProduct, setAddProduct] = useState(false);
  const [allProducts, setAllProducts] = useState<ProductType[]>([])

  
  const token = localStorage.getItem("accessToken");
  
  async function fetchAllProducts() {

    await axios.get(endpoints.product.getAllProducts,{ 
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      setAllProducts(res.data);
    })
    .catch((error) => {
      console.log("Error fetching data : ", error);
    })
    onSuccess();
  }
  
  useEffect(() => {
    fetchAllProducts();
  }, [addProduct]);

  function deleteProduct(id: number) {
    const response = allProducts.filter((item) => item.id != id);
    setAllProducts(response);
    onSuccess();
  }

  return (
    <>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b flex items-center justify-between">
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
          <div className="p-6">
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