import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/login/Login";
import { PrivateRoute } from "./routes/PrivateRoute";
import { Credentials } from "./pages/credentials/Credentials";

export const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />

                <Route element={<PrivateRoute />}>
                    <Route
                        path="/credentials"
                        element={<Credentials />}
                    ></Route>
                </Route>
            </Routes>
        </Router>
    );
};
