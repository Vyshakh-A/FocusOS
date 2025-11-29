import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function ReflectionPromptModal({
  open,
  onClose,
  isForYesterday = false,
}) {
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  const dateLabel = isForYesterday ? "Yesterday" : "Today";

  const handleSave = async () => {
    setSaving(true);
    try {
      await axiosInstance.put("/reflection/today", {
        content,
        overrideYesterday: isForYesterday,
      });
      onClose();
    } catch (err) {
      console.error("Failed to save reflection:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 w-full max-w-md rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-2">
          {dateLabel}’s Reflection
        </h2>

        <textarea
          className="w-full h-40 p-3 border rounded"
          placeholder={`Write your ${dateLabel.toLowerCase()} reflection...`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-3 py-1 border rounded"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-1 bg-blue-600 text-white rounded"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
