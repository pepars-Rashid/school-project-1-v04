'use client'
import React, { createContext, useState } from 'react';  

// Create the UserContext  
export const ClickContext = createContext();  

export const ClickProvider = ({ children }) => {  
    const [clicked, setClicked] = useState(null);  

    const action = () => {  
    setClicked(!clicked)
      // handleAction
    };  

    return (  
        <ClickContext.Provider value={{ clicked, action }}>  
            {children}  
        </ClickContext.Provider>  
    );  
};