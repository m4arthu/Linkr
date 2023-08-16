import { styled } from "styled-components"



export function Navbar() {


    return (
        <Container>
            <h1>linkr</h1>
            <PersonInfo>
                <svg
                    color="#FFFFFF"
                    width="45"
                    height="35"
                    viewBox="0 0 25 20"
                    fill="#FFFFFF"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z"
                        fill="currentColor"
                    />
                </svg>
                <Imagem>
                    <img src="https://static.standard.co.uk/s3fs-public/thumbnails/image/2016/02/17/10/homersimpson1702a.jpg?width=1200&height=1200&fit=crop"
                        alt="Imagem de perfil" />
                </Imagem>

            </PersonInfo>
        </Container>
    )
}



const Container = styled.div`
    width:100vw;
    height:72px;
    background-color:#151515;
    display:flex;
    justify-content:space-between;
    align-items:center;
    h1 {
        font-family: 'Passion One', cursive;
        font-size:49px;
        font-weight:700;
        color: #FFFFFF;
        padding-left: 18px; 
    }
`

const PersonInfo = styled.div`
    display:flex;
    justify-contente:space-between;
    align-items:center;
    svg{
        margin-right:4px;
        font-weight:700;
    
    }
`

const Imagem = styled.div`
    width:53px;
    height:53px;
    border-radius:98px;
    margin-right:18px;
    img{
        width:100%;
        height:100%;
        border-radius:98px;
    }
`

