import axios from "axios";
import { createContext, useEffect, useReducer } from "react";

const AuthContext = createContext();

let AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
         
            localStorage.setItem("user", JSON.stringify(action.payload));
            return { user: action.payload };
        case "LOGOUT":
            localStorage.removeItem("user");
            return { user: null };
        default:
            return state;
}
}

const AuthContextProvider = ({ children }) => {

    let [ state , dispatch ] = useReducer( AuthReducer , { user: null } );

    useEffect(() => {
       try{
        // use local storage to store the user login is not save
        // let user = JSON.parse(localStorage.getItem("user"));

        // use cookie to store the user login
        axios.get("/api/users/me").then((res) => {
            let user = res.data;
             if (user) {
            dispatch({ type: "LOGIN", payload: user });
        }else{
            dispatch({ type: "lOGOUT" });
        }
        })
       
       }catch(e){
        console.log(e);
        dispatch({ type: "LOGOUT" });
       }
       
    },[])
    return  (
        <AuthContext.Provider value={ {...state , dispatch}  }>
        {/* // <AuthContext.Provider value={ user  }> */}
            {children}
        </AuthContext.Provider>
    )
    
}

export { AuthContext, AuthContextProvider};
