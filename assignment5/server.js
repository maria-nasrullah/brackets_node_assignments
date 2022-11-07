//adding dependencies
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser=require('body-parser');

//using app
const app=express();

//port assignment
const PORT=4080;

//writing purpose
app.use(express.json({extended:false}));

//connection to db
const mongoUrl=`mongodb+srv://marianasrullah:marianasrullah@cluster0.dogpf8f.mongodb.net/ecommerce`
mongoose
    .connect(
        mongoUrl, 
        {useNewUrlParser: true,}
        )
    .then(
        res => console.log("db connected")
        )
    .catch(
        error => {
            console.log(error);
            console.log("connection failed");
                 }
        );

//adding routes
const userRouter= require('./api/routes/user.routes');
const productRouter=require('./api/routes/product.routes')
const orderRouter=require('./api/routes/order.routes')

/*  HANDLING CORS */
app.options('', cors()); // enable pre-flight request for ALL requests
app.use(cors());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));

/*  HANDLING CORS */
app.options('', cors()); // enable pre-flight request for ALL requests
app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Content-Security-Policy', 'default-src *');
    res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    next();
});

//useing routes
app.use('/users', userRouter);
app.use('/products',productRouter);
app.use('/orders',orderRouter);

//server listening
app.listen(PORT,()=>console.log(`listening on ${PORT}`));