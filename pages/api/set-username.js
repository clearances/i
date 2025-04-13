// /pages/api/set-username.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { username } = req.body;
      const { discord_id } = req.query;  // Assuming discord_id is passed via query
  
      if (!username) {
        return res.status(400).json({ error: 'Username is required' });
      }
  
      // Save the username for the user (in a real app, you'd save this to a database)
      // For example, storing it in a session or database.
      // Here we'll just mock the process.
  
      // Mock saving username and discord_id
      const userProfile = {
        discord_id,
        username,
      };
  
      // Step 2: Redirect to the user profile page
      return res.redirect(`https://internetknown.space/${username}`);
    } else {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  