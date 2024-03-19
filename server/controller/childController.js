const Child = require("../model/childModel");


exports.addNewChild =  async (req, res) => {

    console.log(req.body)
    try{
        const {name, birthdate, gender, userId, vaccinationsDone, vaccinationsTotal} = req.body;

        if (!name || !birthdate || !gender || !userId){
            return res.status(400).json({msg: 'Missing fields'});
        } 
        const createChild = new Child({ 
        name, 
        birthdate,
        gender,
        userId,
        vaccinationsDone,
        vaccinationsTotal

        });
      
          // save user
      
          const newChild = await createChild.save();

        console.log(newChild)

        if (!newChild){
            return res.status(400).json({message: 'Failed to create a new Child'});
        }

        res.status(201
            ).json({ message:`Successfully created a new Child with ID: ${newChild.id}`, data: newChild });
        }
    catch(err){
        console.log('Error in adding new child', err);
        return res.status(400).json({message: 'Failed to create a new Child'});
    }

};

exports.getAllChild = async(req, res)=>{
    try{
        const {userId} =  req.query;
        
        if(!userId){
            return res.status(400).json({ msg: "UserID is required"});
        }


        const children = await Child.find({ userId});

        res.status(200).json({
            success: true,
            count: children.length,
            data:children})

    }catch(err){
        // consle.log(err);
        res.status(500).json({message:"Server Error"})
    }
    
}
               
exports.deleteChild = async (req, res) => {
    try {
        const { id } = req.params;

        const child = await Child.findById(id);

        if (!child) {
            return res.status(404).json({ message: "Child not found" });
        }

        await child.deleteOne();

        res.status(200).json({ message: "Child deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
};               