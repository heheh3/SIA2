import axios from "axios";
import { createContext, useEffect, useState  } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState (
        JSON.parse(localStorage.getItem("p_username")) || null 
    );

    const login = async (inputs) => {

        const res = await axios.post("http://localhost:5000/login", inputs, {
            withCredentials: true,
        });

        setCurrentUser(res.data)
        console.log(res.data)
            
    };

    useEffect(() => {
        localStorage.setItem("p_username", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value = {{currentUser, login}}>
            {children}
        </AuthContext.Provider>
    );
};

