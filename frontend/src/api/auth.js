import { apiRequest } from "./index.js";

const registerUser = (info) => apiRequest('.auth/register', 'POST', info)
const loginUser = (info) => apiRequest('.auth/login', 'POST', info)