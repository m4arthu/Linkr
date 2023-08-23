import axios from 'axios'
import { useEffect, useState } from 'react'

export default function FollowButton({ id }) {
  const [following, setFollowing] = useState(false)
  const [isRequesting, setIsRequesting] = useState(false)

  useEffect(() => {
    setIsRequesting(true)
    axios
      .get(`${process.env.REACT_APP_API_URL}/checkFollow?followedId=${id}`)
      .then(response => setFollowing(response.data.following))
      .catch(err => console.log(err))
      .finally(() => {
        setIsRequesting(false)
      })
  }, [id])

  function handleFollow() {
    if (isRequesting) {
      return
    }

    setIsRequesting(true)
    axios
      .post(`${process.env.REACT_APP_API_URL}/follow`, { followedUserId: id })
      .then(response => {
        if (response.data.message === 'Você começou a seguir o usuário.') {
          return setFollowing(true)
        } else {
          return setFollowing(false)
        }
      })
      .catch(err => {
        console.log(err)
        alert(
          'Não foi possível executar a operação. Tente novamente mais tarde.'
        )
      })
      .finally(() => {
        setIsRequesting(false)
      })
  }

  return (
    <div>
      <button onClick={handleFollow} disabled={isRequesting}>
        {isRequesting ? 'Aguarde...' : following ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  )
}

//
