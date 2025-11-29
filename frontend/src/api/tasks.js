import { apiRequest } from "./index.js";

export const getTasks = (token) => apiRequest('/tasks', 'GET', null, token);
export const createTasks = (task, category, token) => apiRequest('/tasks', 'POST', task, category, token);
export const updateTasks = (id, task, token) => apiRequest(`/tasks/${id}`, 'PATCH', task, token);
export const deleteTasks = (id, token) => apiRequest(`/tasks/${id}`, 'DELETE', null, token);