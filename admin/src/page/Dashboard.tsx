// import React, { JSX, useEffect, useState } from "react";
// import {
//   Search,
//   Bell,
//   Users,
//   User,
//   UserPlus,
//   Package,
//   Home,
//   LogOut,
//   Edit3,
//   X,
//   Folder,
//   AlertTriangle,
//   ThumbsUp,
//   Menu,
//   Sun,
//   Moon,
// } from "lucide-react";
// import { useAuth } from "../context/AuthProvider";
// import { toast } from "react-toastify";
// import Products from "../components/Products";
// import AdminUserRegistration from "../components/UserRegistration";
// import axios from "axios";
// import Projects from "../components/Projects";
// import {
//   AdminUser,
//   MenuItem,
//   StatCard,
// } from "../interfaces/Dashboard_Interfaces";
// import { endpoints } from "../api";
// import { UserIssue } from "../interfaces/Common_Interfaces";
// import CustomerTestimonials from "../components/CustomerTestimonials";
// import AdminUserManagement from "../components/UserManagement";
// import UserSolarAssessment from "../components/UserSolarAssessment";

// interface NotificationType {
//   id: number | null | undefined;
//   issue: string | null | undefined;
//   createdAt: Date;
//   userName: string | null | undefined;
// }

// const Dashboard: React.FC = () => {
//   const [stats, setStats] = useState<StatCard[]>([
//     {
//       title: "Total Products",
//       value: 0,
//       change: "",
//       icon: Package,
//       color: "bg-green-50 text-green-600",
//       iconBg: "bg-green-100",
//       url: endpoints.product.count,
//     },
//     {
//       title: "Total Projects",
//       value: 0,
//       change: "",
//       icon: Folder,
//       color: "bg-blue-50 text-blue-600",
//       iconBg: "bg-blue-100",
//       url: endpoints.project.count,
//     },
//     {
//       title: "Customer Assessment",
//       value: 0,
//       change: "",
//       icon: AlertTriangle,
//       color: "bg-purple-50 text-purple-600",
//       iconBg: "bg-purple-100",
//       url: endpoints.contactUs.count,
//     },
//     {
//       title: "Customer Testimonials",
//       value: 0,
//       change: "",
//       icon: ThumbsUp,
//       color: "bg-orange-50 text-orange-600",
//       iconBg: "bg-orange-100",
//       url: endpoints.testimonial.count,
//     },
//   ]);

//   const { logout } = useAuth();
//   const [notifications, setNotifications] = useState(0);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showAllNotifications, setShowAllNotifications] = useState(false);
//   const [showUserDropdown, setShowUserDropdown] = useState<boolean>(false);
//   const [showEditProfile, setShowEditProfile] = useState<boolean>(false);
//   const [activeView, setActiveView] = useState<string>("Dashboard");
//   const [userIssues, setUserIssues] = useState<UserIssue[]>([]);

//   // ── UI-only additions: dark mode + mobile sidebar ──
//   const [darkMode, setDarkMode] = useState<boolean>(true);
//   const [showMobileSidebar, setShowMobileSidebar] = useState<boolean>(false);

//   // Theme tokens driven by darkMode — this is what actually makes the toggle work.
//   const theme = darkMode
//     ? {
//         page: "bg-[#0a0e14]",
//         panel: "bg-[#111827]",
//         panelBorder: "border-white/10",
//         headBg: "bg-black/20",
//         rowDivide: "divide-white/10",
//         text: "text-white",
//         textSub: "text-gray-300",
//         textMuted: "text-gray-400",
//         textFaint: "text-gray-500",
//         hoverRow: "hover:bg-white/5",
//         inputBg: "bg-black/20",
//         inputBorder: "border-white/10",
//         inputText: "text-white",
//         placeholder: "placeholder-gray-500",
//         accentText: "text-blue-400",
//         accentBg: "bg-blue-500/10",
//         accentBorder: "border-blue-500",
//         overlay: "bg-black/60",
//         cancelBtn: "bg-white/5 hover:bg-white/10 text-gray-200",
//         closeBtnBg: "bg-white/10 hover:bg-white/20 text-white",
//       }
//     : {
//         page: "bg-gray-50",
//         panel: "bg-white",
//         panelBorder: "border-gray-200",
//         headBg: "bg-gray-50",
//         rowDivide: "divide-gray-200",
//         text: "text-gray-900",
//         textSub: "text-gray-700",
//         textMuted: "text-gray-600",
//         textFaint: "text-gray-500",
//         hoverRow: "hover:bg-gray-50",
//         inputBg: "bg-white",
//         inputBorder: "border-gray-300",
//         inputText: "text-gray-900",
//         placeholder: "placeholder-gray-400",
//         accentText: "text-blue-700",
//         accentBg: "bg-blue-50",
//         accentBorder: "border-blue-700",
//         overlay: "bg-black/50",
//         cancelBtn: "bg-gray-100 hover:bg-gray-200 text-gray-700",
//         closeBtnBg: "bg-gray-800 hover:bg-gray-900 text-white",
//       };

//   const [adminUser, setAdminUser] = useState({
//     email: "",
//     userName: "",
//     role: "",
//     phoneNumber: "",
//     lastLogin: "",
//     createdAt: "",
//     updatedAt: "",
//     isSuspended: ""
//   });

//   const fetchCountDetails = async () => {
//     const token = localStorage.getItem("accessToken");
//     if (!token) {
//       console.error("No token found");
//       return;
//     }
//     try {
//       const updatedStats = await Promise.all(
//         stats.map(async (data) => {
//           if (data.url === null) return { ...data };
//           const res = await axios.get(data.url, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });

