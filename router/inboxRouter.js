//dependencies
const express = require('express'); 

//internal imports
const { getInbox } = require('../controller/inboxController');
const decorateHtmlResponse = require('../middleWares/common/decorateHtmlResponse'); 
const {checkLogin} = require('../middleWares/common/checkLogin');
//router scaffolding
const router = express.Router(); 


//inbox page
router.get('/',decorateHtmlResponse("Inbox") , checkLogin, getInbox); 

//exports
module.exports = router; 