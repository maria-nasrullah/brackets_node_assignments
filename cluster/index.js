const Server=require('./server');

 class Index{
     server=new Server().app;
    init(){
        this.server.listen(5000,()=>console.log('server is running'));

    }
}
module.exports=Index
