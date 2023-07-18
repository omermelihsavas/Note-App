const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authControl = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({error: "Yetkilendirme token'ı gerekli."});
    }

    const token = authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, process.env.SECRET_KEY);

        req.user = await User.findOne({_id}).select('_id');
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({error:'İstek yetkili değil!'});
    }
} 

module.exports = authControl