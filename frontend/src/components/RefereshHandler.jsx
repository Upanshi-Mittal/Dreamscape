import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function RefereshHandler({ setIsAuthenticated }) {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("🔍 Current Path:", location.pathname);
        console.log("🪪 Token found?", token);

        if (token) {
            setIsAuthenticated(true);

            if (["/login", "/signup"].includes(location.pathname)) {
                console.log("✅ Logged in. Redirecting to /final...");
                navigate("/final", { replace: true });
            }
        } else {
            setIsAuthenticated(false);

            // ✅ Redirect ONLY if on a protected route (like "/final")
            if (location.pathname === "/final") {
                console.log("⛔ Not logged in. Redirecting to /login...");
                navigate("/login", { replace: true });
            } else {
                console.log("✅ Public route. No redirect.");
            }
        }
    }, [location.pathname, navigate, setIsAuthenticated]);

    return null;
}

export default RefereshHandler;
