const jwt = require("jsonwebtoken");
const user = require("../model/User");

const protect = async (req, res, next) => {
  let token;
  try {
      if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await user.findById(decoded.id).select("-password");
      next();
      }
    }
    catch (error) {
      res.status(401).json({ message: "not authorized" });
    } 
  
};

module.exports = { protect };