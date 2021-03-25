const express = require('express');
const app = express();


app.use('/static', express.static('public'))

app.listen(5050, (req, res) => {
    console.log('server on port 5050')
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
