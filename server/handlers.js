const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI, TEST_TOKEN} = process.env;
const { v4: uuidv4 } = require("uuid");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);

// Authenticate user w pwd
const signin = async (req, res)=>{
    const body = req.body
    const targetUser = body.username
    const targetPassword = body.password
    try {
        await client.connect();
        const db = client.db("budgeturself");
        const users = db.collection("users");
        const profile = await users.findOne({"security.username": targetUser});
        if (!profile){
            return res.status(400).json({
                status: 400,
                message: "no username was found in db",
                username: targetUser
            });
        };
        const passwordMatch = await bcrypt.compare(targetPassword, profile.security.password);
        if (!passwordMatch) {
            return res.status(400).json({
                status: 400,
                message: "wrong password",
            });
        }
        const {security, ...rest} = profile
        const user = {_id: profile._id}
        const token = jwt.sign(user, TEST_TOKEN);
        return res.status(200).json({
            data: rest,
            status: 200,
            accessToken: token
        });
        
    }
    catch(error){
        console.log(error.message)
    }
}

// PENDING
const newAccount = async (req, res) =>{
    const newUser = req.body
    try{
        await client.connect();
        const db = client.db("budgeturself");
        const users = db.collection('users');
        let usernameExist = await users.findOne({"profile.username": newUser.profile.username});
        let usermailExist = await users.findOne({"profile.email": newUser.profile.email});
        if(usernameExist){
            return res.status(400).json({
                status: 400,
                error:"Username already exist",
                username: newUser.profile.username,
            })
        }
        if(usermailExist){
            return res.status(400).json({
                status: 400,
                error:'Email is already taken',
                email: newUser.profile.email,
                data: usermailExist
            })
        }

        let _id = uuidv4();
        
        const object = {
            _id : _id,
            ...newUser
        };

        const addUser = await users.insertOne(object);
        return res.status(200).json({
            status: 'success',
            id: _id,
            data: object,
            process: addUser
        })
    }
    catch(err){

    }
}

// PENDING
const deleteAccount = async (req, res) =>{
    let _id = req.params.username
    try{
        await client.connect();
        const db = client.db("budgeturself");
        const users = db.collection('users');

        const findTarget = await users.findOne({_id})
        if(!findTarget){
            return res.status(400).json({
                status: 400,
                error:"ID does not exist in database",
                target: _id,
                data: findTarget
            })
        }
        const deleteTarget = await users.deleteOne({_id})
            return res.status(201).json({
                status: 201,
                message:`${_id}'s account has been deleted`,
                data: findTarget,
                process: deleteTarget
            })

    }
    catch(err){

    }
}

// authorice Token midware
const authenticateToken = (req, res, next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //Bearer TOKEN
    if (token == null) return res.status(401).json({
        message: "Access denied"
    }); 

    jwt.verify(token, process.env.TEST_TOKEN, (err, user)=>{
        if (err) return res.status(403).json({
            message: "token no longer valid",
            token: token
        }); 
        req.user = user
        next()
    })
}

// verify token
const verifyToken = async (req, res)=> {
    let _id = req.user._id
    try {
        await client.connect();
        const db = client.db("budgeturself");
        const users = db.collection("users");
        const profile = await users.findOne({"_id": _id})
        const {security, ...rest} = profile
    return res.status(200).json({
        message: "Token verified",
        user: req.user._id,
        data: rest
        });
    }
    catch(err){
        console.log(err)
    }
}

// add historical data
const addHistoryData = async (req, res)=>{
    const data = req.body;
    try{
        const username = req.params.username;
        const year = req.params.year;
        const month = req.params.month;

        await client.connect();
        const db = client.db("budgeturself");
        const users = db.collection('users');
        const profile = await users.findOne({"security.username": username});
        if (!profile){
            return res.status(400).json({
                status: 400,
                message: "no username was found in db",
                username: username
            });
        };

        const check1 = await users.findOne({[`historical.${year}.${month}`]:{$exists:true}});
        if (check1){
            return res.status(400).json({
                status: 400,
                message: "month data already exist",
            });
        }
        const object = {
            [year]:{
                [month]:{
                    data: data.points,
                    balance: data.balance}
                }
        }
        const addData = await users.updateOne(
            {"security.username" : username}, {$set:{historical:object}}
        );
        return res.status(200).json({
            status:'Success!',
            data: {username, year, month},
            target: object,
            process: addData,
            message: `Data from ${month}/${year} was save successfully`
        })
    }
    catch(err){
        console.log(err)
    }
}

module.exports={
    signin,
    newAccount,
    deleteAccount,
    authenticateToken,
    verifyToken,
    addHistoryData
}