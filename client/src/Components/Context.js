import { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export const UserDataProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [update, setUpdate] = useState(false)

    return (
    <UserContext.Provider
        value={{
        user, setUser, update, setUpdate
        }}
    >
    {children}
    </UserContext.Provider>
    );
};
