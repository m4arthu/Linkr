import { styled } from "styled-components";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import PostComponent from "../components/PostComponent";
import TrendsContainer from "../components/TrendContainer";
import InfiniteScroll from 'react-infinite-scroller';
import LoadMore from "../components/LoadMore";

export default function TimelinePage({ click, setClick }) {
    const data = JSON.parse(localStorage.getItem("userData"));
    const picture = data ? data.picture : ''
    const [url, setUrl] = useState();
    const [text, setText] = useState('');
    const [refresh, setRefresh] = useState();
    const [clicked, setClicked] = useState(false);
    const [trends, setTrends] = useState([]);
    const [load, setLoad] = useState(true)
    const [posts, setPosts] = useState([]);
    const [hasMoreItems, setHasMoreItems] = useState(true);
    const [hashArrayPub, setHashArrayPub] = useState([])
    const token = localStorage.getItem('token');
    const [update, setUpdate] = useState(0);
    const [followingArray, setFollowingArray] = useState([])
    let [page, setPage] = useState(0);  
    const [all, setAll] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/followers`, {headers: {Authorization: `Bearer ${token}`}})
        .then(res =>{
            setFollowingArray(res.data)
        })
        .catch(err => console.log(err))

        axios.get(`${process.env.REACT_APP_API_URL}/hashtag`)
        .then(res => setTrends(res.data))
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/timeline?page=${page}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setLoad(false)
                setPosts(res.data)
                setHasMoreItems(res.data.length>=10)
                setRefresh(false)
                })
            .catch((err) => {
                alert("An error occured while trying to fetch the posts, please refresh the page")
            })
        axios.get(`${process.env.REACT_APP_API_URL}/timeline?page=all`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setAll(res.data);
                setInterval(() => updatePosts(res.data.length), 15000);
            })
            .catch((err) => {
                alert("An error occured while trying to fetch the posts, please refresh the page")
            })
    }, [refresh, token]);

    function updatePosts(sizePosts) {
        console.log(sizePosts);
        axios.get(`${process.env.REACT_APP_API_URL}/timeline?page=all`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                if (res.data.length > sizePosts) {
                    setUpdate(res.data.length - sizePosts);
                    setAll(res.data);
                }
            })
            .catch((err) => {
                alert("An error occured while trying to fetch the posts, please refresh the page")
            })
    }

    function handleText(x) {
        setText(x)
        const hashArray = []
        const str = x
        let rolling = false;
        let iSubstr;
        let fSubstr;
        for (let i = 0; i < str.length; i++) {
            if (rolling) {
                if (str[i] === ' ' || str[i] === '.' || str[i] === ',' || str[i] === ';' || str[i] === '!' || str[i] === '?' || str[i] === '@' || str[i] === '#') {
                    fSubstr = i
                    rolling = false;
                    hashArray.push(str.substring(iSubstr, fSubstr))
                } else if (i === str.length - 1) {
                    rolling = false;
                    hashArray.push(str.substring(iSubstr))

                }
            }
            if (str[i] === '#') {
                iSubstr = i+1
                rolling = true;
            }

        }
        const arraySemDuplicados = hashArray.filter((valor, indice, self) => {
            return self.indexOf(valor) === indice;
        });

        setHashArrayPub(arraySemDuplicados)
    }
    function publish(e) {
        e.preventDefault();

        setClicked(true);

        const body = { url, text, trends: hashArrayPub }

        axios.post(`${process.env.REACT_APP_API_URL}/timeline`, body, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setClicked(false);
                setUrl('')
                setText('')
                setRefresh(true)
            })
            .catch((err) => {
                setClicked(false);
                console.log(err)
                alert("There was an error publishing your link")

            })
    }

    function updatePage() {
        console.log(all)
        for (let i=update-1; i>=0; i--){
            setPosts([all[i], ...posts]);
        }
        setUpdate(0);
    }

    function UpdateComponent() {
        console.log(update);
        if (update > 0) {
            return (
                <UpdateStyled onClick={updatePage}  data-test="load-btn">
                    {update} new posts, load more! <ion-icon name="refresh-outline"></ion-icon>
                </UpdateStyled>
            )
        }
        setUpdate(0);
    }
    console.log(posts);
    
  
    function loadMoreItems(){
        console.log(page);
        axios.get(`${process.env.REACT_APP_API_URL}/timeline?page=${page}`, { headers: { Authorization: `Bearer ${token}` } })
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
            <NavBar click={click} setClick={setClick} />
            <ContainerHome onClick={() => setClick(false)}>
                <Timeline>
                    <h1>timeline</h1>
                    <ShareMe data-test="publish-box">
                        <Imagem>
                            <img src={picture} alt="Imagem de perfil"></img>

                        </Imagem>

                        <FormShare onSubmit={(e) => { publish(e) }}>
                            <label htmlFor="url">What are you going to share today?</label>
                            <input disabled={clicked} data-test="link" type="url" id="url" placeholder='http://...' value={url} onChange={(e) => { setUrl(e.target.value) }} required />
                            <input disabled={clicked} data-test="description" type="text" placeholder='Awesome article about #javascript' value={text} onChange={(e) => { handleText(e.target.value) }} />
                            <Button data-test="publish-btn" disabled={clicked} type='submit'>{clicked ? 'Publishing...' : 'Publish'}</Button>
                        </FormShare>
                    </ShareMe>
                    <UpdateComponent />
                    <Posts>
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={loadMoreItems}
                            hasMore={hasMoreItems}
                            loader={<LoadMore/>}
                        >
                            {posts.length > 0 ? posts.map(post => {
                                        return (
                                            <PostComponent followingArray={followingArray} key={post.id} setRefresh={setRefresh} userId={post.userId} username={post.username} picture={post.picture} articleUrl={post.articleUrl} trends={post.trends_array} likes={post.num_likes} post={post.post} num_likes={post.num_likes} num_reposts={post.num_reposts} id={post.id} />
                                        )
                                    })
                                    : <div data-test="message" className="nobody">You don't follow anyone yet. Search for new friends!</div>
                            }
                        </InfiniteScroll>
                    </Posts>

                </Timeline>
                <TrendsContainer trends={trends} />

            </ContainerHome>
        </>
    )
}

const ContainerHome = styled.div`
    padding-top: 72px;
    box-sizing: border-box;
    height:100vh;
    width: 100vw;
    display: flex;
    justify-content:center;
    gap: 15px;

`

const Timeline = styled.div`
    box-sizing: border-box;
    padding-top: 78px;
    width:611px;
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

const ShareMe = styled.div`
    display:flex;
    margin-top:43px;
    border-radius:16px;
    width:100%;
    height:209px;
    background-color: #FFFFFF;
    margin-bottom: 27px;
    @media(max-width: 770px){
        border-radius: 0;
        height: 164px;
    }
`

const Imagem = styled.div`
    box-sizing: border-box;
    height:50px;
    width:50px;
    min-width: 50px;
    overflow: hidden;
    border-radius:100%;
    margin-top:16px;
    margin-left:18px;
    display: flex;
    align-items: center;
    justify-content: center;
    img{    
        height:100%;
    }
    @media(max-width: 770px){
        display: none;
    }
`

const FormShare = styled.form`
    box-sizing: border-box;
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
    @media(max-width: 770px){
        box-sizing: border-box;
        width:100vw;
        padding-left: 5px;
        padding-right: 5px;
        align-items: center;
        label{
            padding-top: 5px;
        }
        input{
            max-width: calc(100% - 10px);
        }
        
    }
`

const Button = styled.button`
    background-color:#1877F2;
    display:flex;
    justify-content:center;
    align-items:center;
    height:31px;
    width:112px;
    border-radius:5px;
    margin: 5px 0px 0px 395px;
    border:none;
    color:#FFFFFF;
    font-size:14px;
    text-align:center;
    font-family: 'Lato', sans-serif;
    font-weight:700;
    @media(max-width: 770px){
        height: 22px;
        margin-top: 5px;
        margin-left: calc(100% - 120px);

    }

    `

const Posts = styled.ul`
    height:100%;
    width:100%;
    display:flex;
    flex-direction:column;
    .nobody{
        font-size: 24px;
        font-weight: 400;
        text-align: center;
    }
`
const UpdateStyled = styled.div`
    width: 100%;
    height: 61px;
    background-color: #1877F2;
    border-radius: 16px;
    font-size:14px;
    font-family: 'Lato', sans-serif;
    font-weight:700;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    ion-icon{
        margin-left: 5px;
        font-size:20px;
    }
`