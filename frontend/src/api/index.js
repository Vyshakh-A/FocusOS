const BASE_URL = "http://localhost:5000/api";

export async function apiRequest(path, method = "GET", body = null, token = null) {
    const headers = { "Content-Type" : "application/json" };

    if(token) headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(`${BASE_URL}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null
    });

    const data = await response.json();

    if(!response.ok) throw new Error(data.message || "Request failed");

    return data;
}