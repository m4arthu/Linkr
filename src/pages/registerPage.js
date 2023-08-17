import { useContext, useRef, useState } from "react"
import { SloganComponent } from "../components/slogan.component"
import { Container, LoginFormContainer } from "../styledcomponents/style"
import { Link } from "react-router-dom"
import { authContext } from "../contexts/authContext.js"
export const RegisterPage = () => {
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const picture = useRef(null);
    const { register } = useContext(authContext)
    const [buttonState, setButtonState] = useState(false)

    const sendRegister = (e) => {
        setButtonState(true)
        e.preventDefault()
        register(name.current.value, email.current.value, password.current.value, picture.current.value, setButtonState)
    }
    return (
        <Container>
            <SloganComponent />
            <LoginFormContainer onSubmit={sendRegister} color="#333333">
                <input type="text" ref={email} placeholder="e-mail" required />
                <input type="password" ref={password} placeholder="Password" required />
                <input type="text" ref={name} placeholder="username" required />
                <input type="text" ref={picture} placeholder="picture url" required/>
                <button disabled={buttonState} >Log In</button>
                <Link to={"/"}>Switch back to log in</Link>
            </LoginFormContainer>
        </Container>
    )
}