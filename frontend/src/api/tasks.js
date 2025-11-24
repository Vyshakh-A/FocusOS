import { apiRequest } from "./index.js";

export const getTasks = (token) => apiRequest('/tasks', 'GET', null, token);
export const createTasks = (task, token) => apiRequest('/tasks', 'POST', task, token);
export const updateTasks = (id, task, token) => apiRequest(`/tasks/${id}`, 'PUT', task, token);
export const deleteTasks = (id, token) => apiRequest(`/tasks/${id}`, 'DELETE', null, token);