const request=require("request");
const forecast = (latitude, longitude, callback) => {
    const url=`http://api.weatherstack.com/current?access_key=380d0d2e66f046472e1b7d04d90663e8&query=${latitude},${longitude}&units=f`;

    request({  url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location at this time', undefined)
        } else {
            const data=body.current;
            callback(undefined,data.weather_descriptions[0] +
        " " +
        "It is currently" +
        " " +
        data.temperature +
        " " +
        "degress" +
        " " +
        "out" +
        " " +
        "it feels like" +
        " " +
        data.feelslike +
        " " +
        "degress out")
        }
    })
}


    
    

module.exports=forecast