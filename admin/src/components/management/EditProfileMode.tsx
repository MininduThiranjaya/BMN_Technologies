import React from "react";
import { X } from "lucide-react";
import { ThemeType } from "../../interfaces/ThemeType";

export interface EditProfileFormState {
  userName: string;
  phoneNumber: string;
}

interface EditProfileModalProps {
  theme: ThemeType;
  show: boolean;
  onClose: () => void;
  email: string;
  editForm: EditProfileFormState;
  onFieldChange: (field: keyof EditProfileFormState, value: string) => void;
  onSave: () => void;
  saving: boolean;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  theme,
  show,
  onClose,
  email,
  editForm,
  onFieldChange,
  onSave,
  saving,
}) => {
  if (!show) return null;

  return (
    <>
      <div className={`fixed inset-0 ${theme.overlay} z-50`} onClick={() => !saving && onClose()} />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className={`${theme.panel} border ${theme.panelBorder} rounded-lg shadow-xl w-full max-w-md`}>
          <div className={`p-6 border-b ${theme.panelBorder} flex items-center justify-between`}>
            <h3 className={`text-lg font-semibold ${theme.text}`}>Edit Profile</h3>
            <button onClick={onClose} className={`${theme.textMuted} hover:${theme.text}`} disabled={saving}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className={`block text-sm font-medium ${theme.textSub} mb-2`}>Full Name</label>
              <input
                type="text"
                value={editForm.userName}
                onChange={(e) => onFieldChange("userName", e.target.value)}
                className={`w-full px-3 py-2 ${theme.inputBg} border ${theme.inputBorder} ${theme.inputText} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${theme.textSub} mb-2`}>Email Address</label>
              <input
                type="email"
                disabled
                value={email}
                className={`w-full px-3 py-2 ${theme.inputBg} border ${theme.inputBorder} ${theme.textFaint} rounded-lg focus:outline-none cursor-not-allowed`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${theme.textSub} mb-2`}>Phone Number</label>
              <input
                type="tel"
                value={editForm.phoneNumber}
                onChange={(e) => onFieldChange("phoneNumber", e.target.value)}
                className={`w-full px-3 py-2 ${theme.inputBg} border ${theme.inputBorder} ${theme.inputText} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            </div>
          </div>

          <div className={`p-6 border-t ${theme.panelBorder} flex space-x-3`}>
            <button
              onClick={onClose}
              disabled={saving}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${theme.cancelBtn} disabled:opacity-60`}
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              disabled={saving}
              className="flex-1 px-4 py-2 text-white rounded-lg transition-colors disabled:opacity-70"
              style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfileModal;