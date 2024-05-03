//dependencies
const express = require('express'); 

//internal imports
const { getInbox } = require('../controller/inboxController');
const decorateHtmlResponse = require('../middleWares/common/decorateHtmlResponse'); 

//router scaffolding
const router = express.Router(); 

//inbox page
router.get('/',decorateHtmlResponse("Inbox"),getInbox); 

//exports
module.exports = router; 