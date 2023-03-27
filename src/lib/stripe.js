import axios from "axios";
import initStripe from "stripe"

// const createCustomer = async (data) => {
//     try {
//         const stripe = await initStripe(process.env.STRIPE_SECRET_KEY)
//         return stripe.customers.create(data)
//     }
//     catch (err) {
//         console.log(err.message)
//         // return err
//     }
// }

// const createPerson = async (account, data) => {
//     try {
//         const stripe = await initStripe(process.env.STRIPE_SECRET_KEY)
//         return stripe.accounts.createPerson(account, data)
//     }
//     catch (err) {
//         console.log(err.messsage)
//         return err
//     }
// }

// const listPersons = async (account) => {
//     try {
//         const stripe = await initStripe(process.env.STRIPE_SECRET_KEY)
//         return stripe.accounts.listPersons(account)
//     }
//     catch (err) {
//         console.log(err.messsage)
//         return err
//     }
// }

const startStripe = async () => {
    const stripe = await initStripe(process.env.STRIPE_SECRET_KEY);
    return stripe
}

export const createProduct = async (data) => {
    try {
        const stripe = await startStripe()
        return stripe.products.create(data)
    }
    catch (err) {
        console.log(err.messsage)
        // return err
    }
}

export const createStripeImage = async (url) => {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' })
        const fileData = Buffer.from(response.data, 'binary')

        const stripe = await startStripe()
        const file = await stripe.files.create({
            purpose: 'identity_document',
            file: {
                data: fileData,
                name: "file.jpg",
                type: 'application/octet-stream',
            },
        })
        return file
    }
    catch (err) {
        console.log("uploadVefFile", err)
        return err;
    }
}

export const createCustomAccount = async (data) => {
    try {
        const stripe = await startStripe()
        return stripe.accounts.create(data)
    }
    catch (err) {
        console.log(err.message)
        return err
    }
}

export const buyPicks = async () => {
    try {
        return true
    } catch (err) {
        console.log(err.message)
        return err
    }
}

export const buyPull = async () => {
    try {
        return true
    } catch (err) {
        console.log(err.message)
        return err
    }
}

export const buyPush = async () => {
    try {
        return true
    } catch (err) {
        console.log(err.message)
        return err
    }
}

export default startStripe
// export { createCustomer, createProduct, createPerson, listPersons }