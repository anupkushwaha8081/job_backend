const Job = require("../models/job");
exports.postJobs = async (req, res) => {
    try {
        // const userId = req.params.id;
        const user = req._id;
        // console.log("user", user)
        const { title, description, requirements, salary, experience, location, jobType, position, companyId } = req.body;
        if (!title || !description || !requirements || !salary || !experience || !location || !jobType || !position ) {
            return res.status(400).json({
                success: false,
                message: "first fill all the fields of Job"
            })
        }
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: user,

        })

        return res.status(201).json({
            success: true,
            job,
            message: "new job created successfully"
        })


    } catch (err) {
        res.status(400).json({
            success: false,
            message: " i am error from job"
        })
        console.error(err);
    }
}


exports.getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword?.trim() || "";
        // const keyword = req.query.keyword?.trim() || "";
        console.log("Keyword:", keyword);

        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };

        const jobs = await Job.find(query).populate({
            path:"company"
           }).sort({createdAt:-1})

        // if(!jobs){
        //     return res.status(404).json({
        //         success:false,
        //         message:"no any  job found",
        //     }) 
        // }

        if (jobs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No jobs found",
            });
        }


        return res.status(200).json({
            success: true,
            jobs,
            // message:"no any  job found",
        })


    } catch (err) {
        res.status(400).json({
            success: false,
            message: " i am error from getalljob"
        })
        console.error(err);
    }
}

// const Job = require("../models/Job"); // Adjust the path based on your structure

// exports.getJobs = async (req, res) => {
//     try {
//         const userId = req._id;
//         console.log("userId", userId);
//         const jobs = await Job.find({ userId });
//         console.log(jobs)

//         if (!jobs || jobs.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: "No jobs found"
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             jobs,
//             message: "Here is the job list"
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(400).json({
//             success: false,
//             message: "Error fetching jobs"
//         });
//     }
// };


exports.getJobs = async (req, res) => {
    try {
        const userId = req._id;
        console.log("userId", userId);
        
        const jobs = await Job.find({ created_by: userId }).populate("company", "companyName logo");
        console.log(jobs);

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No jobs found"
            });
        }

        return res.status(200).json({
            success: true,
            jobs,
            message: "Here is the job list"
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Error fetching jobs"
        });
    }
};



// exports.getAllJobs = async (req, res) => {
//     try {
//         const keyword = req.query.keyword?.trim() || "";
//         console.log("Keyword:", keyword);

//         const query = {
//             $or: [
//                 { title: { $regex: keyword, $options: "i" } },
//                 { description: { $regex: keyword, $options: "i" } }
//             ]
//         };

//         const jobs = await Job.find(query)
//             .populate({ path: "company", model: "Company" })
//             .sort({ createdAt: -1 }); // Use createdAt for sorting

//         if (jobs.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: "No jobs found",
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             jobs,
//         });
//     } catch (err) {
//         console.error("Error in getAllJobs:", err.message);
//         res.status(400).json({
//             success: false,
//             message: "Error fetching jobs",
//         });
//     }
// };



exports.getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);//populate({
        //     path:"applications"
        //    });
      

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "no any  job found",
            })
        }
        return res.status(200).json({
            success: true,
            job,
            // message:"no any  job found",
        })


    } catch (err) {
        res.status(400).json({
            success: false,
            message: " i am error from getjobbyid"
        })
        console.error(err);
    }
}

exports.getAdminJobs = async (req, res) => {
    try {
        const adminId = req.params.id;
        const jobs = await Job.find({ created_by: adminId });

        if (!jobs) {
            return res.status(404).json({
                success: false,
                message: "no any  job found",
            })
        }
        return res.status(200).json({
            success: true,
            jobs,
            // message:"no any  job found",
        })


    } catch (err) {
        res.status(400).json({
            success: false,
            message: " i am error from getalljob"
        })
        console.error(err);
    }
}