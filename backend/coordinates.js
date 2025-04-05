require('dotenv').config();
const axios=require('axios');
const GEO_CODE="http://api.openweathermap.org/geo/1.0/direct?"
const KEY=process.env.API_KEY;

const coordinates=async(q)=>{
    try{
        const url=`${GEO_CODE}q=${q}&appid=${KEY}`;
        const response=await axios.get(url);
        // console.log(response.data);
        const name=response.data[0].name;
        console.log("name:",name);
        const lat=response.data[0].lat;
        const lon=response.data[0].lon
        console.log("lat:",lat);
        console.log("lon:",lon);
        const res={lat,lon,name};
        return res;
    }
    catch(err){
        console.log("ERROR:",err);
    }

}

module.exports=coordinates