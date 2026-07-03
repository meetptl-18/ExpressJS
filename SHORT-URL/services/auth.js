const jwt=require("jsonwebtoken")
const secret="Meet123@$"
function setUSer(user){
    const payload={
    _id:user._id,
    email:user.email,
    roles:user.roles
   }
   return jwt.sign(payload,secret)
}
function getUser(token){
    if(!token) return null
    try {
        return jwt.verify(token,secret)
    } catch (error) {
        return null
    }  
}
module.exports={setUSer,getUser}