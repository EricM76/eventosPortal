module.exports = (req,res,next) => {
    if(req.session.adminLogin){
        next()
    }else{
        res.redirect('/login')
    }
}