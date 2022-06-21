const loca = document.querySelector("#display #location h2")
const displayData = document.querySelector("#display")
const mainTemp = document.querySelector("#temp h1")
const maxminTemp = document.querySelector("#temp h4")
const descData = document.querySelector("#desc h3")
const wimage = document.querySelector("#desc img")
const appTemp = document.querySelector(".left #box1 h3")
const airPress = document.querySelector(".left #box2 h3")
const humidity = document.querySelector(".left #box3 h3")
const visibility = document.querySelector(".right #box1 h3")
const windGust = document.querySelector(".right #box2 h3")
const windSpeed = document.querySelector(".right #box3 h3")
const upDown = document.querySelector("#updown")
const Down = document.querySelector("#updown #down")
const Up = document.querySelector("#updown  #up")
const weatherDetails = document.querySelector("#collapsed-det")
const spinner = document.querySelector(".loading")


const showSpinner = () => {
    spinner.classList.add("loading-shown")
}
const hideSpinner = () => {
    spinner.classList.remove("loading-shown")
}


const date = new Date()
console.log(date.getDay())
var dayName ;
switch (date.getDay()) {
    case 1:
        dayName = "Mon"
        break;
    case 2:
        dayName = "Tue"
        break;
    case 3:
        dayName = "Wed"
        break;
    case 4:
        dayName = "Thurs"
        break;
    case 5:
        dayName = "Fri"
        break;
    case 6:
        dayName = "Sat"
        break;
    case 0:
        dayName = "Sun"
        break                                
    default:
        break;
}
console.log(dayName);

// const axios = require("axios").default;
const supDeg = "\u00B0C"

const form = document.querySelector("#form")
const btn = document.querySelector("button")

form.addEventListener("submit" , async (e) => {
    e.preventDefault();
    showSpinner()
    console.log(form.elements.cityName.value)
    const city = form.elements.cityName.value
    const key = "a35d4300d8490d8af0872e49d8798180"
    const unit = "metric"
    const base = "https://api.openweathermap.org/data/2.5/weather?q="
    const url = base + city + "&APPID=" + key + "&units=" + unit;
    try{
    const res = await axios.get(url)
    //console.log(res.data.main.temp)
    displayWeather(res.data)
    }
    catch(e){
        console.log(e.message)
        
        if(e.message ==="Network Error"){
            alert(e.message)
            console.log(e.message)
        }
        else{
            alert("Please enter a valid location")
        }
    }
    hideSpinner()
    form.elements.cityName.value = ""
})

const displayWeather = (weatherData) => { 
    console.log(weatherData.main.temp);
    const temp = Math.round(weatherData.main.temp);
    const minTemp = weatherData.main.temp_min
    const maxTemp = weatherData.main.temp_max
    const desc = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    const city = weatherData.name
    const feelsLike = weatherData.main.feels_like
    const pressure = weatherData.main.pressure
    const humidt = weatherData.main.humidity
    const visib = weatherData.visibility
    const wg = weatherData.wind.gust
    const ws = weatherData.wind.speed


    displayData.classList.remove("none")
    loca.innerHTML = city + " , " + weatherData.sys.country
    mainTemp.innerHTML = temp + "" + "<span><sup><sup>" + supDeg.sup() + "</sup></sup></span>"
    maxminTemp.innerHTML = maxTemp + " \u00B0C / " + minTemp + " \u00B0C" + "&nbsp &nbsp" + dayName
    descData.innerHTML = desc.slice(0,1).toUpperCase() + desc.slice(1,desc.length)
    wimage.setAttribute("src" , imageUrl)
    appTemp.innerHTML = feelsLike + "<span>" + supDeg + "</span"
    airPress.innerHTML = pressure + "<span> hPa</span>"
    humidity.innerHTML = humidt + "<span>%</span>"
    visibility.innerHTML = visib/1000 + "<span> km</span>"
    windGust.innerHTML = wg + "<span> m/s</span>"
    windSpeed.innerHTML = ws + "<span> m/s</span>"
    

}

upDown.addEventListener("click",() => {

    Down.classList.toggle("down")
    weatherDetails.classList.add("collapsed")
    if(weatherDetails.style.maxHeight){
        weatherDetails.style.maxHeight = null;
    }
    else{
        weatherDetails.style.maxHeight = weatherDetails.scrollHeight *10 + "px";
    }

})
