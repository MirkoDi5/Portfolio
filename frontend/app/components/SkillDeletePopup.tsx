import React from "react";
import { useLanguage } from "../context/LanguageContext";

interface SkillDeletePopupProps {
  open: boolean;
  skillName: string;
  loading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const SkillDeletePopup: React.FC<SkillDeletePopupProps> = ({ open, skillName, loading, onCancel, onConfirm }) => {
  const { t } = useLanguage();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 w-full max-w-xs border border-blue-200 dark:border-blue-700 flex flex-col items-center animate-fade-in">
        <div className="text-xl font-bold text-blue-900 dark:text-blue-200 mb-4 text-center">
          {t("deleteSkillConfirm") || "Are you sure you want to delete this skill?"}
        </div>
        <div className="text-zinc-700 dark:text-zinc-200 mb-6 text-center">
          {t("deleteSkillNameRemoved") ? t("deleteSkillNameRemoved").replace("{{name}}", skillName) : `"${skillName}" will be permanently removed from your skills list.`}
        </div>
        <div className="flex gap-4 justify-center">
          <button
            className="px-5 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition"
            onClick={onCancel}
            disabled={loading}
          >
            {t("cancel") || "Cancel"}
          </button>
          <button
            className="px-5 py-2 rounded-lg bg-red-600 text-white font-bold shadow hover:bg-red-700 transition"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? (t("deleting") || "Deleting...") : (t("delete") || "Delete")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillDeletePopup;
