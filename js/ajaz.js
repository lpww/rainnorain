var forecastFinder = function(){
         $.ajax({
            url: "/api/",
            // The data we want to get
            data: 'filter=6hr&plimit=3&from=today+T06:00:00-08:00',
            dataType: "json",
            success: function(json) {
               if (json.success == true) {
                  var ob = json.response;
                  cache[currentLocation].forecast = ob[0];
                  console.log(cache);
                  jacketTest(cache[currentLocation].forecast.periods[0].pop, cache[currentLocation].forecast.periods[1].pop, cache[currentLocation].forecast.periods[2].pop, cache[currentLocation].forecast.periods[0].minFeelslikeF, cache[currentLocation].forecast.periods[1].minFeelslikeF, cache[currentLocation].forecast.periods[2].minFeelslikeF);
               }
               else {
                  alert('An error occurred: ' + json.error.description);
               }
            }
      });
};

   var jumperTest = function(id, temp) {
      if(temp < 60){
         $("#" + id + "Card").attr('class', 'card-image green lighten');
         $("#" + id + "Img").attr("src", "img/jumper.svg");
         $("." + id).html("<p>...bring a sweater!</p>");
      }
      else{
         $("#" + id + "Card").attr('class', 'card-image yellow lighten-1');
         $("#" + id + "Img").attr("src", "img/glasses.svg");
         $("." + id).html("<p>...bring your sunnies!</p>");
      }
   };

   var jacketTest = function(mornPop, afterPop, evenPop, mornTemp, afterTemp, evenTemp) {
      if(mornPop > 100){
         $("#morningCard").attr('class', 'card-image blue lighten-1');
         $('#morningImg').attr("src", "img/umbrella.svg");
         $('.morning').html("<p>...bring an umbrella!</p>");
      }
      else{
         jumperTest('morning', mornTemp);
      }
      if(afterPop > 100){
         $("#afternoonCard").attr('class', 'card-image blue lighten-1');
         $('#afternoonImg').attr("src", "img/umbrella.svg");
         $('.afternoon').html("<p>...bring an umbrella!</p>");
      }
      else{
         jumperTest('afternoon', afterTemp);
      }
      if(evenPop > 25){
         $("#eveningCard").attr('class', 'card-image blue lighten-1');
         $('#eveningImg').attr("src", "img/umbrella.svg");
         $('.evening').html("<p>...bring an umbrella!</p>");
      }
      else{
         jumperTest('evening', evenTemp);
      }
   };

   var cache = {};
   var currentLocation;
   var locationBuilder = function(location){
      cache[location] = new Object;
   }

   jQuery(document).ready(function($) {
      $.ajax({
         url: "/api/",
         dataType: "json",
         success: function(json) {
            if (json.success == true) {
               var ab = json.response;
               currentLocation = ab[0].place.name;
               locationBuilder(currentLocation);
               //cache.locations
               cache[currentLocation].observations = ab[0];
               $('#location').html(ab[0].place.name + ", " + ab[0].place.stateFull); 
               console.log(cache[currentLocation]);
               console.log(cache);
               if(typeof cache[currentLocation].forecast === "object"){
                  console.log("cache here");
                  jacketTest(cache[currentLocation].forecast[0].periods[0].pop, cache[currentLocation].forecast[0].periods[1].pop, cache[currentLocation].forecast[0].periods[2].pop, cache[currentLocation].forecast[0].periods[0].minFeelslikeF, cache[currentLocation].forecast[0].periods[1].minFeelslikeF, cache[currentLocation].forecast[0].periods[2].minFeelslikeF);
               }
               else{
                  forecastFinder();
               }
            }
            else {
               alert('An error occurred: ' + json.error.description);
            }
         }
      });
   });