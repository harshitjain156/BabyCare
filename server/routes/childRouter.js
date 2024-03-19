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
        myVaccinesArray.push({
            vaccineId: myVaccines[i]._id, // Replace someVaccineId with the actual ObjectId
            status: "Pending",
            notify: true,
            predictedDate: Date.now(), // Replace somePredictedDate with the actual Date
            vaccinatedDate: Date.now() 
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

        console.log(newChild)
    res.json(newChild);
    }catch(err){
        console.log(err);
    }
})


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