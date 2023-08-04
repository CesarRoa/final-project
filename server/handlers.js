const home = (req, res)=>{
    return res.status(200).json({status:200, message: "hello test"})
}

module.exports={home}