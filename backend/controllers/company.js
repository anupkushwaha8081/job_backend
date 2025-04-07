const Company = require("../models/Company");
const { isFileTypeSupported, uploadFileToCloudinary } = require('../utility/utils');


// exports.registerCompany = async (req, res) => {
//     try {
//         console.log("Request Body:", req.body);
//         const { companyName } = req.body;
//         console.log("Company name:", companyName);
//         if (!companyName) {
//             return res.status(400).json({
//                 success: false,
//                 message: "please fill the company name"
//             })
//         }
//         const company = await Company.findOne({ companyName });
//         if (company) {
//             return res.status(200).json({
//                 success: true,
//                 message: "another company already exist with same name "
//             })
//         }

//         const newCompany = await Company.create({
//             companyName, // Use `companyName` to match the schema
//             success: true, // Remove this field if it's not part of your schema
//         });


//         return res.status(200).json({
//             success: true,
//             newCompany,
//             message: "company registered successfully"
//         })

//     } catch (error) {
//         console.error(error);
//         res.status(400).json({
//             success: false,
//             message: " i am error from registercompany controller"
//         })
//     }


// }

// exports.registerCompany = async (req, res) => {
//     try {
//         console.log("Request Body:", req.body);
//         const { companyName, description, website, location, logo } = req.body;
//         console.log("Company name:", companyName);
//         if (!companyName) {
//             return res.status(400).json({
//                 success: false,
//                 message: "please fill the company name"
//             })
//         }
//         const company = await Company.findOne({ companyName });
//         if (company) {
//             return res.status(200).json({
//                 success: true,
//                 message: "another company already exist with same name "
//             })
//         }

//         const newCompany = await Company.create({
//             companyName,
//             description,
//             website: website || "", // Default to empty string if not provided
//             location: location || "",
//             logo: logo || []
//         });


//         return res.status(200).json({
//             success: true,
//             newCompany,
//             message: "company registered successfully"
//         })

//     } catch (error) {
//         console.error(error);
//         res.status(400).json({
//             success: false,
//             message: " i am error from registercompany controller"
//         })
//     }


// }

exports.registerCompany = async (req, res) => {
    try {
        // console.log("Request Body:", req.body);
        const userId = req._id;
        // console.log("userID",userId);
        const { companyName, description, website, location,  } = req.body; // Include userId in destructuring
        // console.log("Company name:", companyName, description, website, location );

        if (!companyName) {
            return res.status(400).json({
                success: false,
                message: "Please fill the company name",
            });
        }

        const company = await Company.findOne({ companyName });
        if (company) {
            return res.status(200).json({
                success: true,
                message: "Another company already exists with the same name",
            });
        }
        console.log("i am request :",req.files);

        // const logo =req.files.logo;
        // // console.log(file);
        // const supportedTypes = ["jpg", "jpeg", "png"];
        // const logotype = logo.name.split(".")[1].toLowerCase();
        // console.log("File type:", logotype);
        // if(!isFileTypeSupported(logotype, supportedTypes)) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "File format not supported.",
        //     });
        // }

        // console.log("Uploading to Cloudinary...");
        // const cloudResponse = await uploadFileToCloudinary(logo, "anup8081");



        const newCompany = await Company.create({
            companyName,
            // description,
            // website: website || "",
            // location: location || "",
            // logo: cloudResponse.secure_url || "",
            userId, // Ensure userId is stored
        });

        return res.status(200).json({
            success: true,
            newCompany,
            message: "Company registered successfully",
        });

    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Error in registerCompany controller",
        });
    }
};


exports.getCompany = async (req, res) => {
    try {
        const userId = req._id;
        // console.log("id:", userId);
        const companies = await Company.find({userId});
        // console.log("companies:", companies)
        if (!companies) {
            return res.status(404).json({
                success: false,
                message: "company not found "
            })
        }
        return res.status(200).json({
            success: true,
            companies,
            message: "i am company list"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "i am error from get company under company controller"
        })
        console.error(error);

    }
}



