import mongoose, { Mongoose } from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const MONGO_ATLAS_URI = process.env.DB_URL || "";

function connect(): Promise<Mongoose> {
	return mongoose.connect(MONGO_ATLAS_URI);
}

export default connect;