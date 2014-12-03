var locationFinder = function(lat, long){
         jQuery(document).ready(function($) {
            $.ajax({
            url: "/api/",
            data: "p=" + lat + "," + long,
            dataType: "json",
            success: function(json) {
               if (json.success == true) {
                  var ab = json.response;
                  $('#location').html(ab[0].place.name + ", " + ab[0].place.stateFull); 
               }
               else {
                  alert('An error occurred: ' + json.error.description);
               }
            }
         });
      });
   };

   var jumperTest = function(id, temp) {
      if(temp < 60){
         $(id).html("Bring a sweater this morning!");
      }
      else{
         $(id).html("You wont need a sweater this morning!");
      }
   };

   var jacketTest = function(mornPop, afterPop, evenPop, mornTemp, afterTemp, evenTemp) {
      if(mornPop > 25){
         $('#morningJacket').html("Bring a jacket this morning!");
      }
      else{
         jumperTest('#morningJacket', mornTemp);
      }
      if(afterPop > 25){
         $('#afternoonJacket').html("Bring a jacket this afternoon!");
      }
      else{
         jumperTest('#afternoonJacket', afterTemp);
      }
      if(evenPop > 25){
         $('#eveningJacket').html("Bring a jacket this evening!");
      }
      else{
         jumperTest('#eveningJacket', evenTemp);
      }
   };
   jQuery(document).ready(function($) {
      $.ajax({
         url: "/api/",
         // The data we want to get
         data: 'filter=6hr&plimit=3&from=today+T06:00:00-08:00',
         dataType: "json",
         success: function(json) {
            if (json.success == true) {
               var ob = json.response;
               locationFinder(ob[0].loc.lat, ob[0].loc.long);
               //jumperTest();
               jacketTest(ob[0].periods[0].pop, ob[0].periods[1].pop, ob[0].periods[2].pop, ob[0].periods[0].minFeelslikeF, ob[0].periods[1].minFeelslikeF, ob[0].periods[2].minFeelslikeF);
            }
            else {
               alert('An error occurred: ' + json.error.description);
            }
         }
      });
   });