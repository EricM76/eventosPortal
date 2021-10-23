
module.exports = (req,res,next) => {
    if(req.session.adminLogin){
        res.locals.adminLogin = req.session.adminLogin
    }
    next()
}