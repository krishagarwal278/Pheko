// OrderContext.js
import React, {createContext, ReactNode, useContext, useState} from 'react';
import {Order} from "./Types";

type OrderContextType = {
    order: Order;
    setOrder: React.Dispatch<React.SetStateAction<Order>>;
};

// Create the context
export const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrder = (): OrderContextType => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrder must be used within an OrderProvider');
    }
    return context;
}

type OrderProviderProps = {
    children: ReactNode;
};

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
    const [order, setOrder] = useState<Order>({
        dateCreated: undefined,        //Get date/time when submit is clicked
        dateLastUpdated: undefined,    //Set to same dateCreated
        items: [],
        orderNumber: 0,        //Set in backend comparing to order in db with latest creation date
        price: 0.0,              //Calculate in backend?
        scheduledDateTime: undefined,
        scrapDealerId: "",        //Send as null
        status: "",           //Set to CREATED, when scrap dealer takes it it changes to SCHEDULED
        userId: "",     //Get from state which is set after login
        weights: [],
        address: "",
        notes: ""
    });

    return (
        <OrderContext.Provider value={{ order, setOrder }}>
            {children}
        </OrderContext.Provider>
    );
};
