const express = require("express");
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

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/index.html"));
	rollbar.info("HTML file served sucessfully!");
});

app.get("/error", (req, res) => {
	try {
		errorFunction();
	} catch (error) {
		rollbar.error("errorFunction did not work");
	}
});

app.get("/error", (req, res) => {
	try {
		warningFunction();
	} catch (error) {
		rollbar.warning("warningFunction did not work");
	}
});

app.get("/error", (req, res) => {
	try {
		criticalFunction();
	} catch (error) {
		rollbar.critical("criticalFunction did not work");
	}
});

const port = process.env.PORT || 4545;

app.use(rollbar.errorHandler());

app.listen(port, () => {
	console.log(`Started on ${port}`);
});
