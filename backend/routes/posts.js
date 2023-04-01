const express = require('express')
const router=express.Router()


router.get('/posts',(req,res)=>{
    res.send("posts sucessfull")
})

module.exports = router;