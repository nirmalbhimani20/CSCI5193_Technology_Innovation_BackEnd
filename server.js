var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http');
var cors = require('cors')

const PORT = process.env.PORT  || 3002;


app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(cors())


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept ,  Accept, Accept-Language,  User-Agent"
  );
  res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
  
  next();
});

app.use('/v1' , require('./routes/routes'));
app.use(express.static('upload'));

const https = http.createServer(app);


https.listen(PORT, function() {
 console.log("Server is running at 3000 port!");
});