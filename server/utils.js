import Jwt from "jsonwebtoken";

export const generateToken = (user) => {
    // with the sign method we can generate the token.
    // The first paramether we are using is the object we are going to use for generating token.
    // Second parameter: Json web token secrets. It's like a key to incript the data and generate the token. VERY IMPORTANT!! 🚧 To keep it in a secure place, we are gonna use dotenv file and dotenv package.
    //The last parameter is for options, we could set expired date for this token.
    return Jwt.sign({ 
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    }, process.env.JWT_SECRET || 'somethingsecret',
    {
        expiresIn: '30d', // in 30 days
    });
};

// Now, we have to create the .env file and import the dotenv package in index:  and write: dotenv.config();