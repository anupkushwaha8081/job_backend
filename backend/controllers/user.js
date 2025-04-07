const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const getDataUri = require("../config/datauri");
const cloudinary = require("../config/cloudinary")
const File = require("../models/User")
const { isFileTypeSupported, uploadFileToCloudinary } = require('../utility/utils');


// function isFileTypeSupported(filetype, supportedTypes) {
//     return supportedTypes.includes(filetype);
// }

// // register  
// exports.register = async (req, res) => {
//     try {
//         const { fullName, email, phoneNumber, password, role } = req.body;
//         console.log(fullName, email, phoneNumber, password, role);
//         //a fild are not filled
//         if (!fullName || !email || !phoneNumber || !password || !role) {
//             return res.status(400).json({
//                 success: false,
//                 message: "first fill all the fields"
//             })
//         }
//         if (!req.file ) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'No file uploaded',
//             });
//         }
//         const file = req.fil;
//         console.log(file);

//         //validation
//         const supportedTypes = ["jpg","jpeg","png"];
//         const filetype = file.name.split('.')[1].toLowerCase();
//         console.log("file type:",filetype);

//         //file format not supported
//         if(!isFileTypeSupported(filetype,supportedTypes)){
//             return res.status(400).json({
//                 sucess:false,
//                 message:'file format not supported',
//             })
//         }

//         console.log("uploading to anup2005");
//         const response = await uploadFileToCloudinary(file,"anup8081");




//         // const file = req.file;
//         // const fileUri = getDataUri(file);
//         // console.log(fileUri);

//         // const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
//         // // const user = await User.findOne({ email });

//         const user = await User.findOne({ email });
//         console.log(user);

//         //user already used
//         if (user) {
//             return res.status(400).json({
//                 success: false,
//                 message: "user already exists with this email"

//             })
//         }

//         //password hashed
//         const hashedPassword = await bcrypt.hash(password, 10);
//         console.log(hashedPassword);

//         // work of it 
//         await User.create({
//             fullName,
//             email,
//             password: hashedPassword,
//             phoneNumber,
//             role,
//             profile:{
//                 profilePhoto: cloudResponse.secure_url,
//             }

//         })

//         return res.status(201).json({
//             success: true,
//             imageUrl:response.secure_url,
//             message: "User registered successfully",
//         });





//     } catch (error) {
//         console.error(error);
//         res.status(400).json({
//             success: false,
//             message: " i am error of register"
//         })
//     }
// }

exports.register = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, password, role } = req.body;
        // console.log(fullName, email, phoneNumber, password, role)

        if (!fullName || !email || !phoneNumber || !role) {
            return res.status(400).json({
                message: "something is missing",
                success: false,
            });
        }
        // console.log(res)
        // const file = req.file;
        // const fileUri = getDataUri(req.file);
        // const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exist with the email",
            });
        }


        // console.log(req.files.profile)
        // const file =req.files.profile;
        // console.log(file);
        // const supportedTypes = ["jpg", "jpeg", "png"];
        // const filetype = file.name.split(".")[1].toLowerCase();
        // console.log("File type:", filetype);
        // if(!isFileTypeSupported(filetype, supportedTypes)) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "File format not supported.",
        //     });
        // }

        console.log("Uploading to Cloudinary...");
        // const cloudResponse = await uploadFileToCloudinary(file, "anup8081");


        // let profilePhotoUrl = "";
        // if (req.file) {
        //     profilePhotoUrl = req.file.path; // Cloudinary URL from multer-storage-cloudinary
        // }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                // profilePhoto: profilePhotoUrl,
                // profilePhoto: cloudResponse.secure_url,
            },
        });
        return res.status(201).json({
            message: "Account creted successfully.",
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
};

// login

// exports.login = async (req, res) => {
//     try {
//         const { email, password, role } = req.body;
//         console.log(email, password, role)
//         if (!email || !password || !role) {
//             return res.status(400).json({
//                 success: false,
//                 message: "please fill all fields",
//             })
//         }

//         let user = await User.findOne({ email });
//         console.log(user);


//         if (!user) {
//             return res.status(400).json({
//                 success: false,
//                 message: "incorrect email",
//             })
//         }

//         // comparepassword
//         const IsPasswordMatched = await bcrypt.compare(password, user.password);

//         // password match nhi hua 
//         if (!IsPasswordMatched) {
//             return res.status(400).json({
//                 success: false,
//                 message: "incorrect password",
//             })
//         }

//         if (role !== user.role) {
//             return res.status(400).json({
//                 success: false,
//                 message: "accont with current role does not exist",
//             })
//         }

//         const tokenData = { userId: user._id }
//         console.log("tokendta", tokenData);
//         const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });
//         console.log(token);

//         user = {
//             _id: user._id,
//             fullName: user.fullName,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             role: user.role,
//             profile: user.profile
//         }
//         console.log(user);

//         try {
//             return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
//                 success: true,
//                 message: `welcome back ${user.fullName}`,
//                 user,
//             })
//         } catch (error) {
//             console.log("token not found");
//         }


//     } catch (error) {
//         console.log(" i am error from login")
//     }

// }


//correct code is this 
exports.login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        console.log({ email, password, role })

        if (!email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Please provide all fields.",
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email.",
            });
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password.",
            });
        }

        if (role !== user.role) {
            return res.status(400).json({
                success: false,
                message: "Account with this role does not exist.",
            });
        }

        // Debug SECRET_KEY
        // console.log("SECRET_KEY:", process.env.SECRET_KEY);

        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
            expiresIn: '1d'
        });
        // console.log(token)

        // user = {
        //     _id: user.id,
        //     fullName: user.fullName,
        //     email: user.email,
        //     phoneNumber: user.phoneNumber,
        //     role: user.role,
        //     profile: user.profile,
        // };

        return res.status(200).cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            httpsOnly: true,
            sameSite: 'strict',
        }).json({
            success: true,
            message: `Welcome back, ${user.fullName}!`,
            user,
        });
    } catch (error) {
        console.error("Error in login function:", error);
        res.status(500).json({
            success: false,
            message: "An internal server error occurred.",
        });
    }
};

