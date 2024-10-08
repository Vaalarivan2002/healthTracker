import User from "../models/User.js";
import { createError } from "./../utils/error.js";
import { relevantCalorie, BMR } from "./../utils/BMR.js";

export const updateUser = async (req, res, next) => {
    try {   
        let Bmr = relevantCalorie(BMR(req.body.gender, req.body.age, req.body.height, req.body.weight))
        const updatedUser = await User.findOneAndUpdate(
            {username: req.params.username},
            {$set: {
                age: req.body.age,
                gender: req.body.gender,
                height: req.body.height,
                weight: req.body.weight,
                calories: Bmr
            }}, {new: true}
        )   
        const { password, isAdmin, ...otherDetails
        } = updatedUser._doc
        res.status(200).json({...otherDetails})

    } catch (err) {
        next(createError('Something went wrong', 500))

    }
}

export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json(req.params.id);
    } catch (err) {
        next(createError("Something went wrong!", 500));
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.params.username});
        const {password, isAdmin, ...otherDetails} = user._doc;

        res.status(200).json({
            ...otherDetails
        });
    } catch (err) {
        next(createError('Something went wrong!', 500));
    }
}

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        next(createError("Something went wrong!", 500));
    }
}

export const patternUpdate = async (req, res, next) => {
    try {          
        const quantities = req.body.quantities
        const updatedUser = await User.findOneAndUpdate(
            {username: req.body.username},
            {$set: {
                quantities: quantities                
            }}, {new: true}
        )   
        const { password, isAdmin, ...otherDetails
        } = updatedUser._doc
        res.status(200).json({...otherDetails})
    } catch (err) {
        next(createError('Something went wrong!', 500))
    }
}

export const updateDates = async (req, res, next) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            {username: req.body.username}, {
                $set: {
                    dates: req.body.dates,
                    quantities: req.body.quantities
                }
            }, {new: true}
            )
            const { password, isAdmin, ...otherDetails
            } = updatedUser._doc
        res.status(200).json({...otherDetails})
    } catch (err) {
        next(createError("Something went wrong!", 500))
    }
}