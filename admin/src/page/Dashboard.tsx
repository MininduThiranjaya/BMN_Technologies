import React, { JSX, useEffect, useState } from "react";
import {
  Search,
  Bell,
  User,
  ShoppingCart,
  Users,
  Package,
  BarChart3,
  Settings,
  Home,
  DollarSign,
  LogOut,
  Edit3,
  X,
  Folder,
  AlertTriangle,
  ThumbsUp
} from "lucide-react";
import { useAuth } from "../context/AuthProvider";
import { toast } from "react-toastify";
import Products from "../components/Products";
import AdminUserRegistration from "../components/UserRegistration";
import axios from "axios";
import Projects from "../components/Projects";
import {
  AdminUser,
  MenuItem,
  StatCard,
} from "../interfaces/Dashboard_Interfaces";
import { endpoints } from "../api";
import { UserIssue } from "../interfaces/Common_Interfaces";
import CustomerComplains from "../components/CustomerComplains";
import CustomerTestimonials from "../components/CustomerTestimonials";

interface NotificationType {
  id: number | null | undefined,
  text: string | null | undefined,
  time: string | null | undefined,
  type: string | null | undefined,
  read: boolean | null | undefined,
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<StatCard[]>([
    {
      title: "Total Products",
      value: 0,
      change: "",
      icon: Package,
      color: "bg-green-50 text-green-600",
      iconBg: "bg-green-100",
      url: endpoints.product.count,
    },
    {
      title: "Total Projects",
      value: 0,
      change: "",
      icon: Folder,
      color: "bg-blue-50 text-blue-600",
      iconBg: "bg-blue-100",
      url: endpoints.project.count,
    },
    {
      title: "Customer Complains",
      value: 0,
      change: "",
      icon: AlertTriangle,
      color: "bg-purple-50 text-purple-600",
      iconBg: "bg-purple-100",
      url: endpoints.contactUs.count,
    },
    {
      title: "Customer Testimonials",
      value: 0,
      change: "",
      icon: ThumbsUp,
      color: "bg-orange-50 text-orange-600",
      iconBg: "bg-orange-100",
      url: endpoints.testimonial.count,
    },
  ]);

  const { logout } = useAuth();
  const [notifications, setNotifications] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState<boolean>(false);
  const [showEditProfile, setShowEditProfile] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<string>("Dashboard");
  const [userIssues, setUserIssues] = useState<UserIssue[]>([]);

  const [adminUser, setAdminUser] = useState({
    email: "",
    userName: "",
    phoneNumber: "",
    lastLogin: "",
    createdAt: "",
    updatedAt: "",
  });

