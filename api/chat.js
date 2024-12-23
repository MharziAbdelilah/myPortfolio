import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const response = await axios.post('https://api.together.xyz/v1/chat/completions', 
      req.body,
      {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'authorization': `Bearer 22e8322ece41ffc9161823963becb85234b69d8241e3395ef544d8a5e8cb6d80`
        }
      }
    );
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('API error:', error.response?.data || error.message);
    return res.status(500).json({ error: error.response?.data || error.message });
  }
}
