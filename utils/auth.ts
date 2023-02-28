import jwt from "jsonwebtoken"
const secret_key = "next-market"

const auth = (handler) => {
  return async (req, res) => {
    if (req.method === "GET") {
      return handler(req, res)
    }
    // const token = await req.headers.authorization.split(" ")[1]
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZqc2xkQGpmc2wuY29tIiwiaWF0IjoxNjc3NTYzNTUxLCJleHAiOjE2Nzc2MDY3NTF9.vELMj4Fur5PqHfQy96nxKd1TA-uMn0PO4C4X-ORhugM"
    if (!token) {
      return res.status(401).json({message: "トークンがありません"})
    }
    try {
      const decoded = jwt.verify(token, secret_key)
      req.body.email = decoded.email
      return handler(req, res)
    } catch (err) {
      return res.status(401).json({message: "トークンが正しくありません"})
    }
  }
}

export default auth
