import mongoose from "mongoose";
import { defaultQuantities } from "./../data/calories.js";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String
    },
    newMember: {
        type: Boolean,
        default: true
    },
    calories: {
        type: Number,
        default: 2300
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number
    },
    height: {
        type: Number
    },
    weight: {
        type: Number
    },
    gender: {
        type: String,
        enum: ["Female", "Male"],
    },
    isLactatingOrPregnant: {
        type: Boolean,
        required: function() {
            return this.gender === "Female" && this.age > 13
        }
    },
    activityLevel: {
        type: String,
        enum: ['Sedentary', 'Low Active', 'Active', 'Very Active'],
        required: function() {
            return this.age > 3
        }
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    resetLink: {
        data: String,
        default: "",
    },
    quantities: 
        {
            type: [{type: [{type: [{type: Number}]}]}],
            default: defaultQuantities
        }
    ,
    dates:
    {
        type: [{type: [{type: [{type: Number}]}]}],
    },   
}, 
{ timestamps: true})

export default mongoose.model("User", UserSchema)