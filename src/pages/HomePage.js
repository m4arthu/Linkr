import { styled } from "styled-components";
import NavBar from "../components/NavBar";

export default function HomePage() {
    return (
        <>
            <NavBar />
            <ContainerHome>
                <Timeline>
                    <h1>timeline</h1>
                    <ShareMe></ShareMe>
                    <ul></ul>

                </Timeline>

            </ContainerHome>
        </>
    )
}

const ContainerHome = styled.div`
    background-color: #333333;
    height:100vh;
    display: flex;
    justify-content:center;
`

const Timeline =styled.div`
    padding-top: 78px;
    width:611px;
    height:100%;
    background-color:yellow;
    font-family: 'Oswald', sans-serif;
    font-weight:700;
    font-size:43px;
    color: #FFFFFF;

    @media(max-width: 611px){
        width:100%
    }
`

const ShareMe =styled.div`
    margin-top:43px;
    border-radius:16px;
    width:100%;
    height:209px;
    background-color: #FFFFFF;
`