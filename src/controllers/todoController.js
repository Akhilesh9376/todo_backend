const { Todo } = require('../services/todoService')

async function addTodo(req,res){
    try {
        const { user } = req ;
        // console.log("User : ",user)
        const todo = new Todo(req);
        const addedTodo =await todo.addTodo() ;

        return res.status(200).json({
            success:true,
            message:'Todo Add Successfully',
            data:addedTodo,
        })
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:error.message,
       })    
    }
}

async function getAllTodo(req,res){
    try {
        const data = new Todo(req);
        const fetch =await data.getAllTodo();

        return res.status(200).json({
            success:true,
            message:"Todo Fetched Successfully",
            data:fetch,
        })
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Not Able to fetch Data",
            error:error.message,
        })
        
    }
}

module.exports = { addTodo,getAllTodo }