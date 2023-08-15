import  {styled} from  "styled-components"


export const Container = styled.div`
width:100%;
height:100vh;
display:flex;
`

export const LoginFormContainer = styled.form`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
gap:15px;
width:35vw;
background-color:${(props)=>props.color? props.color: "inherit"};
input{
    border-radius:12px;
    width:429px;
    height:65px;
}
input::placeholder{
    color:#9F9F9F;
    font-size:27px;
    font-weight:700;
    padding-left:10px;
}
button{
    font-size:27px;
    background: #1877F2;
    width:429px;
    height:65px;
    color:white;
    border:inherit;
    border-radius:12px;
}
a{
    font-family:'lato',sans-serif;
    color:white;
    font-size:20px;
}
`
export const LoginMenu = styled.div`
width:65vw;
height:100vh;
background-color: #151515;
display:flex;
align-items:center;
z-index: 1000;
box-shadow: 4px 0px 4px 0px #00000040;
`
export const Slogan = styled.div`
margin-left:100px;
font-family: 'Passion One', cursive;
color:white;
h1{
    font-size:106px;
    font-weight:700;
}
p{
    font-family:'Oswald', sans-serif;
    width:400px;
    font-size:43px;
    line-height:64px;
}
`