if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY
const express = require('express')
const axios = require('axios')
const app = express()

app.use(express.json())
app.use(express.static('public'))

app.post('/weather', (req, resp) => {
    const url = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${req.body.latitude},${req.body.longitude}?units=auto`
    axios({
        url: url,
        responseType: 'json'
    }).then((data) => resp.json(data.data.currently))
    //Use axios
})

app.listen(3000, () => {
    console.log('server started')
})