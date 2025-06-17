import { Plus, X } from "lucide-react";
import { useState } from "react";
import AddProduct from "./AddProduct";

export default function Products() {

  const [addProduct, setAddProduct] = useState(false);

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
              onClick={() => {setAddProduct(true)}}
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Premium Package",
                  price: "$1,250",
                  status: "Active",
                  sales: 45,
                },
                {
                  name: "Standard Plan",
                  price: "$850",
                  status: "Active",
                  sales: 32,
                },
                {
                  name: "Enterprise Suite",
                  price: "$2,100",
                  status: "Active",
                  sales: 28,
                },
                {
                  name: "Basic Package",
                  price: "$675",
                  status: "Active",
                  sales: 67,
                },
                {
                  name: "Pro Plan",
                  price: "$1,875",
                  status: "Active",
                  sales: 19,
                },
                {
                  name: "Starter Kit",
                  price: "$299",
                  status: "Draft",
                  sales: 0,
                },
              ].map((product, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">
                      {product.name}
                    </h4>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        product.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600 mb-2">
                    {product.price}
                  </p>
                  <p className="text-sm text-gray-600">Sales: {product.sales}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {addProduct && (
        <AddProduct 
          isOpen={addProduct} 
          onClose={() => setAddProduct(false)} 
        />
      )}
    </>
  );
}