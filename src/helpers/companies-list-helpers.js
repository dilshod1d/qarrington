import { checkIfUrlIsValidImage } from "./accounts-helpers"

export const getContentData = () => {
  return [
    {
      placeholder: "company ticker",
      objName: "companyTicker",
      title: "What's the unique three-letter symbol of the company? No special characters.",
      savedValue: '',
      validate: (input) => {
        const regex = /^[a-zA-Z]+$/
        return regex.test(input)
      },
      inputConstraints: (prev, input) => {
        if(input.length > 3) return prev
        return input
      },
      error: "Invalid input"
    },
    {
      placeholder: "company name",
      objName: "companyName",
      title: "What's the name of the company? This can either be the legal or DBA name.",
      savedValue: '',
      validate: (input) => {
        return true
      },
      inputConstraints: (prev, input) => {
        return input
      },
      error: "Invalid input"
    },
    {
      placeholder: "company logo",
      objName: "companyLogo",
      title: "What's the link to the company's logo? Please ensure the background is filled.",
      savedValue: '',
      validate: async (input) => {
        return await checkIfUrlIsValidImage(input)
      },
      inputConstraints: (prev, input) => {
        return input
      },
      error: "Invalid input"
    },
    {
      placeholder: "company product",
      objName: "companyProduct",
      title: "What's the product that the company offers or will offer its future customers?",
      savedValue: '',
      validate: (input) => {
        return true
      },
      inputConstraints: (prev, input) => {
        return input
      },
      error: "Invalid input"
    },
    {
      placeholder: "company headline",
      objName: "companyHeadline",
      title: "What is the catchy headline of the company? Please keep it simple & short.",
      savedValue: '',
      validate: (input) => {
        return true
      },
      inputConstraints: (prev, input) => {
        return input
      },
      error: "Invalid input"
    },
    {
      placeholder: "company description",
      objName: "companyDescription",
      title: "How would you break down what the company is or does to a 5yr or 95yr old?",
      savedValue: '',
      validate: (input) => {
        return true
      },
      inputConstraints: (prev, input) => {
          return input
      },
      error: "Invalid input"
    },
    {
      placeholder: "company industry",
      objName: "companyIndustry",
      title: "In which industry does the company operate it? Please keep it to 1 or 2 words.",
      savedValue: '',
      validate: (input) => {
        return true
      },
      inputConstraints: (prev, input) => {
        return input
      },
      error: "Invalid input"
    },
    {
      placeholder: "company website",
      objName: "companyWebsite",
      title: "What's the website of the company? This must be accessible to all customers.",
      savedValue: '',
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
      placeholder: "company email",
      objName: "companyEmail",
      title: "How can customers get in touch with the company should they need any help?",
      savedValue: '',
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
      placeholder: "company market",
      objName: "companyMarket",
      title: "In which country are the majority of the company's customers based or located?",
      savedValue: '',
      validate: (input) => {
        return true
      },
      inputConstraints: (prev, input) => {
        return input
      },
      error: "Invalid input"
    },
    {
      placeholder: "company size",
      objName: "companySize",
      title: "How many monthly active customers or users does your company have for now?",
      savedValue: '',
      validate: (input) => {
        const regex = /^[0-9]+$/
        return regex.test(input)
      },
      inputConstraints: (prev, input) => {
        return input.replace(/[^0-9]+/g, '')
      },
      error: "Invalid input"
    },
    {
      placeholder: "company iso units",
      objName: "companyIsoUnits",
      title: "How many units of subscriptions does the company plan to issue for its ISO?",
      savedValue: '',
      validate: (input) => {
        const regex = /^[0-9]+$/
        return regex.test(input)
      },
      inputConstraints: (prev, input) => {
        return input.replace(/[^0-9]+/g, '')
      },
      error: "Invalid input"
    },
    {
      placeholder: "company iso price",
      objName: "companyIsoPrice",
      title: "What's the price per unit during the ISO? Please make sure that this is justifiable.",
      savedValue: '',
      validate: (input) => {
        const regex = /^\d*\.?\d*$/
        return regex.test(input)
      },
      inputConstraints: (prev, input) => {
        return /^\d*\.?\d*$/.test(input) ? input : prev
      },
      error: "Invalid input"
    },
    {
      placeholder: "company iso date",
      objName: "companyIsoDate",
      title: "Which month does the company want the ISO to start? It can change anytime.",
      savedValue: '',
      validate: (input) => {
        return true
      },
      inputConstraints: (prev, input) => {
        return input
      },
      error: "Invalid input"
    },
    {
      placeholder: "company iso time",
      objName: "companyIsoTime",
      title: "What time does the company want the ISO to start? It can change anytime.",
      savedValue: '',
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

export const updateContent = ({ prevContent, currentStep, inputValue }) => {
  return prevContent.map((content, index) => {
    if(index === currentStep) {
      return {...content, savedValue: inputValue }
    }
    return content
  })
}

export const parseToObj = (dataArray) => {
  return dataArray.reduce((acc, { objName, savedValue }) => {
    if (savedValue) acc[objName] = savedValue
    return acc
  }, {})
}