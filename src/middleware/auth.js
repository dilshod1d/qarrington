const auth = () => {
    return async(req, res, next) => {
        if(req.headers.authorization){
            next()
        }
        else {
            res.status(401).json({ success:false, data:null, error:"User not authenticated"})
        }
    }
}

export default auth