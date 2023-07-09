let api_id = '76d5b6323c4fffe589f95a2433745e23';

var button = document.querySelector('.button')
var inputValue = document.querySelector('.inputValue')
var weatherName = document.querySelector('.weatherName')
var desc = document.querySelector('.desc')
var header_temp = document.querySelector('.temp')
var image = document.querySelector('.image')
var subDetails = document.querySelector('.subDetails')
var day1 = document.querySelector('.day1')
var day2 = document.querySelector('.day2')
var day3 = document.querySelector('.day3')
var day4 = document.querySelector('.day4')
var day5 = document.querySelector('.day5')
var lat = '';
var lon = '';
var max = new Array();
max[0] = new Array(); 
max[1] = new Array(); 
max[2] = new Array(); 
max[3] = new Array(); 
max[4] = new Array(); 
max[5] = new Array();


var temp = new Array();
temp[0] = new Array(); 
temp[1] = new Array(); 
temp[2] = new Array(); 
temp[3] = new Array(); 
temp[4] = new Array(); 
temp[5] = new Array();

var min = new Array();
min[0] = new Array(); 
min[1] = new Array(); 
min[2] = new Array(); 
min[3] = new Array(); 
min[4] = new Array(); 
min[5] = new Array();

var current_day = new Array();
current_day[0] = new Array(); 
current_day[1] = new Array(); 
current_day[2] = new Array(); 
current_day[3] = new Array(); 
current_day[4] = new Array(); 
current_day[5] = new Array();

var timetempmin = new Array();
timetempmin[0] = new Array(); 
timetempmin[1] = new Array(); 
timetempmin[2] = new Array(); 
timetempmin[3] = new Array(); 
timetempmin[4] = new Array(); 
timetempmin[5] = new Array();

var timewindspeed = new Array();
timewindspeed[0] = new Array(); 
timewindspeed[1] = new Array(); 
timewindspeed[2] = new Array(); 
timewindspeed[3] = new Array(); 
timewindspeed[4] = new Array(); 
timewindspeed[5] = new Array();

var timepre = new Array();
timepre[0] = new Array(); 
timepre[1] = new Array(); 
timepre[2] = new Array(); 
timepre[3] = new Array(); 
timepre[4] = new Array(); 
timepre[5] = new Array();

var timedesc = new Array();
timedesc[0] = new Array(); 
timedesc[1] = new Array(); 
timedesc[2] = new Array(); 
timedesc[3] = new Array(); 
timedesc[4] = new Array(); 
timedesc[5] = new Array();

var date = new Array();
var date_store  = new Array();
var cValue = new Array();

button.addEventListener('click', function(){
	fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=' + api_id + '&units=metric')
	.then(response => response.json())
	.then(data =>{

		var tempValue = data['main']['temp'];
		var descValue = data['weather']['description']
		var weathernameValue = data['name'];
		var subDetailsValue = data['sys']['country'];
		lat = data['coord']['lat'];
		lon = data['coord']['lon'];
		console.log(lat);
		console.log(lon);
		console.log(data);
		console.log(weathernameValue)
		subDetails.innerHTML = subDetailsValue + ' ,'+ tempValue +' ' + descValue + ' lat: ' + lat + ' lon: ' + lon; 
		header_temp.innerHTML = tempValue.toFixed(0) + "°" + 'C';
		weatherName.innerHTML = 'Weather ' + weathernameValue;
		weather(lat,lon);
		
	})


})

