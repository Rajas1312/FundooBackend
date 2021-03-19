const jwt = require('jsonwebtoken')
const JWT_SECRET = "kasaks"
const dotenv = require('dotenv');
dotenv.config();
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

    /**
    * @description decode token to get userId
    * @param {*} noteInfo
    * @param {*} token
    */
    decodeToken = (noteInfo, token) => {
        let decode = jwt.verify(token, process.env.JWT_SECRET);
        let userId = decode.id;
        noteInfo.userId = userId;
        return noteInfo;
    };

    /**
     * @description verify the token to authorized user
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    verifyToken = (req, res, next) => {
        try {
            let token = req.headers.authorization.split(" ")[1];
            //console.log(token);
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
            next();

        } catch (error) {
            res.status(401).send({
                error: "unauthorized",
            });
        }
    };

}
module.exports = new Helper();