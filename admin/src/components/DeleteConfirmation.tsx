import { X } from "lucide-react";
import { DeleteConfirmationType } from "../interfaces/Common_Interfaces";

export default function DeleteConfirmation({
  data,
  cancelDelete,
  confirmDelete,
  categoty,
}: DeleteConfirmationType) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Confirm Delete
            </h3>
            <button
              onClick={cancelDelete}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 mb-2">
              Are you sure you want to delete this {categoty.toLowerCase()}?
            </p>
            <div className="bg-gray-50 rounded-lg p-3 border">
              {categoty === "Product" ? (
                <>
                  <p className="font-medium text-gray-900">
                    {categoty} Name : {data?.productName}
                  </p>
                  <p className="font-medium text-gray-900">
                    {categoty} Id : {data?.productId}
                  </p>
                  <p className="text-sm text-gray-600">
                    {categoty} Price : Rs {data?.productPrice?.toFixed(2)}
                  </p>
                </>
              ) : (
                <>
                  <p className="font-medium text-gray-900">
                    {categoty} Name : {data?.projectName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {categoty} Id : {data?.projectId}
                  </p>
                  <p className="text-sm text-gray-600">
                    Client Name : {data?.personName}
                  </p>
                </>
              )}
            </div>
            <p className="text-sm text-red-600 mt-2">
              This action cannot be undone.
            </p>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              onClick={cancelDelete}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
            >
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
