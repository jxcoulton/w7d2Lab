const express = require("express");
const { appendFile } = require("fs");
const path = require("path");
const Rollbar = require("rollbar");

let rollbar = new Rollbar({
	accessToken: "",
	captureUncaught: true,
	captureUnhandledRejections: true,
});

const app = express();

app.use(express.json());
app.use("/style", express.static("./public/styles.css"));

const port = process.env.PORT || 4545;

appendFile.use(rollbar.errorHandler());

appendFile.listen(port, () => {
	console.log(`Started on ${port}`);
});
