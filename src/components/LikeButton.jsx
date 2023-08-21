import axios from 'axios'
import { useEffect, useState } from 'react'
import { FiHeart } from 'react-icons/fi'
import { styled } from 'styled-components'
import { Tooltip } from 'react-tooltip';


export default function LikeButton({ post, idLog }) {
  const [isLiked, setIsLiked] = useState(false)
  const [countLike, setCountLike] = useState()
  let [text, setText] = useState('');
  let [usersLiked, setUsersLiked] = useState([]);
  const token = localStorage.getItem('token')
  const [liked,setLiked] = useState(false)
  const postId = post.id;

  // console.log(`postID`, postId)
  // console.log(`token`, token)

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/like/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      .then(response => {
        setCountLike(response.data.likes)
      })
      .catch(error => {
        console.error('Erro ao obter a contagem de likes:', error)
      })
      axios.get(`${process.env.REACT_APP_API_URL}/usersliked/${postId}`)
           .then(res => {
              setUsersLiked(res.data)
              res.data.forEach(user => {
                  if (user.userId == idLog){
                    setIsLiked(true);
                    setLiked(true)
                  }
              })
              if (liked) {
                setText('Você');
                for (let i=0; i<res.data.length; i++){
                  if (res.data[i].userId != idLog){
                    setText(text + `, ${res.data[i].username}`);
                    break;
                  }
                }
                if (res.data.length-2 > 0 ){
                  setText(text + ` and other ${res.data.length-2} people`)
                }
              } else{
                if (res.data.length > 0){
                  setText(res.data[0].username);
                  if (res.data.length> 1){
                    setText(text + `, ${res.data[0].username}`);
                    if (res.data.length-2 > 0){
                      setText(text + `and other ${res.data.lenght-2} people`);
                    }
                  }
                }
              }
           })
           .catch(error => console.log(error.message));
  }, [isLiked])

  // console.log(usersLiked);

  function handleLiked() {
    if(!liked){
      setLiked(true)
    } else{
      setLiked(false)
    }
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/post/${postId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .then(response => {
        console.log(`response`, response)
        setIsLiked(!isLiked)
        handleCountLike(!isLiked)
      })
      .catch(error => {
        console.error('Erro ao enviar o like:', error)
      })
  }

  function handleCountLike(updatedIsLiked) {
    setCountLike(updatedIsLiked ? countLike + 1 : countLike - 1)
  }
  return (
    <div>
      <StyledHeartIcon isLiked={isLiked} onClick={handleLiked} data-test="like-btn"/>
      <Tooltip id="my-tooltip" data-test="tooltip"/>
      <span onClick={handleCountLike} data-tooltip-id="my-tooltip" data-tooltip-content={text} data-test="counter" data-test="tooltip">{countLike} {(countLike == 1) ? 'like' : 'likes'}</span>
      {/* <span>0 likes</span> */}
    </div>
  )
}

const StyledHeartIcon = styled(FiHeart)`
  width: 20px;
  height: 20px;
  cursor: pointer;
  fill: ${props => (props.isLiked ? '#AC0000' : '')};
  color: ${props => (props.isLiked ? '#AC0000' : 'fff')};
`
