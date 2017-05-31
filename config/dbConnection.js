module.exports = {

    getMongoConnection: function(){
        return 'mongodb://testuser:testpass@aor-shard-00-00-8uov5.mongodb.net:27017,aor-shard-00-01-8uov5.mongodb.net:27017,aor-shard-00-02-8uov5.mongodb.net:27017/presupuesto?ssl=true&replicaSet=AOR-shard-0&authSource=admin';
        //return 'mongodb://arielcr:sampledb@ds061984.mlab.com:61984/nodesampleapi';
        //return 'mongodb://localhost:27017/presupuesto';
    }

};