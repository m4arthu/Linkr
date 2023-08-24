import { styled } from "styled-components";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PostComponent from "../components/PostComponent";
import TrendsContainer from "../components/TrendContainer";

export default function TimelinePage({click, setClick}) {
    const data = JSON.parse(localStorage.getItem("userData"));
    const [refresh, setRefresh] = useState();
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

    }, [id]);

    console.log(trends);
    console.log(posts);

    return (
        <>
            <NavBar click={click} setClick={setClick}/>
            <ContainerHome onClick={() => setClick(false)}>
                <Timeline>
                    <h1 data-test="hashtag-title">#{hashtag}</h1>
                    <Posts>
                        {posts.length > 0 ? posts.map(post => {
                                return (
                                    <PostComponent setRefresh={setRefresh} userId={post.userId} username={post.username} picture={post.picture} articleUrl={post.articleUrl} trends={post.trends_array} likes={post.num_likes} post={post.post} num_likes={post.num_likes} id={post.id} />
                                )
                            })
                            : <>There are no posts yet</>}
                    </Posts>

                </Timeline>
                <TrendsContainer trends={trends}/>

            </ContainerHome>
        </>
    )
}

const ContainerHome = styled.div`
    padding-top:72px;
    height:100vh;
    width: 100vw;
    display: flex;
    justify-content:center;
    gap: 15px;
`

const Timeline = styled.div`
    padding-top: 60px;
    width:611px;
    height:100%;
    font-family: 'Oswald', sans-serif;
    font-weight:700;
    font-size:43px;
    color: #FFFFFF;
    h1 {
        margin-left: 15px;

    }

    @media(max-width: 770px){
        width:100vw;
    }
`

const Posts = styled.ul`
    height:100%;
    width:100%;
    display:flex;
    flex-direction:column;
    gap: 20px;
    margin-top: 38px;
`