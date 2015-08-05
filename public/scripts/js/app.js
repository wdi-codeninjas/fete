$( document ).ready(function() {
    console.log( "ready!" );

    $('.empty').click(function(event) {
      $('.empty').slideUp(2000);
    });


    $('.menu').hide();
    $('.menu-items').hide();


  new GMaps({
      div: '#map',
      lat: -12.043333,
      lng: -77.028333
    });


    $.ajax({
      method: "GET",
      url: "http://ws.audioscrobbler.com/2.0/?method=geo.getevents&location=madrid&api_key=2e8b4c0a324101689acd8d782097b1fc&format=json",
      dataType: "json",

      success: function(data) {
        console.log(data);
        // var lat = new Array();
        // var long = new Array();
        for (var i = 0; i < 10; i++) {
          var event = data.events.event[i];
          $("ul").append("<li>" + event.title + "  |  " + event.venue.name + "  |  " + formatDate(event.startDate) + "  |  " + event.venue.location['geo:point']['geo:lat'] + "  |  " + event.venue.location['geo:point']['geo:long'] + "</li>");
          $("ul").append("<li><img height='200px' width='200px' src='"+ event.image[3]['#text'] + "'></li>");
          // lat[i] = event.venue.location['geo:point']['geo:lat'];
          // long[i] = event.venue.location['geo:point']['geo:long'];

        }

      }
    });

    $('.btn.btn-default.btn-lg').click(function(event) {
      $('.menu').toggle(1000);
      $('.menu-items').delay(500).toggle(1000);
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
