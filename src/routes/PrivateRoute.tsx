import { Navigate, Outlet } from "react-router-dom";
import { storage } from "../utils/storage";

export function PrivateRoute() {
    
    const token = storage.getToken();
    

    return token ? <Outlet /> : <Navigate to="/login" />;
}