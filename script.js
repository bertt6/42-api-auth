const express = require('express');
const http = require('http');
const axios = require('axios');

const app = express();
const server = http.createServer(app);

const client_id = '';
const client_secret = '';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  next();
});

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ status: 200, message: 'OK!' }));
});

app.get('/api42', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const code = req.query.code;

  // Step 1: Exchange authorization code for access token
  const tokenResponse = await axios.post('https://api.intra.42.fr/oauth/token', {
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: 'http://ip:port/api42',
    client_id: client_id,
    client_secret: client_secret
  });

  const data = await axios.get('https://api.intra.42.fr/v2/me', {
    headers: {
      'Authorization': `Bearer ${tokenResponse.data.access_token}`
    }
  });

  //window.localStorage.setItem('token', tokenResponse.data.access_token);
  //const token = window.localStorage.getItem('token');

  res.send({ status: 200, message: "Başarılı" });
});

server.listen(3000, () => console.log('Server listening on port: http://localhost:3000'));
