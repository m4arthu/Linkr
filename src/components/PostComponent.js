import axios from "axios"
import { useEffect, useState } from "react"
import { styled } from "styled-components"
import { load } from "cheerio"
export default function PostComponent(props){
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
        .then(res =>{
            parseHTML(res.data)
        })
        .catch(console.log)
   }, [])

    return (
        <PostContainer>

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
const PostContainer = styled.div`
    display:flex;
    margin-top:43px;
    border-radius:16px;
    width:100%;
    height:276px;
    background-color: #171717;
`