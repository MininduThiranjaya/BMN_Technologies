import { User } from "lucide-react";

export default function Customers() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-xl font-semibold text-gray-800">
            Customer Management
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800">Total Customers</h4>
              <p className="text-2xl font-bold text-blue-600">2,847</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-800">Active Users</h4>
              <p className="text-2xl font-bold text-green-600">2,134</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-medium text-orange-800">New This Month</h4>
              <p className="text-2xl font-bold text-orange-600">423</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-800">Retention Rate</h4>
              <p className="text-2xl font-bold text-purple-600">94.2%</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-4">Recent Customers</h4>
            <div className="space-y-3">
              {[
                "John Doe",
                "Sarah Johnson",
                "Mike Chen",
                "Emily Davis",
                "Alex Wilson",
              ].map((name, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-white rounded border"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium">{name}</span>
                  </div>
                  <span className="text-sm text-gray-500">Active</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
