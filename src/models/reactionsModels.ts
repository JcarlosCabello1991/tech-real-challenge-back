import { model, Schema, SchemaTypes } from "mongoose";
import Reaction from '../interfaces/gif.interface'

const ReactionSchema = new Schema<Reaction>({
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
const ReactionModel = model<Reaction>("Reaction", ReactionSchema);

export default ReactionModel;