//           if (res.data) {
//             console.log(res.data);
//             return {
//               ...data,
//               value: res.data,
//             };
//           } else {
//             return { ...data };
//           }
//         }),
//       );
//       setStats(updatedStats);
//     } catch (err) {
//       console.error("Failed to fetch count details", err);
//     }
//   };

//   const fetchUserIssuesInform = async () => {
//     const token = localStorage.getItem("accessToken");
//     if (!token) {
//       console.error("No token found");
//       return;
//     }
//     try {
//       await axios
//         .get(endpoints.contactUs.getIssues, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then((res: any) => {
//           setUserIssues(res.data);
//           setNotifications(res.data.length);
//           console.log(res);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } catch (err) {
//       console.error("Failed to fetch count details", err);
//     }
//   };

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem("accessToken");

//       if (!token) {
//         console.error("No token found");
//         return;
//       }

//       try {
//         const res = await axios.get(endpoints.user.dashboardUserProfile, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (res.data.success && res.data.object.suspended == false) {
//           setAdminUser({
//             email: res.data.object.email,
//             userName: res.data.object.userName,
//             role: res.data.object.role,
//             phoneNumber: res.data.object.phoneNumber,
//             lastLogin: res.data.object.lastLogin,
//             createdAt: res.data.object.createdAt,
//             updatedAt: res.data.object.updateAt,
//             isSuspended: res.data.object.suspended,
//           });
//           console.log("User profile fetched successfully", res.data);
//         } else {
//           logout();
//         }
//       } catch (err) {
//         console.error("Failed to fetch user profile", err);
//         logout(); // Ensure to log out if fetching fails
//       }
//     };

//     fetchUser();
//     // fetchCountDetails();
//     // fetchUserIssuesInform();
//   }, []);

//   if (!adminUser) return <p>Loading...</p>;

//   const notificationItems: NotificationType[] = userIssues.map((issue) => ({
//     id: issue.id,
//     issue: issue.issue,
//     userName: issue.userName,
//     createdAt: new Date(issue.createdAt),
//     isAvailable: issue.isAvailable,
//   }));

//   const handleNotificationClick = () => {
//     setShowNotifications(!showNotifications);
//     if (notifications > 0) {
//       setNotifications(0);
//     }
//   };

//   const handleShowAllNotifications = () => {
//     setShowNotifications(false);
//     setShowAllNotifications(true);
//     console.log("Opening all notifications modal"); // Debug log
//   };

//   const handleCloseAllNotifications = () => {
//     setShowAllNotifications(false);
//   };

//   const menuItems: MenuItem[] = [
//     { icon: Home, label: "Dashboard", active: activeView === "Dashboard" },
//     { icon: Package, label: "Products", active: activeView === "Products" },
//     { icon: Folder, label: "Projects", active: activeView === "Projects" },
//     ...(adminUser.role === "super_admin"
//     ? [
//         {
//           icon: UserPlus,
//           label: "User Registration",
//           active: activeView === "User Registration",
//         },
//         {
//           icon: Users,
//           label: "User Management",
//           active: activeView === "User Management",
//         },
//       ]
//     : []),
//     {
//       icon: AlertTriangle,
//       label: "Customer Complains",
//       active: activeView === "Customer Complains",
//     },
//     {
//       icon: ThumbsUp,
//       label: "Customer Testimonials",
//       active: activeView === "Customer Testimonials",
//     },
//   ];

//   const handleLogout = (): void => {
//     setShowUserDropdown(false);
//     logout();
//     toast.success("Logged out successfully...");
//   };

//   const handleSaveProfile = (): void => {
//     setShowEditProfile(false);
//     setShowUserDropdown(false);
//   };

//   const handleInputChange = (field: keyof AdminUser, value: string): void => {
//     setAdminUser((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleMenuClick = (label: string): void => {
//     setActiveView(label);
//     setShowMobileSidebar(false);
//   };

//   const renderContent = (): JSX.Element => {
//     switch (activeView) {
//       // case "Products":
//       //   return <Products onSuccess={fetchCountDetails} darkMode={darkMode} />;

//       // case "Projects":
//         // return <Projects onSuccess={fetchCountDetails} darkMode={darkMode} />;

//       case "User Registration":
//         return adminUser.role === "super_admin" ? <AdminUserRegistration darkMode={darkMode} /> : <></>;
      
//       case "User Management":
//         return adminUser.role === "super_admin" ? <AdminUserManagement darkMode={darkMode} /> : <></>;

//       case "Customer Complains":
//         // return <CustomerComplains darkMode={darkMode} />;
//         return <UserSolarAssessment darkMode={darkMode} />;

//       case "Customer Testimonials":
//         return <CustomerTestimonials darkMode={darkMode} />;

//       default:
//         return (
//           <>
//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
//               {stats.map((stat, index) => (
//                 <div
//                   key={index}
//                   className={`${theme.panel} p-5 sm:p-6 rounded-lg shadow-sm border ${theme.panelBorder}`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className={`text-sm font-medium ${theme.textMuted}`}>
//                         {stat.title}
//                       </p>
//                       <p className={`text-xl sm:text-2xl font-bold ${theme.text} mt-2`}>
//                         {stat.value == 0 ? <>---</> : stat.value}
//                       </p>
//                       <p className={`text-sm ${theme.accentText} mt-2`}>
//                         {stat.change}
//                       </p>
//                     </div>
//                     <div className={`p-3 rounded-lg ${theme.accentBg}`}>
//                       <stat.icon className={`w-6 h-6 ${theme.accentText}`} />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Recent Sales */}
//             <div className={`${theme.panel} rounded-lg shadow-sm border ${theme.panelBorder}`}>
//               <div className={`p-6 border-b ${theme.panelBorder} flex items-center justify-between`}>
//                 <h3 className={`text-lg font-semibold ${theme.text}`}>
//                   Customer Complain Notifications
//                 </h3>
//               </div>

