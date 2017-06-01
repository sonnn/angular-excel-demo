const express = require('express');
const app = express();
const setup = require('./setup');

setup(app);

app.listen(process.env.PORT || '3000', () => {
  console.log('Example app listening on port 3000!')
});
