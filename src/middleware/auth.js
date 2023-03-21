import { getToken } from "next-auth/jwt"

export const authenticate = async (req, res, next) => {
  try {
    const token = await getToken({ req })
    if (!token) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    req.id = token.id
    next()
  } catch (error) {
    console.log(error)
  }
}