const path = require('path')

const express = require('express');
const hbs = require('hbs');

const app = express();

const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//Define paths for Express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partials = path.join(__dirname,'../templates/partials')
//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partials)

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Amit Cohen'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Amit Cohen'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Amit Cohen'
    })
})
app.use(express.static(publicDirPath))

app.get('/weather',(req,res)=>{
   geocode(req.query.address,(error,{latitude,longitude} ={})=>{
    if(error){
        return res.send({error})
    }  
    forecast(latitude,longitude,(error,forecastData)=>{
        if(error){
            return res.send({error})
        }
        res.send({
            forecast: forecastData.temperature,
            
            address: req.query.address
        })
    }) 
   })
})
app.get('/products',(req,res)=>{
    
    if(!req.query.address){
return res.send({
    error: 'You must provide a valid address'
})
    }
    else{
        res.send()
    }
    res.send({
        products: []
    })
})
app.get('/help/*',(req,res)=>{
    res.render('pageNotFound',{
        target: 'Help article'
    })
    })
app.get('*',(req,res)=>{
    res.render('pageNotFound',{
        target: 'Page'
    })
})
app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})