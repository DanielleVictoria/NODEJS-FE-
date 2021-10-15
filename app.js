const express = require('express');
const server = require('./servers/server');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => console.log(`🔊 Listening to port : ${port}`));