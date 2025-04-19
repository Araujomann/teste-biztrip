import { api } from "./api";
import { User } from "./types";

export const userService = {
    me: async (): Promise<User> => {
        const response = await api.get<User>("/me");
        return response.data;
    },
};