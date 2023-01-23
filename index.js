const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.listen(3000, console.log('SERVIDOR ENCENDIDO'));
app.use('/', require('./src/routes/userRoutes'));
app.use('/', require('./src/routes/loginRoutes'));

app.get('*', (req, res) => res.status(404).send('Page not found'));
