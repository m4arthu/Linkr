import  {styled} from  "styled-components"


export const Container = styled.div`
width:100%;
height:100vh;
display:flex;
@media(max-width:400px){
    flex-direction:column;
}
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
@media(max-width:400px){
    width:100%;
    height:100%;
    justify-content: inherit;
    padding-top:50px;
    input{
        width:330px;
        height:55px;
    }
    button{
        width:330px;
        height:55px;
    }
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
@media(max-width:400px){
    width:100vw;
    height:175px;
}
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
@media(max-width:400px){
    width:100%;
    line-height:50px;
    display:flex;
    flex-direction:column;
    align-items:center;
    padding: 20px 0;
    margin:0 0 0 20px;;
    h1{
        width:167px;
        font-size:76px;
    }
    p{
        line-height:35px;
        width:223px;
        font-size:23px;
    }
}
`