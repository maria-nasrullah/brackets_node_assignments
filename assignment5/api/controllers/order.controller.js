//adding dependencies
const orderModel= require('../models/order.model');

//create order
const addOrder= async (req,res) => 
    {
        const {data,message}= await orderModel.createOrder(req.body);
        return res.status(201).json(
            {
                data:data,
                message:message
            })
    };

//get orders
const findAllOrders =async (req,res)=>
    {
        const {message,data} = await orderModel.getOrders();
        return res.status(200).json(
            {
                data:data,
                message:message
            })
    }

//get aggregated orders
const findSpecificOrders =async (req,res)=>
{
    const {message,data} = await orderModel.getSpecificOrders();
    return res.status(200).json(
        {
            data:data,
            message:message
        })
}


module.exports={
    addOrder,
    findAllOrders,
    findSpecificOrders,
    };
   