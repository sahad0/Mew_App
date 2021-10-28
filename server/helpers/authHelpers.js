const bcryt = require("bcrypt");

function hashPass(password){
    return new Promise((resolve,reject)=>{
        bcryt.genSalt(12,(err,salt)=>{
            if(err){
                reject(err);
            }
            bcryt.hash(password,salt,(err,hash)=>{
                if(err){
                    reject(err);
                }
                resolve(hash);
            });
        });
    });
        
    
   
}

function verifyPass(password,hash){
     return bcryt.compare(password,hash);
}

module.exports = {hashPass,verifyPass};