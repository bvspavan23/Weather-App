require('dotenv').config();
const express=require('express');
const app=express();
const axios=require('axios');
const PORT=5000;
const BASE_URL="https://api.openweathermap.org/data/2.5/weather?"
const FORECAST_URL="https://api.openweathermap.org/data/2.5/forecast?"
const KEY=process.env.API_KEY;
console.log("KEY:",KEY);

const cors=require('cors');
const coordinates=require('./coordinates');


const corsOptions = {
    origin: ["https://weather-app-gamma-one-93.vercel.app"],
};
app.use(cors(corsOptions));

app.use(express.json());

console.log("Coordinates",coordinates);


app.post('/api/v1/weather',async(req,res)=>{
    try{
        const {q}=req.body;
        const papi=await coordinates(q);        
        const lat=papi.lat;
        const lon=papi.lon;
        const name=papi.name;
        const url=`${BASE_URL}lat=${lat}&lon=${lon}&appid=${KEY}`;
        const response=await axios.get(url);
        console.log(response.data);
        res.send({message:"the weather details are",data:response.data,name});
    }
    catch(err){
        console.log("ERROR:",err);
        res.status(500).json({ message: "Error fetching weather details" });   
    } 
})

app.post('/api/v1/weather/forecast',async(req,res)=>{
    try{
        const {q}=req.body;
        const papi=await coordinates(q);        
        const lat=papi.lat;
        const lon=papi.lon;
        const name=papi.name;
        const url=`${FORECAST_URL}lat=${lat}&lon=${lon}&cnt=${1}&appid=${KEY}`;
        const response=await axios.get(url);
        console.log(response.data);
        res.send({message:"the forcasted details are",data:response.data,name});
    }
    catch(err){
        console.log("ERROR:",err);
        res.status(500).json({ message: "Error fetching weather details" });   
    } 
})


app.listen(PORT,()=>console.log(`server is running at ${PORT}`));