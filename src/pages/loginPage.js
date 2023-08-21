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
            <input data-test="email" type="text" ref={email} placeholder="e-mail" required/>
                <input data-test="password" type="password" ref={password} placeholder="Password" required/>
                <button data-test="login-btn" disabled={buttonState}>Log In</button>
                <Link data-test="sign-up-link" to={"/sign-up"}>First time? Create an account!</Link>
            </LoginFormContainer>
        </Container>
    )
}