exports.getCompanyId = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "company profile not found"
            })
        }
        const companyObject = company.toObject();

        return res.status(200).json({
            success: true,
            company: companyObject,
            message: 'company profile found',
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "i am error from get companyId under company controller"
        })
        console.error(error);

    }
}



// exports.updateCompany = async (req, res) => {
//     try {
//         // name,description,website,location
//         const { companyName, description, website, location } = req.body;

//         const updateData = { companyName, description, website, location };
//         console.log(updateData)
//         const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
//         if(company){
//             console.log(company)
//         }
//         if (!company) {
//             return res.status(404).json({
//                 success: false,
//                 message: "company not exist for update"
//             })
//         }

//         return res.status(200).json({
//             success: true,
//             company,
//             message: " company information updated",
//         })
//         // 
//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: "i am error from update company under company controller"
//         })
//         console.error(error);

//     }
// }


// exports.updateCompany = async (req, res) => {
//     try {
//         const { companyName, description, website, location } = req.body;

//         const updateData = { companyName, description, website, location };

//         // Check if a file is uploaded and add it to the updateData
//         if (req.file) {
//             updateData.logo = req.file.path; // Assuming you use Multer, `path` contains the file location
//         }

//         console.log("Update Data:", updateData);

//         const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

//         if (!company) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Company does not exist for update",
//             });
//         }

//         console.log("Updated Company:", company);

//         return res.status(200).json({
//             success: true,
//             company,
//             message: "Company information updated successfully",
//         });
//     } catch (error) {
//         console.error("Error updating company:", error);
//         res.status(500).json({
//             success: false,
//             message: "Error updating company. Please try again.",
//         });
//     }
// };


// exports.updateCompany = async (req, res) => {
//     try {
//       console.log("🔹 Raw Request Body:", req.body); // Check if data is coming
//       console.log("🔹 Raw Request Files:", req.file || req.files); // Check if file is coming
  
//       const { companyName, description, website, location } = req.body;
      
//       if (!companyName) {
//         return res.status(400).json({ success: false, message: "Company name is required" });
//       }
  
//       const updateData = { companyName, description, website, location };
  
//       if (req.file) {
//         updateData.logo = req.file.path;
//       }
  
//       console.log("✅ Processed Update Data:", updateData);
  
//       const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
  
//       if (!company) {
//         return res.status(404).json({
//           success: false,
//           message: "Company does not exist for update",
//         });
//       }
  
//       console.log("✅ Updated Company:", company);
  
//       return res.status(200).json({
//         success: true,
//         company,
//         message: "Company information updated successfully",
//       });
//     } catch (error) {
//       console.error("❌ Error updating company:", error);
//       res.status(500).json({
//         success: false,
//         message: "Error updating company. Please try again.",
//       });
//     }
//   };


exports.updateCompany = async (req, res) => {
    try {
      console.log("🔹 Raw Request Body:", req.body); // Debugging
      const { companyName, description, website, location } = req.body;
    //   console.log(req);


const logo =req.files.logo;
        // console.log(file);
        const supportedTypes = ["jpg", "jpeg", "png"];
        const logotype = logo.name.split(".")[1].toLowerCase();
        console.log("File type:", logotype);
        if(!isFileTypeSupported(logotype, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported.",
            });
        }

        console.log("Uploading to Cloudinary...");
        const cloudResponse = await uploadFileToCloudinary(logo, "anup8081");





  
      if (!companyName) {
        return res.status(400).json({ success: false, message: "Company name is required" });
      }
  
      const updateData = { companyName, description, website, location,logo:cloudResponse.secure_url };
      console.log("✅ Parsed Data:", updateData); // Debugging
  
      const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
  
      if (!company) {
        return res.status(404).json({ success: false, message: "Company not found" });
      }
  
      return res.status(200).json({ success: true, company, message: "Company information updated" });
    } catch (error) {
      console.error("❌ Error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  
  
//   {
//     "companyName":"company-2",
//     "description":"this is one of theINDIAN company and headquarter is in Dubai",
//     "website":"company1.com",  
//     "location":"DUBAI"
//   }