//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className={theme.headBg}>
//                     <tr>
//                       <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
//                         Customer Name
//                       </th>
//                       <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
//                         Phone Number
//                       </th>
//                       <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
//                         Email Address
//                       </th>
//                       <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
//                         Issue
//                       </th>
//                       <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
//                         Inform Date
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className={`divide-y ${theme.rowDivide}`}>
//                     {userIssues ? (
//                       userIssues.map((item, index) => (
//                         <tr key={index}>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="flex items-center">
//                               <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${darkMode ? "bg-white/10" : "bg-gray-200"}`}>
//                                 <User className={`w-4 h-4 ${theme.textMuted}`} />
//                               </div>
//                               <span className={`text-sm font-medium ${theme.text}`}>
//                                 {item.userName}
//                               </span>
//                             </div>
//                           </td>
//                           <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme.textSub}`}>
//                             {item.phoneNumber}
//                           </td>
//                           <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${theme.accentText}`}>
//                             {item.email}
//                           </td>
//                           <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme.textMuted}`}>
//                             {item.issue}
//                           </td>
//                           <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme.textMuted}`}>
//                             {new Date(item.createdAt).toLocaleString("en-US", {
//                               year: "numeric",
//                               month: "2-digit",
//                               day: "2-digit",
//                               hour: "numeric",
//                               minute: "numeric",
//                               second: "numeric",
//                               hour12: true,
//                             })}
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr className="p-5">
//                         <td
//                           className={`px-6 py-4 whitespace-nowrap text-sm ${theme.textMuted} text-center`}
//                           colSpan={4}
//                         >
//                           No Customer Complain Available
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </>
//         );
//     }
//   };

//   return (
//     <div className={`min-h-screen ${theme.page} flex`}>
//       {/* Mobile sidebar overlay */}
//       {showMobileSidebar && (
//         <div
//           className={`fixed inset-0 ${theme.overlay} z-40 lg:hidden`}
//           onClick={() => setShowMobileSidebar(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed lg:static inset-y-0 left-0 z-50 w-64 ${theme.panel} border-r ${theme.panelBorder} transform transition-transform duration-200 ease-in-out ${
//           showMobileSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
//         }`}
//       >
//         <div className={`p-6 border-b ${theme.panelBorder} flex items-center justify-between`}>
//           <div>
//             <h1 className={`text-2xl font-bold ${theme.text}`}>AdminPro</h1>
//             <p className={`text-sm ${theme.textMuted}`}>Management Panel</p>
//           </div>
//           <button
//             onClick={() => setShowMobileSidebar(false)}
//             className={`lg:hidden ${theme.textMuted} hover:${theme.text}`}
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         <nav className="mt-6">
//           {menuItems.map((item, index) => (
//             <button
//               key={index}
//               onClick={() => handleMenuClick(item.label)}
//               className={`w-full flex items-center px-6 py-3 text-sm font-medium transition-colors text-left ${
//                 item.active
//                   ? `${theme.accentBg} ${theme.accentText} border-r-2 ${theme.accentBorder}`
//                   : `${theme.textMuted} ${theme.hoverRow} hover:${theme.text}`
//               }`}
//             >
//               <item.icon className="w-5 h-5 mr-3" />
//               {item.label}
//             </button>
//           ))}
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col min-w-0">
//         {/* Header */}
//         <header className={`${theme.panel} shadow-sm border-b ${theme.panelBorder} px-4 sm:px-6 py-4`}>
//           <div className="flex items-center justify-between gap-3">
//             <div className="flex items-center gap-3 min-w-0">
//               <button
//                 onClick={() => setShowMobileSidebar(true)}
//                 className={`lg:hidden p-2 ${theme.textMuted} ${theme.hoverRow} hover:${theme.text} rounded-lg transition-colors shrink-0`}
//               >
//                 <Menu className="w-5 h-5" />
//               </button>
//               <h2 className={`text-lg sm:text-2xl font-semibold ${theme.text} truncate`}>
//                 {activeView}
//               </h2>
//             </div>

