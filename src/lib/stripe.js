import initStripe from "stripe"

const startStripe = () => {
    const stripe = initStripe(process.env.STRIPE_SECRET_KEY);
    return stripe
}

const createCustomer = async (details) => {
    try {
        const stripe = await initStripe(process.env.STRIPE_SECRET_KEY)
        return stripe.customers.create(details)
    }
    catch (err) {
        console.log(err.message)
        // return err
    }
}

const createProduct = async (details) => {
    try {
        const stripe = await initStripe(process.env.STRIPE_SECRET_KEY)
        return stripe.products.create(details)
    }
    catch (err) {
        console.log(err.messsage)
        // return err
    }
}

export default startStripe
export { createCustomer, createProduct }