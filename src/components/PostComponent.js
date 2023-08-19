import axios from "axios"
import { useEffect, useState } from "react"
import { styled } from "styled-components"
import { load } from "cheerio"
import LikeButton from "./LikeButton"
export default function PostComponent(props) {
    console.log(props)
    const [meta, setMeta] = useState({})

    const parseHTML = (html) => {
        const $ = load(html);

        const title = $('meta[property="og:title"]').attr('content');
        const description = $('meta[property="og:description"]').attr('content');
        const image = $('meta[property="og:image"]').attr('content');

        setMeta({
            title, description, image
        })
    }
    console.log(meta)

    useEffect(() => {
        axios.get(`https://cors-anywhere.herokuapp.com/${(props.articleUrl).slice(1, -1)}`)
            .then(res => {
                parseHTML(res.data)
            })
            .catch(console.log)
    }, [])

    return (
        <PostContainer >

            <div className="direita">
                <img src={props.picture} alt="" />
              <LikeButton props={props}/>
            </div>
            <div className="esquerda">
                <h2>{props.username}</h2>
                <h3>{props.post}</h3>
                <div className="card">
                    <h2>{meta.title}</h2>
                    {meta.image && <img src={meta.image} alt="Imagem da Matéria" />}
                    <p>{meta.description}</p>
                    <a href={props.articleUrl}>Leia mais</a>
                </div>

            </div>

        </PostContainer>
    )
}

const Imagem = styled.div`
    height:50px;
    border-radius:100%;
    img{
        margin-top:16px;
        margin-left:18px;
        height:100%;
        border-radius:100%;
    }
`


const PostContainer = styled.li`
    font-family: 'Lato', sans-serif;
    background-color: #171717;
    margin-top:43px;
    height:276px;
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
        gap: 7px;
        :nth-child(1){
            font-weight: 400;
            font-size: 20px;
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