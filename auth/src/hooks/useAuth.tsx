import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";
import { AuthContextType } from "../types/interface";

const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    useDebugValue(context.auth, auth => (auth.email ? "Logged In" : "Logged Out"));
    return context;
}

export default useAuth;
