const { AuthService } = require('../services/authService') ;
const { Logger } = require('../config')
 async function register (req,res) {
    
    try {
        
        const { Name,Email,PhoneNumber,Password } = req.body ; 
        
        if(!Name || !Email || !Password || !PhoneNumber) {
            return res.status(401).json({
                success:false,
                message:'All Field Are Required',
            })
        }
        const authRegister = new AuthService(req.body);

        const service = await authRegister.registerUser();
        
        if(service) {
            return res.status(200).json({
                success:true,
                message:'User Created Successfully',
                data:service
            }) ;
        }
    } catch (error) {
        Logger.error(error.message)
        return res.status(401).json({
            error:error.message,
            success:false,
            message:"Unable TO Create User",
            data:{},
        })
    }
}

async function login(req,res){
    try {
        const { Email, Password } = req.body  ;
        if(!Email || !Password ) {
            return res.status(401).json({
                success:false,
                message:'All Field are Required', 
            })
        }

        const authLogin = new AuthService(req.body);
        const { token , userData } = await authLogin.loginUser();

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            success: true,
            message: `Welcome back ${userData.Name}`,
            data:userData
        })

    } catch (error) {
        return res.status(401).json({
            success:false,
            error:error.message,
            message:'Error Occrued'
        })
        
    }
}

module.exports = { register,login }

