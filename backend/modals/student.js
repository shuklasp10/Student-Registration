import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
    _id:Number,
    name:String,
    fname:String,
    dob:String,
    gender:String,
    course:String,
    mobile:String,
    email:String,
    photo:String,
    submitDate: String
})

const Student = mongoose.model('Student',studentSchema);

export default Student;