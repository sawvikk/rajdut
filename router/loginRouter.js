//dependencies
const express = require('express');
console.log("loginRouter");
//internal Imports
const {getLogin, login, logout} = require('../controller/loginController');
const decorateHtmlResponse = require('../middleWares/common/decorateHtmlResponse'); 
const { loginValidator, loginValidationHandler } = require('../middleWares/Login/loginValidator');
const {redirectLoggedIn} = require("../middleWares/common/checkLogin");
const router = express.Router(); 

//login page
router.get('/',decorateHtmlResponse('Login'), redirectLoggedIn ,  getLogin); 

router.post('/',decorateHtmlResponse('Login'),loginValidator, loginValidationHandler, login); 

router.delete('/',logout); 

module.exports = router;  
