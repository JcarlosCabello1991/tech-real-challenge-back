import { model, Schema, SchemaTypes } from "mongoose";
import Gif from '../interfaces/gif.interface'

const GifSchema = new Schema<Gif>({
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
const GifModel = model<Gif>("Gif", GifSchema);

export default GifModel;