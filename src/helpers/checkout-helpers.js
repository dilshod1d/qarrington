import { removeSpaces } from "./helpers"

const cardsRegexs = {
  AmexCard: /^3[47][0-9]{13}$/,
  BCGlobal: /^(6541|6556)[0-9]{12}$/,
  CarteBlancheCard: /^389[0-9]{11}$/,
  DinersClubCard: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
  DiscoverCard: /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/,
  InstaPaymentCard: /^63[7-9][0-9]{13}$/,
  JCBCard: /^(?:2131|1800|35\d{3})\d{11}$/,
  KoreanLocalCard: /^9[0-9]{15}$/,
  LaserCard: /^(6304|6706|6709|6771)[0-9]{12,15}$/,
  MaestroCard: /^(5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}$/,
  Mastercard: /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/,
  SoloCard: /^(6334|6767)[0-9]{12}|(6334|6767)[0-9]{14}|(6334|6767)[0-9]{15}$/,
  SwitchCard: /^(4903|4905|4911|4936|6333|6759)[0-9]{12}|(4903|4905|4911|4936|6333|6759)[0-9]{14}|(4903|4905|4911|4936|6333|6759)[0-9]{15}|564182[0-9]{10}|564182[0-9]{12}|564182[0-9]{13}|633110[0-9]{10}|633110[0-9]{12}|633110[0-9]{13}$/,
  UnionPayCard: /^(62[0-9]{14,17})$/,
  VisaCard: /^4[0-9]{12}(?:[0-9]{3})?$/,
  VisaMasterCard: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/
}


export const getContentData = () => {
  return [
    {
      placeholder: "card number",
      objName: "cardNumber",
      title: "Insert card number",
      savedValue: '',
      validate: (input) => {
        const inputWithoutSpaces = removeSpaces(input)
        const regexs = cardsRegexs
        return Object.keys(regexs).some((key) => regexs[key].test(inputWithoutSpaces))
      },
      inputConstraints: (prev, input) => {
        console.log("here")
        if(!/^[0-9\s]*$/.test(input) || input.length > 19) return prev

        if(input.length === 5 && input.length > prev.length) return input.slice(0, -1) + " " + input.at(-1)
        if(input.length === 10 && input.length > prev.length) return input.slice(0, -1) + " " + input.at(-1)
        if(input.length === 15 && input.length > prev.length) return input.slice(0, -1) + " " + input.at(-1)

        if(input.length === 5 && input.length < prev.length) return input.slice(0, -1)
        if(input.length === 10 && input.length < prev.length) return input.slice(0, -1)
        if(input.length === 15 && input.length < prev.length) return input.slice(0, -1)

        return input
      },
      error: "Invalid input"
    },
    {
      placeholder: "card name",
      objName: "cardName",
      title: "Insert card name",
      savedValue: '',
      validate: (input) => {
        return /^[A-Za-z\s]*$/.test(input)
      },
      inputConstraints: (prev, input) => {
        return /^[A-Za-z\s]*$/.test(input) ? input : prev
      },
      error: "Invalid input"
    },
    {
      placeholder: "card cvc",
      objName: "cardCvc",
      title: "Insert card cvc",
      savedValue: '',
      validate: async (input) => {
        return /^[0-9]*$/.test(input) && input.length === 3
      },
      inputConstraints: (prev, input) => {
        return !/^[0-9]*$/.test(input) || input.length > 3 ? prev : input
      },
      error: "Invalid input"
    },
    {
      placeholder: "card country",
      objName: "cardCountry",
      title: "Insert card country",
      savedValue: '',
      validate: (input) => {
        return /^[A-Za-z\s]*$/.test(input)
      },
      inputConstraints: (prev, input) => {
        return /^[A-Za-z\s]*$/.test(input) ? input : prev
      },
      error: "Invalid input"
    },
    {
      placeholder: "expiry month",
      objName: "expireMonth",
      title: "Insert expire month",
      savedValue: '',
      validate: (input) => {
        return /^0[1-9]|1[0-2]+$/.test(input) && input.length === 2
      },
      inputConstraints: (prev, input) => {
        return !/^[0-9]*$/.test(input) || input.length > 2 ? prev : input
      },
      error: "Invalid input"
    },
    {
      placeholder: "expire year",
      objName: "expireYear",
      title: "Insert expire year",
      savedValue: '',
      validate: (input) => {
        const regex = /^202[3-9]|20[3-9][0-9]+$/
        return regex.test(input) && input.length === 4
      },
      inputConstraints: (prev, input) => {
        if(input.length > 4 || !/^[0-9]*$/.test(input)) return prev
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
  console.log(dataArray)
  return dataArray.reduce((acc, { objName, savedValue }) => {
    if (savedValue) acc[objName] = savedValue
    return acc
  }, {})
}