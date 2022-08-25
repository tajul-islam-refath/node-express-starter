const mongoose = require("mongoose")

const dbConnection =  () =>{

    try{
        let url = process.env.DB_URI;

        mongoose.connect(url, {
                useNewUrlParser:true,
                useUnifiedTopology:true,
                autoIndex:true
            } ,()=>{
                console.log("Database connect success..")
        })

    }catch(error){
        if(error){
            console.log("Failed database connect");
        }
    }
}

module.exports = dbConnection;