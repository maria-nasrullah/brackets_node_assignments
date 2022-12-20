const os = require('os');
const cluster = require('cluster');
const Index  = require('.');

if(cluster.isMaster){
    const cpus=os.cpus().length;
    console.log(`master process is running with process id ${process.pid}`);
    for(let i=0;i<cpus;i++){
        cluster.fork()
    }
    cluster.on('exit',()=>{
        console.log('one worker is destroyed');
        cluster.fork();
    })
}
else{
    new Index().init()
}