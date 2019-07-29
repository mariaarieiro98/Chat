var express  = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

var server = require('http').createServer();
var io = require('socket.io')(server);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static('www'));

const port = process.env.PORT;
server.listen(port, () => console.log(`Starting sever at ${port}`));

    io.on("connection", (socket) => {

        console.log("user connected");

        socket.on("user-connected", user => {
            socket.user = user;

            socket.broadcast.emit("users-changed", { user: user, event: "connected"});
        });

        socket.on("message", data => {
            io.emit("message", data);
        });

        socket.on("disconnect", () => {
            io.emit("users-changed" , { user: socket.user, event: "disconnected"});
        });
    });
