const mongoose=require('mongoose');

const userSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        firstName:{
            type:String,
            upperCase:true,
        },
        lastName:{
            type:String,
            upperCase:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        phoneNumber:{
            type:String,
            unique:true,
        },
        city:{
            type:String,
            upperCase:true,
        },
        state:{
            type:String,
            upperCase:true,
        },
        zipCode:{
            type:String,
        },
        status:{
            type:String,
        },
        userType:{
            type:String,
        },
        payment:{
            type:Array,
            cardNumber:{
                type:String,
            },
            cardType:{
                type:String
            },
            cardHolderName:{
                type:String
            },
            cardStatus:{
                type:String
            },
            cardExpirationDate:{
                type:String
            }
        }
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model('user',userSchema);