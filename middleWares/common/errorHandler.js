

const createError = require('http-errors'); 

//404 not found handler
function notFoundHandler(req,res,next){
    next(createError(404,"Your requested content is not found")); 
}

//default errorHandler
function errorHandler(err,req,res,next){
    // res.locals.error= process.env.NODE_ENV==='development'?err:{message: err.message||"Internal Server Error",status: err.status||500, stack: err.stack}; //production level e (npm run prod dile ) html file dekhanor jonyo 
    res.locals.error= process.env.NODE_ENV==='development'?err:{message: err.message}; 
    res.status(err.status||500);
    
    if(res.locals.html){
        res.render("error",{title:"Error Page"});
    }
    else{
        res.json(res.locals.error); 
    }

}

module.exports ={notFoundHandler,errorHandler}; 
