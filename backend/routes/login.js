const express = require('express')
const { body } = require('express-validator')
const router=express.Router()
const bcrypt = require('bcrypt');



//To do's
// google signin
// authentication  using jwt 
// in payload need name age and gender
// create middleware 


router.get('/logincheck',(req,res)=>{
    res.send("login sucessfull")
})
router.post('/login',[
    body('email',"enter an valid email").isEmail(),
    body('password',"enter an valid password").isLength({min:5})
],async(req,res)=>{
    const err = validationResult(req)
    try{
        if(!err.isEmpty()){
            res.status(404).json({ err: 'Please use valid credentials to create account' });
        }
        else{
            const { email, password } = req.body
            const salt =await bcrypt.genSalt(10)
            let new_password=bcrypt.hash(password,salt)
        }
    }catch(e){
        res.status(501).json({ err: 'Internal Server Error' })
    }
    
 
})

module.exports = router;