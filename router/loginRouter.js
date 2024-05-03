//dependencies
const express = require('express');

//internal Imports
const {getLogin} = require('../controller/loginController');
const decorateHtmlResponse = require('../middleWares/common/decorateHtmlResponse'); 

const router = express.Router(); 

//login page
router.get('/',decorateHtmlResponse('Login'), getLogin); 

module.exports = router; 
