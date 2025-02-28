import mongoose from "mongoose";
import { Schema } from "mongoose";

const eventSchema = new Schema(
    {
        name: { type: String , required : true},
        date: { type: Date , required:true},
        userid: { type : String , required : true }, 
        capacity: { type: Number , required : true},
        availableSeats : { type : Number , required : false},
        eventCreation : {type: Date , default : Date.now()}
    },
);

const eventModel = mongoose.models.event || mongoose.model('event' , eventSchema )

export default eventModel;