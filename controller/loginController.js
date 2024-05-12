const bcrypt = require("bcrypt");
const User = require("../models/People");
const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");

//get login page
function getLogin(req, res, next) {
  res.render("index");
}

async function login(req, res, next) {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });

    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if(isValidPassword){
        const userObject = {
            username: user.name, mobile: user.mobile, 
            email: user.email, role: "user"
        };

        const token = jwt.sign(userObject, process.env.JWT_SECRET,{
            expiresIn: process.env.JWT_EXPIRY
        });
        
        //set cookie
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          httpOnly: true,
          signed: true,
        });  

        res.locals.loggedInUser = userObject; 
        res.render("inbox"); 
      }
      else{
        throw createHttpError("Incorrect Passowrd ");
      }
    } 
    else {
        throw createHttpError("No email or phone number matched!!!");
    }
  } catch (err) {
    res.render("index",{
        data:{
            username: req.body.username
        },
        errors: {
            common: {
                msg: err.message
            }
        }
    });
    // next(err);
  }
}

function logout (req,res){

  

  res.clearCookie(process.env.COOKIE_NAME);
  res.send("logged out");
}

module.exports = { getLogin , login ,logout };
