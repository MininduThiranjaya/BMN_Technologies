export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Analytics Dashboard
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Revenue Trend</h4>
            <div className="h-32 bg-blue-200 rounded flex items-end justify-center">
              <div className="text-blue-800 font-medium">📈 +18.6% Growth</div>
            </div>
          </div>
          <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">
              Customer Acquisition
            </h4>
            <div className="h-32 bg-green-200 rounded flex items-end justify-center">
              <div className="text-green-800 font-medium">
                👥 +23% New Users
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-gray-700">Page Views</h4>
            <p className="text-2xl font-bold text-gray-900">125,432</p>
            <p className="text-sm text-green-600">+12.5% from last week</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-gray-700">Bounce Rate</h4>
            <p className="text-2xl font-bold text-gray-900">24.8%</p>
            <p className="text-sm text-red-600">+2.1% from last week</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-gray-700">Avg. Session</h4>
            <p className="text-2xl font-bold text-gray-900">4m 32s</p>
            <p className="text-sm text-green-600">+18s from last week</p>
          </div>
        </div>
      </div>
    </div>
  );
}
