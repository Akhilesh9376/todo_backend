const express = require('express');
const { infoControler, auth, todo } = require('../../controllers');
const authMiddleware = require('../../middlewares/authMiddleware');
const v1Routes = express.Router();

v1Routes.get('/info',infoControler);
v1Routes.post('/user/register',auth.register);
v1Routes.post('/user/login',auth.login);
v1Routes.post('/user/addtodo',authMiddleware,todo.addTodo);
v1Routes.get('/user/getalltodo',authMiddleware,todo.getAllTodo)

module.exports = v1Routes ;