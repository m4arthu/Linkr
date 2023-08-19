import axios from 'axios'
import { useEffect, useState } from 'react'
import { FiHeart } from 'react-icons/fi'
import { styled } from 'styled-components'

export default function LikeButton({ posts }) {
  const [isLiked, setIsLiked] = useState(false)
  const [countLike, setCountLike] = useState()
  const token = localStorage.getItem('token')

  const postId = posts

  useEffect(() => {
    axios
      .get(`http://localhost:5005/like/${postId}`, {
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
    setIsLiked(!isLiked)
    handleCountLike(!isLiked)
  }

  function handleCountLike(updatedIsLiked) {
    setCountLike(updatedIsLiked ? countLike + 1 : countLike - 1)
  }

  return (
    <div>
      <StyledHeartIcon isLiked={isLiked} onClick={handleLiked} />
      <span onClick={handleCountLike}>{countLike} Likes</span>
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
