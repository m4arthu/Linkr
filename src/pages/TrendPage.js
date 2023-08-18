import { styled } from "styled-components";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import urlMetadata from "url-metadata";

export default function TimelinePage({click, setClick}) {
    const data = JSON.parse(localStorage.getItem("userData"));
    const [trends, setTrends] = useState([]);
    const [posts, setPosts] = useState([]);
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
        axios.get(`${process.env.REACT_APP_API_URL}/hashtag/${id}`)
             .then(res => setPosts(res.data))
             .catch(err => alert(err.response.data));

    }, []);

    console.log(trends);
    console.log(posts);


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
                    <h1># {hashtag}</h1>
                    <Posts>
                        {posts.map(post => 
                            <PostContainer>
                                    <div className="direita">
                                        <img src={post.picture} />
                                        <div>
                                            <ion-icon name="heart-outline"></ion-icon>
                                            <span>{post.num_likes} likes</span>
                                        </div>
                                    </div>
                                    <div className="esquerda">
                                        <h2>{post.username}</h2>
                                        <h3>{post.post} {post.trends_array.trends.map(trend => <span>#{trend} </span>)}</h3>
                                    </div>
                            </PostContainer>
                        )}
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
    gap: 20px;
    margin-top: 43px;
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

const PostContainer = styled.div`
    font-family: 'Lato', sans-serif;
    background-color: #171717;
    border-radius: 16px;
    padding: 15px;
    display: flex;
    gap: 20px;
    .direita{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
        img{
            width: 50px;
            height: 50px;
            border-radius: 100%;
        }
        div{
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 10px;
            font-weight: 400;
            gap: 2px;
            ion-icon{
                font-size: 20px;
            }
        }
    }
    .esquerda{
        display: flex;
        flex-direction: column;
        gap: 10px;
        :nth-child(1){
            font-weight: 400;
            font-size: 20px;
        }
        :nth-child(2){
            font-weight: 400;
            font-size: 15px;
            color: #C6C6C6;
            span{
                color: white;
                font-weight: 600;
                font-size: 15px;
            }
        }
    }
`