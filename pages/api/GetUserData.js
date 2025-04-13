export default async function handler(req, res) {
    const { username } = req.query
  
    // Example: Fetch user data from a database or another service
    const userData = await getUserFromDatabase(username) // replace with actual data fetching logic
  
    if (userData) {
      res.status(200).json(userData)
    } else {
      res.status(404).json({ error: 'User not found' })
    }
  }
  
  async function getUserFromDatabase(username) {
    // Replace this with real logic (e.g., querying a database)
    const users = {
      miami: { username: 'miami', discord_id: '12345', avatar_url: 'https://example.com/avatar.jpg' }
    }
  
    return users[username] || null
  }
  