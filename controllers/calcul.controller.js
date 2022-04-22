const express = require('express');
const router = express.Router();
//import aws sdk
const AWS = require('aws-sdk');
 

//configure region
AWS.config.update({region:"us-east-2"}); //updates arguments region, maxRetries, logger
//EC2 instance class
 

exports.createrNewInstance=function createrNewInstance(req,res){
    const ec2 = new AWS.EC2({  
        accessKeyId: "AKIAQKJJGINDCWEJV4E4",
        secretAccessKey: "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",
        });  
        if(ec2){
            res.send({ status: true, result: ec2 });
        }else{
            res.send({ status: flase, result: 'error' }); 
        }
}
exports.createSecurityGroup = function createSecurityGroup(sg){
createSecurityGroup(securityGroup).then(()=>{
    return createKeyPair(keyName);
}).then((data)=>{
    return helper.persistKeyPairToFile(data)
}).then(()=>{
    return createEC2Instance(securityGroup,keyName);
}).then((data)=>{
    console.log("instance created",data);
}).catch((err)=>{
    console.log("instance creation failed ",err);
});
}

// Create security group
exports.createSecurityGroup = function createSecurityGroup(req,res){
   
    const ec2 = new AWS.EC2({  
        accessKeyId: "AKIAQKJJGINDCWEJV4E4",
        secretAccessKey: "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",
        });  
    
    var params = {
        Description: 'security group for my apps accessed from sdk', /* required */
        GroupName: req.body.groupName, /* required */ //sere adynamique req.sg      
      };
      return new Promise((resolve,reject)=>{
      ec2.createSecurityGroup(params, function(err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
            reject(err);
         } 
        else {    console.log(data); // successful response
            var params={
                GroupId:data.GroupId,
                IpPermissions:[{
                        IpProtocol:'tcp',
                        FromPort:req.body.FromPort,//sera dynamique ,envoie par cutomer req.body.ToPort
                        ToPort:req.body.ToPort,//sera dynamique ,envoie par cutomer req.body.ToPort
                        IpRanges:[{
                            CidrIp:'0.0.0.0/0'
                        }]},{
                            IpProtocol:'tcp',
                            FromPort:3000,
                            ToPort:3000,
                            IpRanges:[{
                                CidrIp:'0.0.0.0/0'
                            }]
                        }]
                } 
                ec2.authorizeSecurityGroupIngress(params, function(err, data) {
                    if (err){
                        console.log(err, err.stack); // an error occurred
                        reject(err);
                    } 
                    else{
                       console.log(data);           // successful response
                       resolve(data);
                    }
                  });
            }
        });
    });
};
 
//Create key value pair
exports.createKeyPair =  function createKeyPair(key){
    return new Promise((resolve,reject)=>{
        var params = {
            KeyName: key, /* required */            
          };
          ec2.createKeyPair(params, function(err, data) {
            if (err){ 
                console.log(err, err.stack); // an error occurred
                reject(err);
            }
            else{
                console.log(data);           // successful response
                resolve(data);
            }
          });
    });
};

//Create ec2 instance with ami ami-25615740
exports.createEC2Instance = function createEC2Instance(sg,key){
    return new Promise((resolve,reject)=>{
        var params = {
            ImageId:'ami-25615740',
            InstanceType:'t2.micro',  
            KeyName: key, 
            MaxCount:1,
            MinCount:1,
            SecurityGroups:[
                sg
            ]   
          };
        ec2.runInstances(params, function(err, data) {
            if (err){
                console.log(err, err.stack); // an error occurred
                reject(err);
            }
            else{
                console.log(data);           // successful response
                resolve(data);
            }
          });
    });
};

