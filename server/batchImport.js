const bcrypt = require('bcrypt');
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
        const hashedProfiles = await Promise.all(users.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.security.password, 10);
            return{
                _id: user._id,
                security: {
                    username: user.security.username,
                    password: hashedPassword,
                },
                profile: user.user,
                basicInfo: user.basicInfo,
                historical: user.historical,
            };
        }));
        // Insert hashed profiles into the database
        const usersCollection = db.collection("users");
        await usersCollection.insertMany(hashedProfiles);
        console.log("Batch import completed successfully.");
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