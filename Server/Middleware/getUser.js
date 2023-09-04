import jwt from 'jsonwebtoken'
const JWT_SECRET = "ACHASAKUCHHONACHAHIYE"

const filter = (req, res, next) => {
  const token = req.header('auth-token');
  console.log("reach filter",token)
  if (!token) {
    res.status(401).send({ status: "Token not found" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data;
    console.log(data.id)
    next();
  } catch (error) {
    res.status(401).send({ status: "Authenticate using correct token" })
  }
 
}

export default filter