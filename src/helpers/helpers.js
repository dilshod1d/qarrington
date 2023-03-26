export const removeSpaces = (string) => {
  return string.split('').filter(x => x !== ' ').join('')
}

export const parseDateAndTime = ({ date, time }) => {
  const fixedDate = date.includes('T') ? date.split('T')[0] : date
  return new Date(fixedDate + " " + time).toUTCString()
}

export const parseDate = (date) => {
  const fixedDate = date.includes('T') ? date.split('T')[0] : date
  return fixedDate
}

export const parseTime = (time) => {
  const fixedTime = time
  return fixedTime
}

export const getParseDateNow = () => {
  return new Date(Date.now()).toUTCString()
}
