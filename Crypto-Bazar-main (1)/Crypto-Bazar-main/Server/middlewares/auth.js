const jwt=require('jsonwebtoken');
const {jwtverify} = require('../Service/auth.js');

const auth = async (req, res, next) => {
    const {authorization} = req.headers;
    console.log(authorization);
    if(!authorization){
        return res.status(401).json({message: 'You must be logged in'});
    }
    const token = authorization.replace('Bearer ', '');
    try {
        console.log(token);
        if(!token){
            throw new Error();
        }
        const user = jwtverify(token);
        next();
    } catch (error) {
        res.status(401).json({message: 'Please authenticate'});
    }
}

module.exports = auth;