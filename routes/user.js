const express=require("express");
const router=express.Router({mergeParams:true});

//Requiring wrap async for custom error handling 
const wrapAsync=require("../utils/wrapAsync");

//Requiring custom error class for displaying custom message and not use default express middleware
const ExpressError=require("../utils/expressError");

//Requiring User model
const User=require("../models/user.js");

//Joi for validation
const {userSchema}=require("../schema.js");

//Requiring passport for authentication
const passport=require("passport");

//Requiring middleware to store url
const {redirectUrl,validateUser}=require('../utils/middleware.js');

//Requiring user controller
const userController=require("../controller/users.js");

// Signup routes
router.get("/", wrapAsync(userController.gsignup));
router.post("/", validateUser, wrapAsync(userController.psignup));

// Login routes
router.get("/", wrapAsync(userController.glogin));
router.post("/", redirectUrl, passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
}), wrapAsync(userController.plogin));

// Logout route
router.get("/", wrapAsync(userController.logout));

module.exports=router;
