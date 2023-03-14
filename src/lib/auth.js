import Account from '../../models/account/Account';

export function generateToken(len = 36) {
    var text = "";
    
    var charset = "ABCDEFGHIJKLMNOPQRSTUVWabcdefghijklmnopqrstuvwxyz0123456789";
    
    for (var i = 0; i < len; i++)
      text += charset.charAt(Math.floor(Math.random() * charset.length));
    
    return text;
  }

export const getHeaderAuth = (req) => {
    if(!req.headers.authorization)
      return
    return req.headers.authorization.split(" ")[1]
}

export const login = (account) => {
  const token = generateToken(36)
  account.accountKeys.accountToken = token
  account.save()

  return token
} 

export const getAuthAccount = async (req, options) => {
  const token = getHeaderAuth(req)
  const account = await Account.findOne({"accountKeys.accountToken": token}, options)
  return account
}