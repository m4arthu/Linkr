import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { styled } from "styled-components"
import axios from "axios";
import { DebounceInput } from "react-debounce-input";

export default function NavBar() {

    const data = JSON.parse(localStorage.getItem("userData"));
    let [click, setClick] = useState(false);
    let [users, setUsers] = useState('');
    let text = '';

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    console.log(token);

    console.log(data)

    function clickChange() {
        if (click) {
            setClick(false);
        } else {
            setClick(true);
        }
    }

    function searchUser(e) {
        text = e.target.value;
        axios.get(`${process.env.REACT_APP_API_URL}/search/${text}`, { headers: { Authorization: `Bearer ${token}` } })
             .then(res => setUsers(res.data))
             .catch(err => alert(err.response.data));
        console.log(text);
    }

    console.log(users)

    function logOut() {
        axios.delete(`${process.env.REACT_APP_API_URL}/logout`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                localStorage.removeItem('userData');
                localStorage.removeItem('token');
                navigate('/');
            })
            .catch(err => alert(err.response.data));
    }

    function Profile() {
        if (click) {
            return (
                <div>
                    <div className="user" onClick={clickChange}>
                        <ion-icon name="chevron-up-outline"></ion-icon>
                        <img src={data.picture} alt="ImagemPerfil" />
                    </div>
                    <div className="logout">
                        <span onClick={logOut}>Logout</span>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="user" onClick={clickChange}>
                    <ion-icon name="chevron-down-outline"></ion-icon>
                    <img src={data.picture} alt="ImagemPerfil"/>
                </div>
            )
        }
    }

    function Pesquisa() {
        if (users != '') {
            return(
                <div cla>
                    {users.map(user => <div>{user.username}</div> )}
                </div>
            )
        }
    }

    return (
        <ContainerGeral>
            <h1 onClick={() => navigate('/timeline')}>linkr</h1>
            <div className="search">
                <DebounceInput
                    minLength={3}
                    debounceTimeout={300}
                    value={text} 
                    onChange={searchUser}
                    placeholder="Search for people and friends"
                />
                <ion-icon name="search"></ion-icon>
                <Pesquisa />
            </div>
            <Profile />
        </ContainerGeral>
    )
}

const ContainerGeral = styled.div`
    height: 72px;
    background-color: #151515;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    position: relative;
    width: 100%;
    h1{
        font-family: 'Passion One', cursive;
        color: white;
        font-size: 50px;
        cursor: pointer;
    }
    .search{
        display: flex;
        align-items: center;
        color: #C6C6C6;
        position: relative;
        ion-icon{
            position: absolute;
            right: 10px;
            font-size: 25px;
            cursor: pointer;
        }
        input{
            font-family:'lato',sans-serif;
            padding: 10px;
            height: 45px;
            width: 563px;
            border-radius: 8px;
            border: none;
            font-size: 15px;
        }
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
        img{
            width: 50px;
            height: 50px;
            border-radius: 100%;
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
        span:hover{
            text-decoration: underline;
            cursor: pointer;
        }
    }
    @media(max-width:400px){
        input{
            width: 350px;
        }
    }
`