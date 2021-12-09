const request=require('request')
const geocode=(address,callback)=>{
  const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/ + ${address} + .json?access_token=pk.eyJ1IjoicmFqaW5pa2FudGgyMzA1IiwiYSI6ImNrd3AycHFwbzA3MmUyb3FobDJrNmZqeHEifQ.MKGjgjAqN5n7cCyQbsmDYA&limit=1`
  request({url,json:true},(error,{body})=>{
    console.log(body.features)
    if(error){
      callback("unable to connect to location service!",undefined)
    }
    else if(!body.features){
      callback("Unable to find location. Try another service",undefined)
    }
    else{
    const data=body;
    const latitude=data.features[0].center[1]
    const longitude=data.features[0].center[0]
    callback(undefined,{
      latitude:data.features[0].center[1],
      longitude:data.features[0].center[0],
      location:data.features[0].place_name
    })
  }


  })
}
module.exports=geocode