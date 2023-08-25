import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { styled } from "styled-components"
import axios from "axios";
import { DebounceInput } from "react-debounce-input";

export default function NavBar({click, setClick}) {

    const data = JSON.parse(localStorage.getItem("userData"));
    let [users, setUsers] = useState('');
    let text = '';

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    /* console.log(token);

    console.log(data) */

    function clickChange() {
        if (click) {
            setClick(false);
        } else {
            setClick(true);
        }
    }

    function searchUser(e) {
        text = e.target.value;
        if (text.length >= 3){
            axios.get(`${process.env.REACT_APP_API_URL}/search/${text}`, { headers: { Authorization: `Bearer ${token}` } })
             .then(res => setUsers(res.data))
             .catch(err => alert(err.response.data));
        } else {
            setUsers('');
        }
        /* console.log(text); */
    }

    /* console.log(users) */

    function logOut() {
        axios.delete(`${process.env.REACT_APP_API_URL}/logout`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                localStorage.removeItem('userData');
                localStorage.removeItem('token');
                window.location.reload();
            })
            .catch(err => alert(err.response.data));
    }

    function Profile() {
        if (click) {
            return (
                <div>
                    <div className="user" onClick={clickChange}>
                        <ion-icon name="chevron-up-outline"></ion-icon>
                        <Imagem>
                            <img src={data.picture} alt="ImagemPerfil" data-test="avatar"/>
                        </Imagem>
                    </div>
                    <div className="logout" data-test="menu">
                        <span onClick={logOut} data-test="logout">Logout</span>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="user" onClick={clickChange} >
                    <ion-icon name="chevron-down-outline"></ion-icon>
                    <Imagem>
                            <img src={data.picture} alt="ImagemPerfil" data-test="avatar"/>
                    </Imagem>
                </div>
            )
        }
    }

    function Pesquisa() {
        if (users !== '') {
            return(
                <DivBuscas>
                    {users.map(user =>{ 
                        if (user.seguidor != data.id){
                            return (
                                <div data-test="user-search" onClick={() => navigate(`/user/${user.id}`)}>
                                    <Imagem search={true}><img src={user.picture} alt=''/></Imagem>{user.username}
                                </div> 
                            )
                        } else{
                            return (
                                <div data-test="user-search" onClick={() => navigate(`/user/${user.id}`)}>
                                    <Imagem search={true}><img src={user.picture} alt=''/></Imagem>{user.username}<span>•</span><span>following</span>
                                </div> 
                            )
                        }
                    })}
                </DivBuscas>
            )
        }
    }

    function logClose(){
        if (click == true) {
            setClick(false);
        }
    }

    return (<>
        <ContainerGeral onClick={logClose}>
            <h1 onClick={() => navigate('/timeline')}>linkr</h1>
            <Profile />
        </ContainerGeral>
        <SearchContainer>
        <DebounceInput data-test="search"
            debounceTimeout={300}
            value={text} 
            onChange={searchUser}
            placeholder="Search for people and friends"
        />
        <ion-icon name="search"></ion-icon>
        <Pesquisa />
        </SearchContainer>
        </>
    )
}
const SearchContainer = styled.div`
    box-sizing: border-box;
    position: fixed;
    left: 15vw;
    right: 15vw;
    height: 72px;
    width: 70vw;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #C6C6C6;
    z-index: 10;
    ion-icon{
        margin-left: -40px;
        font-size: 25px;
        cursor: pointer;
        z-index: 11;
    }
    input{
        font-family:'lato',sans-serif;
        padding: 10px;
        height: 45px;
        width: 563px;
        border-radius: 8px;
        border: none;
        font-size: 15px;
        z-index:10;
    }

    @media(max-width: 770px){
        position: absolute;
        top:80px;
        width: 100vw;
        height: 45px;
        z-index: 1;
        left: 0;
        right: 0;

        input{
            width: 100%;
            height: 100%;
            margin-left: -15px;
            z-index: 1;
        }
        ion-icon{
            z-index: 2;

        }
        
    }
`
const Imagem = styled.div`
    box-sizing: border-box;
    height:${x => x.search ? '36px' : '50px'};
    width:${x => x.search ? '36px' : '50px'};
    min-width: ${x => x.search ? '36px' : '50px'};
    overflow: hidden;
    border-radius:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img{    
        height:100%;
    }
    `
const ContainerGeral = styled.div`
    box-sizing: border-box;
    height: 72px;
    background-color: #151515;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
    padding-right: 20px;
    position: fixed;
    top:0;
    left: 0;
    width: 100vw;
    z-index:9;
    h1{
        font-family: 'Passion One', cursive;
        color: white;
        font-size: 50px;
        cursor: pointer;
        z-index: 50;
    }
    
    .user{
        display: flex;
        align-items: center;
        gap: 5px;
        cursor: pointer;
        ion-icon{
            color: #FFFFFF;
            font-size: 30px;
        }
        
    }
    .logout{
        font-family: 'lato';
        font-size: 17px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        height: 47px;
        width: 150px;
        position: absolute;
        right: 0;
        bottom: -47px;
        background-color: #151515;
        border-bottom-left-radius: 20px;
        z-index: 20;
        span:hover{
            text-decoration: underline;
            cursor: pointer;
        }
    }
    @media(max-width: 770px){
        box-sizing: border-box;    
        width: 100vw;

    }
`

const DivBuscas = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    background-color: #E7E7E7;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    width: 563px;
    position: absolute;
    left: calc(50% - 274px);
    top: 40px;
    padding: 20px;
    color: #515151;
    font-family: 'lato';
    font-size: 19px;
    @media (max-width: 770px) {
        width: 100%;
        left: 0;        
    }
    span{
        color: #C5C5C5;
        margin: none;
    }

    >div{
        display: flex;
        align-items: center;
        gap: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 5px;
        border-radius: 15px;
        &:hover{
            cursor: pointer;
            color: black;
            background-color: lightgray;
        &:active{
            background-color: darkgrey;
        }
        }
    }

`