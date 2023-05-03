import { createContext, useState, useEffect } from "react";

let UserContext = createContext('');

export const UserContextProvider = ({children}) => {

    let [isLogged, setIsLogged] = useState(false)

    useEffect(()=>{
        (localStorage.getItem('accessToken')) ? setIsLogged(true) : null
    }, []);
    
    return (
        <UserContext.Provider value={{isLogged, setIsLogged}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext