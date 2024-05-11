//dependencies
const express = require("express");
const { check } = require("express-validator");

//internal Imports
const { getUsers, addUser, removeUser } = require("../controller/usersController");
const decorateHtmlResponse = require("../middleWares/common/decorateHtmlResponse");
const avatarUpload = require("../middleWares/Users/AvatarUpload");
const {
  addUserValidator,
  addUserValidationHandler,
} = require("../middleWares/Users/userValidators");

//router scaffolding
const router = express.Router();

//login page
router.get("/", decorateHtmlResponse("Users"), getUsers);

router.post("/", avatarUpload, addUserValidator, addUserValidationHandler, addUser);

router.delete("/:id", removeUser); 

//exports
module.exports = router;
