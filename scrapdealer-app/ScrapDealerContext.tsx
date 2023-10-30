// OrderContext.js
import React, {createContext, ReactNode, useContext, useState} from 'react';
import {ScrapDealer} from "./Types";

type ScrapDealerContextType = {
    scrapDealer: ScrapDealer;
    setScrapDealer: React.Dispatch<React.SetStateAction<ScrapDealer>>;
};

// Create the context
export const ScrapDealerContext = createContext<ScrapDealerContextType | undefined>(undefined);

export const useScrapDealer = (): ScrapDealerContextType => {
    const context = useContext(ScrapDealerContext);
    if (!context) {
        throw new Error('useUser must be used within an UserProvider');
    }
    return context;
}

type ScrapDealerProviderProps = {
    children: ReactNode;
};

export const ScrapDealerProvider: React.FC<ScrapDealerProviderProps> = ({ children }) => {
    const [scrapDealer, setScrapDealer] = useState<ScrapDealer>({
        id: "",
        address: "",
        dateOfBirth: undefined,
        firstName: "",
        lastName: "",
        phone: "",
        dateCreated: undefined,
        dateLastUpdated: undefined
    });

    return (
        <ScrapDealerContext.Provider value={{ scrapDealer, setScrapDealer }}>
            {children}
        </ScrapDealerContext.Provider>
    );
};
