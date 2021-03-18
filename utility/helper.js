const jwt = require('jsonwebtoken')
const JWT_SECRET = "kasaks"
class Helper {
    createToken = (data) => {
        return jwt.sign({
            emailId: data.email,
            id: data._id,
        },
            JWT_SECRET, {
            expiresIn: "30d",
        })
    }

}
module.exports = new Helper();