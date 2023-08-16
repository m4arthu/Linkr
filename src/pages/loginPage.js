import { Container, LoginFormContainer} from "../styledcomponents/style.js"
import { SloganComponent } from "../components/slogan.component.js"
import {Link} from "react-router-dom"
import { useRef,useContext } from "react"
import { authContext } from "../contexts/authContext.js"
export  const  LoginPage = () => {
    const email = useRef(null)
    const password = useRef(null)
    const {login} = useContext(authContext)
    const sendLogin = (e) => {
        e.preventDefault();
        login(email.current.value, password.current.value)
    }
    return (
        <Container>
            <SloganComponent/>
            <LoginFormContainer onSubmit={sendLogin} color="#333333">
            <input type="text" ref={email} placeholder="e-mail"/>
                <input type="password" ref={password} placeholder="Password"/>
                <button>Log In</button>
                <Link to={"/register"}>First time? Create an account!</Link>
            </LoginFormContainer>
        </Container>
    )
}