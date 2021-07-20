//Create a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.
var myMap = L.map("map", {
    center: [0,0],
    zoom: 13
  });
  
  var basic = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

  // create color range based on depth
  var colorRange = [0, 25, 50, 75]
var colors = ["#ff0000", 
    "#ff0099", 
    "#ffff00", 
    "#ff00f7", 
    "#9000ff"];

    var legend = L.control({
      position: "bottomright"
    });

    info.onAdd = function() {
      var div = L.DomUtil.create("div", "legend");
      return div;
    };
    // Add the info legend to the map
    legend.addTo(map);


// pull in the data for our visualization.
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson"

// Define function to create the circle marker size based on the magnitude
d3.json(link).then(function(data) {

  for (var i = 0; i < Math.max(data.features.length); i++) {
    
    var earthquake = Object.assign({}, data.features[i]);
    var coordinates = earthquake.geometry.coordinates
    var col = getColor(quakeCoordinates[2]);
    
    var newMarker = L.circle([coordinates[1], coordinates[0]],
        {radius : 2*Math.pow(10,earthquake.properties["mag"]), 
        color : col});
    // Bind a popup to the marker that will  display on click. This will be rendered as HTML
    newMarker.bindPopup("Magnitude: " + earthquake.properties["mag"] 
    +"<br>Depth: " + coordinates[2]
    +"<br>Place: " + earthquake.properties["place"])
    newMarker.addTo(map);
}
updateLegend();
});

// create legend
function updateLegend() {
  document.querySelector(".legend").innerHTML = [
    "Earthquakes by Depth and Magnitude <br>",
  ].join("");
}

// create function to set color based on depth
function getColor(depth) {
  for (var i=0; i<colorRange.length; i++){
      if (depth>=colorRange[i]) {return colors[i]} 
  }
  return colors[colorRange.length]
}
