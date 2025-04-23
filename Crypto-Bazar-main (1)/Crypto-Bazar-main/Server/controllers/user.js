const users= require('../model/user.js');
const bcrypt = require('bcrypt');
const {jwtsign} = require('../Service/auth.js');
const saltRounds = 10;

const HandleSignup = async (req, res) => {
    const {username, email, password} = req.body;
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        const newUser = await users.create({username, email, password: hash});
        
        const token = jwtsign({ email: newUser.email });
        
        res.status(201).json({
            message: 'User created successfully',
            user: { username: newUser.username, email: newUser.email },
            token: token
        });
    } catch (err) {
        res.status(500).json({ message: 'Error creating user', error: err.message });
    }
}

const HandleLogin = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await users.findOne({email});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwtsign({ email: user.email });
            res.cookie('token', token);
            res.cookie('_id', user._id);
            res.status(200).json({
                message: 'User authenticated',
                user: { username: user.username, email: user.email },
                token: token
            });
        } else {
            res.status(401).json({message: 'Authentication failed'});
        }
    } catch (err) {
        res.status(500).json({message: 'Internal server error', error: err.message});
    }
}
module.exports = {HandleSignup
,HandleLogin
};
