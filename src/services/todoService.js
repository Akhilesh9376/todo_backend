const TodoDB = require('../models/Todo');
const User = require('../models/User');
class Todo {
    constructor(todo) {
        this.todo = todo ;
    }

    // add todo
    async addTodo() {
        const { title,description } = this.todo.body ;
        const { user } = this.todo ;
        //console.log("User : ",user.userId)
        if(!title || !description) {
            throw new Error("All Fields Required");
        }
        
        const todo =await TodoDB.create({
            title,
            description,
            userId:user.userId,
        });

        // finding the user on the behalf of userId 
        const userDetails = await User.findById({_id:user.userId});
        
        userDetails.Todo.push(todo._id) ;
        await userDetails.save();
        // console.log("User Details : ",userDetails['Todo'])
        
        return todo ;
    }

    async getAllTodo(){
        const { userId } = this.todo.user ;

        const fetchTodo = await TodoDB.find({userId:userId});
        console.log("Todo Data : ",fetchTodo);
        if(!fetchTodo) {
            throw new Error("No Data Available")
        }

        return fetchTodo ;

    }
}

module.exports = {Todo} ;