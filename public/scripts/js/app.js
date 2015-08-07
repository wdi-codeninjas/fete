$( document ).ready(function() {
    console.log( "ready!" );




    $('.menu').hide();
    $('.eq-spinner').hide();





  $('#city-submit').click(function(evt) {
    $('.empty').slideUp(2000);
    $('#city-name-wrapper h1').empty();
    $('ul').empty();
    $('.eq-spinner').fadeIn(600).fadeOut(2000);
    $('#map').toggle();

    var map = new GMaps({
          div: '#map',
          lat: 0,
          lng: 0,
          zoom: 12
        });
      var cityname = $('#address').val().toUpperCase();
      $('#city-name-wrapper h1').append(cityname);

    $.ajax({
      method: "GET",
      url: "http://ws.audioscrobbler.com/2.0/?method=geo.getEvents&location=" + cityname + "&api_key=2e8b4c0a324101689acd8d782097b1fc&format=json",

      success: function(data) {
        console.log(data);


        for (var i = 0; i < 10; i++) {
          var concert = data.events.event[i];
          $("ul").append("<hr><li>" + concert.title + "  <br> " + concert.venue.name + "  <br>  " + formatDate(concert.startDate) + "</li>");
          $("ul").append("<img class='content-images' height='200px' width='200px' src='"+ concert.image[3]['#text'] + "'>");

          var concertform = '<form class="concertPost" action="/concerts/save_event" method="post">';
          concertform = concertform + '<input type="hidden" name="title" value="' + concert.title + '">';
          concertform = concertform + '<input type="hidden" name="name" value="' + concert.venue.name + '">';
          concertform = concertform + '<input type="hidden" name="date" value="' + formatDate(concert.startDate) + '">';
          concertform = concertform + '<input class="addconcert" type="submit" value="Add Event">';
          concertform = concertform + '</form>';
          $('ul').append(concertform);



          var lat = concert.venue.location['geo:point']['geo:lat'];
          var long = concert.venue.location['geo:point']['geo:long'];

              map.setCenter(lat, long);
              map.addMarker({
                 lat: lat,
                 lng: long,
                 title: cityname,
                 click: function(e) {
                   alert('You clicked in this marker');
                 }
                });


        }

      }

    });
  });




    $('.btn.btn-default.btn-lg').click(function(concert) {
      $('.menu').toggle(1000);
    });



});











function formatDate(date) {
  var d = new Date(date);
  var hh = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();
  var dd = "AM";
  var h = hh;
  if (h >= 12) {
      h = hh-12;
      dd = "PM";
  }
  if (h == 0) {
      h = 12;
  }
  m = m<10?"0"+m:m;

  s = s<10?"0"+s:s;

  /* if you want 2 digit hours:
  h = h<10?"0"+h:h; */

  var pattern = new RegExp("0?"+hh+":"+m+":"+s);

  var replacement = h+":"+m;
  /* if you want to add seconds
  replacement += ":"+s;  */
  replacement += " "+dd;

  return date.replace(pattern,replacement);
}
