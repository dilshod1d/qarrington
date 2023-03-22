import { getContentData, updateContent } from '@helpers/accounts-update-helpers';
import { useState, useEffect} from 'react';
import useSWR from 'swr';

export const useUpdateAccount = ({ account }) => {
  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const { data: countries } = useSWR(`${process.env.NEXT_PUBLIC_APP_URL}/api/countries`, fetcher);
  const [contentData, setContentData] = useState([])
  const [currentStep, setCurrentStep] = useState(0)
  const [currentContentData, setCurrentContentData] = useState(null)
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [finish, setFinish] = useState(false)
  const [lastInput, setLastInput] = useState(false)

  useEffect(() => {
    if(countries && account) {
      setContentData(getContentData({ countries, account }))
      setCurrentContentData(getContentData({ countries, account })[currentStep])
    }
  }, [countries, account])

  const goNext = async ({ inputValue, setInputValue }) => {
    if (await currentContentData.validate(inputValue) || !inputValue) {
      const updatedContentData = updateContent({ prevContent: contentData, currentStep, inputValue, countries })
      setContentData(updatedContentData)
      setError(false)
      setErrorMsg('')

      
      if(currentStep === contentData.length - 2) setLastInput(true)

      if(currentStep + 1 === contentData.length) {
        setFinish(true) 
      } else {
        setCurrentStep(currentStep + 1)
        setCurrentContentData(updatedContentData[currentStep + 1])
        setInputValue(updatedContentData[currentStep + 1].defaultValue ? updatedContentData[currentStep + 1].defaultValue : '')
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
    setInputValue(newCurrentContentData.defaultValue ? newCurrentContentData.defaultValue : '')
  }

  const cleanErrorMsg = () => {
    setErrorMsg('')
  }

  const cleanError = () => {
    setError(false)
  }

  return { contentData, currentContentData, setCurrentStep, goNext, goBack, error, cleanError, errorMsg, cleanErrorMsg, finish, lastInput }
}
