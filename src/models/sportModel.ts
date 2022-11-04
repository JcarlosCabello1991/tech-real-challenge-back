import { model, Schema, SchemaTypes } from "mongoose";
import Sports from '../interfaces/gif.interface'

const SportsSchema = new Schema<Sports>({
  typeData: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required:true,
  },
  id: {
    type:String,
    required:false,
  },
  name: {
    type:String,
    required:true,
  }
})
const SportsModel = model<Sports>("Sports", SportsSchema);

export default SportsModel;