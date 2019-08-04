const notifier = require('node-notifier');
const User = require('../models/user');

module.exports = AuthController = async (req, res, next) => {
    if (req.method == 'POST') {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                notifier.notify({
                    title: "user already exist",
                    message: "Please try again"
                });
                res.redirect('signup');
            } 
            else {
                const newUser = new User(req.body);
                const userSaved = await newUser.save();
                if(userSaved) {
                    notifier.notify({
                        title: "New user created",
                        message: "user created successfully"
                    });
                }
                next();
            }
        }
        catch(error) {
            res.json(error.message);
        }
    }
    else
        next();
};