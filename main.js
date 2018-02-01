// API KEY from https://openweathermap.org/
var API_KEY="80c8c7b98de4c1c8557a075b6b25d4cf";

function initialize() {
        var address = (document.getElementById('my-address'));
        var autocomplete = new google.maps.places.Autocomplete(address);
        autocomplete.setTypes(['geocode']);
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                return;
            }

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
        }
      });
}

function codeAddress() {
    geocoder = new google.maps.Geocoder();
    var address = document.getElementById("my-address").value;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {

      lat  = results[0].geometry.location.lat();
      long = results[0].geometry.location.lng();
	      	 $.getJSON('http://api.openweathermap.org/data/2.5/forecast?units=metric&lat=' + lat + '&lon=' + long + '&appid='+ API_KEY, function(wd){
		  	console.log("go the data ,", wd);
		    

		    var d, i, justdate, datewithformat, currentdata, currentdataformat, day1, day1format, day2, day2format, day3, day3format, day4, day4format;
		    var l, l1, l2,l3,l4;
		    // Five array for 5 days
		    var arrday0 = [];
		    var arrday1 = [];
		    var arrday2 = [];
		    var arrday3 = [];
		    var arrday4 = [];

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

		    var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
		    var htmldata = "";
		    var htmldatatoday ="";
		    var a, cdtempmax, cdtempmin, cddate, cddateday, cddateformat, cdhour, icon, iconSrc, wspeed ;
		    //First Day, For loop for first day
		    for(i=0; i< arrday0.length; i++){
		    	l = arrday0[i];
		    	cdtempmax = (l.main.temp_max).toFixed();
		    	cdtempmin = (l.main.temp_min).toFixed();
		    	icon = l.weather[0].icon;
		    	wspeed = l.wind.speed;
		    	var iconSrc= "http://openweathermap.org/img/w/"+ icon +".png";
		    	var cddate = new Date(l.dt_txt);
		    	var a = new Date(cddate);
                var cddateday = weekday[a.getDay()];
		    	cddateformat = cddate.format("h:MM TT");

		    	// Different template for first of day
		    	if(i == 0){
			       htmldatatoday +='<div class="forecast-header">'
                      htmldatatoday +='<div class="day" id="day0">'+cddateday+'  '+ cddateformat +'</div>'
                        htmldatatoday +='<div class="date"></div>'
                          htmldatatoday +='</div>'
                             htmldatatoday +='<div class="forecast-content">'
                                htmldatatoday +='<div class="location"  id="locatione"></div>'
                               htmldatatoday +=' <div class="degree">'
                                  htmldatatoday +='<div class="row">'
                                      htmldatatoday +='<div class="col-sm-8">'
                                          htmldatatoday +='<div class="num"><div class="temp" id="temp">'+ cdtempmax +'</div><sup>o</sup>C</div>'
                                     htmldatatoday +=' </div>'
                                      htmldatatoday +='<div class="col-sm-4">'
                                        htmldatatoday +='<div class="forecast-icon">'
                                          htmldatatoday +='<img src="'+ iconSrc +'" alt="" width=90>'
                                        htmldatatoday +='</div>'
                                      htmldatatoday +='</div>'
                                htmldatatoday +='</div>'
                                htmldatatoday +='</div>'
                                htmldatatoday +='<span><img src="images/icon-wind.png" alt="">' + wspeed + ' m/s</span>'
                              htmldatatoday +='</div>'
			    	document.getElementById("today").innerHTML = htmldatatoday;
			     }
			     else{
			     	htmldata +='<div class="forecast">';
	                htmldata += '<div class="forecast-header">';
	                 htmldata += '<div class="day" id="day1">'+ cddateformat +'</div>';
	                    htmldata +='</div>';
	                       htmldata += '<div class="forecast-content">';
	                         htmldata += '<div class="forecast-icon">';
	                            htmldata += '<img src="'+ iconSrc +'" alt="" width=70>';
	                           htmldata += '</div>';
	                        htmldata += '<div class="degree"><div class="temp" id="temp1">'+ cdtempmax +'</div><sup>o</sup>C</div>';
	                        htmldata += '<small><div class="temp" id="tempmin1">'+ cdtempmin +'</div><sup>o</sup></small>';
	                        htmldata +='</div>';
	                        htmldata += '</div>';
			    	document.getElementById("dayone").innerHTML = htmldata;


			     }
		    }


		    // Next Day
		    var htmldatatoday1 = "";
		    var htmldata1 = "";
		    var cdtempmax1, cdtempmin1, cddate1, cddateformat1, cdhour1, icon1, iconSrc1;

		    for(i=0; i< arrday1.length; i++){
		    	l = arrday1[i];
		    	cdtempmax1 = (l.main.temp_max).toFixed();
		    	cdtempmin1 = (l.main.temp_min).toFixed();
		        wspeed = l.wind.speed;
		    	icon1 = l.weather[0].icon;
		    	var iconSrc1 = "http://openweathermap.org/img/w/"+ icon1 +".png";
		    	var cddate1 = new Date(l.dt_txt);
		    	cddateformat1 = cddate1.format("h:MM TT"); 	
		    	var a = new Date(cddate1);
                var cddateday = weekday[a.getDay()];

		    	if(i == 0){
			       htmldatatoday1 +='<div class="forecast-header">'
                      htmldatatoday1 +='<div class="day" id="day0">'+cddateday +' '+ cddateformat1 +'</div>'
                        htmldatatoday1 +='<div class="date"> </div>'
                          htmldatatoday1 +='</div>'
                             htmldatatoday1 +='<div class="forecast-content">'
                                htmldatatoday1 +='<div class="location"  id="locatione"></div>'
                               htmldatatoday1 +=' <div class="degree">'
                                  htmldatatoday1 +='<div class="row">'
                                      htmldatatoday1 +='<div class="col-sm-8">'
                                          htmldatatoday1 +='<div class="num"><div class="temp" id="temp">'+ cdtempmax1 +'</div><sup>o</sup>C</div>'
                                     htmldatatoday1 +=' </div>'
                                      htmldatatoday1 +='<div class="col-sm-4">'
                                        htmldatatoday1 +='<div class="forecast-icon">'
                                          htmldatatoday1 +='<img src="'+ iconSrc +'" alt="" width=90>'
                                        htmldatatoday1 +='</div>'
                                      htmldatatoday1 +='</div>'
                                htmldatatoday1 +='</div>'
                                htmldatatoday1 +='</div>'
                                htmldatatoday1 +='<span><img src="images/icon-wind.png" alt="">' + wspeed + ' m/s</span>'
                              htmldatatoday1 +='</div>'
			    	document.getElementById("nextday1").innerHTML = htmldatatoday1;
			     }
			     else{
			    	htmldata1 +='<div class="forecast">';
	                htmldata1 += '<div class="forecast-header">';
	                 htmldata1 += '<div class="day" id="day1">'+ cddateformat1 +'</div>';
	                    htmldata1 +='</div>';
	                       htmldata1 += '<div class="forecast-content">';
	                         htmldata1 += '<div class="forecast-icon">';
	                            htmldata1 += '<img src="'+ iconSrc1 +'" alt="" width=70>';
	                           htmldata1 += '</div>';
	                        htmldata1 += '<div class="degree"><div class="temp" id="temp1">'+ cdtempmax1 +'</div><sup>o</sup>C</div>';
	                        // htmldata1 += '<small><div class="temp" id="tempmin1">'+ cdtempmin1 +'</div><sup>o</sup></small>';
	                        htmldata1 +='</div>';
	                        htmldata1 += '</div>';
			    	document.getElementById("daytwo").innerHTML = htmldata1;
			     }
		    }
		    var htmldaday2 = "";
		    var htmldata2 = "";
		    for(i=0; i< arrday2.length; i++){
		    	l = arrday2[i];
		        cdtempmax1 = (l.main.temp_max).toFixed();
		    	cdtempmin1 = (l.main.temp_min).toFixed();
		        wspeed = l.wind.speed;
		    	icon1 = l.weather[0].icon;
		    	var iconSrc1 = "http://openweathermap.org/img/w/"+ icon1 +".png";
		    	var cddate1 = new Date(l.dt_txt);
		    	cddateformat1 = cddate1.format("h:MM TT"); 	
		    	var a = new Date(cddate1);
                var cddateday = weekday[a.getDay()]; 	

		    	if(i == 0){
			       htmldaday2 +='<div class="forecast-header">'
                      htmldaday2 +='<div class="day" id="day0">'+cddateday +' '+ cddateformat1 +'</div>'
                        htmldaday2 +='<div class="date"> </div>'
                          htmldaday2 +='</div>'
                             htmldaday2 +='<div class="forecast-content">'
                                htmldaday2 +='<div class="location"  id="locatione"></div>'
                               htmldaday2 +=' <div class="degree">'
                                  htmldaday2 +='<div class="row">'
                                      htmldaday2 +='<div class="col-sm-8">'
                                          htmldaday2 +='<div class="num"><div class="temp" id="temp">'+ cdtempmax1 +'</div><sup>o</sup>C</div>'
                                     htmldaday2 +=' </div>'
                                      htmldaday2 +='<div class="col-sm-4">'
                                        htmldaday2 +='<div class="forecast-icon">'
                                          htmldaday2 +='<img src="'+ iconSrc +'" alt="" width=90>'
                                        htmldaday2 +='</div>'
                                      htmldaday2 +='</div>'
                                htmldaday2 +='</div>'
                                htmldaday2 +='</div>'
                                htmldaday2 +='<span><img src="images/icon-wind.png" alt="">' + wspeed + ' m/s</span>'
                              htmldaday2 +='</div>'
			    	document.getElementById("nextday2").innerHTML = htmldaday2;
			     }
			     else{
		    	htmldata2 +='<div class="forecast">';
                htmldata2 += '<div class="forecast-header">';
                 htmldata2 += '<div class="day" id="day1">'+ cddateformat1 +'</div>';
                    htmldata2 +='</div>';
                       htmldata2 += '<div class="forecast-content">';
                         htmldata2 += '<div class="forecast-icon">';
                            htmldata2 += '<img src="'+ iconSrc1 +'" alt="" width=70>';
                           htmldata2 += '</div>';
                        htmldata2 += '<div class="degree"><div class="temp" id="temp1">'+ cdtempmax1 +'</div><sup>o</sup>C</div>';
                        // htmldata2 += '<small><div class="temp" id="tempmin1">'+ cdtempmin1 +'</div><sup>o</sup></small>';
                        htmldata2 +='</div>';
                        htmldata2 += '</div>';
		    	document.getElementById("daythree").innerHTML = htmldata2;
		       }
		    }

		    var htmldaday3 = "";
		    var htmldata3 = "";
		    for(i=0; i< arrday3.length; i++){
		    	l = arrday3[i];
		        cdtempmax1 = (l.main.temp_max).toFixed();
		    	cdtempmin1 = (l.main.temp_min).toFixed();
		        wspeed = l.wind.speed;
		    	icon1 = l.weather[0].icon;
		    	var iconSrc1 = "http://openweathermap.org/img/w/"+ icon1 +".png";
		    	var cddate1 = new Date(l.dt_txt);
		    	cddateformat1 = cddate1.format("h:MM TT"); 	
		    	var a = new Date(cddate1);
                var cddateday = weekday[a.getDay()]; 	

		    	 if(i == 0){
			       htmldaday3 +='<div class="forecast-header">'
                      htmldaday3 +='<div class="day" id="day0">'+cddateday +' '+ cddateformat1 +'</div>'
                        htmldaday3 +='<div class="date"> </div>'
                          htmldaday3 +='</div>'
                             htmldaday3 +='<div class="forecast-content">'
                                htmldaday3 +='<div class="location"  id="locatione"></div>'
                               htmldaday3 +=' <div class="degree">'
                                  htmldaday3 +='<div class="row">'
                                      htmldaday3 +='<div class="col-sm-8">'
                                          htmldaday3 +='<div class="num"><div class="temp" id="temp">'+ cdtempmax1 +'</div><sup>o</sup>C</div>'
                                     htmldaday3 +=' </div>'
                                      htmldaday3 +='<div class="col-sm-4">'
                                        htmldaday3 +='<div class="forecast-icon">'
                                          htmldaday3 +='<img src="'+ iconSrc +'" alt="" width=90>'
                                        htmldaday3 +='</div>'
                                      htmldaday3 +='</div>'
                                htmldaday3 +='</div>'
                                htmldaday3 +='</div>'
                                htmldaday3 +='<span><img src="images/icon-wind.png" alt="">' + wspeed + ' m/s</span>'
                              htmldaday3 +='</div>'
			    	document.getElementById("nextday3").innerHTML = htmldaday3;
			     }
			     else{
			    	htmldata3 +='<div class="forecast">';
	                htmldata3 += '<div class="forecast-header">';
	                 htmldata3 += '<div class="day" id="day1">'+ cddateformat1 +'</div>';
	                    htmldata3 +='</div>';
	                       htmldata3 += '<div class="forecast-content">';
	                         htmldata3 += '<div class="forecast-icon">';
	                            htmldata3 += '<img src="'+ iconSrc1 +'" alt="" width=70>';
	                           htmldata3 += '</div>';
	                        htmldata3 += '<div class="degree"><div class="temp" id="temp1">'+ cdtempmax1 +'</div><sup>o</sup>C</div>';
	                        // htmldata2 += '<small><div class="temp" id="tempmin1">'+ cdtempmin1 +'</div><sup>o</sup></small>';
	                        htmldata3 +='</div>';
	                        htmldata3 += '</div>';
			    	document.getElementById("dayfour").innerHTML = htmldata3;
			    }
		    }

		    var htmldaday4 = "";
		    var htmldata4 = "";
		    for(i=0; i< arrday4.length; i++){
		    	l = arrday4[i];
		    	cdtempmax1 = (l.main.temp_max).toFixed();
		    	cdtempmin1 = (l.main.temp_min).toFixed();
		    	icon1 = l.weather[0].icon;
		    	var iconSrc1 = "http://openweathermap.org/img/w/"+ icon1 +".png";
		    	var cddate1 = new Date(l.dt_txt);
		    	cddateformat1 = cddate1.format("h:MM TT"); 	


		    	 if(i == 0){
			       htmldaday4 +='<div class="forecast-header">'
                      htmldaday4 +='<div class="day" id="day0">'+cddateday +' '+ cddateformat1 +'</div>'
                        htmldaday4 +='<div class="date"> </div>'
                          htmldaday4 +='</div>'
                             htmldaday4 +='<div class="forecast-content">'
                                htmldaday4 +='<div class="location"  id="locatione"></div>'
                               htmldaday4 +=' <div class="degree">'
                                  htmldaday4 +='<div class="row">'
                                      htmldaday4 +='<div class="col-sm-8">'
                                          htmldaday4 +='<div class="num"><div class="temp" id="temp">'+ cdtempmax1 +'</div><sup>o</sup>C</div>'
                                     htmldaday4 +=' </div>'
                                      htmldaday4 +='<div class="col-sm-4">'
                                        htmldaday4 +='<div class="forecast-icon">'
                                          htmldaday4 +='<img src="'+ iconSrc +'" alt="" width=90>'
                                        htmldaday4 +='</div>'
                                      htmldaday4 +='</div>'
                                htmldaday4 +='</div>'
                                htmldaday4 +='</div>'
                                htmldaday4 +='<span><img src="images/icon-wind.png" alt="">' + wspeed + ' m/s</span>'
                              htmldaday4 +='</div>'
			    	document.getElementById("nextday4").innerHTML = htmldaday4;
			     }
			     else{

		    	htmldata4 +='<div class="forecast">';
                htmldata4 += '<div class="forecast-header">';
                 htmldata4 += '<div class="day" id="day1">'+ cddateformat1 +'</div>';
                    htmldata4 +='</div>';
                       htmldata4 += '<div class="forecast-content">';
                         htmldata4 += '<div class="forecast-icon">';
                            htmldata4 += '<img src="'+ iconSrc1 +'" alt="" width=70>';
                           htmldata4 += '</div>';
                        htmldata4 += '<div class="degree"><div class="temp" id="temp1">'+ cdtempmax1 +'</div><sup>o</sup>C</div>';
                        // htmldata2 += '<small><div class="temp" id="tempmin1">'+ cdtempmin1 +'</div><sup>o</sup></small>';
                        htmldata4 +='</div>';
                        htmldata4 += '</div>';
		    	document.getElementById("dayfive").innerHTML = htmldata4;
		    	}
		    }


            console.log("Filter results:", arrday0, arrday1, arrday2, arrday3, arrday4);



		  });
      } 

      else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }
google.maps.event.addDomListener(window, 'load', initialize);






// Data Format
var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};




