import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { styled } from "styled-components"
import { useNavigate } from "react-router-dom"
import Modal from 'react-modal';
import { RotatingLines } from "react-loader-spinner"
import LikeButton from "./LikeButton";
import {AiOutlineComment} from "react-icons/ai";
import { BsRepeat } from "react-icons/bs";
import {FiSend} from "react-icons/fi"
import CommentComponent from "./CommentComponent";

export default function PostComponent(props) {
    const [editor, setEditor] = useState(false)
    const [newPost, setNewPost] = useState(props.post)
    const [hashArrayPub, setHashArrayPub] = useState([])
    const [meta, setMeta] = useState({})
    const [loading, setLoading] = useState(false)
    const [frase,setFrase] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [commentsArray, setCommentsArray] = useState([])
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const { id, picture } = JSON.parse(localStorage.getItem('userData'))
    const reference = useRef()
    const [isOpen, setIsOpen] = useState(false)
    const [commentsOpened, setCommentsOpened] = useState(false)
    const [repostOpened, setRepostsOpened] = useState(false)
    const [commentText, setCommentText] = useState('')
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        setRefresh(false)
        axios.get(`${process.env.REACT_APP_API_URL}/comment/post/${props.id}`, {headers: {Authorization: `Bearer ${token}`}})
        .then(res => {
            setCommentsArray(res.data)
        })
        .catch(console.log)
    
    }, [editor, commentsOpened, refresh])

    useEffect(() => {
        reference.current?.focus()
        reference.current?.select()
    }, [editor])

    useEffect(() => {
        axios.get(`https://jsonlink.io/api/extract?url=${(props.articleUrl)}`)
            .then(res => {
                setMeta(res.data)
                // console.log(res.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])

    function sendComment(e=''){
        if(e) {e.preventDefault()}
        axios.post(`${process.env.REACT_APP_API_URL}/comment/post/${props.id}`, {comment: commentText}, {headers: {Authorization: `Bearer ${token}`}})
        .then(res => {
            console.log(res.data)
            setCommentText('')
            setRefresh(true)
        })
        .catch(console.log)
    }
    function resetFunction() {
        document.getElementById(`edit${props.id}`).reset()
        setEditor(false)
    }
    function sendPostEditor(e) {
        setDisabled(true)
        e.preventDefault()
        // console.log({ newPost, trends: hashArrayPub })
        axios.patch(`${process.env.REACT_APP_API_URL}/post/${props.id}`, { newPost, trends: hashArrayPub }, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                props.setRefresh(true)
                setEditor(false)
                setDisabled(false)

            })
            .catch(err => {
                console.log(err)
                alert('Houve algum erro em editar o seu post! Tente novamente ou atualize a tela!')
                setDisabled(false)
            })
            .finally(() => {
            })
    }
    function openEditor() {
        setEditor(true);
    }
    function handleText(x){
        setNewPost(x)
        const hashArray =[]
        const str = x
        let rolling = false;
        let iSubstr;
        let fSubstr;
        for(let i=0; i<str.length; i++){
            if (rolling) {
                if ( str[i] === ' ' || str[i] === '.' ||str[i] === ',' ||str[i] === ';' ||str[i] === '!' ||str[i] === '?' ||str[i] === '@' || str[i] === '#'){
                    fSubstr = i
                    rolling = false;
                    hashArray.push (str.substring(iSubstr, fSubstr))
                } else if ( i === str.length - 1){
                    rolling = false;
                    hashArray.push (str.substring(iSubstr))

                }
            }
            if (str[i] === '#'){
                iSubstr = i+1
                rolling = true;
            }
           
        }
        const arraySemDuplicados = hashArray.filter((valor, indice, self) => {
            return self.indexOf(valor) === indice;
          });

        setHashArrayPub(arraySemDuplicados)
    }
    function deletePost() {
        setLoading(true)
        axios.delete(`${process.env.REACT_APP_API_URL}/post/${props.id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                props.setRefresh(true)
                setIsOpen(false)
            })
            .catch(() => {
                alert('Ops! Houve algum erro!')
                setIsOpen(false)
            })
            .finally(() => setLoading(false))
    }

    function repost() {
        setLoading(true)
        axios.post(`${process.env.REACT_APP_API_URL}/timeline/${props.id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                props.setRefresh(true)
                setIsOpen(false)
            })
            .catch(() => {
                alert('Ops! Houve algum erro!')
                setIsOpen(false)
            })
            .finally(() => setLoading(false))
    }

    return (
        <>
        <PostContainer data-test="post">
            <Modal className='Modal' isOpen={isOpen} >
                {loading ?
                    <>
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="1"
                            width="96"
                            visible={true}
                        />
                    </>
                    :
                    <>
                        {frase[0]}
                        <div>
                            <button data-test='cancel' onClick={() => setIsOpen(false)}>No, go back</button>
                            <button data-test='confirm' onClick={frase[1]==='Yes, delete it'?deletePost:repost}>
                                {frase[1]}
                            </button>
                        </div>
                    </>}
            </Modal>

            <div className="direita">
                <Imagem>
                    <img onClick={() => navigate(`/user/${props.userId}`)} src={props.picture} alt="" />
                </Imagem>
                <LikeButton post={props} idLog={id} />

                <CommentBtnContainer data-test="comment-btn" commentsOpened={commentsOpened} onClick={() => commentsOpened ? setCommentsOpened(false) : setCommentsOpened(true)}>
                    <AiOutlineComment size='21px' data-test="comment-btn" />
                    <p data-test="comment-counter">{commentsArray.length} {commentsArray.length === 1 ? 'comment' :'comments'}</p>
                </CommentBtnContainer>

                <RepostBtnContainer repostOpened={repostOpened} onClick={() => {
                    setIsOpen(true)
                    setFrase(['Do you want to re-post this link?','Yes, share!'])
                    repostOpened ? setRepostsOpened(false) : setRepostsOpened(true)}}>
                    <BsRepeat size='21px'/>
                    <p>{props.num_reposts} {props.num_reposts === 1 ? 'repost' :'reposts'}</p>
                </RepostBtnContainer>
            </div>
            <div className="esquerda">
                <h2 data-test="username" onClick={() => navigate(`/user/${props.userId}`)}>{props.username}</h2>
                {editor ?
                    (<SCform id={`edit${props.id}`}>
                        <SCinput data-test='edit-input' ref={reference} disabled={disabled} defaultValue={props.post} onKeyDown={e => (e.keyCode === 13 && !e.shiftKey ? sendPostEditor(e) : (e.keyCode === 27 ? resetFunction() : ''))} onChange={e =>  handleText(e.target.value)} />
                    </SCform>) : (<h3 data-test="description" >{props.post}</h3>)}


                <A data-test="link" href={props.articleUrl} target={'blank'}>
                    <div className="card">
                        <div className="card-details">
                            <div className="primeiro">
                                <h2>{meta.title}</h2>
                                <p>{meta.description}</p>
                                <a href={props.articleUrl}>{props.articleUrl}</a>
                            </div>
                        </div>
                        {<img src={meta.images ? meta.images[0] : ""} alt="Imagem da Matéria" />}

                    </div></A>
                {id === props.userId ?
                    <OwnerOptions>
                        <IconEdit data-test='edit-btn' form={`edit${props.id}`} type={editor ? 'reset' : ''} onClick={() => editor ? setEditor(false) : openEditor()} editor={editor}>
                            <i className="dashicons dashicons-edit"></i>
                        </IconEdit>
                        <IconDelete data-test='delete-btn' onClick={() => {
                            setFrase(['Are you sure you want to delete this post?','Yes, delete it'])
                            setIsOpen(true)}}>
                            <i className="dashicons dashicons-trash"></i>
                        </IconDelete>
                    </OwnerOptions> : ''
                }
            </div>
        </PostContainer>
        {commentsOpened ? 
            <CommentsWindow data-test="comment-box">
                <CommentsContainer>
                    {commentsArray ? 
                    commentsArray.map(x => {
                        return <CommentComponent data-test="comment" followingArray={props.followingArray} picture={x.picture} username={x.username} id={x.id} userId={x.userId} comment={x.comment} owner ={x.owner} />
                    })
                    :
                    <></>}
                </CommentsContainer>
                <form onSubmit={e => sendComment(e)}>
                    <CommentImagem>
                        <img src={picture} />
                    </CommentImagem>
                    <input data-test="comment-input"
                    type='text'
                    placeholder="write a comment..."
                    onChange={x => setCommentText(x.target.value)}
                    value={commentText}/>
                    <FiSend data-test="comment-submit" onClick={() => sendComment()} className='icon' size='20px'/>
                </form>
            </CommentsWindow>
            :
            <></>
        }
        </>
    )
}
const CommentsContainer = styled.div`
    margin-top: 30px;
    height: 230px;
    width: 100%;
    display: flex;
    flex-direction: column-reverse;
`

const CommentsWindow=styled.div`
    width: 611px;
    min-height: 330px;
    background-color: #1E1E1E;
    bottom: -300px;
    left: 0;
    z-index: 0;
    margin-top: -30px;
    border-radius: 16px;
    form{
        width: 100%;
        height: 40px;
        margin-top: 14px;
        position: relative;
    
        input{
            width: 510px;
            height: 100%;
            position: absolute;
            top: 0;
            right: 23px;
            color: #ACACAC;
            background-color:#252525;
            padding-left: 20px;
            padding-right: 50px;
            border-radius: 8px;
            border: 0;
            &::placeholder{
                font-family: Lato;
                font-size: 14px;
                font-style: italic;
                font-weight: 400;
                line-height: normal;
                letter-spacing: 0.7px;

            }
        }
        .icon{
            position: absolute;
            top: 11px;
            right: 39px;
            &:hover{
                cursor: pointer;
            }
        }
        
    }

`

const CommentBtnContainer = styled.div`
    min-width: 120%;
    height: 35px;
    background-color: ${x => x.commentsOpened ? '#252525' : ''};
    border-radius: 10px;
    color: #FFF;
    text-align: center;
    font-family: Lato;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    &:hover{
        cursor: pointer;
    }
`

const RepostBtnContainer = styled.div`
    min-width: 120%;
    height: 35px;
    background-color: ${x => x.repostOpened ? '#252525' : ''};
    border-radius: 10px;
    color: #FFF;
    text-align: center;
    font-family: Lato;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    &:hover{
        cursor: pointer;
    }
`
const SCform = styled.form``
const SCinput = styled.textarea`
    width: 503px;
    height: 44px;
    border-radius: 7px;
    resize: none;
    font-family: Lato;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
    &:disabled{
        color: #ffffff50;
    }
`

const OwnerOptions = styled.div`
position: absolute;
    top: 10px;
    right: 20px;
    display: flex;
    flex-direction: row;
    gap: 8px;
    
    `
const IconDelete = styled.div`
    border-radius: 100%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover{
        cursor: pointer;
        background-color: #ff000050;
        &:active{
            background-color: #ff0000;
        }
    }
`
const IconEdit = styled.div`
   border-radius: 100%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${x => x.editor ? '#0000ff' : ''};
    &:hover{
        cursor: pointer;
        background-color: #0000ff50;
        &:active{
            background-color: #0000ff;
        }
    }
`

const CommentImagem = styled.div`
    box-sizing: border-box;
    height:39px;
    width:39px;
    min-width: 39px;
    overflow: hidden;
    border-radius:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 25px;
    img{    
        height:100%;
        &:hover{
        cursor: pointer;
        }
    }
    `
const Imagem = styled.div`
    box-sizing: border-box;
    height:50px;
    width:50px;
    min-width: 50px;
    overflow: hidden;
    border-radius:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img{    
        height:100%;
        &:hover{
        cursor: pointer;
        }
    }
    `

const PostContainer = styled.li`
    font-family: 'Lato', sans-serif;
    background-color: #171717;
    margin-top:20px;
    width: 611px;
    border-radius: 16px;
    padding: 15px;
    display: flex;
    gap: 20px;
    position:relative;
    z-index: 2;
    img{
         max-width:153px;
         border-radius: 0 12px 12px 0;
    }

    .direita{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
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
        gap: 7px;
        :nth-child(1){
            font-weight: 400;
            font-size: 20px;
            &:hover {
                cursor: pointer;
            }
        }
        :nth-child(2){
            font-weight: 400;
            font-size: 17px;
            color: #C6C6C6;
            span{
                color: white;
                font-weight: 600;
                font-size: 17px;
            }
        }
        .card{
            display:flex;
            height:155px;
            width:503px;
            margin-top:15px;

            .card-details{
                border-radius:12px 0px 0px 12px;
                border:1px solid #4D4D4D;
                border-right:inherit;
                padding: 24px 0px 0px 20px;
                width:350px;

                .primeiro{
                    width:305px;

                    h2{
                        color: #CECECE;
                        font-weight:400;
                        font-family: Lato;
                        font-size:16px;
                    }
                    p{
                        margin-top:6px;
                        font-size: 11px;
                        color:#9B9595;
                        margin-bottom:13px;
                        font-family: Lato;
                        font-weight:400;
                    }
                    a{
                        color: #CECECE;
                        font-family: Lato;
                        text-decoration: none;
                        font-size:11px;
                        font-weight:400;
                    }
                }
            }

        }
    }

    @media(max-width: 770px){
        width: 100%;
        border-radius: 0;
    }
`

const A = styled.a`
    text-decoration: none;
    color:inherit;

`