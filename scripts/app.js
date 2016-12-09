// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

$(document).on("ready", function() {
  //var sfLatLng = {lat: 0, lng: 0}
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 0, lng: 0},
      //app.js:37 -70.8229
      //app.js:38 -15.3207
      zoom: 1
    });

  var quakeSource = $('#quake-list').html();//tell variable which element ID contains material for template
  var quakeTemplate = Handlebars.compile(quakeSource);//run handlebars.compile to mold html material into template to "pour" json data into
  $.ajax({
    method: "GET",
    url: weekly_quakes_endpoint,
    success: onSuccess,
    error: onError,
  });
  function onSuccess(quakeResults) {
      var quakeFeatures = quakeResults.features;
      quakeFeatures.forEach(function(quakeFeatures) {
      var quakeHtml = quakeTemplate({
        mag: quakeFeatures.properties.mag,
        place: quakeFeatures.properties.place,
      });
/////////////////////////////////////////   MAP MARKERS  /////////////////////////////////////////
      var dataLat = quakeFeatures.geometry.coordinates[1];
      var dataLng = quakeFeatures.geometry.coordinates[0];
      var image = {
        url: 'reddot.png',
        scaledSize: new google.maps.Size(8, 8),
      };
      var marker = new google.maps.Marker({
      position: {
        lat: quakeFeatures.geometry.coordinates[1],
        lng: quakeFeatures.geometry.coordinates[0]
      },
      map: map,
      icon: image,
      title: quakeFeatures.properties.place
      });
//////////////////////////////////////////   CONSOLE LOGS   ///////////////////////////////////////
      console.log(marker);
      console.log(dataLat);
      console.log(dataLng);
      $('#quake-html').append(quakeHtml);
      //console.log(quakeHtml);
    });
    //console.log(quakeFeatures);
  };
  function onError() {
    console.log("USGS query did not work!");
  };
});//get JSON data to store and later insert into template
