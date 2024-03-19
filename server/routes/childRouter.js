const express = require( 'express' );
const router = express.Router();
const {addNewChild, getAllChild, deleteChild} = require("../controller/childController");
const Child = require("../model/childModel");

const Vaccine=require('../model/vaccineModel')

// Require controller modules.

router.post("/add-new-child", addNewChild);
router.get("/all-child", getAllChild);
router.delete("/delete/:id", deleteChild)
router.post("/create-new-child",async (req,res)=>{
    try{
        const {name, birthdate, gender, userId, vaccinationsDone, vaccinationsTotal} = req.body;

    let myVaccinesArray=[];
     let myVaccines= await Vaccine.find().exec();
     console.log(myVaccines.length);

     for(i=0;i<myVaccines.length;i++){
        console.log(myVaccines[i]._id);
        
        let nextDate=predictNextDate(parseInt(myVaccines[i].age.split(" ")[0]),birthdate);
        let currentDate=new Date();
        let dateStatus=compareDates(nextDate);
        console.log(dateStatus)
        myVaccinesArray.push({
            vaccineId: myVaccines[i]._id, // Replace someVaccineId with the actual ObjectId
            status: dateStatus,
            notify: true,
            predictedDate: nextDate, // Replace somePredictedDate with the actual Date
            vaccinatedDate: null
        });
        
        
        
     }
     const createChild = new Child({ 
        name, 
        birthdate,
        gender,
        userId,
        vaccinationsDone,
        vaccinationsTotal,
        vaccinations: myVaccinesArray

        });
      
          // save user
      
        const newChild = await createChild.save();
        console.log(myVaccinesArray)

        console.log(newChild);

       

    res.json(newChild);
    }catch(err){
        console.log(err);
    }
})
function predictNextDate(durationInMonths,birthdate) {
    // Get today's date
    let currentDate = new Date(birthdate);

    // Calculate the next date by adding the duration in months
    let nextDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + durationInMonths, currentDate.getDate());

    // Return the next date
    return nextDate;
}
function compareDates(predictedDate) {
    // Get the current date
    let currentDate = new Date();

    // Convert both dates to milliseconds since January 1, 1970
    let currentTime = currentDate.getTime();
    let predictedTime = predictedDate.getTime();

    // Compare the current time with the predicted time
    if (predictedTime > currentTime) {
        return "upcoming"; // Predicted date is in the future
    } else if (predictedTime < currentTime) {
        return "delayed"; // Predicted date is in the past
    } else {
        return "today"; // Predicted date is today
    }
}

router.post("/add-new-vaccines",(req,res)=>{
    const vaccine=new Vaccine({
        name:req.body.name,
        age:req.body.age,
        desc:req.body.desc
    })

    vaccine.save().then(result=>{
        res.status(200).json({
            message:"success",
            data:result
        })
    })
})
module.exports = router;