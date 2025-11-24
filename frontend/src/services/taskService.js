const API_URL = "http://localhost:5000/api/tasks";

export const getTasks = async (token) => {
    const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return res.json();
};

export const createTask = async (data, token) => {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
         },
        body: JSON.stringify(data)
    })
    return res.json();
};

export const updateTask = async (id, data, token) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    return res.json();
};

export const deleteTask = async (id, token) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers : {
            Authorization: `Bearer ${token}`
        }
    })
    return res.json();
};