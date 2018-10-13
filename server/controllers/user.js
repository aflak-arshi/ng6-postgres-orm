const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.user_login_user = (req, res) => {
    User.find({
            where: {
                email: req.body.email
            }
        })
        .then(result => {
            if (!result) {
                res.status(401).json({
                    success: false,
                    error: "User not found!"
                });
            } else {
                bcrypt.compare(req.body.password, result.password, (err, passResult) => {
                    if (err) {
                        return res.status(401).json({
                            success: false,
                            error: err
                        });
                    }
                    if (passResult) {
                        const token = jwt.sign({
                            email: result.email,
                            userId: result.id
                        }, process.env.SECRET_KEY, { expiresIn: "1h" });
                        return res.status(200).json({
                            message: "Auth successful",
                            token: token
                        });
                    }
                    res.status(401).json({
                        success: false,
                        error: "Invalid password"
                    });
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                error: err
            });
        });
};

exports.user_signup_user = (req, res) => {
    User.sync()
        .then(() => {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                    if (err) {
                        console.log(err);
                        res.status(400).json({
                            success: false,
                            error: err
                        });
                    } else {
                        User.create({
                                email: req.body.email,
                                password: hash
                            })
                            .then(result => {
                                res.status(200).json({
                                    success: true,
                                    message: "User created!"
                                });
                            })
                            .catch(err => {
                                console.log(error)
                                res.status(400).json({
                                    success: false,
                                    error: err
                                });
                            })
                    }
                })
            })
        }, error => {
            console.log(error)
            res.status(400).json({
                success: false,
                error: error
            });
        });
};