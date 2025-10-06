export default function Settings() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          System Settings
        </h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-gray-700 mb-2">General Settings</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Email Notifications</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span>Push Notifications</span>
                <input type="checkbox" className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span>Auto Backup</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-gray-700 mb-2">Security</h4>
            <div className="space-y-2">
              <button className="w-full text-left p-2 hover:bg-gray-50 rounded">
                Change Password
              </button>
              <button className="w-full text-left p-2 hover:bg-gray-50 rounded">
                Two-Factor Authentication
              </button>
              <button className="w-full text-left p-2 hover:bg-gray-50 rounded">
                Login History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
