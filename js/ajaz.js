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
      if(mornPop > 25){
         $("#morningCard").attr('class', 'card-image blue lighten-1');
         $('#morningImg').attr("src", "img/umbrella.svg");
         $('.morning').html("<p>...bring an umbrella!</p>");
      }
      else{
         jumperTest('morning', mornTemp);
      }
      if(afterPop > 25){
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

   jQuery(document).ready(function($) {
       $.ajax({
          url: "/api/",
          // The data we want to get
          data: '',
          dataType: "json",
          success: function(json) {
             if (json.success == true) {
                var ob = json.response;
                $('#location').html(ob.place.name + ", " + ob.place.stateFull); 
             }
             else {
                alert('An error occurred: ' + json.error.description);
             }
          }
       });

       $.ajax({
          url: "/api/",
          // The data we want to get
          data: 'filter=6hr&plimit=3&from=today+T06:00:00-08:00',
          dataType: "json",
          success: function(json) {
             if (json.success == true) {
                var ob = json.response;
                jacketTest(ob[0].periods[0].pop, ob[0].periods[1].pop, ob[0].periods[2].pop, ob[0].periods[0].minFeelslikeF, ob[0].periods[1].minFeelslikeF, ob[0].periods[2].minFeelslikeF);
             }
             else {
                alert('An error occurred: ' + json.error.description);
             }
          }
       });
    });