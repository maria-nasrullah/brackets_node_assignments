const mongoose=require('mongoose');

const productSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        productName:{
            type:String,
            upperCase:true,
            required:true,
        },
        productPrice:{
            type:Number,
        },
        productQuantity:{
            type:Number,
        },
        productNumber:{
            type:Number,
        },
        productUploadedBy:{
            ref:'user',
            type:mongoose.Schema.Types.ObjectId,
        }
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model('product',productSchema);