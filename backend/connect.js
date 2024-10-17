const mongoose = require("mongoose");

const connect = async () =>{
    try {
        await mongoose.connect(process.env.db_link);
        console.log(`connection with database is successfull ${mongoose.connection.host}`);
        
    } catch (error) {
        console.log("error in connecting with database" + error);
    }
}
module.exports = connect