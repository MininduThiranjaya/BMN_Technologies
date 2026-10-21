import React, { useState } from "react";
import { Search, Sun, Moon, Menu, User, Edit3, LogOut } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthProvider";
import { endpoints } from "../../api";
import { ApiResponse } from "../../interfaces/ApiResponses";
import { ThemeType } from "../../interfaces/ThemeType";
import { NotificationType } from "../../interfaces/NotificationType";
import Notifications from "../Notification";
import EditProfileModal, { EditProfileFormState } from "../management/EditProfileMode";

interface NavbarProps {
  theme: ThemeType;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  activeView: string;
  onOpenMobileSidebar: () => void;
  notifications: number;
  notificationItems: NotificationType[];
  onNotificationsOpen: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  theme,
  darkMode,
  setDarkMode,
  activeView,
  onOpenMobileSidebar,
  notifications,
  notificationItems,
  onNotificationsOpen,
}) => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  // ProtectedRoute guarantees `user` is non-null by the time this renders.
  const adminUser = user!;

  const [showUserDropdown, setShowUserDropdown] = useState<boolean>(false);
  const [showEditProfile, setShowEditProfile] = useState<boolean>(false);
  const [savingProfile, setSavingProfile] = useState(false);

  // Local form state for the edit-profile modal only — the real profile
  // lives in AuthProvider; this is just a draft until Save is confirmed.
  const [editForm, setEditForm] = useState<EditProfileFormState>({
    userName: adminUser.userName,
    phoneNumber: adminUser.phoneNumber,
  });

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

  const handleEditFormChange = (field: keyof EditProfileFormState, value: string): void => {
    setEditForm((prev:any) => ({ ...prev, [field]: value }));
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

  return (
    <header className={`${theme.panel} shadow-sm border-b ${theme.panelBorder} px-4 sm:px-6 py-4`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onOpenMobileSidebar}
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

          <Notifications
            theme={theme}
            notifications={notifications}
            notificationItems={notificationItems}
            onOpen={onNotificationsOpen}
          />

          <div className="relative">
            <div
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className={`flex items-center space-x-2 cursor-pointer ${theme.hoverRow} px-2 py-1 rounded-lg transition-colors`}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}
              >
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
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}
                      >
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

      <EditProfileModal
        theme={theme}
        show={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        email={adminUser.email}
        editForm={editForm}
        onFieldChange={handleEditFormChange}
        onSave={handleSaveProfile}
        saving={savingProfile}
      />
    </header>
  );
};

export default Navbar;