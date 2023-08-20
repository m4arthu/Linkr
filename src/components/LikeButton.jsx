import axios from 'axios'
import { useEffect, useState } from 'react'
import { FiHeart } from 'react-icons/fi'
import { styled } from 'styled-components'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

export default function LikeButton({ props }) {
  const [countLike, setCountLike] = useState()
  const token = localStorage.getItem('token')
  const [data, setData] = useState()
  const [isLiked, setIsLiked] = useState(false)

  const postId = props.id
  const username = props.username

  const [likedNamesMap, setLikedNamesMap] = useState({})

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/like/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setData(response.data)
        setCountLike(response.data.likes)
        console.log('oque esta vindo do banco', response.data)

        setLikedNamesMap(prevMap => ({
          ...prevMap,
          [postId]: response.data.likedByNames.split(', ')
        }))
      })
      .catch(error => {
        console.error('Erro ao obter a contagem de likes:', error)
      })
  }, [postId])

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

        // Atualiza o mapa de nomes de acordo com a ação de curtir/descurtir
        setLikedNamesMap(prevMap => ({
          ...prevMap,
          [postId]: !isLiked
            ? [...prevMap[postId], username]
            : prevMap[postId].filter(name => name !== username)
        }))
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
  }, [postId])

  function handleCountLike(updatedIsLiked) {
    setCountLike(updatedIsLiked ? countLike + 1 : countLike - 1)
  }

  const namesArray = likedNamesMap[postId] || []

  let displayText = ''

  if (namesArray.length > 0) {
    const isUserLiked = namesArray.includes(username)

    let processedNames = [...namesArray]

    if (isUserLiked) {
      processedNames = processedNames.filter(name => name !== username)
      processedNames.unshift('você')
    }

    if (processedNames.length === 1) {
      displayText = processedNames[0]
    } else if (processedNames.length === 2) {
      displayText = `${processedNames.join(', ')}`
    } else if (processedNames.length > 2) {
      const firstTwoNames = processedNames.slice(0, 2).join(', ')
      displayText = `${firstTwoNames}, and other ${
        processedNames.length - 2
      } people`
    }
  }

  return (
    <div>
      <StyledHeartIcon isLiked={isLiked} onClick={handleLiked} />
      <span id={`my-anchor-element-${postId}`}>{countLike} Likes</span>
      {countLike > 0 && (
        <Tooltip
          anchorSelect={`#my-anchor-element-${postId}`}
          content={displayText}
        />
      )}
    </div>
  )
}

const StyledHeartIcon = styled(FiHeart)`
  width: 20px;
  height: 20px;
  fill: ${props => (props.isLiked ? '#AC0000' : '')};
  color: ${props => (props.isLiked ? '#AC0000' : 'fff')};
`
