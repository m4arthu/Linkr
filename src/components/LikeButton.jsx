import axios from 'axios'
import { useEffect, useState } from 'react'
import { FiHeart } from 'react-icons/fi'
import { styled } from 'styled-components'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

export default function LikeButton({ props }) {
  const [countLike, setCountLike] = useState()
  const [likedNames, setLikedNames] = useState()
  const token = localStorage.getItem('token')
  const [data, setData] = useState()
  const [isLiked, setIsLiked] = useState(true)

  const postId = props.id
  const username = props.username
  console.log('props', props)

  console.log('dados que estao vindo da requisicao', data)

  let displayText = ''

  if (likedNames && likedNames.trim() !== '') {
    const namesArray = likedNames.split(',')
    const isUserLiked = namesArray.includes(username)

    const processedNames = namesArray.filter(name => name !== username)

    if (isUserLiked) {
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
  } else {
    displayText = likedNames
  }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/like/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      .then(response => {
        setData(response.data)
        setCountLike(response.data.likes)
        setLikedNames(response.data.likedByNames)
        // setLikedNames(listaDeNomesFake)

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

        if (!likedNames || likedNames.trim() === '') {
          setLikedNames(username)
        } else {
          if (!isLiked) {
            setLikedNames(prevLikedNames => `${username}, ${prevLikedNames}`)
          } else {
            setLikedNames(prevLikedNames =>
              prevLikedNames
                .split(', ')
                .filter(name => name !== username)
                .join(', ')
            )
          }
        }
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
      {countLike > 0 && (
        <Tooltip
          anchorSelect="#my-anchor-element"
          content={`${displayText} `}
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
