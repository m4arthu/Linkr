import axios from 'axios'
import { useEffect, useState } from 'react'
import { FiHeart } from 'react-icons/fi'
import { styled } from 'styled-components'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

export default function LikeButton({ props }) {
  const [isLiked, setIsLiked] = useState(false)
  const [countLike, setCountLike] = useState()
  const [likedNames, setLikedNames] = useState()
  const token = localStorage.getItem('token')
  const [data, setData] = useState()

  console.log('isLiked', isLiked)

  console.log('props', props.id)

  console.log('dados que estao vindo da requisicao', data)

  const postId = props.id

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/like/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      .then(response => {
        setData(response.data)
        setCountLike(response.data.likes)
        setLikedNames(response.data.likedByNames)

        console.log('reposta da useEffect', response)
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
        setIsLiked(prevIsLiked => !prevIsLiked)
        handleCountLike(!isLiked)
        console.log('reposta da handleLiked', response.data)
        localStorage.setItem(`isLiked_${postId}`, String(!isLiked))
      })
      .catch(error => {
        console.error('Erro ao enviar o like:', error)
      })
  }

  useEffect(() => {
    const storedIsLiked = localStorage.getItem(`isLiked_${postId}`)
    if (storedIsLiked !== null) {
      setIsLiked(storedIsLiked === 'true')
    }
  }, [])

  function handleCountLike(updatedIsLiked) {
    setCountLike(updatedIsLiked ? countLike + 1 : countLike - 1)
  }

  return (
    <div>
      <StyledHeartIcon isLiked={isLiked} onClick={handleLiked} />
      <span id="my-anchor-element">{countLike} Likes</span>
      <Tooltip
        anchorSelect="#my-anchor-element"
        content={`${likedNames} Fulano, Beltrano and other x people`}
      />
    </div>
  )
}

const StyledHeartIcon = styled(FiHeart)`
  width: 20px;
  height: 20px;
  fill: ${props => (props.isLiked ? '#AC0000' : '')};
  color: ${props => (props.isLiked ? '#AC0000' : 'fff')};
`
