import { createContext } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export const authContext  = createContext()

export const AuthProvider = ({children}) => {
    const login = (email,password,setButtonState) => { 
    
        axios.post(process.env.REACT_APP_API_URL + "/login",
         { email: email, password: password}).then((r)=>{
             localStorage.setItem("token",r.data.token);
             localStorage.setItem("userData",JSON.stringify(r.data.userData))
             setButtonState(false)
             window.location.href = "/timeline"
            }).catch((e)=>{
                setButtonState(false)
            alert(e)
        })
    }
    
    const register = (name,email,password,pictureUrl,setButtonState) => { 
        
        axios.post(process.env.REACT_APP_API_URL + "/register",
        {name,email,password,pictureUrl }).then(()=>{
            setButtonState(false)
            window.location.href = "/"
         }).catch((e)=>{
            setButtonState(false)
            alert(e.response.data)
         })
    }
    return(
        <authContext.Provider value={{login,register}}>
            {children}
        </authContext.Provider>
    )
}
