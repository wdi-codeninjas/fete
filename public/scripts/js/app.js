$( document ).ready(function() {
    console.log( "ready!" );

    $('.empty').click(function(event) {
      $('.empty').slideUp(2000);
    });

    $('.menu').hide();

    $.ajax({
      method: "GET",
      url: "http://ws.audioscrobbler.com/2.0/?method=geo.getevents&location=los angeles&api_key=2e8b4c0a324101689acd8d782097b1fc&format=json",
      dataType: "json",

      success: function(data) {
        console.log(data);
        for (var i = 0; i < 10; i++) {
          $("ul").append("<li>" + data.events.event[i].title + "  |  " + data.events.event[i].venue.name + "  |  " + formatDate(data.events.event[i].startDate) +"</li>");
        }

      }
    });

    $('.btn.btn-default.btn-lg').click(function(event) {
      $('.menu').toggle(1000);
    });





});
$('.forgot-pass').click(function(event) {
  $(".pr-wrap").toggleClass("show-pass-reset");
});

$('.pass-reset-submit').click(function(event) {
  $(".pr-wrap").removeClass("show-pass-reset");
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
