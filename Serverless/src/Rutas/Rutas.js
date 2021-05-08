const express = require('express');
const router = express.Router();
const redis = require("redis");

const client = redis.createClient(6379,'localhost');
const sha1   = require('sha1');

client.on('error', function(err){
    console.log("Error: " + err)
});


router.post('/insert', async(req, res)=>{
    const data = req.body;
    data['service'] = 'Redis'
    try {
        var hash = sha1(JSON.stringify(data));
        data['hash'] = hash;
        client.set(hash, JSON.stringify(data));
        res.json(JSON.stringify(data));
        
    } catch (error) {
        console.log(error)
        res.status(500).json({'message':'failed' });
    }
});

router.get('/ins',(req,res)=>{
    var data_ = []
    try {
        client.multi()
        .keys('*', function (err, replies) {

           var datos = replies.map( function(reply, index) {

                client.get(reply, function(err, data){
                        
                    data_.push(JSON.parse(data));
                    console.log(JSON.parse(data))

                    res.send(JSON.parse(JSON.stringify(data)));
 
                });

            });
          
        })
        .exec(function (err, replies) {
        });


    } catch (error) {
        
    }
    
    
});



module.exports = router;