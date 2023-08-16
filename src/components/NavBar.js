import { styled } from "styled-components"

export default function NavBar() {
    return(
        <ContainerGeral>
            <h1>linkr</h1>
            {/* <div className="search">
                <input placeholder="Search for people"/>
                <ion-icon name="search"></ion-icon>
            </div> */}
            <div className="user">
                <ion-icon name="chevron-down-outline"></ion-icon>
                <img src="https://cbissn.ibict.br/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png" alt='ImagemPerfil' />
            </div>
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
`