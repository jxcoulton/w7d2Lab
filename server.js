const express = require("express");
const path = require("path");
const Rollbar = require("rollbar");

let rollbar = new Rollbar({
	accessToken: "eab81cf23b1445d29e6004d5843c4bf3",
	captureUncaught: true,
	captureUnhandledRejections: true,
});

const students = [];
const app = express();

app.use(express.json());
app.use("/style", express.static("./public/styles.css"));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/index.html"));
	rollbar.info("HTML file served successfully!");
});

app.post("/api/student", (req, res) => {
	let { name } = req.body;
	name = name.trim();
	name = name.toLowerCase();

	const index = students.findIndex((studentName) => studentName === name);

	if (index === -1 && name !== "") {
		students.push(name);
		rollbar.log("Student added successfully", {
			author: "Jayme",
			type: "manual entry",
		});
		res.status(200).send(students);
	} else if (name === "") {
		rollbar.error("No name given");
		res.status(400).send("must provide a name.");
	} else {
		rollbar.error("student already exists");
		res.status(400).send("that student already exists");
	}
});

app.get("/error", (req, res) => {
	try {
		errorFunction();
	} catch (error) {
		rollbar.error("errorFunction did not work");
	}
});

app.get("/warning", (req, res) => {
	try {
		warningFunction();
	} catch (error) {
		rollbar.warning("warningFunction did not work");
	}
});

app.get("/critical", (req, res) => {
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