function weather(lat, lon){
	console.log(lat);
	console.log(lon);
	fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+ lat +'&lon='+ lon +'&appid=' + api_id + '&units=metric')
	.then(response => response.json())
	.then(data =>{
		console.log(data)
		var tempdescValue = data['list']['0']['dt_txt'];
		desc.innerHTML = tempdescValue;
		var day = dayReturn(tempdescValue);
		console.log(day);
		var count = 0;
		var i = 0;
		var x = 0;
		var change_day = 0;
		var change_day_count = 1;
		var todayDate;
		var c = 0;
		var maxData;
		var minData;
		var tempData;
		for(x; x<=6; x++){

			if (change_day >= 7){
				//console.log("the loop is break");
				//x = 10;
				//i = 40;
				break;	
			}

			for(i; i <= 39; i++){
				todayDate = data['list'][c]['dt_txt'];
				var check = todayDate.substring(8,10);
				var currentDate = data['list'][i]['dt_txt'];
				
				//console.log(todayDate + "and current date is :" + currentDate);
				
				if(check == currentDate.substring(8,10) ){
					
					maxData = data['list'][i]['main']['temp_max']; 
					max[change_day].push(maxData);
					minData = data['list'][i]['main']['temp_min']; 
					min[change_day].push(minData);


					//console.log(change_day);
	
				}
				
				else{
					//console.log("Inside else and i value is " + i + " and count is " + c);
					
					//console.log("Inside else and i value is " + i + " and count is " + c);
					cValue.push(c);
					c = count;
					change_day = change_day +1;
					//console.log("today date is " + todayDate);
					//i = c;
					var top_day = dayReturn(todayDate);
					top_day = top_day.substring(0, 3);
					//console.log(top_day)
					document.getElementById("day"+change_day).innerHTML = top_day;
					//console.log(top_day);
					
					//tempData = data['list'][i]['main']['temp'];
					//temp[change_day].push(tempData);
					
					change_day_count = change_day_count + 1;
					
					break;
				}
				count = count + 1;
			
			}
			//console.log("outside loop")

		}
		//console.log(date);
		//console.log(temp);
		//console.log("max 0 value is " + max[0]);
		//console.log("max 1 value is " + max[1]);
		//console.log("max 2 value is " + max[2]);
		//console.log("max 3 value is " + max[3]);
		//console.log("max 4 value is " + max[4]);
		//console.log("max 5 value is " + max[5]);	
//
		//console.log("min 0 value is " + min[0]);
		//console.log("min 1 value is " + min[1]);
		//console.log("min 2 value is " + min[2]);
		//console.log("min 3 value is " + min[3]);
		//console.log("min 4 value is " + min[4]);
		//console.log("min 5 value is " + min[5]);
		//console.log("The cValue is" + cValue);
		var aa = 1;
		//document.getElementById("day"+1+"max").innerHTML = max[0][0];
		for(var a = 0; a < 5;a++){
			
			document.getElementById("day"+aa+"max").innerHTML = max[a][0]+ "°C";
			document.getElementById("day"+aa+"min").innerHTML = min[a][0]+ "°C";
			//var k = cValue[a]
			var storetempData = data['list'][cValue[a]]['main']['temp'];
			var storewindData = data['list'][cValue[a]]['wind']['speed'];
			var storepreData = data['list'][cValue[a]]['weather']['0']['main'];
			var storedescData = data['list'][cValue[a]]['weather']['0']['description'];

			var imgData = data['list'][cValue[a]]['weather']['0']['icon'];
			//console.log(storedescData);
			console.log(cValue[a]);
			document.getElementById("day"+aa+"temp").innerHTML = storetempData;
			document.getElementById("day"+aa+"wind").innerHTML = storewindData + "km/h";
			document.getElementById("day"+aa+"pre").innerHTML = storepreData;
			document.getElementById("day"+aa+"desc").innerHTML = storedescData;
			document.getElementById("day" + aa +"img").src = "http://openweathermap.org/img/wn/"+ imgData
			+".png";
			//console.log(imgData)
			aa = aa +1;

		}
		
		
		console.log(cValue)
		for(var i = 1;i<=4;i++){
			var cvaluecount = cValue[i]
			for(var x = 1; x<=8;x++){
				var daystore = data['list'][cvaluecount]['main']['temp_max'];
				current_day[i].push(daystore);

				var timemin = data['list'][cvaluecount]['main']['temp_min'];
				timetempmin[i].push(timemin);

				var timewindData = data['list'][cvaluecount]['wind']['speed'];
				timewindspeed[i].push(timewindData);

				var timepreData = data['list'][cvaluecount]['weather']['0']['main'];
				timepre[i].push(timepreData);
				
				var timedescData = data['list'][cvaluecount]['weather']['description'];
				timedesc[i].push(timedescData);
				cvaluecount++;
			}
		}
		var sub = data['list'][0]['dt_txt'];
		sub = sub.substring(11,13);
		checkfor(sub);
		for(var i = 0; i<cValue[1];i++){
			daystore = data['list'][i]['main']['temp_max'];
			current_day[0].push(daystore);

			timemin = data['list'][i]['main']['temp_min'];
			timetempmin[0].push(timemin);

			timewindData = data['list'][i]['wind']['speed'];
			timewindspeed[0].push(timewindData);

			timepreData = data['list'][i]['weather']['0']['main'];
			timepre[0].push(timepreData);

			timedescData = data['list'][i]['weather']['description'];
			timedesc[0].push(timedescData);
		}
		console.log(current_day);
		//------------------------------------------------------------
	})
}


