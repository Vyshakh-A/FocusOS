import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";



export default function NotesPanel() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState(null);

  const fetchTodayNote = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/notes/today");
      const note = res.data?.note || res.data?.content || null;
      if (note) {
        setContent(note.content || note);
        setSavedAt(note.createdAt || note.updatedAt || new Date().toISOString());
      } else {
        setContent("");
      }
    } catch (err) {

      console.warn("No note found or failed to fetch", err);
      setContent("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodayNote();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      // PUT /notes/today will create or update today's note
      const res = await axiosInstance.put("/notes/today", { content });
      setSavedAt(res.data?.savedAt || new Date().toISOString());
    } catch (err) {
      console.error("Failed to save note", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded border border-slate-100 shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Daily Notes</h3>

      {loading ? (
        <div className="text-sm text-slate-500">Loading...</div>
      ) : (
        <>
          <textarea
            className="w-full h-56 p-3 border border-slate-200 rounded resize-none focus:outline-none"
            placeholder="Quick notes for the day — will reset tomorrow unless saved."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="flex items-center justify-between mt-3">
            <div className="text-xs text-slate-500">
              {savedAt ? `Saved: ${new Date(savedAt).toLocaleString()}` : "Not saved"}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setContent("");
                }}
                className="px-3 py-1 border rounded text-sm"
              >
                Clear
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
