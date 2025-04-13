import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function UserProfile() {
  const router = useRouter()
  const { username } = router.query // this captures the username in the URL
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!username) return // Wait until the username is available from the router

    // Fetch user data from your backend (replace with your API endpoint)
    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/getUserData?username=${username}`)
        const data = await res.json()

        if (res.ok) {
          setUserData(data)
        } else {
          setError('User not found')
        }
      } catch (err) {
        setError('Error fetching user data')
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [username]) // Re-run the effect when the username changes

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div>
      <h1>{userData.username}'s Profile</h1>
      <img src={userData.avatar_url} alt={`${userData.username}'s avatar`} />
      <p>ID: {userData.discord_id}</p>
      <p>Username: {userData.username}</p>
      {/* Add more info as needed */}
    </div>
  )
}
