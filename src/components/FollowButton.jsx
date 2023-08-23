import axios from 'axios'
import { useEffect, useState } from 'react'

export default function FollowButton({ id, username, data }) {
  const [following, setFollowing] = useState(false)
  console.log('idddddddddddddddd', id, username)
  console.log('meus dados', data.id)

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/checkFollow?followedId=${id}`)
      .then(response => {
        console.log('foll requisicao', response.data)
        setFollowing(response.data)
      })
      .catch(err => console.log(err))
  }, [])

  function handleFollow() {
    axios
      .post(`${process.env.REACT_APP_API_URL}/follow`, { followedUserId: id })
      .then(response => {
        console.log('dado da requisicao de seguir:', response.data)
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <button onClick={handleFollow}>follow</button>
    </div>
  )
}
