// // import jwt from "jsonwebtoken";
// const jwt = require("jsonwebtoken");
// require ("dotenv").config();

// exports.auth = (req,res,next)=>{
//     const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"
//     if(!token){
//         return res.status(400).json({
//             success:false,
//             message:"User not authenticate"
//         })
//     }
//     try {
//         const decode = jwt.verify(token,process.env.SECRET_KEY);
//         console.log(decode);
//         if(!decode){
//             return res.status(401).json({
//                 success:false,
//                 message:"token missing"
//             })
//         }


//         req._id = decode.userId;

//         next();
//     } catch (error) {
//         console.error(error);
//         return res.status(400).json({
//             success:false,
//             message:"token invalid",
            
//         })
//     }
    
// }

// token from headers
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// exports.auth = (req, res, next) => {
//     const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"

//     if (!token) {
//         return res.status(401).json({
//             success: false,
//             message: "User not authenticated",
//         });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.SECRET_KEY);
//         req._id = decoded.userId;
//         next();
//     } catch (error) {
//         console.error(error);
//         return res.status(403).json({
//             success: false,
//             message: "Invalid or expired token",
//         });
//     }
// };



// token from cookies 
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    console.log("request ",req);
    
    const token = req.cookies?.token; // Extract token from cookies
    // const token = req.cookies.token;
    console.log("Tokrn fromer mifflr ",token);

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "User not anupam authenticated",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req._id = decoded.userId;
        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

