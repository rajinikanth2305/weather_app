console.log("client side javacsript file is loaded")
/*fetch("http://localhost:3000/weather?address=boston").then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)

        }
        else{
            console.log(data.location)
            console.log(data.forecast)

        }
    })

})*/

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherform.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;
    if (location) {
        messageOne.textContent = "Loadind data Please wait"
        messageTwo.textContent = ''

        fetch(`/weather?address=${location}`).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error;
                }
                else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast


                }
            })

        })

    }
    else {
        alert('Please enter address to search')
    }
})