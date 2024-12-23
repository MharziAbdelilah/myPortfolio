const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const TOGETHER_API_KEY = '22e8322ece41ffc9161823963becb85234b69d8241e3395ef544d8a5e8cb6d80';

app.post('/api/chat', async (req, res) => {
  try {
    const response = await axios.post('https://api.together.xyz/v1/chat/completions', 
      req.body,
      {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'authorization': `Bearer ${TOGETHER_API_KEY}`
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Proxy server error:', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
