require('dotenv').config();
const http = require('http');
const app = require('./index');
const server = http.createServer(app);

const PORT = 8000 || process.env.PORT
server.listen(PORT, () => console.log('Server is up and running on port: ', PORT))


//create a server object:
// http.createServer(function (req, res) {
//     //write a response to the client
//      //end the response
//   }).listen(8080); //the server object listens on port 8080

// const server = http.createServer(app);
// server.listen(process.env.PORT);