function dayReturn(date){
	const d = new Date(date);
	let day = d.getDay()
	date_store.push(date);
	switch (day){
		case 1:
			return 'Monday'
		case 2:
			return 'Tuesday'
		case 3:
			return 'Wednesday'
		case 4:
			return 'Thursday'
		case 5:
			return 'Friday'
		case 6:
			return 'Saterday'
		case 7:
			return 'Sunday'
		default:
			return 'Sunday'
	}


}
function checkfor(input){
	var store_data = new Array();
	store_data.push('00','03','06','09','12','15','18','21');
	var i = 0;
	while(i<=7){
		if(store_data[i] != input){
			current_day[0].push('None');
			timetempmin[0].push('-.-');
			timewindspeed[0].push('-.-');
			timepre[0].push('-.-');
			timedesc[0].push('-.-');
		}
		else if(store_data[i] == input){
			break;
		}
		i++;
	}

}

function day0(){
		for(var x = 0; x<8;x++){
			document.getElementById('today-date').innerHTML = 
			document.getElementById("time" + x + "tempmax").innerHTML = current_day[0][x] + "°C";
			document.getElementById("time" + x + "tempmin").innerHTML = timetempmin[0][x] + "°C";
			document.getElementById("time" + x + "wind").innerHTML = timewindspeed[0][x] + "km/h";
			document.getElementById("time" + x + "pre").innerHTML = timepre[0][x];
			document.getElementById("time" + x + "desc").innerHTML = timedesc[0][x];
		}
}

function day11(){
	for(var x = 0; x<8;x++){
		document.getElementById("time" + x + "tempmax").innerHTML = current_day[0][x] + "°C";
		document.getElementById("time" + x + "tempmin").innerHTML = timetempmin[0][x] + "°C";
		document.getElementById("time" + x + "wind").innerHTML = timewindspeed[0][x] + "km/h";
		document.getElementById("time" + x + "pre").innerHTML = timepre[0][x];
		document.getElementById("time" + x + "desc").innerHTML = timedesc[0][x];
	}
}
function day22(){
	for(var x = 0; x<8;x++){
		document.getElementById("time" + x + "tempmax").innerHTML = current_day[2][x] + "°C";
		document.getElementById("time" + x + "tempmin").innerHTML = timetempmin[2][x] + "°C";
		document.getElementById("time" + x + "wind").innerHTML = timewindspeed[2][x] + "km/h";
		document.getElementById("time" + x + "pre").innerHTML = timepre[2][x];
		document.getElementById("time" + x + "desc").innerHTML = timedesc[2][x];
	}
}
function day33(){
	for(var x = 0; x<8;x++){
		document.getElementById("time" + x + "tempmax").innerHTML = current_day[3][x] + "°C";
		document.getElementById("time" + x + "tempmin").innerHTML = timetempmin[3][x] + "°C";
		document.getElementById("time" + x + "wind").innerHTML = timewindspeed[3][x] + "km/h";
		document.getElementById("time" + x + "pre").innerHTML = timepre[3][x];
		document.getElementById("time" + x + "desc").innerHTML = timedesc[3][x];
	}
}
function day44(){
	for(var x = 0; x<8;x++){
		document.getElementById("time" + x + "tempmax").innerHTML = current_day[4][x] + "°C";
		document.getElementById("time" + x + "tempmin").innerHTML = timetempmin[4][x] + "°C";
		document.getElementById("time" + x + "wind").innerHTML = timewindspeed[4][x] + "km/h";
		document.getElementById("time" + x + "pre").innerHTML = timepre[4][x];
		document.getElementById("time" + x + "desc").innerHTML = timedesc[4][x];
	}
}
