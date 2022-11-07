const mongoose=require('mongoose');

const orderSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        
        _productId:{
            ref:'product',
            type:mongoose.Schema.Types.ObjectId,
        },
        _customerId:{
            ref:'user',
            type:mongoose.Schema.Types.ObjectId,
        },
        orderStatus:{
            type:String,
            upperCase:true,
            required:true,
        },
        orderNumber:{
            type:Number,
        },
        paidAmount:{
            type:Number,
        }
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model('order',orderSchema);