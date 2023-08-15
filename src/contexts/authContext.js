import { createContext } from "react";


export const authContext  = createContext()

export const authProvider = ({children}) => {
    return(
        <authContext.Provider>
            {children}
        </authContext.Provider>
    )
}