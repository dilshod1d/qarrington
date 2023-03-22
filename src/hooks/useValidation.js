import { removeSpaces } from "@helpers/helpers"
import { useState } from "react"

export const useValidation = ({ errorMsg, allowSpaces, limitCharacters } = { errorMsg: '', allowSpaces: true, limitCharacters: null }) => {
  const [input, setInput] = useState('')
  const [error, setError] = useState({
    error: false,
    errorMsg: ''
  })

  const handleInputChange = (newInput) => {
    let cleanInput = newInput

    if(!allowSpaces) {
      cleanInput = removeSpaces(cleanInput)
    }
    if(limitCharacters) {
      cleanInput = cleanInput.length <= limitCharacters ? cleanInput : input
    }
    
    setInput(cleanInput)
    setError({
      error: false,
      errorMsg: ''
    })
  }

  const cleanErrorMsg = () => {
    setError({
      error: true,
      errorMsg: ''
    })
  }

  const throwError = () => {
    setError({
      error: true,
      errorMsg
    })
  }

  return [
    input,
    handleInputChange,
    { error: error.error, errorMsg: error.errorMsg },
    cleanErrorMsg,
    throwError
  ]
}