import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import User from '../models/userModel.js';

const userRouter = express.Router();
// To handlre the errors we need to install express-async-handler
// And we have to create a middleware at the end of the index (before the port).
userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    // To remove all the created users and not having troubles with duplicated email:

    //await User.deleteMany();

    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
}));

export default userRouter;