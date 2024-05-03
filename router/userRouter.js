//dependencies
const express = require('express');

//internal Imports
const {getUsers} = require('../controller/usersController');
const decorateHtmlResponse = require('../middleWares/common/decorateHtmlResponse'); 

//router scaffolding
const router = express.Router(); 

//login page
router.get('/',decorateHtmlResponse("Users"),getUsers); 

//exports
module.exports = router;
