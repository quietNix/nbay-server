const users = require("../models/users");
const bcrypt = require("bcrypt");

const createUser=async(req, res, next)=>{
    const { name, email, password } = req.body;
    try {
        // const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await users.create({
            name: name,
            email: email,
            password: hashedPassword
        });
        res.status(201).send({userCreated: true});
    } catch (e) {
        console.log(e.message);
        if(e.code===11000) res.status(409).send({errorMessage: "User already exists. Try Login"});
        res.status(502).send("Try Again");
    }
}

module.exports=createUser;