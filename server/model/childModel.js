const mongoose = require('mongoose');

const { Schema } = mongoose;

const childSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
  
      },
      birthdate: {
        type: Date,
        required: true,
      },
      userId: {
        type: Schema.Types.ObjectId,  // Reference to a User document
        ref: "User",                     // The 'User' is the model that will be used
        required: true,
      },
      gender: {
        type: String,
        enum: ["Male", "Female"],
        required: true,
      },
      vaccinationsDone: {
        type: Number,
        default: 0,
      },
      vaccinationsTotal: {
        type: Number,
        default: 10,
        // required: true,
      },
      vaccinations: [{
        vaccineId:{
            type: Schema.Types.ObjectId,
            ref: "Vaccines"
        },
        status:{
          type:String,default:"Pending"
        },
        notify:{
          type:Boolean,
          default:true
        },
        predictedDate:{
          type:Date
        },
        vaccinatedDate:{
          type:Date
        }
      
      }
      ]


}, { timestamps: true });

module.exports = mongoose.model("Child", childSchema);
