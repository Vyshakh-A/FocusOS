import React from "react";

export default function ReflectionToast({ show, onWrite }) {
  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-6 bg-white shadow-lg border p-4 rounded-lg w-72 z-50">
      <p className="text-sm mb-2 font-medium">
        You missed yesterday’s reflection.
      </p>
      <button
        onClick={onWrite}
        className="px-3 py-1 bg-indigo-600 text-white text-sm rounded"
      >
        Write now
      </button>
    </div>
  );
}