// exports.login = async (req, res) => {
//     try {
//         const { email, password, role } = req.body;
//         console.log({ email, password, role });

//         if (!email || !password || !role) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Please provide all fields.",
//             });
//         }

//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Incorrect email.",
//             });
//         }

//         const isPasswordMatched = await bcrypt.compare(password, user.password);
//         if (!isPasswordMatched) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Incorrect password.",
//             });
//         }

//         if (role !== user.role) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Account with this role does not exist.",
//             });
//         }

//         const tokenData = { userId: user._id };
//         const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

//         // console.log("Generated Token:", token);

//         res.setHeader("Authorization", `Bearer ${token}`);

//         return res.status(200).json({
//             success: true,
//             message: `Welcome back, ${user.fullName}!`,
//             user,
//             token, // Optional: Send token in response body too
//         });
//     } catch (error) {
//         console.error("Error in login function:", error);
//         res.status(500).json({
//             success: false,
//             message: "An internal server error occurred.",
//         });
//     }
// };




//logout
exports.logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0, }).json({
            success: true,
            message: " you are logged out"
        })
    } catch (error) {
        console.log(" error from logout")
        console.error(error);
    }
}

//update profile
// exports.profileUpdate = async (req, res) => {
//     try {
//         const { fullName, email, phoneNumber, bio, skills,resume,resumeOriginalName } = req.body;

//         const file = req.file;
//         //cloudinary ayega idhr


//         //hetre copied
//         // const fileUri = getDataUri(file);
//         // const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

//         // if(!fullName||!email||!phoneNumber||!bio||!skills){
//         //     return res.status(400).json({
//         //         success:false,
//         //         message:" any field are unfilled"
//         //     })
//         // }
//         // let skillsArray;

//         // console.log(fullName,skillsArray);

//         // if (skills) {
//         //     skillsArray = skills.split(",");
//         // }

//         let skillsArray = [];
// if (skills) {
//     skillsArray = Array.isArray(skills) ? skills : skills.split(",").map(skill => skill.trim());
// }


//         const userId = req._id;
//         let user = await User.findById(userId);
//         if (!user) {
//             return res.status(400).json({
//                 success: false,
//                 message: "user not found by this id"
//             })
//         }
//         if (fullName) user.fullName = fullName
//         if (email) user.email = email
//         if (phoneNumber) user.phoneNumber = phoneNumber
//         if (bio) user.profile.bio = bio
//         if (skills) user.profile.skills = skillsArray
//         if (resumeOriginalName) user.profile.resumeOriginalName = resumeOriginalName;
//         if (resume) user.profile.resume = resume

//         //resume comes later here...

//         // if (cloudResponse) {
//         //     user.profile.resume = cloudResponse.secure_url; //save the cloudinary url
//         //     user.profile.resumeOriginalName = file.originalname; //save the original file name
//         // }

//         await user.save();
//         user = {
//             _id: user._id,
//             fullName: user.fullName,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             role: user.role,
//             profile: user.profile,

//         }
//         return res.status(200).json({
//             success: true,
//             user,
//             message: "profile updatd successfully"
//         })



//     } catch (error) {
//         console.log("error from update")
//         console.error(error);
//     }
// }

// const User = require("../models/User"); // Adjust path based on your project structure

// exports.profileUpdate = async (req, res) => {
//     try {
//         const { fullName, email, phoneNumber, bio, skills, resume, resumeOriginalName } = req.body;
//         console.log(fullName, email, phoneNumber, bio, skills, resume, resumeOriginalName);


//         // const file = req.file;
//         // // Cloudinary upload logic (if needed) comes here

