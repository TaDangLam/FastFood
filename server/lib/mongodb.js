import mongoose from "mongoose";

const MongoConnect = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.DB_NAME,
        })
        console.log("Connected is Successfully");
    }catch(err){
        console.log(err);
    }
}

export default MongoConnect;
