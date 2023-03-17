const bcrypt = require('bcrypt');

const utils = require('../utils');
const User = require('../models/userModel');

module.exports = {
    signUp: async (req, res) => {
        const checkUser = await User.findOne({email: req.body.email});

        if(!checkUser) {
            try {
                const newUser = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    isAdmin: req.body.isAdmin,
                    password: bcrypt.hashSync(req.body.password, 10)
                });
                return res.status(200).json({
                    status: "success",
                    user: newUser,
                    token: utils.generateToken(newUser)
                });
            } catch(e) {
                console.log(e)
                return res.status(401).json({
                    status: "fail",
                    message: e
                })
            }
        } else {
            return res.status(401).json({
                status: "fail",
                message: "existed email"
            })
        }
    },

    login: async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        try {
            const user = await User.findOne({email: req.body.email});
            if(!user) throw "no exist email";
            else {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if(!result) throw "password fail"
                    else {
                        res.header("Access-Control-Allow-Origin", "*");

                        return res.status(200).json({
                            message: "login success",
                            token: utils.generateToken(user)
                        })
                    }

                })
            }
        } catch(e) {
            console.log(e)
            return res.status(404).json({
                status: "fail",
                error: e
            })
        }
    },

    getAllUser: async (req, res) =>{
        try {
            const users = await User.find();
            return res.status(200).json({
                message: 'get success',
                users: users
            })
        } catch(e) {
            return res.status(404).json({
                status: "fail",
                error: e
            })
        }
    },

    getUserById: async(req, res) => {
        const id = req.params.id;
        console.log(id)
        try {
            const user = await User.findById(id);
            return res.status(200).json({
                message: "get user by id success",
                user: user
            });
        } catch(e) {
            return res.status(404).json({
                status: "fail",
                message: "get user by id fail"
            });
        }
    },

    getCurrentUser: async(req, res) => {
        const currentUser = req.user;
        if(req.user) {
            try {
                const user = await User.findById(currentUser.id);
                return res.status(200).json({
                    message: "get current user success",
                    user: user
                });
            } catch(e) {
                return res.status(404).json({
                    status: "fail",
                    message: "get current user fail"
                });
            }

        } else {
            return res.status(404).json({
                status: "fail",
                message: "emty current user"
            });
        }
    },

    deleteUser: async(req, res) => {
        const ids = req.body.ids;
        try {
            const obj = await User.deleteMany({_id: ids})
            return res.status(200).json({
                message: `delete successfull ${obj.deletedCount} users, ids: ${ids}`
            });
        }catch(e) {
            return res.status(404).json({
                status: "fail",
                message: "delete fail"
            });
        }
    },

    updateUser: async(req, res) => {
        const user = req.body.user;
        try {
            const updatedUser = await User.findOne({_id: req.params.id});
            updatedUser.name = user.name;
            await updatedUser.save();
            return res.status(200).json({
                message: "update successfully",
                user: updatedUser
            });
        } catch(e) {
            console.log(e)
            return res.status(404).json({
                status: "fail",
                message: "update fail"
            });
        }
    }
}