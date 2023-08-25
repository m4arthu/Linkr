import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
export default function CommentComponent(props){
    const [follow, setFollow] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        console.log(props.followingArray)
        props.followingArray?.map(x =>{
        if(props.userId === x.id) {setFollow(true)}
        })}, []
    )
    return (
        <CommentContainer>
            <Imagem >
                <img onClick={() => navigate(`/user/${props.userId}`)} src={props.picture}/>
            </Imagem>
            <h1 onClick={() => navigate(`/user/${props.userId}`)} >{props.username} {props.owner ? <strong>• post's author </strong> : (follow ? <strong>• following </strong>: '')}</h1>
            <p>{props.comment}</p>
        </CommentContainer>
    )
}

const CommentContainer = styled.div`
    width: 100%;
    min-height: 74px;
    height: auto;
    border-bottom: 1px solid #353535;
    position: relative;
    h1{
        width: 530px;
        color: #F3F3F3;
        font-family: Lato;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        position: absolute;
        top: 15px;
        left: 65px;

        &:hover{
            cursor: pointer;
        }
    }
    p{  
        
        width: 530px;
        color: #ACACAC;
        font-family: Lato;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        position: absolute;
        top: 35px;
        left: 82px;

    }
    strong{
        color: #565656;
        font-family: Lato;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }

`

const Imagem = styled.div`
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
    bottom: 16px; 
    background-color: blue;
    img{    
        height:100%;
        &:hover{
        cursor: pointer;
        }
    }
    `