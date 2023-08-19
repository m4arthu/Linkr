import { styled } from "styled-components";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import PostComponent from "../components/PostComponent";

export default function UserPage() {
    const data = JSON.parse(localStorage.getItem("userData"));
    const {id} = useParams()
    const [refresh, setRefresh] = useState();
    const [clicked,setClicked] = useState(false);
    const [trends, setTrends] = useState([]);
    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState('');
    

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/hashtag`)
             .then(res => setTrends(res.data))
             .catch(err => alert(err.response.data));
        axios.get(`${process.env.REACT_APP_API_URL}/user/${id}`)
            .then(res => {
                setPosts(res.data.posts)
                setUsername(res.data.username)
            })
            .catch(console.log)
            .finally(() => setRefresh(false))
    }, [refresh]);

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
            <NavBar click={clicked} setClick={setClicked} />
            <ContainerHome>
                <Timeline>
                    <h1>{username}'s posts</h1>
                    <Posts>
                        {posts.map(x => {
                            return(
                                <PostComponent setRefresh={setRefresh} userId={x.userId} username={x.username} picture={x.picture} articleUrl={x.articleUrl} trends={x.trends_array} likes={x.num_likes} post={x.post} id={x.id}/>
                        )})}
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