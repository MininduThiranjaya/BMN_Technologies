import { useEffect, useState } from "react";
import { User, Search } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { endpoints } from "../api";
import { UserIssue } from "../interfaces/Common_Interfaces";

export default function CustomerComplains() {
  const [userIssues, setUserIssues] = useState<UserIssue[]>([])
  const [filteredComplain, setFilteredComplain] = useState<UserIssue[]>([])

  const fetchUserIssuesInform = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      await axios
        .get(endpoints.contactUs.getAllIssues, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res: any) => {
          setUserIssues(res.data);
          setFilteredComplain(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.error("Failed to fetch count details", err);
    }
  };

  const makeAction = async (id: number) => {
    let fromData = { id: id };

    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No token found");
      return;
    }
    await axios
      .put(endpoints.contactUs.getAction, fromData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("Changing action success...");
        fetchUserIssuesInform();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Changing action not success...");
      });
  };

  useEffect(() => {
    fetchUserIssuesInform();
  }, []);

  function searchForComplain(char: string) {
    console.log(char)
    if(!char) {
      setFilteredComplain(userIssues)
      return
    }
    const searchData = userIssues.filter((item) => (
      item.phoneNumber?.startsWith(char) || item.email?.startsWith(char)
    ))
    console.log(searchData)
    setFilteredComplain(searchData)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          Customer Complain
        </h3>

        {/* Search */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            onChange={(e) => searchForComplain(e.target.value)}
            type="text"
            placeholder="Email or Phone Number"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        {/* <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      <Plus className="w-4 h-4" />
                      <span>New Sale</span>
                    </button> */}
      </div>

      <div className="w-full max-h-[500px] overflow-y-scroll">
        <table className="w-full table-fixed border-collapse">
          <thead className="bg-gray-50 sticky top-0 z-10">
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {filteredComplain ? (
              filteredComplain.map((item, index) => (
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
                    {new Date(item.createdAt).toLocaleString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: 'numeric',
                      minute: 'numeric',
                      second: 'numeric',
                      hour12: true
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => makeAction(item.id)}
                    >
                      {item.action ? "Solved" : "Pending"}
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
                  No User Issue Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
