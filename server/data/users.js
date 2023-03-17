const  bcrypt = require('bcrypt');

const users = [
    {
        name: "admin",
        email: "admin@gmail.com",
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },{
        name: "user1",
        email: "user1@gmail.com",
        password: bcrypt.hashSync('123456', 10)
    }
]

module.exports = users;