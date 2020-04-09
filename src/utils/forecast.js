const request = require('request');


const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/31b0a34d2beea925748cd53080edc369/${latitude},${longitude}?units=si`;
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('unable to connect to the service',undefined)
        } else if (response.body.error) {
            callback('unable to find location',undefined)

        } else {
            callback(undefined,{
                summary:response.body.currently.summary,
                percent: response.body.currently.precipProbability,
                temperature:response.body.currently.temperature,
            })
            
        }
    })

}

module.exports = forecast

