import { createContext } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export const authContext  = createContext()

export const AuthProvider = ({children}) => {
    const navigate = useNavigate()

    const login = (email,password) => { 
    
        axios.post(process.env.REACT_APP_API_URL + "/login",
         { email: email, password: password}).then((r)=>{
             localStorage.setItem("token",r.data.token);
             navigate("/timeline")
            }).catch((e)=>{
            alert(e.response.data)
        })
    }
    
    const register = (name,email,password,pictureUrl) => { 
        axios.post(process.env.REACT_APP_API_URL + "/login",
        {name,email,password,pictureUrl }).then(()=>{
            navigate("/")
         }).catch((e)=>{
            alert(e.response.data)
         })
    }
    return(
        <authContext.Provider value={{login,register}}>
            {children}
        </authContext.Provider>
    )
}