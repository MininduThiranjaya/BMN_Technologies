// // import { useEffect, useState } from "react";
// // import { User, Search } from "lucide-react";
// // import { toast } from "react-toastify";
// // import axios from "axios";
// // import { endpoints } from "../api";
// // import { UserIssue } from "../interfaces/Common_Interfaces";

// // export default function CustomerComplains() {
// //   const [userIssues, setUserIssues] = useState<UserIssue[]>([])
// //   const [filteredComplain, setFilteredComplain] = useState<UserIssue[]>([])

// //   const fetchUserIssuesInform = async () => {
// //     const token = localStorage.getItem("accessToken");
// //     if (!token) {
// //       console.error("No token found");
// //       return;
// //     }
// //     try {
// //       await axios
// //         .get(endpoints.contactUs.getAllIssues, {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         })
// //         .then((res: any) => {
// //           setUserIssues(res.data);
// //           setFilteredComplain(res.data)
// //         })
// //         .catch((err) => {
// //           console.log(err);
// //         });
// //     } catch (err) {
// //       console.error("Failed to fetch count details", err);
// //     }
// //   };

// //   const makeAction = async (id: number) => {
// //     let fromData = { id: id };

// //     const token = localStorage.getItem("accessToken");
// //     if (!token) {
// //       console.error("No token found");
// //       return;
// //     }
// //     await axios
// //       .put(endpoints.contactUs.getAction, fromData, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       })
// //       .then((res) => {
// //         console.log(res);
// //         toast.success("Changing action success...");
// //         fetchUserIssuesInform();
// //       })
// //       .catch((error) => {
// //         console.log(error);
// //         toast.error("Changing action not success...");
// //       });
// //   };

// //   useEffect(() => {
// //     fetchUserIssuesInform();
// //   }, []);

// //   function searchForComplain(char: string) {
// //     console.log(char)
// //     if(!char) {
// //       setFilteredComplain(userIssues)
// //       return
// //     }
// //     const searchData = userIssues.filter((item) => (
// //       item.phoneNumber?.startsWith(char) || item.email?.startsWith(char)
// //     ))
// //     console.log(searchData)
// //     setFilteredComplain(searchData)
// //   }

// //   return (
// //     <div className="bg-white rounded-lg shadow-sm border">
// //       <div className="p-6 border-b flex items-center justify-between">
// //         <h3 className="text-lg font-semibold text-gray-800">
// //           Customer Complain
// //         </h3>

// //         {/* Search */}
// //         <div className="relative">
// //           <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
// //           <input
// //             onChange={(e) => searchForComplain(e.target.value)}
// //             type="text"
// //             placeholder="Email or Phone Number"
// //             className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //           />
// //         </div>
// //         {/* <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
// //                       <Plus className="w-4 h-4" />
// //                       <span>New Sale</span>
// //                     </button> */}
// //       </div>

// //       <div className="w-full max-h-[500px] overflow-y-scroll">
// //         <table className="w-full table-fixed border-collapse">
// //           <thead className="bg-gray-50 sticky top-0 z-10">
// //             <tr>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                 Customer Name
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                 Phone Number
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                 Email Address
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                 Issue
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                 Inform Date
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                 Action
// //               </th>
// //             </tr>
// //           </thead>

// //           <tbody className="bg-white divide-y divide-gray-200">
// //             {filteredComplain ? (
// //               filteredComplain.map((item, index) => (
// //                 <tr key={index}>
// //                   <td className="px-6 py-4 whitespace-nowrap">
// //                     <div className="flex items-center">
// //                       <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
// //                         <User className="w-4 h-4 text-gray-500" />
// //                       </div>
// //                       <span className="text-sm font-medium text-gray-900">
// //                         {item.userName}
// //                       </span>
// //                     </div>
// //                   </td>
// //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
// //                     {item.phoneNumber}
// //                   </td>
// //                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
// //                     {item.email}
// //                   </td>
// //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                     {item.issue}
// //                   </td>
// //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                     {new Date(item.createdAt).toLocaleString('en-US', {
// //                       year: 'numeric',
// //                       month: '2-digit',
// //                       day: '2-digit',
// //                       hour: 'numeric',
// //                       minute: 'numeric',
// //                       second: 'numeric',
// //                       hour12: true
// //                     })}
// //                   </td>
// //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                     <button
// //                       onClick={() => makeAction(item.id)}
// //                     >
// //                       {item.action ? "Solved" : "Pending"}
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))
// //             ) : (
// //               <tr className="flex w-full">
// //                 <td
// //                   className="w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center"
// //                   colSpan={6}
// //                 >
// //                   No User Issue Available
// //                 </td>
// //               </tr>
// //             )}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }

