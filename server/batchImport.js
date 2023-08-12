const {MongoClient} = require("mongodb");
require("dotenv").config();
const {MONGO_URI} = process.env;
const users = require("../data/users");

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const batchImport = async () =>{
    const client = new MongoClient(MONGO_URI, options);
    try{
        await client.connect();
        const db = client.db("budgeturself");
        const profile = users.map((user)=>({
            _id: user._id,
            profile: user.user,
            basicInfo: user.basicInfo,
            historical: user.historical
        }))
        await db.collection("users").insertMany(profile);

    }
    catch(error){
        console.log(error.message);
    }
    finally{
        await client.close();
        console.log("disconnected");
    }
};

batchImport();