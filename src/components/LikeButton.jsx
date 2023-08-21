import axios from 'axios'
import { useEffect, useState } from 'react'
import { FiHeart } from 'react-icons/fi'
import { styled } from 'styled-components'

export default function LikeButton({ post }) {
  console.log(post);
  const [isLiked, setIsLiked] = useState(false)
  const [countLike, setCountLike] = useState()
  const token = localStorage.getItem('token')

  const postId = post.id;

  console.log(`postID`, postId)
  console.log(`token`, token)

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
  }, [])

  function handleLiked() {
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
      <StyledHeartIcon isLiked={isLiked} onClick={handleLiked} />
      <span onClick={handleCountLike}>{countLike} {(countLike == 1) ? 'like' : 'likes'}</span>
      {/* <span>0 likes</span> */}
    </div>
  )
}

const StyledHeartIcon = styled(FiHeart)`
  width: 20px;
  height: 20px;
  fill: ${props => (props.isLiked ? '#AC0000' : '')};
  color: ${props => (props.isLiked ? '#AC0000' : 'fff')};
`
