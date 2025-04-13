// /api/oauth-callback.js

export default async function handler(req, res) {
    const code = req.query.code;
  
    if (!code) {
      return res.status(400).json({ error: "Missing code parameter" });
    }
  
    const params = new URLSearchParams();
    params.append("client_id", "1361047871041966311");
    params.append("client_secret", "_5go6FJTCktrkE4OXujaJ16hd48WNSbM");
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "https://internetknown.space/oauth/callback");
  
    try {
      const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      });
  
      const tokenData = await tokenResponse.json();
  
      if (!tokenData.access_token) {
        return res.status(400).json({ error: "Token exchange failed", data: tokenData });
      }
  
      const userResponse = await fetch("https://discord.com/api/users/@me", {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      });
  
      const userData = await userResponse.json();
      return res.status(200).json(userData);
    } catch (err) {
      return res.status(500).json({ error: "OAuth2 flow failed", details: err.message });
    }
  }
  