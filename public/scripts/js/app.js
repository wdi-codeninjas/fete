$( document ).ready(function() {
    console.log( "ready!" );

    $.ajax({
      method: "GET",
      url: "http://ws.audioscrobbler.com/2.0/?method=geo.getevents&location=chicago&api_key=2e8b4c0a324101689acd8d782097b1fc&format=json",
      dataType: "json",

      success: function(data) {
        console.log(data);
        for (var i = 0; i < 10; i++) {
          $("ul").append("<li>" + data.events.event[i].title + "  |  " + data.events.event[i].venue.name + "  |  " + data.events.event[i].startDate +"</li>");
        }

      }
    });

    $('.forgot-pass').click(function(event) {
      $(".pr-wrap").toggleClass("show-pass-reset");
    });

    $('.pass-reset-submit').click(function(event) {
      $(".pr-wrap").removeClass("show-pass-reset");
    });

});
