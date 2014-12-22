
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
            data: 'fartfartfart',
            dataType: "json",
            success: function(json){
              if(json.success == true){
                var places = json.response.responses[0].response;
                var forecasts = json.response.responses[1].response;
                $('#location').html(places.place.name + ", " + places.place.stateFull);
                jacketTest(forecasts[0].periods[0].pop, forecasts[0].periods[1].pop, forecasts[0].periods[2].pop, forecasts[0].periods[0].minFeelslikeF, forecasts[0].periods[1].minFeelslikeF, forecasts[0].periods[2].minFeelslikeF);
              } else {
                alert('An error occured: ' +json.error.description);
              }
            }
          });
    });
