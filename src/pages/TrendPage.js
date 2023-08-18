import { styled } from "styled-components";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function TimelinePage() {
    const data = JSON.parse(localStorage.getItem("userData"));
    const [trends, setTrends] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    const { id } = location.state;
    const { hashtag } = params;

    console.log(id);
    console.log(hashtag);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/hashtag`)
             .then(res => setTrends(res.data))
             .catch(err => alert(err.response.data));
    }, []);

    console.log(trends);


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
            <NavBar />
            <ContainerHome>
                <Timeline>
                    <h1># {hashtag}</h1>
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
    font-family: 'Oswald', sans-serif;
    font-weight:700;
    font-size:43px;
    color: #FFFFFF;

    @media(max-width: 611px){
        width:100%
    }
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