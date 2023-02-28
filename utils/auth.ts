import type { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"
const secret_key = process.env.SECRET_KEY

interface DecodedType {
  email: string
}

interface ExtendedNextApiRequestAuth extends NextApiResponse {
  headers: {
    authorization: string
  }
  body: {
    email: string
  }
}

interface ResMessageType {
  message: string
}

const auth = (handler: Function) => {
  return async (req: ExtendedNextApiRequestAuth, res: NextApiResponse <ResMessageType>) => {
    if (req.method === "GET") {
      return handler(req, res)
    }
    const token: string = await req.headers.authorization.split(" ")[1]

    if (!token) {
      return res.status(401).json({message: "トークンがありません"})
    }
    try {
      const decoded = jwt.verify(token, secret_key)
      req.body.email = (decoded as DecodedType).email
      return handler(req, res)
    } catch (err) {
      return res.status(401).json({message: "トークンが正しくありません"})
    }
  }
}

export default auth
