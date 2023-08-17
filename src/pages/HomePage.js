import { styled } from "styled-components";
import NavBar from "../components/NavBar";
import { useState } from "react";
import axios from "axios";

export default function HomePage() {
    const data = JSON.parse(localStorage.getItem("userData"));
    const [url, setUrl] = useState();
    const [text, setText] = useState();
    const [clicked,setClicked] = useState(false);

    function publish(e){
        e.preventDefault();

        setClicked(true);
        const token = localStorage.getItem("token");

        const body = {url,text}
        
        axios.post(`${process.env.REACT_APP_API_URL}/timeline`,body,{ headers: { Authorization: `Bearer ${token}` }})
            .then((res)=>{
                setClicked(false);
                setUrl('')
                setText('')
            })
            .catch((err)=>{
                setClicked(false);
                alert('Houve um erro ao publicar seu link')
                
            })
    }

    return (
        <>
            <NavBar />
            <ContainerHome>
                <Timeline>
                    <h1>timeline</h1>
                    <ShareMe>
                        <Imagem>
                            <img src={data.picture} alt="Imagem de perfil"></img>
                        </Imagem>

                        <FormShare onSubmit={(e)=>{publish(e)}}>
                            <label htmlFor="url">What are you going to share today?</label>
                            <input disabled={clicked} type="url" id="url" placeholder='http://...' value={url} onChange={(e) => { setUrl(e.target.value) }} required />
                            <input disabled={clicked} type="text" placeholder='Awesome article about #javascript' value={text} onChange={(e) => { setText(e.target.value) }} required />
                            <Button disabled={clicked} type='submit'>{clicked ? 'Publishing...': 'Publish'}</Button>
                        </FormShare>
                    </ShareMe>
                    <Posts>

                    </Posts>

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

const Timeline = styled.div`
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

const ShareMe = styled.div`
    display:flex;
    margin-top:43px;
    border-radius:16px;
    width:100%;
    height:209px;
    background-color: #FFFFFF;
`

const Imagem = styled.div`
    height:50px;
    border-radius:100%;
    img{
        margin-top:16px;
        margin-left:18px;
        height:100%;
        border-radius:100%;
    }
`

const FormShare = styled.form`
    display: flex;
    width:100%;
    flex-direction: column;
    font-family: 'Lato', sans-serif;
    padding-left:18px;
    label{
        padding-top:21px;
        color: #707070;
        font-size:20px;
        font-weight:300;
    }
    input{
        background-color: #EFEFEF;
        border: 1px solid #EFEFEF;
        width:100%;
        max-width:503px;
        margin-top:5px;
        border-radius:5px;
        padding:5px 13px;
        height:30px;
        font-family: 'Lato', sans-serif;
        font-weight:300;
        font-size:15px;

        &::placeholder{
            
            color: #949494;
        }
    }

    :nth-child(3){
        height:66px;
        padding:8px 0px 40px 13px;
    }

`

const Button = styled.button`
    background-color:#1877F2;
    display:flex;
    justify-content:center;
    align-items:center;
    height:31px;
    max-width:112px;
    border-radius:5px;
    margin: 5px 0px 0px 395px;
    border:none;
    color:#FFFFFF;
    font-size:14px;
    text-align:center;
    font-family: 'Lato', sans-serif;
    font-weight:700;
    `

const Posts = styled.ul`
    height:100%;
    width:100%;
    display:flex;
    flex-direction:column;
`