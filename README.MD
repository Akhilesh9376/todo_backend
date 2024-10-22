# How to get Start with this Project 
    1. npm install 
    2. create .env file in the base folder 
        i.  Give URL of the mongodb URL
        ii. Define PORT for the Server 


# command to get started 
npm --watch src/index.js




 const registerUser =async (arg )=>{
    try {
        console.log("Name : ",arg.body) ;
        const { Name, Email, PhoneNumber, Password } = arg.body ;
        console.log(Name,Email,PhoneNumber,Password);
    
        const user = await User.findOne({Email:Email});
        console.log("User : ", user)
        // if user are already present 
        if(user) {
            
        }
        const hashedPassword = await bcrypt.hash(Password,10);

        const userCreated = await User.create({
            Name:Name,
            Email:Email,
            PhoneNumber:PhoneNumber,
            Password: hashedPassword,
        });

        return userCreated

    } catch (error) {
        console.log("Error 32: ",error)
    }
}

module.exports = { registerUser }
