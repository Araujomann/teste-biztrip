import { useQuery } from "@tanstack/react-query";
import { credentialService } from "../api/credentials";

export const useCredentials = () => {
    return useQuery({
        queryKey: ["credentials"],
        queryFn: credentialService.list,
    });
};