//         // const fileUri = getDataUri(file);
//         // const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
//         // if (cloudResponse) {
//         //     user.profile.resume = cloudResponse.secure_url; // Save Cloudinary URL
//         //     user.profile.resumeOriginalName = file.originalname; // Save original file name
//         // }

//         // Ensure `skills` is always an array
//         let skillsArray = [];
//         if (skills) {
//             skillsArray = Array.isArray(skills) ? skills : skills.split(",").map(skill => skill.trim());
//         }

//         const userId = req.user ? req.user.id : req._id; // Ensure valid user ID

//         let user = await User.findById(userId);
//         console.log("user form profile",user);
//         if (!user) {
//             return res.status(400).json({
//                 success: false,
//                 message: "User not found by this ID",
//             });
//         }

//         // Update user details
//         if (fullName) user.fullName = fullName;
//         if (email) user.email = email;
//         if (phoneNumber) user.phoneNumber = phoneNumber;
//         if (bio) user.profile.bio = bio;
//         if (skillsArray.length > 0) user.profile.skills = skillsArray;
//         if (resumeOriginalName) user.profile.resumeOriginalName = resumeOriginalName;
//         if (resume) user.profile.resume = resume;

//         // If using Cloudinary for file upload, add it here
//         // Example:
//         // if (file) {
//         //     const fileUri = getDataUri(file);
//         //     const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
//         //     user.profile.resume = cloudResponse.secure_url; // Save Cloudinary URL
//         //     user.profile.resumeOriginalName = file.originalname; // Save original file name
//         // }


//         await user.save();
//         // Structuring response to ensure all profile fields are present
//         user = {
//             _id: user._id,
//             fullName: user.fullName,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             role: user.role,
//             // profile: {
//             //     bio: user.profile.bio || "",
//             //     skills: user.profile.skills || [],
//             //     resume: user.profile.resume || "",
//             //     resumeOriginalName: user.profile.resumeOriginalName || "",
//             //     profilePhoto: user.profile.profilePhoto || "",
//             // }
//         };


//         return res.status(200).json({
//             success: true,
//             user,
//             message: "Profile updated successfully",
//         });

//     } catch (error) {
//         console.log("Error from update:", error);
//         res.status(500).json({ success: false, message: "Internal server error" });
//     }
// };



exports.profileUpdate = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, bio, skills } = req.body;
        // console.log(fullName, email, phoneNumber, skills);
        console.log(req.files);

        const file1 =req.files.resume;
        let cloudResponse,cloudResponse2  = null;
        if (!file1) {
            console.log("No resume file uploaded");
        }else{
        console.log("Uploading to Cloudinary...");
        cloudResponse = await uploadFileToCloudinary(file1, "anup2005");
        }
        const file2 = await req.files.profilePhoto;
        if (file2) {
            console.log("Uploading to Cloudinary2...");
            cloudResponse2 = await uploadFileToCloudinary(file2, "anup8081");
        }
        

        let skillsArray = [];
        if (skills) {
            skillsArray = Array.isArray(skills) ? skills : skills.split(",").map(skill => skill.trim());
        }
        // console.log(skillsArray)

        // Get user ID from request (ensure this is set by your auth middleware)
        const userId = req.user?.id || req._id;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID not found in request",
            });
        }

        // Find the user by ID
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found by this ID",
            });
        }

        // Update user details
        if (fullName) user.fullName = fullName;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skillsArray.length > 0) user.profile.skills = skillsArray;
        if (cloudResponse && cloudResponse.secure_url) {
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = file1.name || "Resume";
        } else {
            console.log("Cloudinary upload failed, resume not saved");
        }



        if (cloudResponse2 && cloudResponse2.secure_url) {
            user.profile.profilePhoto = cloudResponse2.secure_url;
        } else {
            console.log("Cloudinary upload failed, profilephoto not saved");
        }

        // console.log("Saving user:", user);
        // Save the updated user
        await user.save();

        // Structuring response to ensure all profile fields are present
        // const updatedUser = {
        //     _id: user._id,
        //     fullName: user.fullName,
        //     email: user.email,
        //     phoneNumber: user.phoneNumber,
        //     role: user.role,
        //     profile: {
        //         bio: user.profile.bio || "",
        //         skills: user.profile.skills || [],
        //         // resume: cloudResponse1.secure_url || "",
        //         // resumeOriginalName: user.profile.resumeOriginalName || "",
        //         // profilePhoto: user.profile.profilePhoto || "",
        //     },
        // };

        return res.status(200).json({
            success: true,
            // user: updatedUser,
            message: "Profile updated successfully",
        });

    } catch (error) {
        console.log("Error from update:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};



// "fullName":"Anup12 Kushwaha",
// "email":"anupk6123312247@gmail.com",
// "phoneNumber":"808112554811",
// "password":"2005",
// "role":"Recruiter",
// "profile":"123"
// }
