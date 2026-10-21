import React, { useState } from "react";
import { Bell, User, X } from "lucide-react";
import { ThemeType } from "../interfaces/ThemeType";
import { NotificationType } from "../interfaces/NotificationType";

interface NotificationsProps {
  theme: ThemeType;
  notifications: number;
  notificationItems: NotificationType[];
  /** Called when the bell is opened while there's an unread count, so the parent can clear the badge. */
  onOpen: () => void;
}

const Notifications: React.FC<NotificationsProps> = ({
  theme,
  notifications,
  notificationItems,
  onOpen,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAllNotifications, setShowAllNotifications] = useState(false);

  const handleNotificationClick = () => {
    setShowNotifications((prev) => !prev);
    if (notifications > 0) onOpen();
  };

  const handleShowAllNotifications = () => {
    setShowNotifications(false);
    setShowAllNotifications(true);
  };

  const handleCloseAllNotifications = () => setShowAllNotifications(false);

  return (
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
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
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

      {showAllNotifications && (
        <div
          className={`fixed inset-0 ${theme.overlay} flex items-center justify-center z-50 p-4`}
          onClick={handleCloseAllNotifications}
        >
          <div
            className={`${theme.panel} border ${theme.panelBorder} rounded-lg shadow-2xl w-full max-w-2xl max-h-[80vh]`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`flex items-center justify-between p-6 border-b ${theme.panelBorder}`}>
              <h2 className={`text-xl font-semibold ${theme.text}`}>All Notifications</h2>
              <button onClick={handleCloseAllNotifications} className={`p-2 ${theme.hoverRow} rounded-full transition-colors`}>
                <X className={`w-5 h-5 ${theme.textMuted}`} />
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notificationItems.map((notification, i) => (
                <div
                  key={notification.id ?? i}
                  className={`p-4 border-b ${theme.panelBorder} ${theme.hoverRow} transition-colors ${theme.accentBg}`}
                >
                  <div className="flex items-start space-x-4">
                    <User className="w-4 h-4 text-orange-400 mt-1 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${theme.text}`}>{notification.issue}</p>
                      <div className="flex items-center mt-2 space-x-4">
                        <p className={`text-xs ${theme.textFaint}`}>
                          {notification.createdAt.toLocaleString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
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
    </div>
  );
};

export default Notifications;