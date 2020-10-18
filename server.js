const express = require('express');
const ejs = require('ejs');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));//мы разрешаем испльзовать эту папку, или не будет работать
app.set('view engine', ejs);

app.get('/', (req,res)=>{   
    let url =`https://api.thevirustracker.com/free-api?countryTimeline=EE`;
    let newDaily;
    let cases;
    let recoveries;
    let oldDaily;
    let oldCases;
    let oldRecoveries;
    let day = new Date();
    let nowday = `${day.getDate() - 1}/${day.getMonth()}/${day.getFullYear()-2000}`;
    
    console.log(nowday);

      axios.get(url)
    .then(function(response){
        newDaily = response.data.timelineitems[0][`${day.getMonth()}/${day.getDate() - 1}/${day.getFullYear()-2000}`].new_daily_cases;
        cases =response.data.timelineitems[0][`${day.getMonth()}/${day.getDate() - 1}/${day.getFullYear()-2000}`].total_cases;
        recoveries =response.data.timelineitems[0][`${day.getMonth()}/${day.getDate() - 1}/${day.getFullYear()-2000}`].total_recoveries; 
        oldDaily = response.data.timelineitems[0]["2/27/20"].new_daily_cases;
        oldCases =response.data.timelineitems[0]["2/27/20"].total_cases;
        oldRecoveries =response.data.timelineitems[0]["2/27/20"].total_recoveries;
        
        res.render("index.ejs", {newDaily: newDaily, cases: cases,recoveries: recoveries,oldDaily: oldDaily , oldCases: oldCases , oldRecoveries: oldRecoveries, day: nowday });

    })
    .catch(function(error){
        console.log(error);
    });
});

app.listen(3000,()=>{
    console.log('Server is running on Port 3000.');
});