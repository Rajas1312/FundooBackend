const jwt = require('jsonwebtoken')
const JWT_SECRET = "kasaks"
class Helper {
    createToken = (data) => {
        return jwt.sign({
            emailId: data.emailId,
            id: data._id,
        },
            JWT_SECRET, {
            expiresIn: "60d",
        })
    }
}
module.exports = new Helper();