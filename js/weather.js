console.log("Hello World!");

const weather = document.getElementById("weather");

function loadspinanimate()
{
    weather.style.visibility = "visible";
    //weather.style.display = "flex"; //centers the spinner
    weather.style.flexDirection = "row";
    weather.style.flexWrap = "wrap";
    weather.innerHTML = `<div class="spin"></div>`;
	getLocation();
}

function getLocation() {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(callbackfunc);
	}
	else {
		console.log("Geolocation is not supported");
	}
}

function displayDetails(data) {
	var crt_time = data.current_weather.time;
	var time_arr = data.hourly.time;
	var index = time_arr.indexOf(crt_time);
	weather.innerHTML = `
	<table>
		<tr>
			<td>Temperature</td>
			<td>${data.current_weather.temperature} °C</td>
		</tr>
		<tr>
			<td>Apparent Temperature</td>
			<td>${data.hourly.apparent_temperature[index]} ${data.hourly_units.apparent_temperature}</td>
		</tr>
		<tr>
			<td>Humidity</td>
			<td>${data.hourly.relativehumidity_2m[index]} ${data.hourly_units.relativehumidity_2m}</td>
		</tr>
		<tr>
			<td>Precipitation</td>
			<td>${data.hourly.precipitation_probability[index]} ${data.hourly_units.precipitation_probability}</td>
		</tr>
		<tr>
			<td>Rain</td>
			<td>${data.hourly.rain[index]} ${data.hourly_units.rain}</td>
		</tr>
		<tr>
			<td>Visibility</td>
			<td>${data.hourly.visibility[index]} ${data.hourly_units.visibility}</td>
		</tr>
		<tr>
			<td>Cloud Cover</td>
			<td>${data.hourly.cloudcover[index]} ${data.hourly_units.cloudcover}</td>
		</tr>
		<tr>
			<td>Radiation</td>
			<td>${data.hourly.direct_radiation[index]} ${data.hourly_units.direct_radiation}</td>
		</tr>
		<tr>
			<td>Wind Speed</td>
			<td>${data.hourly.windspeed_10m[index]} ${data.hourly_units.windspeed_10m}</td>
		</tr>
		<tr>
			<td>Wind Direction</td>
			<td>${data.current_weather.winddirection} deg</td>
		</tr>
		<tr>
			<td>Elevation</td>
			<td>${data.elevation} m</td>
		</tr>
		<tr>
			<td>Weather Code</td>
			<td>${data.current_weather.weathercode}</td>
		</tr>
		<tr>
			<td>Latitude</td>
			<td>${data.latitude}</td>
		</tr>
		<tr>
			<td>Longitude</td>
			<td>${data.longitude}</td>
		</tr>
		<tr>
			<td>Day</td>
			<td>${data.current_weather.is_day}</td>
		</tr>
	</table>`;
}

let api = "https://api.open-meteo.com/v1/forecast?"
let params = "&hourly=temperature_2m&hourly=precipitation_probability&hourly=visibility&hourly=rain&hourly=cloudcover&hourly=relativehumidity_2m&hourly=direct_radiation&hourly=apparent_temperature&hourly=windspeed_10m&current_weather=true";
let latitude = 12.8996;
let longitude = 80.2209;

function callbackfunc(position) {
	console.log(position);
	latitude = position.coords.latitude;
	longitude = position.coords.longitude;
	getWeather();
}

//async function is still required!!
async function getWeather() {
	let url = api + "latitude=" + latitude + "&longitude=" + longitude + params;
	const response = await fetch(url);
	let result = await response.json();
	console.log(result);
	displayDetails(result);
}

//loadspinanimate();
//getLocation(); // call back function will run getWeather()
//getWeather();



