import React from "react";

/**
 * Presentational task row. Receives handlers and editing state from parent.
 */
export default function TaskItem({
  task,
  editingTaskId,
  editingText,
  setEditingText,
  setEditingTaskId,
  updating,
  handleUpdateTask,
  handleToggleComplete,
  handleDeleteTask,
}) {
  const isEditing = editingTaskId === task._id;

  return (
    <div className="flex items-center justify-between bg-white p-3 rounded border border-slate-100 shadow-sm">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={!!task.completed}
          onChange={() => handleToggleComplete(task._id)}
          className="mt-1"
        />

        <div>
          {isEditing ? (
            <input
              className="px-2 py-1 border border-slate-200 rounded w-72"
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
            />
          ) : (
            <div>
              <div className={`font-medium ${task.completed ? "line-through text-slate-400" : ""}`}>
                {task.title}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                <span className="inline-block px-2 py-0.5 bg-slate-100 rounded text-slate-600 capitalize">
                  {task.category || "misc"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isEditing ? (
          <>
            <button
              disabled={updating}
              onClick={() => handleUpdateTask(task._id)}
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              {updating ? "Saving..." : "Save"}
            </button>
            <button
              disabled={updating}
              onClick={() => {
                setEditingTaskId(null);
                setEditingText("");
              }}
              className="px-3 py-1 border rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setEditingTaskId(task._id);
                setEditingText(task.title);
              }}
              className="px-3 py-1 border rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteTask(task._id)}
              className="px-3 py-1 text-red-600 border rounded"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
