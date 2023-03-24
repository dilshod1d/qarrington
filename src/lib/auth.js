import { getToken } from "next-auth/jwt"


export const generateToken = (len = 12) => {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWabcdefghijklmnopqrstuvwxyz0123456789";
  let text = "";
  
  for (var i = 0; i < len; i++)
    text += charset.charAt(Math.floor(Math.random() * charset.length));
  
  return text
}

export const getCurrentUserId = async (req) => {
  try {
    const token = await getToken({ req })
    return token?.id || null
  } catch (error) {
    return null
  }
}