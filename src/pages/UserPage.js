import { styled } from "styled-components";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import PostComponent from "../components/PostComponent";
import FollowButton from "../components/FollowButton";
import TrendsContainer from "../components/TrendContainer";

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


    return (
        <>
            <NavBar click={clicked} setClick={setClicked} />
            <ContainerHome>
                <Timeline>
                <ContainerHeader>
                    <h1>{username}'s posts</h1>
                    {data.id !== parseInt(id) && <FollowButton id={id} username={username} data={data} />}
                  </ContainerHeader>
                    <Posts>
                        {posts.length > 0 ? posts.map(post => {
                                return (
                                    <PostComponent setRefresh={setRefresh} userId={post.userId} username={post.username} picture={post.picture} articleUrl={post.articleUrl} trends={post.trends_array} likes={post.num_likes} post={post.post} num_likes={post.num_likes} id={post.id} />
                                )
                            })
                            : <>There are no posts yet</>}
                    </Posts>

                </Timeline>
                <TrendsContainer trends={trends} />

            </ContainerHome>
        </>
    )
}

const ContainerHome = styled.div`
    padding-top:72px;
    height:100vh;
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

    @media(max-width: 770px){
        width:100vw;
    }
`
const ContainerHeader = styled.div`
    width: 95vw;
    max-width: calc(100% + 301px);
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    padding-left: 15px;

  button {
    font-family: Lato;
    width: 112px;
    height: 31px;
    background-color: #1877f2;
    color: #fff;
    border-radius: 5px;
    font-size: 14px;
    margin-bottom: 15px;

  }
  @media (max-width: 770px){
        width: 100%;
        margin-top: 100px;
        button{
            margin-right: 20px;
        }
    }
`

const Posts = styled.ul`
    height:100%;
    width:100%;
    display:flex;
    flex-direction:column;
    margin-top: 10px;
`

