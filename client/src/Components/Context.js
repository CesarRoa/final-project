import { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export const UserDataProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    return (
    <UserContext.Provider
        value={{
        user, setUser
        }}
    >
    {children}
    </UserContext.Provider>
    );
};
