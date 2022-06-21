// Install multer to ypload images
import multer from 'multer';
import express from 'express';
import { isAdmin, isAuth } from '../utils.js';
import expressAsyncHandler from "express-async-handler";


const uploadRouter = express.Router();

// Make an storage (folder) for images:
// We have to create a folder in the same level we have our package json, I mean where the multer has been installed in order to keep our images and create a txt file inside it to keep upload folder in git repository.
const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads/');
    },
    filename(req, file, cb){
        cb(null, `${Date.now()}.jpg`);
    }
});

// Now we have to implement the middleware:
const upload = multer({storage});

uploadRouter.post('/', isAuth, isAdmin, upload.single('image'), (req, res) => {
    // We send the path
    console.log(req)
    res.send(`/${req.file.path}`)
});

export default uploadRouter;


