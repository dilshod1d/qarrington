import { checkIfUrlIsValidImage } from "./accounts-helpers"

export const getContentData = ({ countries, account }) => {

  const countryCodeList = countries.map((country) => country.countryCode) 

  return [
    {
      placeholder: "first name",
      objName: "accountFirstName",
      title: "Kindly provide your First Name exactly as it appears on your bank statement.",
      options: [],
      canModify: account?.accountPersonal?.accountFirstName === undefined || '',
      defaultValue: account?.accountPersonal?.accountFirstName || '',
      validate: (input) => {
        const regex = /^[a-zA-Z]+$/
        return regex.test(input)
      },
      inputConstraints: (prev, input) => {
        return input
      },
      error: "Invalid input"
    },
    {
      placeholder: "last name",
      objName: "accountLastName",
      title: "Kindly provide your Last Name exactly as it appears on your bank statement.",
      options: [],
      canModify: account?.accountPersonal?.accountLastName === undefined || '',
      defaultValue: account?.accountPersonal?.accountLastName || '',
      validate: (input) => {
        const regex = /^[a-zA-Z]+$/
        return regex.test(input)
      },
      inputConstraints: (prev, input) => {
        return input
      },
      error: "Invalid input"
    },
    {
      placeholder: "government id",
      objName: "accountGovernmentId",
      title: "Kindly provide your Government-Issued ID as a link to the PNG or JPG image file.",
      options: [],
      canModify: true,
      defaultValue: account?.accountPersonal?.accountGovernmentId || '',
      validate: async (input) => {
        return await checkIfUrlIsValidImage(input)
      },
      inputConstraints: (prev, input) => {
        return input
      },
      error: "Invalid input"
    },
    {
      placeholder: "id number",
      objName: "accountIdNumber",
      title: "Kindly provide the ID Number or SSN exactly as shown on the government id.",
      options: [],
      canModify: true,
      defaultValue: account?.accountPersonal?.accountIdNumber || '',
      validate: (input) => {
        const regex = /^[0-9]+$/
        return regex.test(input)
      },
      inputConstraints: (prev, input) => {
        return input
      },
      error: "Invalid input"
    },
    {
      placeholder: "home country",
      objName: "accountHomeCountry",
      title: "Kindly provide the 2-letter code of the country, where the id was legally issued.",
      options: account?.accountPersonal?.accountHomeCountry === undefined ? countryCodeList : [],
      canModify: account?.accountPersonal?.accountHomeCountry === undefined || '',
      defaultValue: account?.accountPersonal?.accountHomeCountry || '',
      validate: (input) => {
        return countryCodeList.includes(input)
      },
      inputConstraints: (prev, input) => {
        if(input.length > 2) return prev
        return input
      },
      error: "Invalid input"
    },
    {
      placeholder: "birth date (mm-dd-yyyy)",
      objName: "accountBirthDate",
      title: "Kindly provide your Birth Date exactly as it appears on all your legal documents.",
      options: [],
      canModify: account?.accountPersonal?.accountBirthDate === undefined || '',
      defaultValue: account?.accountPersonal?.accountBirthDate || '',
      validate: (input) => {
        const regex = /^(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/
        return regex.test(input)
      },
      inputConstraints: (prev, input) => {
        if(prev.length < input.length && input.length === 11) return prev

        if(prev.length < input.length && (input.at(-1) === '/' || input.at(-1) === '-')) return prev + "-"

        if(/^[0-9]+$/.test(input.at(-1)) || (prev.length > input.length)) {
          if(input.length === 3 && prev.length === 2) {
            return input.slice(0, 2) + '-' + input.at(-1)
          }

          if(input.length === 6 && prev.length === 5) {
            return input.slice(0, 5) + '-' + input.at(-1)
          }
          return input
        }
        return prev
      },
      error: "Invalid input"
    },
    {
      placeholder: "business name",
      objName: "accountFirstName",
      title: "Kindly provide your Business Name or Full Name if you don't have a business.",
      options: [],
      canModify: true,
      defaultValue: account?.accountBusiness?.accountFirstName || '',
      validate: (input) => {
        return true
      },
      inputConstraints: (prev, input) => {
        return input
      },
      error: "Invalid input"
    },
    {
      placeholder: "business type",
      objName: "accountBusinessType",
      title: "By default, your Business Type is set to Individual and you can't change it later.",
      options: [],
      canModify: false,
      defaultValue: account?.accountBusiness?.accountBusinessType || '',
      validate: (input) => {
        return input.toLowerCase() === "individual"
      },
      inputConstraints: (prev, input) => {
        return input
      },
      error: "Invalid input"
    },
    {
      placeholder: "business industry",
      objName: "accountBusinessIndustry",
      title: "By default, your Business Industry is set to SaaS and you cannot change it later.",
      options: [],
      canModify: false,
      defaultValue: account?.accountBusiness?.accountBusinessIndustry || '',
      validate: (input) => {
        return input.toLowerCase() === "saas"
      },
      inputConstraints: (prev, input) => {
        return input
      },
      error: "Invalid input"
    },
    {
      placeholder: "business website",
      objName: "accountBusinessWebsite",
      title: "Kindly provide your Business Website or Social Link if you don't have a business.",
      options: [],
      canModify: true,
      defaultValue: account?.accountBusiness?.accountBusinessWebsite || '',
      validate: (input) => {
        const regex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
        return regex.test(input)
      },
      inputConstraints: (prev, input) => {
        return input
      },
      error: "Invalid input"
    },
    {
      placeholder: "business address",
      objName: "accountBusinessAddress",
      title: "Kindly provide your Business Address or leave it blank to use your Home Address.",
      options: [],
      canModify: true,
      defaultValue: account?.accountBusiness?.accountBusinessAddress || '',
      validate: (input) => {
        return true
      },
      inputConstraints: (prev, input) => {
        return input
      },
      error: "Invalid input"
    },
    {
      placeholder: "business country",
      objName: "accountBusinessCountry",
      title: "Kindly provide your Business Country or leave it blank to use your Home Country.",
      options: account?.accountBusiness?.accountBusinessCountry === undefined ? countryCodeList : [],
      canModify: true,
      defaultValue: account?.accountBusiness?.accountBusinessCountry || '',
      validate: (input) => {
        return countryCodeList.includes(input)
      },
      inputConstraints: (prev, input) => {
        if(input.length > 2) return prev
        return input
      },
      error: "Invalid input"
    },
    {
      placeholder: "business email",
      objName: "accountBusinessEmail",
      title: "Kindly provide your Business Email or leave it blank to use your Email Address.",
      options: [],
      canModify: account?.accountBusiness?.accountBusinessEmail === undefined || '',
      defaultValue: account?.accountBusiness?.accountBusinessEmail || '',
      validate: (input) => {
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        return regex.test(input)
      },
      inputConstraints: (prev, input) => {
        return input
      },
      error: "Invalid input"
    },
    {
      placeholder: "bank country",
      objName: "accountBankCountry",
      title: "Kindly provide the 2-letter code of the country, where your bank is located.",
      options: account?.accountBank?.accountBankCountry === undefined ? countryCodeList : [],
      canModify: account?.accountBank?.accountBankCountry === undefined || '',
      defaultValue: account?.accountBank?.accountBankCountry || '',
      validate: (input) => {
        return countryCodeList.includes(input)
      },
      inputConstraints: (prev, input) => {
        if(input.length > 2) return prev
        return input
      },
      error: "Invalid input"
    },
    {
      placeholder: "bank currency",
      objName: "accountBankCurrency",
      title: "Kindly provide the 2-letter of the country where your bank is located, this input will autocomplete with the correct currency.",
      options: [],
      canModify: false,
      defaultValue: countries.find(({ countryCode }) => countryCode === account?.accountBank?.accountBankCountry)?.countryCurrency || '',
      validate: (input) => {
        return countries.map(({ countryCurrency }) => countryCurrency).includes(input)
      },
      inputConstraints: (prev, input) => {
        if(input.length > 3) return prev
        return input
      },
      error: "Invalid input"
    },
    {
      placeholder: "iban number",
      objName: "accountIbanNumber",
      title: "Kindly provide your IBAN Number in case you don't have a bank Account Number.",
      options: [],
      canModify: account?.accountBank?.accountIbanNumber === undefined || '',
      defaultValue: account?.accountBank?.accountIbanNumber || '',
      validate: (input) => {
        const regex = /^[0-9]+$/
        return regex.test(input)
      },
      inputConstraints: (prev, input) => {
        return input
      },
      error: "Invalid input"
    },
    {
      placeholder: "account number",
      objName: "accountNumber",
      title: "Kindly enter your bank Account Number in case you don't have an IBAN Number.",
      options: [],
      canModify: account?.accountBank?.accountNumber === undefined || '',
      defaultValue: account?.accountBank?.accountNumber || '',
      validate: (input) => {
        const regex = /^[0-9]+$/
        return regex.test(input)
      },
      inputConstraints: (prev, input) => {
        return input
      },
      error: "Invalid input"
    },
    {
      placeholder: "routing number",
      objName: "accountRoutingNumber",
      title: "Kindly provide your Routing Number if your bank is based or located in the U.S.",
      options: [],
      canModify: account?.accountBank?.accountRoutingNumber === undefined || '',
      defaultValue: account?.accountBank?.accountRoutingNumber || '',
      validate: (input) => {
        const regex = /^[0-9]+$/
        return regex.test(input)
      },
      inputConstraints: (prev, input) => {
        return input
      },
      error: "Invalid input"
    },
    {
      placeholder: "sort code",
      objName: "accountSortCode",
      title: "Kindly provide your Sort Code in case your bank is based or located in the UK.",
      options: [],
      canModify: account?.accountBank?.accountSortCode === undefined || '',
      defaultValue: account?.accountBank?.accountSortCode || '',
      validate: (input) => {
        const regex = /^[0-9]+$/
        return regex.test(input)
      },
      inputConstraints: (prev, input) => {
        return input
      },
      error: "Invalid input"
    },
    {
      placeholder: "email address",
      objName: "accountEmailAddress",
      title: "Kindly provide your Email Address and once you do, you cannot change it later.",
      options: [],
      canModify: account?.accountContact?.accountEmailAddress === undefined || '',
      defaultValue: account?.accountContact?.accountEmailAddress || '',
      validate: (input) => {
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        return regex.test(input)
      },
      inputConstraints: (prev, input) => {
        return input
      },
      error: "Invalid input"
    },
    {
      placeholder: "phone number",
      objName: "accountPhoneNumber",
      title: "Kindly provide your Phone Number and once you do, you cannot change it later.",
      options: [],
      canModify: account?.accountContact?.accountPhoneNumber === undefined || '',
      defaultValue: account?.accountContact?.accountPhoneNumber || '',
      validate: (input) => {
        const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
        return regex.test(input)
      },
      inputConstraints: (prev, input) => {
        return input
      },
      error: "Invalid input"
    },
    {
      placeholder: "home address",
      objName: "accountHomeAddress",
      title: "Kindly provide your Home Address and once you do, you cannot change it later.",
      options: [],
      canModify: true,
      defaultValue: account?.accountContact?.accountHomeAddress || '',
      validate: (input) => {
        return true
      },
      inputConstraints: (prev, input) => {
        return input
      },
      error: "Invalid input"
    },
    {
      placeholder: "zip code",
      objName: "accountZipCode",
      title: "Kindly provide the zip code or postal code of your current residential address.",
      options: [],
      canModify: true,
      defaultValue: account?.accountContact?.accountZipCode || '',
      validate: (input) => {
        const regex = /^[0-9]+$/
        return regex.test(input)
      },
      inputConstraints: (prev, input) => {
        return input
      },
      error: "Invalid input"
    },
    {
      placeholder: "city name",
      objName: "accountCityName",
      title: "Kindly provide the city, where you're currently located as a legal resident.",
      options: [],
      canModify: true,
      defaultValue: account?.accountContact?.accountCityName || '',
      validate: (input) => {
        return true
      },
      inputConstraints: (prev, input) => {
        return input
      },
      error: "Invalid input"
    },
    {
      placeholder: "state name",
      objName: "accountStateName",
      title: "Kindly provide the state, where you're currently located as a legal resident.",
      options: [],
      canModify: true,
      defaultValue: account?.accountContact?.accountStateName || '',
      validate: (input) => {
        return true
      },
      inputConstraints: (prev, input) => {
        return input
      },
      error: "Invalid input"
    }
  ]
}

export const updateContent = ({ prevContent, currentStep, inputValue, countries }) => {
  let savedCountryCode
  return prevContent.map((content, index) => {
    if(content.objName === "accountBankCurrency" && savedCountryCode) {
      const toReturn = {...content, defaultValue: countries.find(({ countryCode }) => countryCode === savedCountryCode)?.countryCurrency }
      savedCountryCode = ''
      return toReturn
    }

    if(index === currentStep) {
      if(content.objName === "accountBankCountry" && inputValue.length === 2) {
        savedCountryCode = inputValue
      }

      return {...content, defaultValue: inputValue }
    }
    return content
  })
}

export const parseToObj = (dataArray) => {
  return dataArray.reduce((acc, { objName, defaultValue }) => {
    console.log(defaultValue)
    if (defaultValue) acc[objName] = defaultValue
    return acc
  }, {})
}