import { getContentData, updateContent } from '@helpers/companies-list-helpers';
import { useState, useEffect} from 'react';

export const useCompaniesList = () => {
  const [contentData, setContentData] = useState([])
  const [currentStep, setCurrentStep] = useState(0)
  const [currentContentData, setCurrentContentData] = useState(null)
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [finish, setFinish] = useState(false)
  const [lastInput, setLastInput] = useState(false)

  useEffect(() => {
    const content = getContentData()
    setContentData(content)
    setCurrentContentData(content[currentStep])
  }, [])

  const goNext = async ({ inputValue, setInputValue }) => {
    if (await currentContentData.validate(inputValue) || !inputValue) {
      const updatedContentData = updateContent({ prevContent: contentData, currentStep, inputValue })
      setContentData(updatedContentData)
      setError(false)
      setErrorMsg('')

      if(currentStep === contentData.length - 2) setLastInput(true)

      if(currentStep + 1 === contentData.length) {
        setFinish(true) 
      } else {
        setCurrentStep(currentStep + 1)

        const newContent = updatedContentData[currentStep + 1]
        setCurrentContentData(newContent)
        setInputValue(newContent.savedValue ? newContent.savedValue : '')
      }
    } else {
      setErrorMsg(currentContentData.error)
      setError(true)
      setFinish(false) 
    }
  }

  const goBack = ({ inputValue, setInputValue }) => {
    if(currentStep === 0) return
    setLastInput(false)
    setCurrentStep(currentStep - 1)
    const newCurrentContentData = contentData[currentStep - 1]
    setCurrentContentData(newCurrentContentData)
    setInputValue(newCurrentContentData.savedValue ? newCurrentContentData.savedValue : '')
  }

  const cleanErrorMsg = () => {
    setErrorMsg('')
  }

  const cleanError = () => {
    setError(false)
  }

  return { contentData, currentContentData, setCurrentStep, goNext, goBack, error, cleanError, errorMsg, cleanErrorMsg, finish, lastInput }
}
