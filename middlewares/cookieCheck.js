module.exports = (req,res,next) => {
    if(req.cookies.idudalia){
        req.session.adminLogin = req.cookies.idudalia;
    }
    next()
}