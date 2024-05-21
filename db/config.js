const mongoose = require('mongoose')
let mongoUrl = process.env.DB_URI
let dbName = process.env.DB_NAME

const mongoconnectshell = "mongodb+srv://nitinkumarja2003:nlwNr6pAoAeslyB7@test-pg-db.k11i3xm.mongodb.net/?retryWrites=true&w=majority"

// mongoose.connect(mongoUrl + dbName, {
mongoose.connect(mongoconnectshell + dbName, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,
    serverSelectionTimeoutMS: 10000, // Set server selection timeout
    socketTimeoutMS: 45000 // Set socket timeout
})
    .catch(error => console.log(error))
    // .then(() => console.log('database successfully connected ', mongoUrl + dbName))
    .then(() => console.log('database successfully connected ', mongoconnectshell))


//     mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000 });
// mongoose.connection.on('error', (err) => {
//   console.error('MongoDB connection error:', err);
//   setTimeout(() => {
//     mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000 });
//   }, 5000); // Retry after 5 seconds
// });
