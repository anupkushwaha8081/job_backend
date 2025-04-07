const Application = require('../models/Applications');
const Job = require('../models/job');


exports.applyJob = async (req, res) => {
    try {//user
        const userId = req._id;
        console.log("user:",userId);  // Debugging line to inspect the user ID
        const jobId = req.params.id;
        console.log("jobId :",jobId);  // Debugging line to inspect the job ID

        if (!jobId) {
            return res.status(400).json({
                success: false,
                message: 'Job ID is required'
            
            });
        }

        const existingApplication = await Application.findOne({ job: jobId,applicant:userId });
        // console.log("exist:",existingApplication)
        if (existingApplication) {
            return res.status(400).json({
                success: false,
                message: 'You have already applied for this job'
            });
        }

        const job = await Job.findById(jobId);
        // console.log("job",job)
        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job not found'
            });
        }

        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });
        console.log("new", newApplication)

        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({ success: true, message: 'Application submitted successfully' });
    } catch (error) {
        console.error('Error in applyJob:', error);
        res.status(500).json({
            success: false,
            message: 'i am error from applyJob'
        });
    }
};

// exports.getAppliedJobs = async (req, res) => {
//     try {
//         const userId = req._id;
//         console.log("id", userId)
//         // const applications = await Application.find({ applicant: userId })
//         //     .populate({
//         //         path: 'job',
//         //         options: { sort: { createdAt: -1 } },
//         //         populate: { path: 'company' },
//         //     })
//         //     .sort({ createdAt: -1 });
//                 // const applications = await Application.find({ applicant: { $in: [userId] } });

//                 const applications = await Job.find({ applications: userId })
//                 .populate({ path: 'company' }) // Populate 'company' if it's a valid reference field
//                 .sort({ createdAt: -1 });

//         // console.log(applications)
//         if (!applications.length) {
//             return res.status(404).json({ success: false, message: 'No applications found' });
//         }

//         return res.status(200).json({ success: true, data: applications });
//     } catch (error) {
//         console.error('Error in getAppliedJobs:', error);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// };



// exports.getApplicants = async (req, res) => {
//     try {
//         const jobId = req.params.id;
//         console.log("id", jobId);

//         const job = await Job.findById(jobId).populate({
//             path: 'applicants',
//             options: { sort: { createdAt: -1 } },
//             populate: { path: 'applicant' },
//         });

//         if (!job) {
//             return res.status(404).json({ success: false, message: 'Job not found' });
//         }

//         return res.status(200).json({ success: true, data: job });
//     } catch (error) {
//         console.error('Error in getApplicants:', error);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// };



// ye sahi hua karta tha 
// exports.getApplicants = async (req, res) => {
//     try {
//         const jobId = req.params.id;
//         console.log("jobid", jobId);

//         // Populate the 'applications' field correctly
//         const job = await Job.findById(jobId)
//         // .populate("Job") // Correct field
//         // .populate("applicant") // Correct field
//         // .exec();
//         .populate({
//             path: 'Application', // Correct field name
//             options: { sort: { createdAt: -1 } },
//             populate:{
//                 path:'applicant'
//             } 
//         });
       
// //         const job = await Job.findById(jobId);
// // console.log("Job:", job);


//         if (!job) {
//             return res.status(404).json({ success: false, message: 'Job not found' });
//         }

//         return res.status(200).json({ success: true, data: job });
//     } catch (error) {
//         console.error('Error in getApplicants:', error);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// };


exports.getAppliedJobs = async (req, res) => {
    try {
      const userId = req._id;
      console.log("User ID:", userId);
  
      const applications = await Application.find({ applicant: userId })
      .populate({
        path: "job",
        populate: { path: "company", select: "companyName logo" },
      })
      .sort({ createdAt: -1 });


      if (!applications.length) {
        return res.status(404).json({ success: false, message: "No applications found" });
      }
  
      return res.status(200).json({ success: true, data: applications });
    } catch (error) {
      console.error("Error in getAppliedJobs:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  

exports.getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        console.log("jobid", jobId);

        // Find the job and populate the applications field
        const job = await Job.findById(jobId)
            .populate({
                path: 'applications', // Correct field name
                populate: { path: 'applicant' } // Populate applicant inside applications
            });

        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }

        return res.status(200).json({ success: true, data: job });
    } catch (error) {
        console.error('Error in getApplicants:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};



exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        console.log("applicationId", applicationId);

        if (!status) {
            return res.status(400).json({ success: false, message: 'Status is required' });
        }

        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({ success: false, message: 'Application not found' });
        }

        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({ success: true, message: 'Application status updated successfully' });
    } catch (error) {
        console.error('Error in updateStatus:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
