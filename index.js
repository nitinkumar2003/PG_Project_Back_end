require('dotenv').config()
require('./db/config')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const userRoute = require('./routes/userRoute')
const otpRoute = require('./routes/otpRoute')
const propertyRoute = require('./routes/propertyRoute')
const master = require('./routes/masterRoute')
const questions = require('./routes/questionsRoute')
const address = require('./routes/addressRoute')
const image = require('./routes/imageRoute')
const errorHandler = require('./middleware/errorHandling');


// app.use(cors(corsOptions))

const corsOptions = {
    origin: 'http://localhost:5173', // Your React frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow credentials if needed
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
  };
app.use(cors(corsOptions));  
app.options('*', cors(corsOptions));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(express.json());
app.use(bodyParser.json());
app.use(fileupload({ useTempFiles: true }))
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
    res.json(["Tony", "A", "Lisa", "Michael", "Ginger", "Food"]);
    console.log('server start ')
})

app.get('/test', (req, res) => {
    res.json({ message: "CORS is working!" });
  });

const port = process.env.DB_PORT || 4001
var server = app.listen(port, "::", function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})