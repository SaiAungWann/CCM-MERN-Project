import { createContext } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {

    let user = {name:"Sai Aung Wann" , email:"abc@gmail.com"};

    return  (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    )
    
}
export { AuthContext, AuthContextProvider};
