const mongoose=require("mongoose")
const schema=mongoose.Schema({},{
    strict:false,
    versionKey:false
})
const Fbmodel=mongoose.model("fbuser",schema)
module.exports={
   Fbmodel
}