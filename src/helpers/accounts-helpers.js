export const getAccountCompletionRate = (account) => {
  const accountContact = account.accountContact
  const accountBank = account.accountBank
  // console.log("account_get_rate", accountContact)

  const accountBusiness = account.accountBusiness
  const accountPersonal = account.accountPersonal

  let sum = 0;
  sum += Object.entries(accountContact).filter(e => e[1] != undefined).length
  sum += Object.entries(accountBank).filter(e => e[1] != undefined).length

  sum += Object.entries(accountBusiness).filter(e => e[1] != undefined).length
  sum += Object.entries(accountPersonal).filter(e => e[1] != undefined).length

  // const sum = Number(Object.keys(accountContact).length) + Number(Object.keys(accountBank).length) + Number(Object.keys(accountBusiness).length) + Number(Object.keys(accountPersonal).length)
  // console.log("sum", sum)
  const accountCompletionRate = sum * 4
  return accountCompletionRate
}

export const checkIfUrlIsValidImage = async (url) => {
  try {
    const res = await fetch(url)
    const buff = await res.blob()
  
    return buff.type.startsWith('image/')
  } catch {
    return false
  }
}