const jwt = require('jsonwebtoken');

async function authMiddleware(req,res,next) {
    try {
        // const token = req.cookies.token;
        const token = req.header('auth-token') ;
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'Access Denied. No Token Provided'
            })
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                success:false,
                message:'Invalid Token',
            })
        }
        req.user = decode;
        next();
    } catch (error) {
        
    }
}

module.exports = authMiddleware ;