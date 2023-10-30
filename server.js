require('dotenv').config()
require('./db/config')
const express = require('express')
const app = express()
const cors = require('cors')
const userRoute = require('./routes/userRoute')
const otpRoute = require('./routes/otpRoute')
// const errorHandler=require('./middleware/errorHandling')

app.use(cors())
app.use(express.json());
// app.use(errorHandler)


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });
  

app.use('/user', userRoute)
app.use('/otp', otpRoute)

app.get('/', (req, res) => {
    res.json('server start')
    console.log('server start ')
})


var server = app.listen(process.env.DB_PORT, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})