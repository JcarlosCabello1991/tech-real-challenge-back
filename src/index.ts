import express from "express";
import connect from "./db/db";
import serverApp from "./server";

const StartServer = async () => {
	const app = express();

	connect().then(async function onServerInit() {
		try {
			console.log("DB connected");

			serverApp(app);

			app.listen(process.env.PORT || 4000, () => {
				console.log(`SERVER is Listening at port ${process.env.PORT}`);
			});
		} catch (error) {
			console.log("Error connecting to the DB");
		}
	});
};

StartServer();

