import { styled } from "styled-components"
export default function PostComponent(props){

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