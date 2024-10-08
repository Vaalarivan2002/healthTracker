import dotenv from "dotenv"
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt, { decode } from "jsonwebtoken"
import _ from "lodash"
import { getDates } from "./../data/dates.js";
import { initiateMailgunObject, sendRegistrationConfirmationMail, sendForgotPasswordMail } from "../controllerHelpers/mailgunHelpers.js";

dotenv.config();

// They have blocked mailgun for my account since my free tier got over
// const mg = initiateMailgunObject();


export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const user = await User.findOne({ username: username });
        if (user) {
            return next(createError("Username has already been taken.", 400));
        }
        const user1 = await User.findOne({ email: email });
        if (user1) {
            return next(createError("Email is currently in use.", 400));
        }

        const token = jwt.sign({ username, email, password }, process.env.JWT_ACC_ACTIVATE, { expiresIn: '20m' });

        // no mailgun access
        // const res1 = sendRegistrationConfirmationMail(email, token);

        User.findOne({ username: username }).exec((err, data) => {
            if (data) {
                return next(createError("Username is already in use.", 400));
            }
            User.findOne({ email: email }).exec((err, data) => {
                if (data) {
                    return next(createError("Email is currently in use.", 400));
                }
            });
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            const dates = getDates();
            const newUser = new User({
                username,
                email,
                password: hash,
                dates: dates
            });
            newUser.save((err, success) => {
                if (err) {
                    console.log("Error in signing in while account activation: ", err);
                    return next(createError(err.message, 400));
                } else {
                    const { password, isAdmin, ...otherDetails
                    } = newUser._doc;
                    res.json({
                        message: "Register success!",
                        ...otherDetails
                    });
                }
            })
        })

        // No mailgun access
        // return res.status(200).json({
        //     // message: 'Email has been sent, kindly activate your account'
        //     message: "Account created successfully"
        // })

    } catch (err) {
        return next(createError("Something went wrong!", 500));
        // return next(createError(err.message, 500));
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) return next(createError("User not found."), 404)
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) return next(createError("Wrong password or username.", 400))
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT)
        const { password, isAdmin, ...otherDetails
        } = user._doc
        if (user.newMember) {
            const newUser = await user.updateOne({ newMember: false })
        }
        res.cookie("access_token", token, {
            httpOnly: true
        })
            .status(200)
            .json({ ...otherDetails })
    } catch (err) {
        next(createError("Something went wrong!", 500))
    }
}

export const logout = (req, res) => {
    res.cookie('access_token', '', { maxAge: 1 })
    // res.redirect(`${process.env.CLIENT_URL}`);
    res.status(200).json({'message': 'Logout successful!'});
}

export const activateAccount = (req, res, next) => {
    const {token} = req.body
    try {
        if (token) {
            jwt.verify(token, process.env.JWT_ACC_ACTIVATE, (err, decodedToken) => {
                if (err) {
                    return next(createError("Incorrect or expired link.", 400))
                }
                const {username, email, password} = decodedToken
                User.findOne({username: username}).exec((err, data) => {
                    if (data) {
                        return next(createError("Username is already in use.", 400))    
                    }
                    User.findOne({email: email}).exec((err, data) => {
                        if (data) {
                            return next(createError("Email is currently in use.", 400))    
                        }
                    })
                    const salt = bcrypt.genSaltSync(10);
                    const hash = bcrypt.hashSync(password, salt);
                    const dates = getDates()
                    const newUser = new User({
                        username,
                        email,
                        password: hash,
                        dates: dates
                    })
                    newUser.save((err, success) => {
                        if (err) {
                            console.log("Error in signing in while account activation: ", err);
                            return next(createError(err.message, 400))
                        } else {
                            const { password, isAdmin, ...otherDetails
                            } = newUser._doc
                            res.json({
                                message: "Register success!",
                                ...otherDetails
                            })
                        }
                    })
                })            
            })
        } else {
            return next(createError("Incorrect or expired link.", 400))
        }
    } catch (err) {
        return next(createError("Something went wrong!", 500))
    }
}

export const forgotPassword = async (req, res, next) => {
    try {
        const {email} = req.body
        const user = await User.findOne({email})
        if (!user) return next(createError("User with this email does not exists."), 404) 
        const token = jwt.sign({_id: user._id}, process.env.RESET_PASSWORD_KEY, {expiresIn: '20m'})

        // no mailgun access
        // sendForgotPasswordMail(email, token);

        const newUser = await user.updateOne({resetLink: token})
        return res.json({message: "Email has been sent, kindly follow the instructions"})
    } catch (err) {
        return next(createError("reset password link error", 400))
    }
}

export const resetPassword = (req, res, next) => {
    try {
        const {resetLink, newPass} = req.body
        if (resetLink) {
            jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY, (error, decodedData) => {
                if (error) return next(createError("Incorrect token or it's expired.", 401))
                User.findOne({resetLink: resetLink}).exec((err, user) => {
                    if (err || !user) {
                        return next(createError("User with this token doesn't exist.", 400))
                    }
                    const salt = bcrypt.genSaltSync(10);
                    const hash = bcrypt.hashSync(newPass, salt);
                    const obj = {password : hash, resetLink: ''}
                    user = _.extend(user, obj)
                    user.save((err, success) => {
                        if (err) {
                            return next(createError("Reset password error", 400))
                        }
                        res.status(200).json({
                            message: "Your password has been changed!"
                        })
                    })
                })
            })
        } else {
            return next(createError("Authentication error!", 401))
        }
    } catch (err) {
        return next(createError("Authentication error!", 401))
    }
}