//             <div className="flex items-center space-x-2 sm:space-x-4">
//               {/* Search */}
//               <div className="relative hidden md:block">
//                 <Search className={`w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 ${theme.textFaint}`} />
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className={`pl-10 pr-4 py-2 ${theme.inputBg} border ${theme.inputBorder} ${theme.inputText} ${theme.placeholder} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
//                 />
//               </div>

//               {/* Dark mode toggle — now actually switches the theme */}
//               <button
//                 onClick={() => setDarkMode((prev) => !prev)}
//                 className={`p-2 ${theme.textMuted} ${theme.hoverRow} hover:${theme.text} rounded-full transition-colors`}
//                 aria-label="Toggle dark mode"
//               >
//                 {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//               </button>

//               {/* Notifications */}
//               <div className="relative">
//                 <button
//                   onClick={handleNotificationClick}
//                   className={`relative p-2 ${theme.textMuted} ${theme.hoverRow} hover:${theme.text} rounded-full transition-colors`}
//                 >
//                   <Bell className="w-5 h-5" />
//                   {notifications > 0 && (
//                     <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                       {notifications}
//                     </span>
//                   )}
//                 </button>

//                 {/* Notification Dropdown */}
//                 {showNotifications && (
//                   <div className={`absolute right-0 mt-2 w-72 sm:w-80 ${theme.panel} rounded-lg shadow-lg border ${theme.panelBorder} z-50`}>
//                     <div className={`p-4 border-b ${theme.panelBorder}`}>
//                       <h3 className={`font-semibold ${theme.text}`}>
//                         Notifications
//                       </h3>
//                     </div>
//                     <div className="max-h-64 overflow-y-auto">
//                       {notificationItems.slice(0, 3).map((notification) => (
//                         <div
//                           key={notification.id}
//                           className={`p-4 border-b ${theme.panelBorder} ${theme.hoverRow}`}
//                         >
//                           <div className="flex items-start space-x-3">
//                             <User className="w-4 h-4 text-orange-400" />
//                             <div className="flex-1">
//                               <p className={`text-sm ${theme.textSub}`}>
//                                 {notification.issue}
//                               </p>
//                               <p className={`text-xs ${theme.textFaint} mt-1`}>
//                                 {new Date(
//                                   notification.createdAt,
//                                 ).toLocaleString("en-GB", {
//                                   day: "2-digit",
//                                   month: "short",
//                                   year: "numeric",
//                                   hour: "2-digit",
//                                   minute: "2-digit",
//                                 })}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                     <div className="p-3 text-center">
//                       <button
//                         onClick={handleShowAllNotifications}
//                         className={`${theme.accentText} text-sm hover:opacity-80`}
//                       >
//                         View all notifications
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* All Notifications Modal */}
//               {showAllNotifications && (
//                 <div
//                   className={`fixed inset-0 ${theme.overlay} flex items-center justify-center z-50 p-4`}
//                   onClick={handleCloseAllNotifications}
//                 >
//                   <div
//                     className={`${theme.panel} border ${theme.panelBorder} rounded-lg shadow-2xl w-full max-w-2xl max-h-[80vh]`}
//                     onClick={(e) => e.stopPropagation()}
//                   >
//                     {/* Modal Header */}
//                     <div className={`flex items-center justify-between p-6 border-b ${theme.panelBorder}`}>
//                       <div>
//                         <h2 className={`text-xl font-semibold ${theme.text}`}>
//                           All Notifications
//                         </h2>
//                       </div>
//                       <button
//                         onClick={handleCloseAllNotifications}
//                         className={`p-2 ${theme.hoverRow} rounded-full transition-colors`}
//                       >
//                         <svg
//                           className={`w-5 h-5 ${theme.textMuted}`}
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M6 18L18 6M6 6l12 12"
//                           />
//                         </svg>
//                       </button>
//                     </div>

//                     {/* Modal Content */}
//                     <div className="max-h-96 overflow-y-auto">
//                       {notificationItems.map((notification) => (
//                         <div
//                           key={notification.id}
//                           className={`p-4 border-b ${theme.panelBorder} ${theme.hoverRow} transition-colors ${theme.accentBg}`}
//                         >
//                           <div className="flex items-start space-x-4">
//                             <div className="flex-shrink-0 mt-1">
//                               <User className="w-4 h-4 text-orange-400" />
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               <div className="flex items-start justify-between">
//                                 <div className="flex-1">
//                                   <p className={`text-sm font-medium ${theme.text}`}>
//                                     {notification.issue}
//                                   </p>
//                                   <div className="flex items-center mt-2 space-x-4">
//                                     <p className={`text-xs ${theme.textFaint}`}>
//                                       {new Date(
//                                         notification.createdAt,
//                                       ).toLocaleString("en-GB", {
//                                         day: "2-digit",
//                                         month: "short",
//                                         year: "numeric",
//                                         hour: "2-digit",
//                                         minute: "2-digit",
//                                       })}
//                                     </p>
//                                     <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-400">
//                                       Support
//                                     </span>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     {/* Modal Footer */}
//                     <div className={`p-4 border-t ${theme.panelBorder} ${theme.headBg} flex justify-between items-center`}>
//                       <button
//                         onClick={handleCloseAllNotifications}
//                         className={`px-4 py-2 rounded-lg transition-colors ${theme.closeBtnBg}`}
//                       >
//                         Close
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* User Profile */}
//               <div className="relative">
//                 <div
//                   onClick={() => setShowUserDropdown(!showUserDropdown)}
//                   className={`flex items-center space-x-2 cursor-pointer ${theme.hoverRow} px-2 py-1 rounded-lg transition-colors`}
//                 >
//                   <div
//                     className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
//                     style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}
//                   >
//                     <User className="w-5 h-5 text-white" />
//                   </div>
//                   <span className={`font-medium ${theme.textSub} hidden sm:inline`}>
//                     {adminUser.userName}
//                   </span>
//                 </div>

//                 {/* User Dropdown Overlay */}
//                 {showUserDropdown && (
//                   <>
//                     <div
//                       className={`fixed inset-0 ${theme.overlay} z-40`}
//                       onClick={() => setShowUserDropdown(false)}
//                     />
//                     <div className={`absolute right-0 top-full mt-2 w-72 sm:w-80 ${theme.panel} border ${theme.panelBorder} rounded-lg shadow-xl z-50`}>
//                       <div className={`p-4 border-b ${theme.panelBorder}`}>
//                         <div className="flex items-center space-x-3">
//                           <div
//                             className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
//                             style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}
//                           >
//                             <User className="w-6 h-6 text-white" />
//                           </div>
//                           <div className="min-w-0">
//                             <h3 className={`font-semibold ${theme.text} truncate`}>
//                               {adminUser.userName}
//                             </h3>
//                             <p className={`text-sm ${theme.textMuted} truncate`}>
//                               Email : {adminUser.email}
//                             </p>
//                             <p className={`text-xs ${theme.accentText} font-medium`}>
//                               Last Login :{" "}
//                               {new Date(adminUser.lastLogin).toLocaleString()}
//                             </p>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="p-2">
//                         <button
//                           onClick={() => setShowEditProfile(true)}
//                           className={`w-full flex items-center space-x-3 px-3 py-2 text-left ${theme.hoverRow} rounded-md transition-colors`}
//                         >
//                           <Edit3 className={`w-4 h-4 ${theme.textMuted}`} />
//                           <span className={theme.textSub}>Edit Profile</span>
//                         </button>

//                         <button
//                           onClick={handleLogout}
//                           className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-red-500/10 rounded-md transition-colors text-red-500"
//                         >
//                           <LogOut className="w-4 h-4" />
//                           <span>Logout</span>
//                         </button>
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Dashboard Content */}
//         <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">{renderContent()}</main>
//       </div>

//       {/* Edit Profile Modal */}
//       {showEditProfile && (
//         <>
//           <div
//             className={`fixed inset-0 ${theme.overlay} z-50`}
//             onClick={() => setShowEditProfile(false)}
//           />
//           <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
//             <div className={`${theme.panel} border ${theme.panelBorder} rounded-lg shadow-xl w-full max-w-md`}>
//               <div className={`p-6 border-b ${theme.panelBorder} flex items-center justify-between`}>
//                 <h3 className={`text-lg font-semibold ${theme.text}`}>
//                   Edit Profile
//                 </h3>
//                 <button
//                   onClick={() => setShowEditProfile(false)}
//                   className={`${theme.textMuted} hover:${theme.text}`}
//                 >
//                   <X className="w-5 h-5" />
//                 </button>
//               </div>

//               <div className="p-6 space-y-4">
//                 <div>
//                   <label className={`block text-sm font-medium ${theme.textSub} mb-2`}>
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     value={adminUser.userName}
//                     onChange={(e) =>
//                       handleInputChange("userName", e.target.value)
//                     }
//                     className={`w-full px-3 py-2 ${theme.inputBg} border ${theme.inputBorder} ${theme.inputText} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
//                   />
//                 </div>

//                 <div>
//                   <label className={`block text-sm font-medium ${theme.textSub} mb-2`}>
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     disabled = {true}
//                     value={adminUser.email}
//                     onChange={(e) => handleInputChange("email", e.target.value)}
//                     className={`w-full px-3 py-2 ${theme.inputBg} border ${theme.inputBorder} ${theme.textFaint} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-not-allowed`}
//                   />
//                 </div>

//                 <div>
//                   <label className={`block text-sm font-medium ${theme.textSub} mb-2`}>
//                     Phone Number
//                   </label>
//                   <input
//                     type="email"
//                     value={adminUser.phoneNumber}
//                     onChange={(e) =>
//                       handleInputChange("phoneNumber", e.target.value)
//                     }
//                     className={`w-full px-3 py-2 ${theme.inputBg} border ${theme.inputBorder} ${theme.inputText} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
//                   />
//                 </div>
//               </div>

//               <div className={`p-6 border-t ${theme.panelBorder} flex space-x-3`}>
//                 <button
//                   onClick={() => setShowEditProfile(false)}
//                   className={`flex-1 px-4 py-2 rounded-lg transition-colors ${theme.cancelBtn}`}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleSaveProfile}
//                   className="flex-1 px-4 py-2 text-white rounded-lg transition-colors"
//                   style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

import React, { JSX, useState } from "react";
import {
  Search,
  Bell,
  Users,
  User,
  UserPlus,
  Package,
  Home,
  LogOut,
  Edit3,
  X,
  Folder,
  AlertTriangle,
  ThumbsUp,
  Menu,
  Sun,
  Moon,
} from "lucide-react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminUserRegistration from "../components/UserRegistration";
import axios from "axios";
import { MenuItem, StatCard } from "../interfaces/Dashboard_Interfaces";
import { ApiResponse } from "../interfaces/ApiResponses";
import { endpoints } from "../api";
import { UserIssue } from "../interfaces/Common_Interfaces";
import CustomerTestimonials from "../components/CustomerTestimonials";
import AdminUserManagement from "../components/UserManagement";
import UserSolarAssessment from "../components/UserSolarAssessment";

interface NotificationType {
  id: number | null | undefined;
  issue: string | null | undefined;
  createdAt: Date;
  userName: string | null | undefined;
}

const Dashboard: React.FC = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  // ProtectedRoute guarantees `user` is non-null by the time this renders.
  const adminUser = user!;

  const [stats, setStats] = useState<StatCard[]>([
    { title: "Total Products", value: 0, change: "", icon: Package, color: "bg-green-50 text-green-600", iconBg: "bg-green-100", url: endpoints.product.count },
    { title: "Total Projects", value: 0, change: "", icon: Folder, color: "bg-blue-50 text-blue-600", iconBg: "bg-blue-100", url: endpoints.project.count },
    { title: "Customer Assessment", value: 0, change: "", icon: AlertTriangle, color: "bg-purple-50 text-purple-600", iconBg: "bg-purple-100", url: endpoints.contactUs.count },
    { title: "Customer Testimonials", value: 0, change: "", icon: ThumbsUp, color: "bg-orange-50 text-orange-600", iconBg: "bg-orange-100", url: endpoints.testimonial.count },
  ]);

  const [notifications, setNotifications] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState<boolean>(false);
  const [showEditProfile, setShowEditProfile] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<string>("Dashboard");
  const [userIssues, setUserIssues] = useState<UserIssue[]>([]);
  const [savingProfile, setSavingProfile] = useState(false);

  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [showMobileSidebar, setShowMobileSidebar] = useState<boolean>(false);

  // Local form state for the edit-profile modal only — the real profile
  // lives in AuthProvider; this is just a draft until Save is confirmed.
  const [editForm, setEditForm] = useState({
    userName: adminUser.userName,
    phoneNumber: adminUser.phoneNumber,
  });

  const theme = darkMode
    ? {
        page: "bg-[#0a0e14]", panel: "bg-[#111827]", panelBorder: "border-white/10",
        headBg: "bg-black/20", rowDivide: "divide-white/10", text: "text-white",
        textSub: "text-gray-300", textMuted: "text-gray-400", textFaint: "text-gray-500",
        hoverRow: "hover:bg-white/5", inputBg: "bg-black/20", inputBorder: "border-white/10",
        inputText: "text-white", placeholder: "placeholder-gray-500", accentText: "text-blue-400",
        accentBg: "bg-blue-500/10", accentBorder: "border-blue-500", overlay: "bg-black/60",
        cancelBtn: "bg-white/5 hover:bg-white/10 text-gray-200", closeBtnBg: "bg-white/10 hover:bg-white/20 text-white",
      }
    : {
        page: "bg-gray-50", panel: "bg-white", panelBorder: "border-gray-200",
        headBg: "bg-gray-50", rowDivide: "divide-gray-200", text: "text-gray-900",
        textSub: "text-gray-700", textMuted: "text-gray-600", textFaint: "text-gray-500",
        hoverRow: "hover:bg-gray-50", inputBg: "bg-white", inputBorder: "border-gray-300",
        inputText: "text-gray-900", placeholder: "placeholder-gray-400", accentText: "text-blue-700",
        accentBg: "bg-blue-50", accentBorder: "border-blue-700", overlay: "bg-black/50",
        cancelBtn: "bg-gray-100 hover:bg-gray-200 text-gray-700", closeBtnBg: "bg-gray-800 hover:bg-gray-900 text-white",
      };

  const fetchCountDetails = async () => {
    try {
      const updatedStats = await Promise.all(
        stats.map(async (stat) => {
          if (!stat.url) return stat;
          const res = await axios.get<ApiResponse<number>>(stat.url);
          return res.data.success ? { ...stat, value: res.data.data } : stat;
        }),
      );
      setStats(updatedStats);
    } catch (err) {
      console.error("Failed to fetch count details", err);
    }
  };

  const fetchUserIssues = async () => {
    try {
      const res = await axios.get<ApiResponse<UserIssue[]>>(endpoints.contactUs.getIssues);
      if (res.data.success) {
        setUserIssues(res.data.data);
        setNotifications(res.data.data.length);
      }
    } catch (err) {
      console.error("Failed to fetch user issues", err);
    }
  };

  const notificationItems: NotificationType[] = userIssues.map((issue) => ({
    id: issue.id,
    issue: issue.issue,
    userName: issue.userName,
    createdAt: new Date(issue.createdAt),
  }));

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (notifications > 0) setNotifications(0);
  };

  const handleShowAllNotifications = () => {
    setShowNotifications(false);
    setShowAllNotifications(true);
  };

  const handleCloseAllNotifications = () => setShowAllNotifications(false);

  const menuItems: MenuItem[] = [
    { icon: Home, label: "Dashboard", active: activeView === "Dashboard" },
    { icon: Package, label: "Products", active: activeView === "Products" },
    { icon: Folder, label: "Projects", active: activeView === "Projects" },
    ...(adminUser.role === "super_admin"
      ? [
          { icon: UserPlus, label: "User Registration", active: activeView === "User Registration" },
          { icon: Users, label: "User Management", active: activeView === "User Management" },
        ]
      : []),
    { icon: AlertTriangle, label: "Customer Complains", active: activeView === "Customer Complains" },
    { icon: ThumbsUp, label: "Customer Testimonials", active: activeView === "Customer Testimonials" },
  ];

  const handleLogout = (): void => {
    setShowUserDropdown(false);
    logout();
    toast.success("Logged out successfully...");
    navigate("/login");
  };

  const openEditProfile = (): void => {
    setEditForm({ userName: adminUser.userName, phoneNumber: adminUser.phoneNumber });
    setShowEditProfile(true);
  };

  const handleSaveProfile = async (): Promise<void> => {
    setSavingProfile(true);
    try {
      const res = await axios.put<ApiResponse<typeof adminUser>>(
        endpoints.user.getMe,
        editForm,
      );
      if (res.data.success) {
        updateUser(res.data.data);
        toast.success("Profile updated successfully");
        setShowEditProfile(false);
        setShowUserDropdown(false);
      } else {
        toast.error(res.data.message || "Could not update profile");
      }
    } catch (err) {
      toast.error("Could not update profile. Please try again.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleEditFormChange = (field: keyof typeof editForm, value: string): void => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleMenuClick = (label: string): void => {
    setActiveView(label);
    setShowMobileSidebar(false);
    if (label === "Customer Complains" && userIssues.length === 0) {
      fetchUserIssues();
    }
    if (label === "Dashboard") {
      fetchCountDetails();
      fetchUserIssues();
    }
  };

  const renderContent = (): JSX.Element => {
    switch (activeView) {
      case "User Registration":
        return adminUser.role === "super_admin" ? <AdminUserRegistration darkMode={darkMode} /> : <></>;

      case "User Management":
        return adminUser.role === "super_admin" ? <AdminUserManagement darkMode={darkMode} /> : <></>;

      case "Customer Complains":
        return <UserSolarAssessment darkMode={darkMode} />;

      case "Customer Testimonials":
        return <CustomerTestimonials darkMode={darkMode} />;

      default:
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className={`${theme.panel} p-5 sm:p-6 rounded-lg shadow-sm border ${theme.panelBorder}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-medium ${theme.textMuted}`}>{stat.title}</p>
                      <p className={`text-xl sm:text-2xl font-bold ${theme.text} mt-2`}>
                        {stat.value === 0 ? <>---</> : stat.value}
                      </p>
                      <p className={`text-sm ${theme.accentText} mt-2`}>{stat.change}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${theme.accentBg}`}>
                      <stat.icon className={`w-6 h-6 ${theme.accentText}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={`${theme.panel} rounded-lg shadow-sm border ${theme.panelBorder}`}>
              <div className={`p-6 border-b ${theme.panelBorder} flex items-center justify-between`}>
                <h3 className={`text-lg font-semibold ${theme.text}`}>Customer Complain Notifications</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={theme.headBg}>
                    <tr>
                      <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>Customer Name</th>
                      <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>Phone Number</th>
                      <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>Email Address</th>
                      <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>Issue</th>
                      <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>Inform Date</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${theme.rowDivide}`}>
                    {userIssues.length > 0 ? (
                      userIssues.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${darkMode ? "bg-white/10" : "bg-gray-200"}`}>
                                <User className={`w-4 h-4 ${theme.textMuted}`} />
                              </div>
                              <span className={`text-sm font-medium ${theme.text}`}>{item.userName}</span>
                            </div>
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme.textSub}`}>{item.phoneNumber}</td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${theme.accentText}`}>{item.email}</td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme.textMuted}`}>{item.issue}</td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme.textMuted}`}>
                            {new Date(item.createdAt).toLocaleString("en-US", {
                              year: "numeric", month: "2-digit", day: "2-digit",
                              hour: "numeric", minute: "numeric", second: "numeric", hour12: true,
                            })}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme.textMuted} text-center`} colSpan={5}>
                          No Customer Complain Available
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
    <div className={`min-h-screen ${theme.page} flex`}>
      {showMobileSidebar && (
        <div className={`fixed inset-0 ${theme.overlay} z-40 lg:hidden`} onClick={() => setShowMobileSidebar(false)} />
      )}

      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 ${theme.panel} border-r ${theme.panelBorder} transform transition-transform duration-200 ease-in-out ${
          showMobileSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className={`p-6 border-b ${theme.panelBorder} flex items-center justify-between`}>
          <div>
            <h1 className={`text-2xl font-bold ${theme.text}`}>AdminPro</h1>
            <p className={`text-sm ${theme.textMuted}`}>Management Panel</p>
          </div>
          <button onClick={() => setShowMobileSidebar(false)} className={`lg:hidden ${theme.textMuted} hover:${theme.text}`}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-6">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleMenuClick(item.label)}
              className={`w-full flex items-center px-6 py-3 text-sm font-medium transition-colors text-left ${
                item.active
                  ? `${theme.accentBg} ${theme.accentText} border-r-2 ${theme.accentBorder}`
                  : `${theme.textMuted} ${theme.hoverRow} hover:${theme.text}`
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <header className={`${theme.panel} shadow-sm border-b ${theme.panelBorder} px-4 sm:px-6 py-4`}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setShowMobileSidebar(true)}
                className={`lg:hidden p-2 ${theme.textMuted} ${theme.hoverRow} hover:${theme.text} rounded-lg transition-colors shrink-0`}
              >
                <Menu className="w-5 h-5" />
              </button>
              <h2 className={`text-lg sm:text-2xl font-semibold ${theme.text} truncate`}>{activeView}</h2>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="relative hidden md:block">
                <Search className={`w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 ${theme.textFaint}`} />
                <input
                  type="text"
                  placeholder="Search..."
                  className={`pl-10 pr-4 py-2 ${theme.inputBg} border ${theme.inputBorder} ${theme.inputText} ${theme.placeholder} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>

              <button
                onClick={() => setDarkMode((prev) => !prev)}
                className={`p-2 ${theme.textMuted} ${theme.hoverRow} hover:${theme.text} rounded-full transition-colors`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <div className="relative">
                <button
                  onClick={handleNotificationClick}
                  className={`relative p-2 ${theme.textMuted} ${theme.hoverRow} hover:${theme.text} rounded-full transition-colors`}
                >
                  <Bell className="w-5 h-5" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className={`absolute right-0 mt-2 w-72 sm:w-80 ${theme.panel} rounded-lg shadow-lg border ${theme.panelBorder} z-50`}>
                    <div className={`p-4 border-b ${theme.panelBorder}`}>
                      <h3 className={`font-semibold ${theme.text}`}>Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notificationItems.length === 0 && (
                        <p className={`p-4 text-sm ${theme.textMuted} text-center`}>No notifications</p>
                      )}
                      {notificationItems.slice(0, 3).map((notification, i) => (
                        <div key={notification.id ?? i} className={`p-4 border-b ${theme.panelBorder} ${theme.hoverRow}`}>
                          <div className="flex items-start space-x-3">
                            <User className="w-4 h-4 text-orange-400" />
                            <div className="flex-1">
                              <p className={`text-sm ${theme.textSub}`}>{notification.issue}</p>
                              <p className={`text-xs ${theme.textFaint} mt-1`}>
                                {notification.createdAt.toLocaleString("en-GB", {
                                  day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 text-center">
                      <button onClick={handleShowAllNotifications} className={`${theme.accentText} text-sm hover:opacity-80`}>
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {showAllNotifications && (
                <div className={`fixed inset-0 ${theme.overlay} flex items-center justify-center z-50 p-4`} onClick={handleCloseAllNotifications}>
                  <div className={`${theme.panel} border ${theme.panelBorder} rounded-lg shadow-2xl w-full max-w-2xl max-h-[80vh]`} onClick={(e) => e.stopPropagation()}>
                    <div className={`flex items-center justify-between p-6 border-b ${theme.panelBorder}`}>
                      <h2 className={`text-xl font-semibold ${theme.text}`}>All Notifications</h2>
                      <button onClick={handleCloseAllNotifications} className={`p-2 ${theme.hoverRow} rounded-full transition-colors`}>
                        <X className={`w-5 h-5 ${theme.textMuted}`} />
                      </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notificationItems.map((notification, i) => (
                        <div key={notification.id ?? i} className={`p-4 border-b ${theme.panelBorder} ${theme.hoverRow} transition-colors ${theme.accentBg}`}>
                          <div className="flex items-start space-x-4">
                            <User className="w-4 h-4 text-orange-400 mt-1 shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium ${theme.text}`}>{notification.issue}</p>
                              <div className="flex items-center mt-2 space-x-4">
                                <p className={`text-xs ${theme.textFaint}`}>
                                  {notification.createdAt.toLocaleString("en-GB", {
                                    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
                                  })}
                                </p>
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-400">
                                  Support
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className={`p-4 border-t ${theme.panelBorder} ${theme.headBg} flex justify-between items-center`}>
                      <button onClick={handleCloseAllNotifications} className={`px-4 py-2 rounded-lg transition-colors ${theme.closeBtnBg}`}>
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="relative">
                <div
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className={`flex items-center space-x-2 cursor-pointer ${theme.hoverRow} px-2 py-1 rounded-lg transition-colors`}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}>
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className={`font-medium ${theme.textSub} hidden sm:inline`}>{adminUser.userName}</span>
                </div>

                {showUserDropdown && (
                  <>
                    <div className={`fixed inset-0 ${theme.overlay} z-40`} onClick={() => setShowUserDropdown(false)} />
                    <div className={`absolute right-0 top-full mt-2 w-72 sm:w-80 ${theme.panel} border ${theme.panelBorder} rounded-lg shadow-xl z-50`}>
                      <div className={`p-4 border-b ${theme.panelBorder}`}>
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}>
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div className="min-w-0">
                            <h3 className={`font-semibold ${theme.text} truncate`}>{adminUser.userName}</h3>
                            <p className={`text-sm ${theme.textMuted} truncate`}>Email : {adminUser.email}</p>
                            <p className={`text-xs ${theme.accentText} font-medium`}>
                              Last Login :{" "}
                              {adminUser.lastLogin ? new Date(adminUser.lastLogin).toLocaleString() : "First login"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-2">
                        <button
                          onClick={openEditProfile}
                          className={`w-full flex items-center space-x-3 px-3 py-2 text-left ${theme.hoverRow} rounded-md transition-colors`}
                        >
                          <Edit3 className={`w-4 h-4 ${theme.textMuted}`} />
                          <span className={theme.textSub}>Edit Profile</span>
                        </button>

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-red-500/10 rounded-md transition-colors text-red-500"
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

        <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">{renderContent()}</main>
      </div>

      {showEditProfile && (
        <>
          <div className={`fixed inset-0 ${theme.overlay} z-50`} onClick={() => !savingProfile && setShowEditProfile(false)} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className={`${theme.panel} border ${theme.panelBorder} rounded-lg shadow-xl w-full max-w-md`}>
              <div className={`p-6 border-b ${theme.panelBorder} flex items-center justify-between`}>
                <h3 className={`text-lg font-semibold ${theme.text}`}>Edit Profile</h3>
                <button onClick={() => setShowEditProfile(false)} className={`${theme.textMuted} hover:${theme.text}`} disabled={savingProfile}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${theme.textSub} mb-2`}>Full Name</label>
                  <input
                    type="text"
                    value={editForm.userName}
                    onChange={(e) => handleEditFormChange("userName", e.target.value)}
                    className={`w-full px-3 py-2 ${theme.inputBg} border ${theme.inputBorder} ${theme.inputText} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium ${theme.textSub} mb-2`}>Email Address</label>
                  <input
                    type="email"
                    disabled
                    value={adminUser.email}
                    className={`w-full px-3 py-2 ${theme.inputBg} border ${theme.inputBorder} ${theme.textFaint} rounded-lg focus:outline-none cursor-not-allowed`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium ${theme.textSub} mb-2`}>Phone Number</label>
                  <input
                    type="tel"
                    value={editForm.phoneNumber}
                    onChange={(e) => handleEditFormChange("phoneNumber", e.target.value)}
                    className={`w-full px-3 py-2 ${theme.inputBg} border ${theme.inputBorder} ${theme.inputText} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                </div>
              </div>

              <div className={`p-6 border-t ${theme.panelBorder} flex space-x-3`}>
                <button
                  onClick={() => setShowEditProfile(false)}
                  disabled={savingProfile}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors ${theme.cancelBtn} disabled:opacity-60`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  disabled={savingProfile}
                  className="flex-1 px-4 py-2 text-white rounded-lg transition-colors disabled:opacity-70"
                  style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}
                >
                  {savingProfile ? "Saving..." : "Save Changes"}
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