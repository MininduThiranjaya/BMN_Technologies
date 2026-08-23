import { useEffect, useState } from "react";
import { User, Search, CheckCircle2 } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { endpoints } from "../api";

export interface SolarAssessment {
  id: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  location: string;
  propertyType: string;
  monthlyElectricityBill: string | null;
  interestedSolution: string;
  message: string;
  action: number; // 0 = pending, 1 = solved
  available?: number; // 1 = not read yet, 0 = read
  createdAt: string | null;
  updatedAt: string | null;
}

interface UserSolarAssessmentProps {
  darkMode?: boolean;
}

export default function UserSolarAssessment({ darkMode = false }: UserSolarAssessmentProps) {
  const [assessments, setAssessments] = useState<SolarAssessment[]>([])
  const [filteredAssessments, setFilteredAssessments] = useState<SolarAssessment[]>([])
  const [confirmReadTarget, setConfirmReadTarget] = useState<SolarAssessment | null>(null)

  // Theme tokens — mirrors the CustomerComplains / AdminUserManagement pattern
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
        hoverRow: "hover:bg-white/5",
        inputBg: "bg-black/20",
        inputBorder: "border-white/10",
        inputText: "text-white",
        placeholder: "placeholder-gray-500",
        iconColor: "text-gray-500",
        avatarBg: "bg-white/10",
        successText: "text-green-400",
        actionText: "text-gray-300 hover:text-white",
        modalOverlay: "bg-black/60",
        modalPanel: "bg-[#111827] border-white/10",
        modalIconBg: "bg-green-500/10",
        modalIconColor: "text-green-400",
        primaryBtn: "bg-blue-500 text-white hover:bg-blue-600",
        secondaryBtn: "bg-white/10 text-gray-200 hover:bg-white/20",
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
        hoverRow: "hover:bg-gray-50",
        inputBg: "bg-white",
        inputBorder: "border-gray-300",
        inputText: "text-gray-900",
        placeholder: "placeholder-gray-400",
        iconColor: "text-gray-400",
        avatarBg: "bg-gray-200",
        successText: "text-green-600",
        actionText: "text-gray-700 hover:text-gray-900",
        modalOverlay: "bg-black/30",
        modalPanel: "bg-white border-gray-200",
        modalIconBg: "bg-green-100",
        modalIconColor: "text-green-600",
        primaryBtn: "bg-blue-600 text-white hover:bg-blue-700",
        secondaryBtn: "bg-gray-100 text-gray-700 hover:bg-gray-200",
      };

  const fetchAssessments = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      await axios
        .get(endpoints.solarAssessment.getAllAssessments, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res: any) => {
          setAssessments(res.data);
          setFilteredAssessments(res.data)
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
      .put(endpoints.solarAssessment.setAction, fromData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("Changing action success...");
        fetchAssessments();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Changing action not success...");
      });
  };

  const markAsRead = async (id: number) => {
    let fromData = { id: id };

    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No token found");
      return;
    }
    await axios
      .put(endpoints.solarAssessment.markAsRead, fromData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("Marking as read success...");
        fetchAssessments();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Marking as read not success...");
      });
  };

  const confirmMarkAsRead = () => {
    if (!confirmReadTarget) return;
    markAsRead(confirmReadTarget.id);
    setConfirmReadTarget(null);
  };

  useEffect(() => {
    fetchAssessments();
  }, []);

  function searchForAssessment(char: string) {
    console.log(char)
    if(!char) {
      setFilteredAssessments(assessments)
      return
    }
    const searchData = assessments.filter((item) => (
      item.phoneNumber?.startsWith(char) || item.email?.startsWith(char)
    ))
    console.log(searchData)
    setFilteredAssessments(searchData)
  }

  return (
    <div className="space-y-6">
      <div className={`${theme.panel} rounded-lg shadow-sm border ${theme.panelBorder} flex flex-col`}>
        <div className={`p-6 border-b ${theme.panelBorder} shrink-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4`}>
          <h3 className={`text-lg font-semibold ${theme.text}`}>
            Solar Assessment Requests
          </h3>

          {/* Search */}
          <div className="relative w-full sm:w-auto">
            <Search className={`w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 ${theme.iconColor}`} />
            <input
              onChange={(e) => searchForAssessment(e.target.value)}
              type="text"
              placeholder="Email or Phone Number"
              className={`w-full sm:w-64 pl-10 pr-4 py-2 ${theme.inputBg} border ${theme.inputBorder} ${theme.inputText} ${theme.placeholder} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
          </div>
        </div>

        {/* Fixed-size section — table scrolls both vertically and horizontally inside it */}
        <div
          className="overflow-x-auto overflow-y-auto"
          style={{ height: "calc(100vh - 14rem)" }}
        >
          <table className="w-full min-w-[2100px]">
            {/* Table Head */}
            <thead className={`${theme.headBg} sticky top-0 z-10`}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
                  Customer Name
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
                  Phone Number
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
                  Email Address
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
                  Location
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
                  Property Type
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
                  Monthly Bill
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
                  Interested Solution
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider w-[48rem]`}>
                  Message
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
                  Inform Date
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
                  Action
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}>
                  Read Status
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className={`divide-y ${theme.rowDivide}`}>
              {filteredAssessments ? (
                filteredAssessments.map((item, index) => (
                  <tr key={index} className={theme.hoverRow}>
                    <td className="px-6 py-4 whitespace-nowrap align-top">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 ${theme.avatarBg} rounded-full flex items-center justify-center mr-3 shrink-0`}>
                          <User className={`w-4 h-4 ${theme.textMuted}`} />
                        </div>
                        <span className={`text-sm font-medium ${theme.text}`}>
                          {item.fullName}
                        </span>
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme.textSub} align-top`}>
                      {item.phoneNumber}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${theme.successText} align-top`}>
                      {item.email}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme.textFaint} align-top`}>
                      {item.location || 'N/A'}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme.textFaint} align-top capitalize`}>
                      {item.propertyType || 'N/A'}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme.textFaint} align-top`}>
                      {item.monthlyElectricityBill || 'N/A'}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme.textFaint} align-top capitalize`}>
                      {item.interestedSolution?.replace(/_/g, ' ') || 'N/A'}
                    </td>
                    <td className={`px-6 py-4 text-sm ${theme.textFaint} align-top whitespace-normal break-words leading-relaxed w-[48rem]`}>
                      {item.message || 'N/A'}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme.textFaint} align-top`}>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm align-top">
                      <button
                        onClick={() => makeAction(item.id)}
                        className={theme.actionText}
                      >
                        {item.action ? "Completed" : "In Progress"}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm align-top">
                      <button
                        onClick={() => setConfirmReadTarget(item)}
                        disabled={item.available === 0}
                        className={
                          item.available === 0
                            ? `cursor-not-allowed opacity-50 ${theme.textFaint}`
                            : theme.actionText
                        }
                      >
                        {item.available === 0 ? "Reviewed" : "Mark as Read"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${theme.textMuted} text-center`}
                    colSpan={11}
                  >
                    No Solar Assessment Requests Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mark as Read confirmation overlay */}
      {confirmReadTarget && (
        <div
          className={`fixed inset-0 ${theme.modalOverlay} backdrop-blur-sm z-50 flex items-center justify-center p-4`}
          onClick={() => setConfirmReadTarget(null)}
        >
          <div
            className={`relative w-full max-w-sm ${theme.modalPanel} rounded-lg border shadow-lg p-6`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center text-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${theme.modalIconBg}`}>
                <CheckCircle2 className={`w-6 h-6 ${theme.modalIconColor}`} />
              </div>
              <h2 className={`text-lg font-semibold ${theme.text}`}>
                Mark as read?
              </h2>
              <p className={`text-sm ${theme.textMuted}`}>
                This will mark the request from{" "}
                <span className={`font-medium ${theme.textSub}`}>
                  {confirmReadTarget.fullName}
                </span>{" "}
                as reviewed. This can't be undone from here.
              </p>

              <div className="w-full flex flex-row justify-between gap-3 mt-4">
                <button
                  onClick={() => setConfirmReadTarget(null)}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${theme.secondaryBtn}`}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmMarkAsRead}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${theme.primaryBtn}`}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}