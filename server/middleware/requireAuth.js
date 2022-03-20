const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    console.log(req.headers.authorization)
      const token = req.headers.authorization
      if (!token) {
        res.send("need token")
      }
    else{
      jwt.verify(token, "jwtSecret", (err, decodedToken) =>{
        if(err) {
          res.json({message: "failed to auth" })
        }
        else {
          res.json({userId : decodedToken }) 
        }
      })
      next()
    }} 