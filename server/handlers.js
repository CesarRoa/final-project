const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
// const { v4: uuidv4 } = require("uuid");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);

const test = async (req, res)=>{
    try {
        await client.connect();
        const db = client.db("budgeturself");
    
        const users = await db.collection("users").find().toArray();
        return res.status(200).json({
            data: users,
            status: 200,
        });
    }
    catch(error){

    }
}

const signin = async (req, res)=>{
    const targetUser = req.params.username
    // res.status(200).json({data: targetUser})
    try {
        await client.connect();
        const db = client.db("budgeturself");
        const users = db.collection("users");
        const profile = await users.findOne({"profile.username": targetUser});
        if (!profile){
            return res.status(400).json({
                // data: profile,
                status: 400,
                message: "no username was found in db"
            });
        };
        if(profile){
            return res.status(200).json({
                data: profile,
                status: 200,
            });
        }
    }
    catch(error){
        console.log(error.message)
    }
}

module.exports={
    test,
    signin,
}