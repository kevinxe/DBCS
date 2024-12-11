const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const axios = require('axios');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

const allowedOrigins = ['http://localhost:4200', 'http://localhost:8000'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(bodyParser.json());

const API_URL = 'http://users-api:8080/users';

app.post('/login', async (req, res) => {

  const { email, password } = req.body;

  try {
    const response = await axios.get(`${API_URL}?email=${email}`);
    const user = response.data;
    const keyID = "UfCUGEYBV44PilE5NlimI85LkFaC5nxy";

    if (user && await bcrypt.compare(password, user.password)) {
    	
      const token = jwt.sign({ name: user.name, email: user.email }, process.env.JWT_SECRET, { keyid: keyID, expiresIn: '15m' });
      res.json({ token });
    } else {
      res.status(403).send('Acceso no autorizado');
    }
  } catch (error) {
    res.status(500).send('Error en el servidor');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

