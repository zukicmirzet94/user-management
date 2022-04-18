module.exports = (app) => {
    const UserService = require('../services/user.service');
    let userService = new UserService();
    var userRouter = require("express").Router();
  
    // Get Users
    userRouter.post("/", userService.getUsers);

    // Get User
    userRouter.get("/:user", userService.getUser);

    // Edit User
    userRouter.put("/edit", userService.editUser);

    // Delete User
    userRouter.delete("/:user", userService.deleteUser);

    // Create User
    userRouter.post("/create", userService.createUser);
  
    app.use('/api/v1/user', userRouter);
  };