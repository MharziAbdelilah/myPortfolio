require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const path = require('path');
const crypto = require('crypto');

const app = express();

// Advanced Security middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// IP Blocking for suspicious activity
const blockList = new Set();
const suspiciousIPs = new Map();

const detectSuspiciousActivity = (req, res, next) => {
  const clientIP = req.ip;
  if (blockList.has(clientIP)) {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  if (!suspiciousIPs.has(clientIP)) {
    suspiciousIPs.set(clientIP, { count: 1, timestamp: Date.now() });
  } else {
    const data = suspiciousIPs.get(clientIP);
    const timeDiff = Date.now() - data.timestamp;
    
    if (timeDiff < 1000 && data.count > 10) { // More than 10 requests per second
      blockList.add(clientIP);
      return res.status(403).json({ error: 'Access denied due to suspicious activity' });
    }
    
    if (timeDiff > 1000) {
      suspiciousIPs.set(clientIP, { count: 1, timestamp: Date.now() });
    } else {
      data.count++;
      suspiciousIPs.set(clientIP, data);
    }
  }
  next();
};

// Apply enhanced security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", 'https://apis.google.com', 'https://www.googletagmanager.com'],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      imgSrc: ["'self'", 'data:', 'https:', 'blob:'],
      connectSrc: ["'self'", 'https://api.together.xyz', 'https://www.google-analytics.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  crossOriginEmbedderPolicy: { policy: "credentialless" },
  crossOriginOpenerPolicy: { policy: "same-origin" },
  crossOriginResourcePolicy: { policy: "same-site" },
  dnsPrefetchControl: { allow: false },
  frameguard: { action: "deny" },
  hsts: { 
    maxAge: 31536000, 
    includeSubDomains: true, 
    preload: true 
  },
  ieNoOpen: true,
  noSniff: true,
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  xssFilter: true,
  permittedCrossDomainPolicies: { permittedPolicies: "none" }
}));

app.use(limiter);
app.use(detectSuspiciousActivity);
app.use(hpp()); // Prevent HTTP Parameter Pollution
app.use(mongoSanitize()); // Prevent NoSQL Injection
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://mharziabdelilah.com' 
    : 'http://localhost:3000',
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // 24 hours
}));
app.use(express.json({ limit: '10kb' }));

// Add request ID middleware at the top of your middleware chain
app.use((req, res, next) => {
  req.id = crypto.randomUUID();
  next();
});

// Validate request middleware
const validateRequest = (req, res, next) => {
  if (!req.body || !req.body.messages) {
    return res.status(400).json({ error: 'Invalid request format' });
  }
  // Additional validation
  if (!Array.isArray(req.body.messages) || req.body.messages.length === 0) {
    return res.status(400).json({ error: 'Messages must be a non-empty array' });
  }
  next();
};

// Serve static files
app.use(express.static(path.join(__dirname, 'build')));

app.post('/api/chat', validateRequest, async (req, res) => {
  try {
    // Verify API key exists
    if (!process.env.TOGETHER_API_KEY) {
      console.error('Together API key is missing');
      return res.status(500).json({ error: 'API configuration error' });
    }

    const chatRequest = {
      ...req.body,
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",  // Specify the model
      max_tokens: 1000,
      temperature: 0.7,
      top_p: 0.7,
      top_k: 50,
      repetition_penalty: 1,
      stop: ["</s>", "[/INST]"]
    };

    console.log('Sending request to Together API:', chatRequest);

    const response = await axios.post('https://api.together.xyz/v1/chat/completions', 
      chatRequest,
      {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'authorization': `Bearer ${process.env.TOGETHER_API_KEY}`
        },
        timeout: 30000 // 30 second timeout
      }
    );

    console.log('Together API Response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Together API Error:', error.response?.data || error.message);
    if (error.response) {
      // API responded with an error
      res.status(error.response.status).json({
        error: 'API Error',
        message: error.response.data?.error || 'Unknown API error'
      });
    } else if (error.request) {
      // Request was made but no response
      res.status(503).json({
        error: 'Service Unavailable',
        message: 'No response from API server'
      });
    } else {
      // Error in making the request
      res.status(500).json({
        error: 'Internal Error',
        message: error.message
      });
    }
  }
});

// Test Together API connection
app.get('/api/test-together', async (req, res) => {
  try {
    const testMessage = {
      messages: [{
        role: "user",
        content: "Hello, this is a test message."
      }]
    };
    
    const response = await axios.post('https://api.together.xyz/v1/chat/completions', 
      testMessage,
      {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'authorization': `Bearer ${process.env.TOGETHER_API_KEY}`
        },
        timeout: 10000
      }
    );
    res.json({ status: 'success', data: response.data });
  } catch (error) {
    console.error('Together API Test Error:', error.response?.data || error.message);
    res.status(500).json({
      status: 'error',
      message: error.response?.data?.error || error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Add after other middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  // Don't expose error details in production
  if (process.env.NODE_ENV === 'production') {
    res.status(500).json({ 
      error: 'Internal Server Error',
      requestId: req.id // For tracking issues without exposing details
    });
  } else {
    res.status(500).json({ 
      error: err.message,
      stack: err.stack
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Secure server running on port ${PORT}`);
});
