//adding dependencies
const mongoose = require("mongoose");
const Product= require('../schemas/product.schemas');

//create product
const createProduct= async body=>
    {
        const product=new Product(
            {
                _id: mongoose.Types.ObjectId(),
                productName:body.productName,
                productPrice:body.productPrice,
                productQuantity:body.productQuantity,
                productNumber:body.productNumber,
                productUploadedBy:body.productUploadedBy
            });

        const createdProduct= await product.save();
        return {
            data:createdProduct,
            message:"Sucessfully created product"
        }
    }

//get products
const getProducts= async()=>
    {
        try{
            const products=await Product.find();
            return {
                data:products,
                message:"Sucessfully get products"
            }
        }
        catch(err){
            console.log(err);
        }
    }

    
module.exports ={
    createProduct,
    getProducts,
    };
   