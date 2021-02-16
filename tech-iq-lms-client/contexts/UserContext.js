import { createContext, useContext, useState } from "react";

const UserStateContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState([]);
    return (
        <UserStateContext.Provider value={{user}}>{children}</UserStateContext.Provider>
    );
}

// function useUserState() {
//     const context = useContext(UserStateContext);
//     if(context === undefined){
//         throw new Error('useUserState must be used within a UserProvider');
//     }
//     return context;
// }

export { UserProvider, UserStateContext }