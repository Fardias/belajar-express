module.exports = function (user) {
    return function (req, res, next) {
        req.userName = user.name
        req.userAddress = user.address
        next()
    }
}