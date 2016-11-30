/*
	References to the Weather Api : http://openweathermap.org/current
*/
var Weather;
$( document ).ready(function() {

	Weather = (function(){
		function apiUrl( city ){
			var api = "http://api.openweathermap.org/data/2.5/weather?q=";
			var units = "&units=metric";
			var appid = "&APPID=12a712ba4ec0c3666ad820e0bdaf3596";
			return api + city + units + appid;
		}

		function getAjax( api, cb ){
			$.ajax({
				    url: api,
				    jsonp: "callback",
				    dataType: "jsonp",
				    success: function( response ) {
				        cb( response );
				    }
				});
		}

		function getWeatherFromCity( city ){
			var api = apiUrl( city );
			getAjax( api , function( response ){
				console.log( response );
			});

		}

		function getCurrentLocation( cb ){
			var api = "http://ipinfo.io/json";
			getAjax( api , function( response ){
				cb( response );
			});

		}

		return {
			getWeatherInfo : function(){
				getCurrentLocation( function( response ){
					var city = response.city + ',' + response.country;
					getWeatherFromCity( city );
				});
			}
		}
	 })();


});