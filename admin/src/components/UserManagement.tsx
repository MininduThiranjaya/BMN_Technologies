import { useEffect, useState } from "react";
import { User, Search } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { endpoints } from "../api";
import { AdminUser } from "../interfaces/Common_Interfaces";

export default function AdminUserManagement() {
  const [allUsers, setAllUsers] = useState<AdminUser[]>([])
  const [filteredUsers, setFilteredUsers] = useState<AdminUser[]>([])
  const currentUser = localStorage.getItem("userId")

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

  useEffect(() => {
    fetchAllUsers();
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
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          User Management
        </h3>

        {/* Search */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            onChange={(e) => searchForUsers(e.target.value)}
            type="text"
            placeholder="Email / Phone / Name"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="w-[167vh] max-h-[500px] overflow-auto">
        <table className="w-full">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Login
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Updated At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Change Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Work Suspention
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delete User
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers ? (
              filteredUsers.map((item, index) => (
                <tr key={index} className={currentUser === item.id.toString() ? "bg-blue-100" : ""}>
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
                    {item.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    {item.phoneNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    {item.role === "super_admin" ? "Super Admin" : "Admin"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => changeRole(item.id)}
                      disabled={currentUser === item.id.toString()}
                      className={
                            currentUser === item.id.toString()
                            ? "cursor-not-allowed opacity-50"
                            : ""}
                    >
                      {item.role === "admin" ? "Make Super Admin" : "Make Admin"}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => makeSuspention(item.id)}
                      disabled={currentUser === item.id.toString()}
                      className={
                            currentUser === item.id.toString()
                            ? "cursor-not-allowed opacity-50"
                            : ""}
                    >
                      {item.suspended ? "Unsuspend" : "Suspend"}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => deleteUser(item.id)}
                      disabled={currentUser === item.id.toString()}
                      className={
                            currentUser === item.id.toString()
                            ? "cursor-not-allowed opacity-50"
                            : ""}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="flex w-full">
                <td
                  className="w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center"
                  colSpan={6}
                >
                  No Users Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
