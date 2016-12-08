// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";

$(document).on("ready", function() {

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
      $('#quake-html').append(quakeHtml);
      //console.log(quakeHtml);
    });
    //console.log(quakeFeatures);
  };
  function onError() {
    console.log("USGS query did not work!");
  };
});//get JSON data to store and later insert into template
