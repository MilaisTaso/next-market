import jwt from "jsonwebtoken"
import connectDB from "@/utils/database";
import { UserModel } from "@/utils/schemaModels";

const secretKey =  process.env.SECRET_KEY

const loginUser = async (req, res) => {
  try {
    await connectDB()
    const savedUserData = await UserModel.findOne({ email: req.body.email })
    if (savedUserData) {
      if (req.body.password === savedUserData.password) {
        const payload = {
          email: req.body.email,
        }
        const token = jwt.sign(payload, secretKey, { expiresIn: "12h" })
        console.log(token)
        return res.status(200).json({ message: "ログイン成功", token: token });
      } else {
        return res.status(400).json({ message: "ログイン失敗: パスワードが違います" })
      }
    } else {
      return res.status(400).json({ message: "ログイン失敗: ユーザー登録してください" })
    }
  } catch (err) {
    return res.status(400).json({ message: "ログイン失敗" })
  }
}

export default loginUser