// import { useEffect, useState } from "react";
// import { User, Search } from "lucide-react";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { endpoints } from "../api";
// import { UserIssue } from "../interfaces/Common_Interfaces";
// import { useAuth } from "../context/AuthProvider";
// import { useNavigate } from "react-router-dom";

// interface CustomerComplainsProps {
//   darkMode?: boolean;
// }

// export default function CustomerComplains({ darkMode = false }: CustomerComplainsProps) {
//   const { logout } = useAuth();
//   const navigate = useNavigate();
//   const [userIssues, setUserIssues] = useState<UserIssue[]>([])
//   const [filteredComplain, setFilteredComplain] = useState<UserIssue[]>([])

//   // Theme tokens — mirrors the CustomerTestimonials / AdminUserManagement pattern
//   const theme = darkMode
//     ? {
//         panel: "bg-[#111827]",
//         panelBorder: "border-white/10",
//         text: "text-white",
//         textSub: "text-gray-300",
//         textMuted: "text-gray-400",
//         textFaint: "text-gray-500",
//         headBg: "bg-black/20",
//         rowDivide: "divide-white/10",
//         hoverRow: "hover:bg-white/5",
//         inputBg: "bg-black/20",
//         inputBorder: "border-white/10",
//         inputText: "text-white",
//         placeholder: "placeholder-gray-500",
//         iconColor: "text-gray-500",
//         avatarBg: "bg-white/10",
//         successText: "text-green-400",
//         actionText: "text-gray-300 hover:text-white",
//       }
//     : {
//         panel: "bg-white",
//         panelBorder: "border-gray-200",
//         text: "text-gray-800",
//         textSub: "text-gray-700",
//         textMuted: "text-gray-600",
//         textFaint: "text-gray-500",
//         headBg: "bg-gray-50",
//         rowDivide: "divide-gray-200",
//         hoverRow: "hover:bg-gray-50",
//         inputBg: "bg-white",
//         inputBorder: "border-gray-300",
//         inputText: "text-gray-900",
//         placeholder: "placeholder-gray-400",
//         iconColor: "text-gray-400",
//         avatarBg: "bg-gray-200",
//         successText: "text-green-600",
//         actionText: "text-gray-700 hover:text-gray-900",
//       };

