import { ColorRing } from "react-loader-spinner"
import { styled } from "styled-components"

export default function LoadMore({page}) {
    if (page == 0){
        return(
            <LoadMoreStyled>
                <p>Loading</p>
            </LoadMoreStyled>
        )
    }else{
        return(
            <LoadMoreStyled>
                <ColorRing visible={true} height="80" width="80" ariaLabel="blocks-loading"
                wrapperStyle={{}}  wrapperClass="blocks-wrapper" 
                colors={['#C6C6C6', '#C6C6C6', '#C6C6C6', '#C6C6C6', '#C6C6C6', '#C6C6C6']}/>
                <p>Loading more posts...</p>
            </LoadMoreStyled>
        )
    }
}

const LoadMoreStyled = styled.div`
    display: flex; 
    flex-direction: column;
    color: #C6C6C6;
    font-size:14px;
    font-family: 'Lato', sans-serif;
    font-weight:400;
    align-items: center;
`

