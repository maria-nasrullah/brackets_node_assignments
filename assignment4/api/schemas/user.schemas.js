const mongoose=require('mongoose');

const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            upperCase:true,
        },
        age:{
            type:Number,
            min:12,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        isMarried:{
            type:Boolean,
            default:false,
        }
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model('user',userSchema);