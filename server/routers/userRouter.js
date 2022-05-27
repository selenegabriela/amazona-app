import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils.js';
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

// It has to be post to the signin request
userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if(user){
        // bcrypt.compareSync is needed here, because we use bcrypt when user introduces their password. Then, the know how to compare each other.
        if(bcrypt.compareSync(password, user.password)){
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                // Token is needed to authenticate the next request. ¿?
                // The generator has to generate a toke to the user.
                //We also have to create a file called utils.js in server folder.
                //generateToken is a function created in utils.js
                token: generateToken(user),
            });
            return;
        }
    }
    res.status(401).send({ message: 'Invalid email or password' });
}))

export default userRouter;