  const fetchCountDetails = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      const updatedStats = await Promise.all(
        stats.map(async (data) => {
          if (data.url === null) return { ...data };
          const res = await axios.get(data.url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.data) {
            console.log(res.data);
            return {
              ...data,
              value: res.data,
            };
          } else {
            return { ...data };
          }
        })
      );
      setStats(updatedStats);
    } catch (err) {
      console.error("Failed to fetch count details", err);
    }
  };

  const fetchUserIssuesInform = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      await axios.get(endpoints.contactUs.getIssues, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res: any) => {
          setUserIssues(res.data)
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (err) {
      console.error("Failed to fetch count details", err);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const res = await axios.get(endpoints.user.dashboardUserProfile, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          setAdminUser({
            email: res.data.object.email,
            userName: res.data.object.userName,
            phoneNumber: res.data.object.phoneNumber,
            lastLogin: res.data.object.lastLogin,
            createdAt: res.data.object.createdAt,
            updatedAt: res.data.object.updateAt,
          });
          console.log("User profile fetched successfully", res.data);
        }
      } catch (err) {
        console.error("Failed to fetch user profile", err);
        logout(); // Ensure to log out if fetching fails
      }
    };

    fetchUser();
    fetchCountDetails();
    fetchUserIssuesInform()
  }, []);

  if (!adminUser) return <p>Loading...</p>;

  const notificationItems: NotificationType[] = [];

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (notifications > 0) {
      setNotifications(0);
    }
  };

  const handleShowAllNotifications = () => {
    setShowNotifications(false);
    setShowAllNotifications(true);
    console.log("Opening all notifications modal"); // Debug log
  };

  const handleCloseAllNotifications = () => {
    setShowAllNotifications(false);
  };

  const getNotificationIcon = (type: any) => {
    switch (type) {
      case "order":
        return <ShoppingCart className="w-4 h-4 text-blue-500" />;
      case "payment":
        return <DollarSign className="w-4 h-4 text-green-500" />;
      case "support":
        return <User className="w-4 h-4 text-orange-500" />;
      case "user":
        return <Users className="w-4 h-4 text-purple-500" />;
      case "inventory":
        return <Package className="w-4 h-4 text-red-500" />;
      case "system":
        return <Settings className="w-4 h-4 text-gray-500" />;
      case "review":
        return <BarChart3 className="w-4 h-4 text-indigo-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const menuItems: MenuItem[] = [
    { icon: Home, label: "Dashboard", active: activeView === "Dashboard" },
    { icon: Package, label: "Products", active: activeView === "Products" },
    { icon: Folder, label: "Projects", active: activeView === "Projects" },
    { icon: User, label: "User Registration", active: activeView === "User Registration" },
    { icon: AlertTriangle, label: "Customer Complains", active: activeView === "Customer Complains" },
    { icon: ThumbsUp, label: "Customer Testimonials", active: activeView === "Customer Testimonials" },
  ];

  const handleLogout = (): void => {
    setShowUserDropdown(false);
    logout();
    toast.success("Logged out successfully...");
  };

  const handleSaveProfile = (): void => {
    setShowEditProfile(false);
    setShowUserDropdown(false);
    alert("Profile updated successfully!");
  };

  const handleInputChange = (field: keyof AdminUser, value: string): void => {
    setAdminUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMenuClick = (label: string): void => {
    setActiveView(label);
  };

  const renderContent = (): JSX.Element => {
    switch (activeView) {

      case "Products":
        return <Products onSuccess={fetchCountDetails} />;

      case "Projects":
        return <Projects onSuccess={fetchCountDetails} />;

      case "User Registration":
        return <AdminUserRegistration />;

      case "Customer Complains":
        return <CustomerComplains />

      case "Customer Testimonials":
        return <CustomerTestimonials />

      default:
        return (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm border"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">
                        {stat.value == 0 ? <>---</> : stat.value}
                      </p>
                      <p className="text-sm text-green-600 mt-2">
                        {stat.change}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.iconBg}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Sales */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Customer Complain Notifications
                </h3>
                {/* <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>New Sale</span>
                </button> */}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email Address
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Issue
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Inform Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userIssues ? (userIssues.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                              <User className="w-4 h-4 text-gray-500" />
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {item.userName}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.phoneNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                          {item.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.issue}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.createdAt}
                        </td>
                      </tr>
                    ))) : (
                      <tr className="p-5">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center" colSpan={4}>
                          No Sales is Available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800">AdminPro</h1>
          <p className="text-sm text-gray-500">Management Panel</p>
        </div>

        <nav className="mt-6">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleMenuClick(item.label)}
              className={`w-full flex items-center px-6 py-3 text-sm font-medium transition-colors text-left ${item.active
                ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">
              {activeView}
            </h2>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={handleNotificationClick}
                  className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                    <div className="p-4 border-b">
                      <h3 className="font-semibold text-gray-800">
                        Notifications
                      </h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notificationItems.slice(0, 3).map((notification) => (
                        <div
                          key={notification.id}
                          className="p-4 border-b hover:bg-gray-50"
                        >
                          <div className="flex items-start space-x-3">
                            {getNotificationIcon(notification.type)}
                            <div className="flex-1">
                              <p className="text-sm text-gray-800">
                                {notification.text}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {notification.time}
                              </p>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 text-center">
                      <button
                        onClick={handleShowAllNotifications}
                        className="text-blue-600 text-sm hover:text-blue-800"
                      >
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* All Notifications Modal */}
              {showAllNotifications && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                  onClick={handleCloseAllNotifications}
                >
                  <div
                    className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[80vh] mx-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-6 border-b">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">
                          All Notifications
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                          {notificationItems.filter((n) => !n.read).length}{" "}
                          unread notifications
                        </p>
                      </div>
                      <button
                        onClick={handleCloseAllNotifications}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <svg
                          className="w-5 h-5 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Modal Content */}
                    <div className="max-h-96 overflow-y-auto">
                      {notificationItems.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b hover:bg-gray-50 transition-colors ${!notification.read ? "bg-blue-50" : ""
                            }`}
                        >
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 mt-1">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <p
                                    className={`text-sm ${!notification.read
                                      ? "font-medium text-gray-900"
                                      : "text-gray-800"
                                      }`}
                                  >
                                    {notification.text}
                                  </p>
                                  <div className="flex items-center mt-2 space-x-4">
                                    <p className="text-xs text-gray-500">
                                      {notification.time}
                                    </p>
                                    <span
                                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${notification.type === "order"
                                        ? "bg-blue-100 text-blue-800"
                                        : notification.type === "payment"
                                          ? "bg-green-100 text-green-800"
                                          : notification.type === "support"
                                            ? "bg-orange-100 text-orange-800"
                                            : notification.type === "user"
                                              ? "bg-purple-100 text-purple-800"
                                              : notification.type === "inventory"
                                                ? "bg-red-100 text-red-800"
                                                : notification.type === "system"
                                                  ? "bg-gray-100 text-gray-800"
                                                  : notification.type === "review"
                                                    ? "bg-indigo-100 text-indigo-800"
                                                    : "bg-gray-100 text-gray-800"
                                        }`}
                                    >
                                      {notification.type}
                                    </span>
                                  </div>
                                </div>
                                {!notification.read && (
                                  <div className="flex-shrink-0 ml-4">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Modal Footer */}
                    <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
                      <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                        Mark all as read
                      </button>
                      <button
                        onClick={handleCloseAllNotifications}
                        className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* User Profile */}
              <div className="relative">
                <div
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-gray-700">
                    {adminUser.userName}
                  </span>
                </div>

                {/* User Dropdown Overlay */}
                {showUserDropdown && (
                  <>
                    <div
                      className="fixed inset-0 bg-black bg-opacity-50 z-40"
                      onClick={() => setShowUserDropdown(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl z-50 border">
                      <div className="p-4 border-b">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {adminUser.userName}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Email : {adminUser.email}
                            </p>
                            <p className="text-xs text-blue-600 font-medium">
                              Last Login :{" "}
                              {new Date(adminUser.lastLogin).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-2">
                        <button
                          onClick={() => setShowEditProfile(true)}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors"
                        >
                          <Edit3 className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700">Edit Profile</span>
                        </button>

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-red-50 rounded-md transition-colors text-red-600"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setShowEditProfile(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="p-6 border-b flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Edit Profile
                </h3>
                <button
                  onClick={() => setShowEditProfile(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={adminUser.userName}
                    onChange={(e) =>
                      handleInputChange("userName", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={adminUser.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    value={userDetails.role}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="User">User</option>
                  </select>
                </div> */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="email"
                    value={adminUser.phoneNumber}
                    onChange={(e) =>
                      handleInputChange("phoneNumber", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="p-6 border-t flex space-x-3">
                <button
                  onClick={() => setShowEditProfile(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
