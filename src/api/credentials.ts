import { api } from "./api";
import { Credential, CredentialParameter, ProviderFields } from "./types";

export const credentialService = {
    list: async (): Promise<Credential[]> => {
        const response = await api.get("/credentials");
        return response.data.data.map((cred: Credential) => ({
            ...cred,
            credential_values: cred.credential_values,
        }));
    },

    create: async (
        provider: string,
        data: Record<string, string>
    ): Promise<Credential> => {
        const response = await api.post(`/credentials/providers/${provider}`, {
            credential_values: JSON.stringify(data),
        });
        return {
            ...response.data,
            credential_values: data,
        };
    },

    getById: async (id: string): Promise<Credential> => {
        const response = await api.get<Credential>(`/credentials/${id}`);
        return {
            ...response.data,
            credential_values: JSON.parse(response.data.credential_uuid),
        };
    },
    

    update: async (
        id: string,
        data: Record<string, string>
    ): Promise<Credential> => {
        const response = await api.put(`/credentials/${id}`, {
            credential_values: JSON.stringify(data),
        });
        return {
            ...response.data,
            credential_values: data,
        };
    },

    toggleStatus: async (
        id: string,
        action: "active" | "inactive"
    ): Promise<Credential> => {
        const response = await api.patch(`/credentials/${id}/${action}`);
        return response.data;
    },

    getProviderParameters: async (
        provider: string
    ): Promise<ProviderFields> => {
        const response = await api.get<CredentialParameter>(
            `/credentials/providers/${provider}/parameters`
        );
        return JSON.parse(response.data.credential_parameter_uuid);
    },
};
