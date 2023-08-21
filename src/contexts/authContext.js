import { createContext } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export const authContext  = createContext()

export const AuthProvider = ({children}) => {
    const navigate = useNavigate()
    const login = (email,password,setButtonState) => { 
    
        axios.post(process.env.REACT_APP_API_URL + "/login",
         { email: email, password: password}).then((r)=>{
             localStorage.setItem("token",r.data.token);
             localStorage.setItem("userData",JSON.stringify(r.data.userData))
             setButtonState(false)
             window.location("/home")
            }).catch((e)=>{
                setButtonState(false)
            alert(e.response.data)
        })
    }
    
    const register = (name,email,password,pictureUrl,setButtonState) => { 
        
        axios.post(process.env.REACT_APP_API_URL + "/register",
        {name,email,password,pictureUrl }).then(()=>{
            setButtonState(false)
            navigate("/")
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
