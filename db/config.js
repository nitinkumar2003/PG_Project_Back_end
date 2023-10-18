const mongoose = require('mongoose')
let mongoUrl = process.env.DB_URI
let dbName = process.env.DB_NAME
mongoose.connect(mongoUrl + dbName, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .catch(error => console.log(error))
    .then(() => console.log('database successfully connected ', mongoUrl + dbName))