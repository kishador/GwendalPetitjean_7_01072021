
const jwt = require('jsonwebtoken');


const requireAuth = (req, res, next) => {
  console.log(req.headers.authorization)
    const token = req.headers.authorization
    if (!token) {
      res.send("need token")
    }
  else{
    jwt.verify(token, "jwtSecret", (err, decoded) =>{
      if(err) {
        res.json({ auth: false, message: "failed to auth" })
      }
      else {
        req.userId = decoded.id  
      }
    })
    next()
  }}
   

  module.exports= {requireAuth}