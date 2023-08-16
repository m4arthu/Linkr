import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { styled } from "styled-components"

export default function NavBar() {

    let [click, setClick] = useState(false);

    const navigate = useNavigate();

    function clickChange() {
        if (click) {
            setClick(false);
        } else{
            setClick(true);
        }
    }

    function Profile() {
        if (click) {
            return(
                <div>
                    <div className="user" onClick={clickChange}>
                        <ion-icon name="chevron-up-outline"></ion-icon>
                        <img src="https://cbissn.ibict.br/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png" />
                    </div>
                    <div className="logout">
                        <span>Logout</span>
                    </div>
                </div>
            )
        } else {
            return(
                <div className="user" onClick={clickChange}>
                    <ion-icon name="chevron-down-outline"></ion-icon>
                    <img src="https://cbissn.ibict.br/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png" />
                </div>
            )
        }
    }

    return(
        <ContainerGeral>
            <h1 onClick={() => navigate('/home')}>linkr</h1>
            <div className="search">
                <input placeholder="Search for people"/>
                <ion-icon name="search"></ion-icon>
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
`