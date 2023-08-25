import { styled } from "styled-components";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import PostComponent from "../components/PostComponent";
import TrendsContainer from "../components/TrendContainer";
import InfiniteScroll from 'react-infinite-scroller';
import LoadMore from "../components/LoadMore";


export default function TimelinePage({click, setClick}) {
    const [refresh, setRefresh] = useState();
    const [trends, setTrends] = useState([]);
    const [posts, setPosts] = useState([]);
    const location = useLocation();
    const params = useParams();
    const [followingArray, setFollowingArray] = useState([])
    const token = localStorage.getItem('token');
    let [page, setPage] = useState(0); 
    const [hasMoreItems, setHasMoreItems] = useState(true);
    const { id } = location.state;
    const { hashtag } = params;

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/followers`, {headers: {Authorization: `Bearer ${token}`}})
            .then(res =>{
                setFollowingArray(res.data)
            })
            .catch(err => console.log(err))
        axios.get(`${process.env.REACT_APP_API_URL}/hashtag`)
             .then(res => setTrends(res.data))
             .catch(err => alert(err.response.data));
        axios.get(`${process.env.REACT_APP_API_URL}/hashtag/${id}?page=${page}`)
             .then(res => {
                setPosts(res.data)
                setHasMoreItems(res.data.length>=10)
            })
             .catch(err => alert(err.response.data));

    }, [id, refresh]);

    function loadMoreItems(){
        console.log(page);
        axios.get(`${process.env.REACT_APP_API_URL}/hashtag/${id}?page=${page}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setPosts([...posts, ...res.data]);
                setHasMoreItems(res.data.length>=10);
                setPage(page+1);
                })
            .catch((err) => {
                alert("An error occured while trying to fetch the posts, please refresh the page")
            })
        
      };

    return (
        <>
            <NavBar click={click} setClick={setClick}/>
            <ContainerHome onClick={() => setClick(false)}>
                <Timeline>
                    <h1 data-test="hashtag-title">#{hashtag}</h1>
                    <Posts>
                    <InfiniteScroll
                            pageStart={0}
                            loadMore={loadMoreItems}
                            hasMore={hasMoreItems}
                            loader={<LoadMore />}
                        >
                            {posts.length > 0 ? posts.map(post => {
                                        return (
                                            <PostComponent followingArray={followingArray} key={post.id} setRefresh={setRefresh} userId={post.userId} username={post.username} picture={post.picture} articleUrl={post.articleUrl} trends={post.trends_array} likes={post.num_likes} post={post.post} num_likes={post.num_likes} num_reposts={post.num_reposts} id={post.id} />
                                        )
                                    })
                                    : <>There are no posts yet</>
                            }
                        </InfiniteScroll>
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
    padding-top: 78px;
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
        margin-top: 60px;

    }
`

const Posts = styled.ul`
    height:100%;
    width:100%;
    display:flex;
    flex-direction:column;
    gap: 20px;
    margin-top: 18px;
`