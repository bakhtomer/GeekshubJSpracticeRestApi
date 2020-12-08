
const express=require('express')
const app=express()
// app.use(express.json())
const route=require('./route/route')
const bodyParser=require('body-parser')

const port =process.env.PORT | 8080;
app.use(bodyParser.json())


//testin url
app.get('/',(req,res)=>{
    res.json({message:"welcome...."})
})

app.use('/api',route)


app.listen(port,()=>{
    console.log(`connected to ${port}`)
})