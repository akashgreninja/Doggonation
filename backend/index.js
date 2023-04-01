const express=require('express')
const dotenv = require('dotenv');

const app=express()
dotenv.config();
const port=process.env.PORT 



app.get('/',(req,res)=>{
    res.send("backend is working")
})

app.use('/',require('./routes/login'))
app.use('/',require('./routes/posts'))


app.listen(port,()=>{
console.log(`we are online on ${port}`) 
})