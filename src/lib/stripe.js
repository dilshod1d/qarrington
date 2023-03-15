import initStripe from "stripe"

const startStripe = async () => {
    const stripe = await initStripe(process.env.STRIPE_SECRET_KEY);
    return stripe
}

const createCustomer = async (data) => {
    try {
        const stripe = await initStripe(process.env.STRIPE_SECRET_KEY)
        return stripe.customers.create(data)
    }
    catch (err) {
        console.log(err.message)
        // return err
    }
}

const createCustomAccount = async (data) => {
    try {
        const stripe = await startStripe()
        return stripe.accounts.create(data)
    }
    catch (err) {
        console.log(err.message)
    }
}

const createProduct = async (data) => {
    try {
        const stripe = await initStripe(process.env.STRIPE_SECRET_KEY)
        return stripe.products.create(data)
    }
    catch (err) {
        console.log(err.messsage)
        // return err
    }
}

const createPerson = async (account, data) => {
    try {
        const stripe = await initStripe(process.env.STRIPE_SECRET_KEY)
        return stripe.accounts.createPerson(account, data)
    }
    catch (err) {
        console.log(err.messsage)
        return err
    }
}

const listPersons = async (account) => {
    try {
        const stripe = await initStripe(process.env.STRIPE_SECRET_KEY)
        return stripe.accounts.listPersons(account)
    }
    catch (err) {
        console.log(err.messsage)
        return err
    }
}

const uploadVefFile = async (file, accountId) => {
    try {
        const stripe = await initStripe(process.env.STRIPE_SECRET_KEY)
        console.log("file", file)
        let ext = file.originalname.split(".")
        ext = ext[ext.length - 1]
        console.log(ext)


        if (!(["pdf", "jpg", "png"].includes(ext))) {
            console.log("Invalid Extension", ext)
            return
        }

        const file = await stripe.files.create({
            purpose: 'identity_document',
            file: {
                data: file,
                name: accountId + "." + ext,
                type: 'application/octet-stream',
            },
        }, {
            stripeAccount: accountId,
        });
    console.log(file)

        return file
    }
    catch (err) {
        console.log("uploadVefFile", err)
        return err;
    }

}
const uploadVef = async (fileID, accountId, userId) => {
    try {
        const file = await uploadVefFile(fileID, accountId,)
        const stripe = await initStripe(process.env.STRIPE_SECRET_KEY)
        const person = await stripe.accounts.update(accountId, userId, { verification: { document: { front: file.id } } });
        return person
    }
    catch (err) {
        console.log("uploadVefFile", err)
        return err
    }

}

export default startStripe
export { createCustomer, createProduct, createCustomAccount, createPerson, uploadVef, uploadVefFile, listPersons }