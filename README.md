# song city

![alt image] (http://i.imgur.com/EdSKFt7.png)
![alt image] (http://i.imgur.com/M4IxixE.png)
![alt image] (http://i.imgur.com/8Rk7bzi.png)


**"Song City":VERSION 1.0 (built in 4 days)**
**SUMMARY:** This is a full stack web application that finds the top 10 shows/festivals based on any city in the world. 

**PURPOSE:** To provide a simple and effective user experience for finding local shows/festivals in your area.

**HOW THE WEBSITE WORKS:** Enter the name of a city. Find shows and festivals in that city. Register for an account to save your desired shows.

**TECHNOLOGIES USED:** HTML5, CSS3, SASS, Media Queries, BOOTSTRAP, API, AJAX, JSON, JAVASCRIPT, JQUERY, MVC, SINATRA, ACIVE RECORD, Ruby, SQL.

**PROUD MOMENT IN OUR app.js FOLDER**
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




### How to Install and Run
1. Clone this repository
2. Navigate to the directory it is stored in.
3. Bundle the Gemfile 
4. Run the migrations.sql file in PostgreSQL to gernate the required databases.
5. Run 'bundle exec rackup'
6. Browse to localhost:9292

**Original Mockup/ Wireframe**
![alt image] (http://i.imgur.com/44zSPzM.jpg)

**VERSION 2.0 will include:** improved fonts, images, more reliable API, logo, delete option for saved events, improved animations, "saved" shows menu gave the image as well as the location, logout button functionality, more items on the menu bar, about page, Mandrill account creation/confirmation email.
