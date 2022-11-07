//adding dependencies
const mongoose = require("mongoose");
const Order= require('../schemas/order.schemas');

//create order
const createOrder= async body=>
    {
        const order=new Order(
            {
                _id: mongoose.Types.ObjectId(),
                _productId:body._productId,
                _customerId:body._customerId,
                orderStatus:body.orderStatus,
                orderNumber:body.orderNumber,
                paidAmount:body.paidAmount
            });

        const createdOrder= await order.save();
        return {
            data:createdOrder,
            message:"Sucessfully created order"
        }
    }

//get orders
const getOrders= async()=>
    {
        try{
            const orders=await Order.find();
            return {
                data:orders,
                message:"Sucessfully get orders"
            }
        }
        catch(err){
            console.log(err);
        }
    }

//get oreder using pipline
const getSpecificOrders= async()=>
    {
        try{
            const aggregatePipline=[
                {
                    '$match': {
                        'orderNumber': 2
                    }
                }, 
                {
                    '$lookup': {
                        'from': 'products', 
                        'localField': '_productId', 
                        'foreignField': '_id', 
                        'as': 'Product'
                    }
                }, 
                {
                    '$lookup': {
                        'from': 'users', 
                        'localField': '_customerId', 
                        'foreignField': '_id', 
                        'as': 'Customer'
                    }
                }, 
                {
                    '$project': {
                        '_id':0,
                        'Product.productName': 1, 
                        'Product.productPrice': 1, 
                        'Customer.firstName': 1, 
                        'Customer.email': 1, 
                        'Customer.phoneNumber': 1
                    }
                }
            ]
            const orders=await Order.aggregate(aggregatePipline);
            return {
                data:orders,
                message:"Sucessfully get orders"
            }
        }
        catch(err){
            console.log(err);
        }
    }

module.exports ={
    createOrder,
    getOrders,
    getSpecificOrders
    };
    