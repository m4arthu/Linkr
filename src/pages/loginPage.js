import { Container, LoginFormContainer} from "../styledcomponents/style.js"
import { SloganComponent } from "../components/slogan.component.js"
import {Link} from "react-router-dom"
import { useRef,useContext, useState } from "react"
import { authContext } from "../contexts/authContext.js"
export  const  LoginPage = () => {
    const email = useRef(null)
    const password = useRef(null)
    const {login} = useContext(authContext)
    const [buttonState,setButtonState] = useState(false)
    const sendLogin = (e) => {
        e.preventDefault();
        setButtonState(true)
        login(email.current.value, password.current.value,setButtonState)
    }
    return (
        <Container>
            <SloganComponent/>
            <LoginFormContainer onSubmit={sendLogin} color="#333333">
            <input type="text" ref={email} placeholder="e-mail" required/>
                <input type="password" ref={password} placeholder="Password" required/>
                <button disabled={buttonState}>Log In</button>
                <Link to={"/register"}>First time? Create an account!</Link>
            </LoginFormContainer>
        </Container>
    )
}