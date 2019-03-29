const express = require('express');
const app = express();
const cors = require('cors')
const axios = require('axios').default;

app.use(cors());

app.get('/', function (req, res) {
  try {
    const {
      apiUrl,
      ...params
    } = req.query;
    axios.get(apiUrl, {
      params,
    }).then((response) => {

      res.json(response.data);
    })
  } catch (error) {
    res.json({
      error: 'there was an error'
    })
  }
});

app.listen(8001, () => {
  console.log('Listening on port 8001')
});
