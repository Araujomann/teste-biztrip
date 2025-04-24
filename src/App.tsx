import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { LoginPage } from "./pages/login/Login";
import { PrivateRoute } from "./routes/PrivateRoute";
import { Credentials } from "./pages/credentials/Credentials";

export const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginPage />} />

                <Route element={<PrivateRoute />}>
                    <Route
                        path="/credentials"
                        element={<Credentials />}
                    ></Route>
                     <Route
                        path="/credentials/create"
                        element={<Credentials />}
                    ></Route>

                    <Route>

                    </Route>
                </Route>
            </Routes>
        </Router>
    );
};
