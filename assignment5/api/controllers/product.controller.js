//adding dependencies
const productModel= require('../models/product.model');

//create product
const addProduct= async (req,res) => 
    {
        const {data,message}= await productModel.createProduct(req.body);
        return res.status(201).json(
            {
                data:data,
                message:message
            })
    };

//get products
const findAllProducts =async (req,res)=>
    {
        const {message,data} = await productModel.getProducts();
        return res.status(200).json(
            {
                data:data,
                message:message
            })
    }


module.exports={
    addProduct,
    findAllProducts,
    };
    