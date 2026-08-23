import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { endpoints } from "../api";
import { Testimonial } from "../interfaces/Testimonial";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

interface CustomerTestimonialsProps {
  darkMode?: boolean;
}

export default function CustomerTestimonials({
  darkMode = false,
}: CustomerTestimonialsProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [userTestimonial, setUserTestimonial] = useState<Testimonial[]>([]);

  // Theme tokens — mirrors the Dashboard / AdminUserRegistration / AdminUserManagement pattern
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
        avatarBg: "bg-white/10",
        successText: "text-green-400",
        actionText: "text-gray-300 hover:text-white",
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
        avatarBg: "bg-gray-200",
        successText: "text-green-600",
        actionText: "text-gray-700 hover:text-gray-900",
      };

  const fetchUserTestimonial = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      await axios
        .get(endpoints.testimonial.get, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res: any) => {
          setUserTestimonial(res.data.object);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.error("Failed to fetch count details", err);
    }
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
      fetchUserTestimonial();
    } catch (err) {
      logout(); // Ensure to log out if fetching fails
      navigate("/");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const makeTestimonialEnableDisable = async (id: number) => {
    let fromData = { id: id };

    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No token found");
      return;
    }
    await axios
      .put(endpoints.testimonial.changeStatus, fromData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("Changing status success...");
        fetchUserTestimonial();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Changing status not success...");
      });
  };

  return (
    <div className="space-y-6">
      <div
        className={`${theme.panel} rounded-lg shadow-sm border ${theme.panelBorder} flex flex-col`}
      >
        <div
          className={`p-6 border-b ${theme.panelBorder} shrink-0 flex items-center justify-between`}
        >
          <h3 className={`text-lg font-semibold ${theme.text}`}>
            User Testimonial
          </h3>
        </div>

        {/* Fixed-size section — table scrolls both vertically and horizontally inside it */}
        <div
          className="overflow-x-auto overflow-y-auto"
          style={{ height: "calc(100vh - 14rem)" }}
        >
          <table className="w-full min-w-[1700px]">
            {/* Table Head */}
            <thead className={`${theme.headBg} sticky top-0 z-10`}>
              <tr>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}
                >
                  Customer Name
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}
                >
                  Company
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}
                >
                  Position
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}
                >
                  Email
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider w-[48rem]`}
                >
                  Testimonial
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}
                >
                  Rating
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}
                >
                  Date
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium ${theme.textMuted} uppercase tracking-wider`}
                >
                  Action
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className={`divide-y ${theme.rowDivide}`}>
              {userTestimonial ? (
                userTestimonial.map((item, index) => (
                  <tr key={index} className={theme.hoverRow}>
                    <td className="px-6 py-4 whitespace-nowrap align-top">
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 ${theme.avatarBg} rounded-full flex items-center justify-center mr-3 shrink-0`}
                        >
                          <User className={`w-4 h-4 ${theme.textMuted}`} />
                        </div>
                        <span className={`text-sm font-medium ${theme.text}`}>
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm ${theme.textSub} align-top`}
                    >
                      {item.company}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${theme.successText} align-top`}
                    >
                      {item.position}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm ${theme.textFaint} align-top`}
                    >
                      {item.email}
                    </td>
                    <td
                      className={`px-6 py-4 text-sm ${theme.textFaint} align-top whitespace-normal break-words leading-relaxed w-[48rem]`}
                    >
                      {item.testimonial}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm ${theme.textFaint} align-top`}
                    >
                      {item.rating}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm ${theme.textFaint} align-top`}
                    >
                      {new Date(item.date).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm align-top">
                      <button
                        onClick={() => makeTestimonialEnableDisable(item.id)}
                        className={theme.actionText}
                      >
                        {item.isAvailable ? "Disable" : "Enable"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${theme.textMuted} text-center`}
                    colSpan={8}
                  >
                    No User Testimonial Available
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
