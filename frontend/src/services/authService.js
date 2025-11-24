const API_URL = "http://localhost:5000/api/auth";

export const register = async (data) => {
    const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        header: {"Content-Type" : "application/json"},
        body: JSON.stringify(data)
    });
    return res.json();
}

export const login = async (data) => {
    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type' : "application/json" },
        body: JSON.stringify(data)
    })
    return res.json();
    
}