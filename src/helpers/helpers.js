export const removeSpaces = (string) => {
  return string.split('').filter(x => x !== ' ').join('')
}