import React, { createContext, useState } from "react";
import { Auth, AuthContextType } from "../types/interface";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [auth, setAuth] = useState<Auth>({ email: "", roles: [], accessToken: "" });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
