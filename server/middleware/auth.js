
const jwt = require('jsonwebtoken');


const requireAuth = (req, res, next) => {
  
    const token = req.headers["x-access-token"]
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
        next()
      }
    })
  }}
   

  module.exports= {requireAuth}