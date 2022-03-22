const express = require('express');
const url = require('url');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Test!')
})

app.listen(port, () => {
  console.log(`Listening ${port}`)
})