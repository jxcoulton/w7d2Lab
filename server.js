const express = require("express");
const { appendFile } = require("fs");
const path = require("path");
const Rollbar = require("rollbar");

let rollbar = new Rollbar({
	accessToken: "eab81cf23b1445d29e6004d5843c4bf3",
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
