const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mainRouter = require("./src/Routes/main.routes");

// Definations
const app = express();
const WebSocketServer = require("ws");

// Helpers
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database handling
mongoose
	.connect(process.env.DB_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Database Connected"))
	.catch((err) => console.log(err));

mongoose.Promise = global.Promise;

// Websocket server connection

const wss = new WebSocketServer.Server({
	server: app.listen(process.env.HTTP_PORT),
	path: process.env.WSS_PATH,
	host: process.env.WSS_HOST,
	port: process.env.WSS_PORT
});

wss.on("connection", (socket) => {
	console.log("new client connected");
	// sending message
	socket.on("message", (data) => {
		console.log(`Client has sent us: ${data}`);
	});
	// handling what to do when clients disconnects from server
	socket.on("close", () => {
		console.log("the client has connected");
	});
	// handling client connection error
	socket.onerror = function () {
		console.log("Some Error occurred");
	};
});


// ROUTES

// ROUTES: http implementations
app.use("/getrates", mainRouter);

// ROUTES: error handlings

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	res.status(err.status || 404).json({
		message: "No such route exists",
	});
});

// error handler
app.use(function (err, req, res, next) {
	res.status(err.status || 500).json({
		message: "Error Message",
	});
});


app.listen(process.env.HTTP_PORT,()=>console.log("Listening on port: "+process.env.HTTP_PORT));

module.exports = app;
