var newYorkCoords = [40.73, -74.0059];
var mapZoomLevel = 12;

// Create the createMap function.
function createMap(bikeStations) {

  // Create the tile layer that will be the background of our map.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  // Create a baseMaps object to hold the lightmap layer.
  var baseMaps = {
    "Street Map": street
    };
  
  // Create an overlayMaps object to hold the bikeStations layer.
  var overlayMaps = {
    "Bike Stations": bikeStations
  };

  // Create the map object with options.
  var myMap = L.map("map-id", {
    center: newYorkCoords,
    zoom: mapZoomLevel,
    layers: [street, bikeStations]
  });

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);  
};

// Create the createMarkers function.
function createMarkers(response) {
  // Pull the "stations" property from response.data.
  var myStations = response.data.stations;
  // Initialize an array to hold the bike markers.
  var bikeMarkers = [];
  // Loop through the stations array.
  for (var i = 0; i < myStations.length; i++) {
    // For each station, create a marker, and bind a popup with the station's name.
    var stationCoords = [];
    stationCoords.push(myStations[i].lat);
    stationCoords.push(myStations[i].lon);
    bikeMarkers.push(L.marker(stationCoords).bindPopup(`<h1>${myStations[i].name}</h1> <hr> <h3>Capacity: ${myStations[i].capacity.toLocaleString()}</h3>`));
    // Add the marker to the bikeMarkers array.
  };
  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  var bikeStations = L.layerGroup(bikeMarkers);
  createMap(bikeStations);
};
// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
var url = 'https://gbfs.citibikenyc.com/gbfs/en/station_information.json';
d3.json(url).then(function(response) {
  createMarkers(response);
});


