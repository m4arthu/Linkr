import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { styled } from "styled-components"
import { useNavigate } from "react-router-dom"
import Modal from 'react-modal';
import { RotatingLines } from "react-loader-spinner"

export default function PostComponent(props) {
    console.log(props);
    const [editor, setEditor] = useState(false)
    const [newPost, setNewPost] = useState(props.post)
    const [meta, setMeta] = useState({})
    const [loading, setLoading] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const { id } = JSON.parse(localStorage.getItem('userData'))
    const reference = useRef()
    const [isOpen, setIsOpen] = useState(false)


    useEffect(() => {
        axios.get(`https://jsonlink.io/api/extract?url=${(props.articleUrl)}`)
            .then(res => {
                setMeta(res.data)
                console.log(res.data)
            })
            .catch((e) => {
                console.log(e)
            })
        reference.current?.focus()
        reference.current?.select()
    }, [editor])

    function resetFunction() {
        document.getElementById(`edit${props.id}`).reset()
        setEditor(false)
    }

    function handleEnter(e) {
        setDisabled(true)
        e.preventDefault()
        axios.patch(`${process.env.REACT_APP_API_URL}/post/${props.id}`, { newPost }, { headers: { Authorization: `Bearer ${token}` } })
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

    function likePost(id) {
        console.log(id);
        console.log(token);
    }

    return (
        <PostContainer>
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
                        Are you sure you want to delete this post?
                        <div>
                            <button onClick={() => setIsOpen(false)}>No, go back</button>
                            <button onClick={deletePost}>
                                Yes, delete it
                            </button>
                        </div>
                    </>}
            </Modal>
            <div className="direita">
                <Imagem>
                    <img onClick={() => navigate(`/user/${props.userId}`)} src={props.picture} alt="" />
                </Imagem>
                <div onClick={() => likePost(props.id)}>
                    <ion-icon name="heart-outline"></ion-icon>
                    <span>{props.num_likes} likes</span>
                </div>
            </div>
            <div className="esquerda">
                <h2 onClick={() => navigate(`/user/${props.userId}`)}>{props.username}</h2>
                {editor ?
                    (<SCform id={`edit${props.id}`}>
                        <SCinput ref={reference} disabled={disabled} defaultValue={props.post} onKeyDown={e => (e.keyCode === 13 && !e.shiftKey ? handleEnter(e) : (e.keyCode === 27 ? resetFunction() : ''))} onChange={e => setNewPost(e.target.value)} />
                    </SCform>) : (<h3>{props.post}</h3>)}
                <div className="card">
                    <div className="card-details">
                        <h2>{meta.title}</h2>
                        <p>{meta.description}</p>
                        <a href={props.articleUrl}>{props.articleUrl}</a>
                    </div>
                    {<img src={meta.images ? meta.images[0] : ""} alt="Imagem da Matéria" />}

                </div>
                {id === props.userId ?
                    <OwnerOptions>
                        <IconEdit form={`edit${props.id}`} type={editor ? 'reset' : ''} onClick={() => editor ? setEditor(false) : openEditor()} editor={editor}>
                            <i className="dashicons dashicons-edit"></i>
                        </IconEdit>
                        <IconDelete onClick={() => setIsOpen(true)}>
                            <i className="dashicons dashicons-trash"></i>
                        </IconDelete>
                    </OwnerOptions> : ''
                }
            </div>

        </PostContainer>
    )
}
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
            h2{
                margin-bottom: 10px;
            }
            p{
                font-size: 14px;        
            }
            .card-details{
                border-radius:12px 0px 0px 12px;
                border:1px solid gray;
                border-right:inherit;
                padding: 10px 0 10px 10px;

                a{
                    text-decoration: none;
                     font-size:14px;
                     color:inherit;
                }
            }

        }
    }

    @media(max-width: 770px){
        width: 100%;
        border-radius: 0;
    }
`