# openweathermapapi
Open weather api, Javascript<br>
You can see a demo here http://point-us.de/openweather/

In this script, I used to Open Weather Api, geocoder google and Html, CSS, Javascript.
With this script you can serach a weather for your city or your address. 

<strong>How it's work?</strong>
First script get lat and long from your address than, script find your locatione, and than from latitude and longitude  We call api to get data from Open Weather Map.
I use this Api https://openweathermap.org/forecast5, to get data for 5 days, every 3hours.

Frist I got 2 function from this link https://developers.google.com/maps/documentation/javascript/geocoding to get latitude and longitude.
<br>lat  = results[0].geometry.location.lat();
<br> long = results[0].geometry.location.lng();
 
Then I called <strong>JSON Object</strong>
</br> $.getJSON('http://api.openweathermap.org/data/2.5/forecast?units=metric&lat=' + lat + '&lon=' + long + '&appid='+ API_KEY
</br> The JSON object bring me some data for 5 days in array.
</br> From this JSON array data I created 5 array for each single day.
</br>
    var arrday0 = [];
		    var arrday1 = [];
		    var arrday2 = [];
		    var arrday3 = [];
		    var arrday4 = [];

		    // Filter JSON arry in 5 arrays  for 5 days
		    for(i= 0; i < wd.list.length; i++){
		    	d = wd.list[i];

		    	var justdate = new Date(d.dt_txt);
		    	datewithformat = justdate.format("yyyy-mm-dd");

		    	var currentdata = new Date();
		    	var currentdataformat = currentdata.format("yyyy-mm-dd");
		    	if(datewithformat === currentdataformat){
		     		arrday0.push(wd.list[i]);
		    	}

		    	var day1 = new Date();
		    	day1.setDate(day1.getDate()+1); //Add Day +1
		    	var day1format = day1.format("yyyy-mm-dd");
		        if(datewithformat === day1format){
		     		arrday1.push(wd.list[i]);
		     		
		    	}

		        var day2 = new Date();
		    	day2.setDate(day2.getDate()+2); //Add Day +2
		    	var day2format = day2.format("yyyy-mm-dd");
		        if(datewithformat === day2format){
		     		arrday2.push(wd.list[i]);
		     		
		    	}

		    	var day3 = new Date();
		    	day3.setDate(day3.getDate()+3); //Add Day +3
		    	var day3format = day3.format("yyyy-mm-dd");
		        if(datewithformat === day3format){
		     		arrday3.push(wd.list[i]);
		     		
		    	}

                var day4 = new Date();
		    	day4.setDate(day4.getDate()+4); //Add Day +4
		    	var day4format = day4.format("yyyy-mm-dd");
		        if(datewithformat === day4format){
		     		arrday4.push(wd.list[i]);
		    	}


		    }
</br>
Then I used array for each single day.

<br>You can see main.js and html file, I hope it's helpful for you.
<br>See you soon
