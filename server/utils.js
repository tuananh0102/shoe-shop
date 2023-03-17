const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${path.resolve(__dirname, '../')}/public`);
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `${file.originalname}`);
    }
});

const multerFilter = (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    if(ext === 'jpg' || ext === 'png') {
        cb(null, true);
    } else {
        cb(new Error('no a png or jpg file'), false);
    }
}

module.exports.upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
})
module.exports.generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    }, 
    process.env.SECRET_KEY,
    {
        expiresIn: '1h'
    });
}

module.exports.isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if(authorization) {
        const token = authorization.slice(7, authorization.length);
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            
            if (err) return res.status(401).json({message: "verify fail"});
            req.user = decoded;
            next();
        });
    } else {
        return res.status(401).json({message: "no token"});
    }
}

module.exports.isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next();
    } else {
        return res.status(401).json({message: "is Admin fail"});
    }
}