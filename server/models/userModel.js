import mongoose from 'mongoose';
// go to C:\Program Files\MongoDB\Server\5.0\bin 
//write in the path cmd
// mongod.exe --dbpath c:\data\db
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String, 
            required: true,
        },
        email: {
            type: String,
            required: true, 
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
            required: true,
        },
    //     isSeller: {
    //         type: Boolean,
    //         default: false,
    //         required: true,
    //     },
    },
    {
        timestamps: true,
    }
);


const User = mongoose.model('User', userSchema);
export default User;