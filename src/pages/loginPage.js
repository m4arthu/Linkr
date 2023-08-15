import { Container, LoginFormContainer} from "../styledcomponents/style.js"
import { SloganComponent } from "../components/slogan.component.js"
import {Link} from "react-router-dom"
export  const  LoginPage = () => {
    return (
        <Container>
            <SloganComponent/>
            <LoginFormContainer color="#333333">
            <input type="text" placeholder="e-mail"/>
                <input type="password" placeholder="Password"/>
                <button>Log In</button>
                <Link to={"/register"}>First time? Create an account!</Link>
            </LoginFormContainer>
        </Container>
    )
}