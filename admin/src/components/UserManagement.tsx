import { useEffect, useState } from "react";
import { User, Search } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { endpoints } from "../api";
import { AdminUser } from "../interfaces/Common_Interfaces";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

interface AdminUserManagementProps {
  darkMode?: boolean;
}

export default function AdminUserManagement({ darkMode = false }: AdminUserManagementProps) {
  const [allUsers, setAllUsers] = useState<AdminUser[]>([])
  const [filteredUsers, setFilteredUsers] = useState<AdminUser[]>([])
  const currentUser = localStorage.getItem("userId")
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Theme tokens — mirrors the Dashboard / AdminUserRegistration pattern
  const theme = darkMode
    ? {
        panel: "bg-[#111827]",
        panelBorder: "border-white/10",
        text: "text-white",
        textSub: "text-gray-300",
        textMuted: "text-gray-400",
        textFaint: "text-gray-500",
        headBg: "bg-black/20",
        rowDivide: "divide-white/10",
        rowHighlight: "bg-blue-500/10",
        hoverRow: "hover:bg-white/5",
        inputBg: "bg-black/20",
        inputBorder: "border-white/10",
        inputText: "text-white",
        placeholder: "placeholder-gray-500",
        iconColor: "text-gray-500",
        avatarBg: "bg-white/10",
        accentText: "text-blue-400",
        successText: "text-green-400",
        actionText: "text-gray-300 hover:text-white",
        deleteText: "text-red-400 hover:text-red-300",
      }
    : {
        panel: "bg-white",
        panelBorder: "border-gray-200",
        text: "text-gray-800",
        textSub: "text-gray-700",
        textMuted: "text-gray-600",
        textFaint: "text-gray-500",
        headBg: "bg-gray-50",
        rowDivide: "divide-gray-200",
        rowHighlight: "bg-blue-100",
        hoverRow: "hover:bg-gray-50",
        inputBg: "bg-white",
        inputBorder: "border-gray-300",
        inputText: "text-gray-900",
        placeholder: "placeholder-gray-400",
        iconColor: "text-gray-400",
        avatarBg: "bg-gray-200",
        accentText: "text-blue-700",
        successText: "text-green-600",
        actionText: "text-gray-700 hover:text-gray-900",
        deleteText: "text-red-600 hover:text-red-700",
      };

  const fetchAllUsers = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      await axios
        .get(endpoints.user.getAllUsers, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res: any) => {
          setAllUsers(res.data.object);
          setFilteredUsers(res.data.object)
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.error("Failed to fetch count details", err);
    }
  };

  const changeRole = async (id: number) => {

    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No token found");
      return;
    }
    await axios
      .put(endpoints.user.changeRole.replace("{id}", id.toString()), {},{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("Changing role success...");
        fetchAllUsers();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Changing role not success...");
      });
  };

  const makeSuspention = async (id: number) => {

    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No token found");
      return;
    }
    await axios
      .put(endpoints.user.makeSuspention.replace("{id}", id.toString()), {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        fetchAllUsers();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Make suspention not success...");
      });
  };

  const deleteUser = async (id: number) => {

    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No token found");
      return;
    }
    await axios
      .delete(endpoints.user.deleteUser.replace("{id}", id.toString()), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("Delete user success...");
        fetchAllUsers();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Delete user not success...");
      });
  };
  
  const fetchUser = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return;
    }
    try {
      const res = await axios.get(endpoints.user.dashboardUserProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.data.success && !res.data.object.suspended == false) {
        logout();
        navigate("/");
      }
      fetchAllUsers();
    } catch (err) {
      logout(); // Ensure to log out if fetching fails
      navigate("/");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  function searchForUsers(char: string) {
    if(!char) {
      setFilteredUsers(allUsers)
      return
    }
    const searchData = allUsers.filter((item) => (
        item.phoneNumber?.toString().startsWith(char) ||
        item.email?.toLowerCase().startsWith(char.toLowerCase()) ||
        item.userName?.toLowerCase().startsWith(char.toLowerCase())
    ))
    console.log(searchData)
    setFilteredUsers(searchData)
  }

  return (
    <div className="space-y-6">
      <div className={`${theme.panel} rounded-lg shadow-sm border ${theme.panelBorder} flex flex-col`}>
        <div className={`p-6 border-b ${theme.panelBorder} shrink-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4`}>
          <h3 className={`text-lg font-semibold ${theme.text}`}>
            User Management
          </h3>

          {/* Search */}
          <div className="relative w-full sm:w-auto">
            <Search className={`w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 ${theme.iconColor}`} />
            <input
              onChange={(e) => searchForUsers(e.target.value)}
              type="text"
              placeholder="Email / Phone / Name"
              className={`w-full sm:w-64 pl-10 pr-4 py-2 ${theme.inputBg} border ${theme.inputBorder} ${theme.inputText} ${theme.placeholder} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
          </div>
        </div>

        {/* Fixed-size section — table scrolls both vertically and horizontally inside it */}
        <div
          className="overflow-auto"
          style={{ height: "calc(100vh - 14rem)" }}
        >
          <table className="w-full min-w-[1100px]">
            <thead className={`${theme.headBg} sticky top-0 z-10`}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
                  User Name
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
                  User Email
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
                  Phone Number
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
                  Last Login
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
                  Created At
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
                  Updated At
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
                  User Role
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
                  Change Role
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
                  Work Suspention
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
                  Delete User
                </th>
              </tr>
            </thead>

            <tbody className={`divide-y ${theme.rowDivide}`}>
              {filteredUsers ? (
                filteredUsers.map((item, index) => (
                  <tr
                    key={index}
                    className={currentUser === item.id.toString() ? theme.rowHighlight : theme.hoverRow}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 ${theme.avatarBg} rounded-full flex items-center justify-center mr-3 shrink-0`}>
                          <User className={`w-4 h-4 ${theme.textMuted}`} />
                        </div>
                        <span className={`text-sm font-medium ${theme.text}`}>
                          {item.userName}
                        </span>
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme.textSub}`}>
                      {item.email}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${theme.successText}`}>
                      {item.phoneNumber}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme.textFaint}`}>
                      {item.lastLogin ? new Date(item.lastLogin).toLocaleString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        hour12: true
                      }) : 'N/A'}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme.textFaint}`}>
                      {item.createdAt ? new Date(item.createdAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        hour12: true
                      }) : 'N/A'}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme.textFaint}`}>
                      {item.updatedAt ? new Date(item.updatedAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        hour12: true
                      }) : 'N/A'}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${theme.successText}`}>
                      {item.role === "super_admin" ? "Super Admin" : "Admin"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => changeRole(item.id)}
                        disabled={currentUser === item.id.toString()}
                        className={
                              currentUser === item.id.toString()
                              ? `cursor-not-allowed opacity-50 ${theme.textFaint}`
                              : theme.actionText}
                      >
                        {item.role === "admin" ? "Make Super Admin" : "Make Admin"}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => makeSuspention(item.id)}
                        disabled={currentUser === item.id.toString()}
                        className={
                              currentUser === item.id.toString()
                              ? `cursor-not-allowed opacity-50 ${theme.textFaint}`
                              : theme.actionText}
                      >
                        {item.suspended ? "Unsuspend" : "Suspend"}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => deleteUser(item.id)}
                        disabled={currentUser === item.id.toString()}
                        className={
                              currentUser === item.id.toString()
                              ? `cursor-not-allowed opacity-50 ${theme.textFaint}`
                              : theme.deleteText}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${theme.textMuted} text-center`}
                    colSpan={10}
                  >
                    No Users Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}