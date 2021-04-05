const { default: axios } = require("axios");
const express = require("express");
const port = 8000;

const app = express().use(express.json({ urlencoded: true }));

app.get("/", (req, res) => {
	res.send("Hello World!");
});

let topics = {};
let endpoints = [];

app.post("/subscribe/:topic", (req, res) => {
	if (checkPayload(req.body, { url: "" })) {
		let topic = req.params.topic;
		let url = req.body.url;

		if (endpoints[topic + "subscribers"]) {
			!endpoints[topic + "subscribers"].includes(url)
				? endpoints[topic + "subscribers"].push(url)
				: endpoints[topic + "subscribers"];
		} else {
			endpoints[topic + "subscribers"] = [url];
		}
		topics[topic] = { subscribers: endpoints[topic + "subscribers"] };
		res.json({
			url: url,
			topic: topic,
		});
	} else {
		res.status(400).json({
			message: "Invalid Payload",
		});
	}
});

app.post("/publish/:topic", (req, res) => {
	if (req.body.constructor === {}.constructor) {
		if (topics.hasOwnProperty(req.params.topic)) {
			topics[req.params.topic].subscribers.forEach((element) => {
				axios
					.post(element, {
						topic: req.params.topic,
						data: req.body,
					})
					.then((response) => {
						res.json({
							status_code: 200,
							message: "Publish was successful",
						});
					})
					.catch((err) => {
						res.status(400).json({
							status_code: 400,
							message: "Publish was unsuccessful",
						});
					});
			});
		} else { res.status(400).json({})}
	}
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
	console.log("Publisher service started:::");
});

function checkPayload(payload, expected) {
	for (const property in payload) {
		if (!expected.hasOwnProperty(property)) return 0;
	}
	return true;
}
