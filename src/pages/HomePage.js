import { styled } from "styled-components";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TimelinePage({click, setClick}) {
    const data = JSON.parse(localStorage.getItem("userData"));
    const [url, setUrl] = useState();
    const [text, setText] = useState();
    const [clicked,setClicked] = useState(false);
    const [trends, setTrends] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/hashtag`)
             .then(res => setTrends(res.data))
             .catch(err => alert(err.response.data));
    }, []);

    console.log(trends);

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

    function TrendsContainer() {
        if (trends.length == 0) {
            return(
                <TrendStyled>
                    <h1>trending</h1>
                </TrendStyled>
            )
        } else {
            return(
                <TrendStyled>
                    <h1>trending</h1>
                    <div>
                        {trends.map(trend => <p onClick={() => navigate(`/hashtag/${trend.trend}`, {state: {id: trend.id}})}># {trend.trend}</p>)}
                    </div>
                </TrendStyled>
            )
        }
    }

    return (
        <>
            <NavBar click={click} setClick={setClick}/>
            <ContainerHome onClick={() => setClick(false)}>
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
                <TrendsContainer />

            </ContainerHome>
        </>
    )
}

const ContainerHome = styled.div`
    height:100vh;
    display: flex;
    justify-content:center;
    gap: 15px;
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

const TrendStyled = styled.div`
    width: 301px;
    background-color: #171717;
    color: white;
    border-radius: 16px;
    margin-top: 160px;
    padding-top: 15px;
    padding-bottom: 15px;
    h1 {
        font-family: 'Passion One', cursive;
        font-size: 27px;
        margin-left: 15px;
    }
    div{
        padding: 15px;
        border-top: 1px solid #484848;
        margin-top: 15px;
    }
    p {
        font-family: Lato;
        font-size: 19px;
        font-weight: 700;
        line-height: 23px;
        letter-spacing: 0.05em;
    }
    p:hover{
        text-decoration: underline;
        cursor: pointer;
    }
`