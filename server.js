require('dotenv').config()
require('./db/config')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser= require('body-parser');
const fileupload = require('express-fileupload'); 
const userRoute = require('./routes/userRoute')
const otpRoute = require('./routes/otpRoute')
const propertyRoute = require('./routes/propertyRoute')
const master = require('./routes/masterRoute')
const questions = require('./routes/questionsRoute')
const address = require('./routes/addressRoute')
const image = require('./routes/imageRoute')
const errorHandler = require('./middleware/errorHandling')

app.use(cors())
app.use(express.json());
app.use(bodyParser.json());
app.use(fileupload({useTempFiles: true}))
// app.use(errorHandler)


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});


app.use('/user', userRoute)
app.use('/otp', otpRoute)
app.use('/property', propertyRoute)
app.use('/master', master)
app.use('/questions', questions)
app.use('/address', address)
app.use('/image', image)

app.get('/', (req, res) => {
    res.json('server start')
    console.log('server start ')
})


const port=process.env.DB_PORT || 4001
var server = app.listen(port,"0.0.0.0", function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})