//   const fetchUserIssuesInform = async () => {
//     const token = localStorage.getItem("accessToken");
//     if (!token) {
//       console.error("No token found");
//       return;
//     }
//     try {
//       await axios
//         .get(endpoints.contactUs.getAllIssues, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then((res: any) => {
//           setUserIssues(res.data);
//           setFilteredComplain(res.data)
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } catch (err) {
//       console.error("Failed to fetch count details", err);
//     }
//   };

//   const makeAction = async (id: number) => {
//     let fromData = { id: id };

//     const token = localStorage.getItem("accessToken");
//     if (!token) {
//       console.error("No token found");
//       return;
//     }
//     await axios
//       .put(endpoints.contactUs.getAction, fromData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         console.log(res);
//         toast.success("Changing action success...");
//         fetchUserIssuesInform();
//       })
//       .catch((error) => {
//         console.log(error);
//         toast.error("Changing action not success...");
//       });
//   };

//   const fetchUser = async () => {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//           return;
//         }
//         try {
//           const res = await axios.get(endpoints.user.dashboardUserProfile, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
  
//           if (!res.data.success && !res.data.object.suspended == false) {
//             logout();
//             navigate("/");
//           }
//         } catch (err) {
//           logout(); // Ensure to log out if fetching fails
//           navigate("/");
//         }
//       };

//   useEffect(() => {
//     fetchUser();
//     fetchUserIssuesInform();
//   }, []);

//   function searchForComplain(char: string) {
//     console.log(char)
//     if(!char) {
//       setFilteredComplain(userIssues)
//       return
//     }
//     const searchData = userIssues.filter((item) => (
//       item.phoneNumber?.startsWith(char) || item.email?.startsWith(char)
//     ))
//     console.log(searchData)
//     setFilteredComplain(searchData)
//   }

//   return (
//     <div className="space-y-6">
//       <div className={`${theme.panel} rounded-lg shadow-sm border ${theme.panelBorder} flex flex-col`}>
//         <div className={`p-6 border-b ${theme.panelBorder} shrink-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4`}>
//           <h3 className={`text-lg font-semibold ${theme.text}`}>
//             Customer Complain
//           </h3>

//           {/* Search */}
//           <div className="relative w-full sm:w-auto">
//             <Search className={`w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 ${theme.iconColor}`} />
//             <input
//               onChange={(e) => searchForComplain(e.target.value)}
//               type="text"
//               placeholder="Email or Phone Number"
//               className={`w-full sm:w-64 pl-10 pr-4 py-2 ${theme.inputBg} border ${theme.inputBorder} ${theme.inputText} ${theme.placeholder} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
//             />
//           </div>
//         </div>

//         {/* Fixed-size section — table scrolls both vertically and horizontally inside it */}
//         <div
//           className="overflow-x-auto overflow-y-auto"
//           style={{ height: "calc(100vh - 14rem)" }}
//         >
//           <table className="w-full min-w-[1100px]">
//             {/* Table Head */}
//             <thead className={`${theme.headBg} sticky top-0 z-10`}>
//               <tr>
//                 <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
//                   Customer Name
//                 </th>
//                 <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
//                   Phone Number
//                 </th>
//                 <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
//                   Email Address
//                 </th>
//                 <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider w-[28rem]`}>
//                   Issue
//                 </th>
//                 <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
//                   Inform Date
//                 </th>
//                 <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
//                   Action
//                 </th>
//               </tr>
//             </thead>

//             {/* Table Body */}
//             <tbody className={`divide-y ${theme.rowDivide}`}>
//               {filteredComplain ? (
//                 filteredComplain.map((item, index) => (
//                   <tr key={index} className={theme.hoverRow}>
//                     <td className="px-6 py-4 whitespace-nowrap align-top">
//                       <div className="flex items-center">
//                         <div className={`w-8 h-8 ${theme.avatarBg} rounded-full flex items-center justify-center mr-3 shrink-0`}>
//                           <User className={`w-4 h-4 ${theme.textMuted}`} />
//                         </div>
//                         <span className={`text-sm font-medium ${theme.text}`}>
//                           {item.userName}
//                         </span>
//                       </div>
//                     </td>
//                     <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme.textSub} align-top`}>
//                       {item.phoneNumber}
//                     </td>
//                     <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${theme.successText} align-top`}>
//                       {item.email}
//                     </td>
//                     <td className={`px-6 py-4 text-sm ${theme.textFaint} align-top whitespace-normal break-words leading-relaxed w-[28rem]`}>
//                       {item.issue}
//                     </td>
//                     <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme.textFaint} align-top`}>
//                       {new Date(item.createdAt).toLocaleString('en-US', {
//                         year: 'numeric',
//                         month: '2-digit',
//                         day: '2-digit',
//                         hour: 'numeric',
//                         minute: 'numeric',
//                         second: 'numeric',
//                         hour12: true
//                       })}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm align-top">
//                       <button
//                         onClick={() => makeAction(item.id)}
//                         className={theme.actionText}
//                       >
//                         {item.action ? "Solved" : "Pending"}
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     className={`px-6 py-4 whitespace-nowrap text-sm ${theme.textMuted} text-center`}
//                     colSpan={6}
//                   >
//                     No User Issue Available
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }