// /pages/api/oauth-callback.js
export default async function handler(req, res) {
  const { code, state } = req.query;

  if (!code || !state) {
    return res.status(400).json({ error: 'Missing code or state' });
  }

  try {
    // Step 1: Exchange the code for an access token
    const response = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        code,
        redirect_uri: 'https://internetknown.space/api/oauth-callback',
        grant_type: 'authorization_code',
      }),
    });

    const data = await response.json();
    if (!data.access_token) {
      return res.status(400).json({ error: 'Failed to get access token' });
    }

    // Step 2: Fetch user data from Discord
    const userResponse = await fetch('https://discord.com/api/v10/users/@me', {
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    });

    const user = await userResponse.json();
    if (!user.id) {
      return res.status(400).json({ error: 'Failed to fetch user data' });
    }

    // Step 3: Redirect to config page to set their username
    return res.redirect(`https://internetknown.space/config.html?discord_id=${user.id}&username=${user.username}`);
    
    // Alternatively, directly send them to their profile page
    // return res.redirect(`https://internetknown.space/${user.username}`);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
