export default function Sales() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Sales Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-800">Total Revenue</h4>
            <p className="text-2xl font-bold text-green-600">$145,231</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-800">Monthly Sales</h4>
            <p className="text-2xl font-bold text-blue-600">$45,231</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-purple-800">Conversion Rate</h4>
            <p className="text-2xl font-bold text-purple-600">12.4%</p>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-700 mb-2">
            Top Performing Products
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Premium Package</span>
              <span className="font-semibold">$12,450</span>
            </div>
            <div className="flex justify-between">
              <span>Enterprise Suite</span>
              <span className="font-semibold">$8,200</span>
            </div>
            <div className="flex justify-between">
              <span>Standard Plan</span>
              <span className="font-semibold">$6,180</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
