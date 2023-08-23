import { useNavigate } from "react-router-dom"
import { styled } from "styled-components"

export default  function TrendsContainer({trends}) {
    const navigate = useNavigate();
    if (trends.length === 0) {
        return (
            <TrendStyled data-test="trending">
                <h1>trending</h1>
            </TrendStyled>
        )
    } else {
        return (
            <TrendStyled data-test="trending">
                <h1>trending</h1>
                <div>
                    {trends.map(trend => <p key={trend.id} onClick={() => navigate(`/hashtag/${trend.trend.slice(1)}`, { state: { id: trend.id } })} data-test="hashtag">#{trend.trend.slice(1)}</p>)}
                </div>
            </TrendStyled>
        )
    }
}

const TrendStyled = styled.div`
    width: 301px;
    background-color: #171717;
    color: white;
    border-radius: 16px;
    margin-top: 160px;
    padding-top: 15px;
    padding-bottom: 15px;
    h1 {
        font-family: 'Passion One', cursive;
        font-size: 27px;
        margin-left: 15px;
    }
    div{
        padding: 15px;
        border-top: 1px solid #484848;
        margin-top: 15px;
    }
    p {
        font-family: Lato;
        font-size: 19px;
        font-weight: 700;
        line-height: 23px;
        letter-spacing: 0.05em;
    }
    p:hover{
        text-decoration: underline;
        cursor: pointer;
    }
    @media(max-width: 770px){
        display:none;
    }
`

