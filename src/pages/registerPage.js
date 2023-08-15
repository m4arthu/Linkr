import { SloganComponent } from "../components/slogan.component"
import { Container, LoginFormContainer } from "../styledcomponents/style"
import {Link} from "react-router-dom"
export const RegisterPage = () => {
    return (
        <Container>
            <SloganComponent />
            <LoginFormContainer color="#333333">
                <input type="text" placeholder="e-mail" />
                <input type="password" placeholder="Password" />
                <input type="text" placeholder="username" />
                <input type="text" placeholder="picture url" />
                <button>Log In</button>
                <Link to={"/"}>Switch back to log in</Link>
            </LoginFormContainer>
        </Container>
    )
}