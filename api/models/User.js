import mongoose from "mongoose";
import { defaultQuantities } from "./../data/calories.js";
// import { initialDays } from "./../data/dates.js";
import {getDates} from "./../data/dates.js"

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
        type: Number
    },
    email: {
        type: String,
        required: true,

        // uncomment in the end
        // unique: true
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
        // default: ""
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
    // foods: [
    //     {
    //         type: String
    //     }
    // ],
    quantities: 
        {
            // type: [{type: Number}],
            type: [{type: [{type: [{type: Number}]}]}],
            // default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            default: defaultQuantities
        }
    ,
    dates:
    {
        type: [{type: [{type: [{type: Number}]}]}],
        // default: getDates()
    }
}, 
{ timestamps: true})

export default mongoose.model("User", UserSchema)