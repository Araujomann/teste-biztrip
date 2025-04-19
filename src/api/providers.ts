import { api } from "./api";
import { Provider } from "./types";

export const providerService = {
    list: async (): Promise<Provider[]> => {
        const response = await api.get<Provider[]>("/providers");
        return response.data;
    },
};
