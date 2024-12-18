'use client'
import React, { createContext, useState } from 'react';  

// Create the UserContext  
export const ClickContext = createContext();  

export const ClickProvider = ({ children }) => {  
    const [clicked, setClicked] = useState(false);
    const [postion, setPostion] = useState({pos1:-1, pos2:-1})  

    const action = (state, pos1=-1, pos2=-1) => {  
    setClicked(state)
    setPostion({pos1:pos1 ,pos2:pos2})
    };  

    return (  
        <ClickContext.Provider value={{ clicked, action, postion}}>  
            {children}  
        </ClickContext.Provider>  
    )};