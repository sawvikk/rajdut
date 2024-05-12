const {check, validationResult} = require("express-validator"); 
console.log("kogin Validator ");

const loginValidator = [
    check('username')
        .isLength({ min: 1 })
        .withMessage("User name can not be empty. "),
    check("password")
        .isStrongPassword()
        .withMessage("Password must be of at least 8 characters, one uppercase, one lowercase, one number and one character!!!")

]; 

const loginValidationHandler = function(req,res,next){
    const errors = validationResult(req); 
    const mappedErrors = errors.mapped(); 
    if (Object.keys(mappedErrors).length === 0) {
        next();
    }
    else {
        res.render("index", {
            data: {
                username: req.body.username
            },
            errors: mappedErrors
        });
    }
}; 

module.exports = { loginValidator, loginValidationHandler };  