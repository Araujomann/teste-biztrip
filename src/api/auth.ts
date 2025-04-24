import { storage } from "../utils/storage";
import { api } from "./api";

export const authService = {
    login: async (email: string, password: string) => {
        const response = await api.post("/login", {
            email,
            password,
        });
        storage.saveToken(response.data.token.value);
        return response.data.token;
    },

    logout: () => {
        storage.removeToken();
    },
};