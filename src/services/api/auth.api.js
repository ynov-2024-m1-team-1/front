import api from "./axios.js";

export async function login(data) {
    try {
        const response = await api.post("/auth/login", data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getUser() {
    try {
        const response = await api.get("/users/get/");
        return response.data;
    } catch (error) {
        throw error;
    }
}