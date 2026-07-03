  const { getUser } = require("../services/auth");


  function authUser(req,res,next){
    const tokenCookie=req.cookies.uid;
    req.user=null;
    
    if(!tokenCookie) return next();
    const user=getUser(tokenCookie);
    if(!user) return res.redirect("/login")
      req.user=user;
      return next();
  }

  function restrictTo(roles=[]){
    return function(req,res,next){
      if(!req.user) return res.redirect("/login")
        if(!roles.includes(req.user.roles)) return res.end(" Unauthorized")
          return next()
    }
  }

  module.exports = { authUser,restrictTo };
