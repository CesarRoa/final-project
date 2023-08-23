const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const { v4: uuidv4 } = require("uuid");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = 'yourSecretKey';


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);

// PASS
const test = async (req, res)=>{
    try {
        await client.connect();
        const db = client.db("budgeturself");
    
        const users = await db.collection("users").find().toArray();
        const check = [...users];
        const response =  check.map(user => {
            const {security, ...rest} = user;
            return rest
        });
        return res.status(200).json({
            data: response,
            status: 200,
        });
    }
    catch(error){

    }
}

// PASS
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
        // if(targetPassword !== profile.security.password){
        //         return res.status(400).json({
        //             status: 400,
        //             message: "wrong password",
        //             password: targetPassword,
        //         });
        //     };
        const {security, ...rest} = profile
        return res.status(200).json({
            data: rest,
            status: 200,
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

const addData = async (req, res)=>{
    try{
        const username = req.params.user;
        const year = req.params.year;
        const month = req.params.month;

        await client.connect();
        const db = client.db("budgeturself");
        const users = db.collection('users');

        const findTarget = await users.findOne({"security.username": username});
        const check1 = findTarget.historical[0][year][month]

        return res.status(200).json({
            status:'Success!',
            data: {username, year, month},
            target: check1
        })
    }
    catch(err){

    }
}

const loginTest = async (req, res) =>{
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
        if(targetPassword !== profile.security.password){
                return res.status(400).json({
                    status: 400,
                    message: "wrong password",
                    password: targetPassword,
                });
            };
        const {security, ...rest} = profile
        // return res.status(200).json({
        //     data: rest,
        //     status: 200,
        // });
        const token = jwt.sign({ userId: profile._id }, 'yourSecretKey', { expiresIn: '1h' });

        return res.status(200).json({
            data: rest,
            status: 200,
            token: token, // Include the generated token in the response
        });
    }
    catch(error){
        console.log(error.message)
    }
}

const verifyToken = async (req, res)=>{
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
        return res.status(401).json({ message: 'Token is not valid' });
    }

    req.user = decoded;
    next();
    });
}
module.exports={
    test,
    signin,
    newAccount,
    deleteAccount,
    addData,
    loginTest,
    verifyToken
}