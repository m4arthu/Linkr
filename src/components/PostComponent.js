import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { styled } from "styled-components"
import { load } from "cheerio"

import urlMetadata from "url-metadata"
import { useNavigate } from "react-router-dom"

export default function PostComponent(props) {
    const [editor, setEditor] = useState(false)
    const [newPost, setNewPost] = useState(props.post)
    const [meta, setMeta] = useState({})


    const urlMetadata = require('url-metadata')

    urlMetadata(`localhost:5005/proxy?url=www.npmjs.com/package/react-icons`)
        .then((metadata) => {
            console.log('fetched metadata:')
            console.log(metadata)
            // do stuff with the metadata
        },
            (err) => {
                console.log(err)
            })

    /* const parseHTML = (html) => {

    const [disabled, setDisabled] = useState(false)
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const {id} = JSON.parse(localStorage.getItem('userData'))
    const reference = useRef()
    const parseHTML = (html) => {

        const $ = load(html);

        const title = $('meta[property="og:title"]').attr('content');
        const description = $('meta[property="og:description"]').attr('content');
        const image = $('meta[property="og:image"]').attr('content');

        setMeta({
            title, description, image
        })

    } */
    /* console.log(meta) */

    /* useEffect(() => {

    }
    useEffect(() => {
        console.log(props.articleUrl)
        axios.get(`https://jsonlink.io/api/extract?ur1=${(props.articleUrl)}`)
            .then(res => {
                parseHTML(res.data)
            })
            .catch(console.log)

    }, []) */

        
        reference.current?.focus()
        reference.current?.select()
    }, [editor])

    function resetFunction(){
        document.getElementById(`edit${props.id}`).reset()
        setEditor(false)
    }

    function handleEnter(e){
        setDisabled(true)
        e.preventDefault()
        axios.patch(`${process.env.REACT_APP_API_URL}/post/${props.id}`, {newPost}, {headers: {Authorization: `Bearer ${token}`}})
            .then( () => {
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
    function openEditor(){
        setEditor(true); 
    }

    return (
        <PostContainer>

            <div className="direita">
                <Imagem>
                <img onClick={() => navigate(`/user/${props.userId}`)} src={props.picture} alt="" />
                </Imagem>
                <div>
                    <ion-icon name="heart-outline"></ion-icon>
                    <span>{props.num_likes} likes</span>
                </div>
            </div>
            <div className="esquerda">
                <h2 onClick={() => navigate(`/user/${props.userId}`)}>{props.username}</h2>
                {editor ? 
                    (<SCform id={`edit${props.id}`}>
                        <SCinput ref={reference} disabled={disabled} defaultValue={props.post} onKeyDown={e => (e.keyCode === 13 && !e.shiftKey? handleEnter(e) : (e.keyCode === 27 ? resetFunction() : ''))} onChange={e => setNewPost(e.target.value)}/>
                    </SCform>) : (<h3>{props.post}</h3>)}
                <div className="card">
                    <h2>{'titulo'/* meta.title */}</h2>
                    {'imagem'/* meta.image && <img src={meta.image} alt="Imagem da Matéria" /> */}
                    <p>{'descrição'/* meta.description */}</p>

                    <a href={props.articleUrl}>Leia mais</a>
                </div>
            {id === props.userId ?
                (<OwnerOptions>
                    <IconEdit form={`edit${props.id}`} type={editor ? 'reset' : ''} onClick={() => editor ? setEditor(false) : openEditor() } editor={editor}>
                        <i className="dashicons dashicons-edit"></i>
                    </IconEdit>
                    <IconDelete>
                        <i className="dashicons dashicons-trash"></i>
                    </IconDelete>
                </OwnerOptions>)  :  ''
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
    margin-top:43px;
    width: 611px;
    height:276px;
    border-radius: 16px;
    padding: 15px;
    display: flex;
    gap: 20px;
    position: relative;
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
    }
`