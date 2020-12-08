const express=require('express')
const app=express()


const route=require('./route/route')
const bodyParser=require('body-parser')

const port =process.env.PORT | 8080;
app.use(bodyParser.json())

const {sequelize}=require('./models')
//testin url

app.get('/',(req,res)=>{
    res.json({message:"welcome...."})
})

app.use('/api',route)

// .sync(//{force:true} DELETES ALL TABLES AND RECREATE WITH NEW CHANGES  
//{alter:true} Creates new table with changes made keeping previous tables

app.listen(port,async()=>{
    console.log(`connected to ${port}`)
    await sequelize.authenticate()
    console.log('connected to database..')  
})
                