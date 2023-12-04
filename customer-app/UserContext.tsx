// OrderContext.js
import React, {createContext, ReactNode, useContext, useState} from 'react';
import {User} from "./Types";

type UserContextType = {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
};

// Create the context
export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within an UserProvider');
    }
    return context;
}

type UserProviderProps = {
    children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User>({
        id: "",
        address: "",
        dateOfBirth: undefined,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateCreated: undefined,
        dateLastUpdated: undefined,
        pushToken: "",
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
