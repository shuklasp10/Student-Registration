import mongoose from "mongoose";

const counterSchema = mongoose.Schema({
    _id:String,
    count: {type:'Number', default:0}
});

const IdCounter = mongoose.model('IdCounter',counterSchema);

export default IdCounter;