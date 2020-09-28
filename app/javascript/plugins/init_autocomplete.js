import places from 'places.js';
import * as L from 'leaflet';

// import 'leaflet/dist/images/marker-shadow.png';
// import 'leaflet/dist/images/marker-icon.png';
import "leaflet/dist/images/marker-shadow.png";

const initAutocomplete = () => {
    
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });



  const addressInput = document.getElementById('place_address');
  if (addressInput) {
    // places({ container: addressInput });
    var placesAutocomplete = places({
      // appId: '<YOUR_PLACES_APP_ID>',
      // apiKey: '<YOUR_PLACES_API_KEY>',
      container: document.querySelector('#place_address')
    });
    
    var map = L.map('map-container', {
      scrollWheelZoom: false,
      zoomControl: false
    });
    
    var osmLayer = new L.TileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 1,
        maxZoom: 18,
        attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
      }
    );
    
    var markers = [];
    
    map.setView(new L.LatLng(0, 0), 1);
    map.addLayer(osmLayer);
    
    placesAutocomplete.on('suggestions', handleOnSuggestions);
    placesAutocomplete.on('cursorchanged', handleOnCursorchanged);
    placesAutocomplete.on('change', handleOnChange);
    placesAutocomplete.on('clear', handleOnClear);
    
    function handleOnSuggestions(e) {
      markers.forEach(removeMarker);
      markers = [];
    
      if (e.suggestions.length === 0) {
        map.setView(new L.LatLng(0, 0), 1);
        return;
      }
    
      e.suggestions.forEach(addMarker);
      findBestZoom();
    }
    
    function handleOnChange(e) {
      markers
        .forEach(function(marker, markerIndex) {
          if (markerIndex === e.suggestionIndex) {
            markers = [marker];
            marker.setOpacity(1);
            findBestZoom();
          } else {
            removeMarker(marker);
          }
        });
    }
    
    function handleOnClear() {
      map.setView(new L.LatLng(0, 0), 1);
      markers.forEach(removeMarker);
    }
    
    function handleOnCursorchanged(e) {
      markers
        .forEach(function(marker, markerIndex) {
          if (markerIndex === e.suggestionIndex) {
            marker.setOpacity(1);
            marker.setZIndexOffset(1000);
          } else {
            marker.setZIndexOffset(0);
            marker.setOpacity(0.5);
          }
        });
    }

    
    function addMarker(suggestion) {
        var marker = L.marker(suggestion.latlng, {opacity: .4});
        marker.addTo(map);
        markers.push(marker);
    }
    
    function removeMarker(marker) {
      map.removeLayer(marker);
    }
    
    function findBestZoom() {
      var featureGroup = L.featureGroup(markers);
      map.fitBounds(featureGroup.getBounds().pad(0.5), {animate: false});
    }
  
  
  }};
  





export { initAutocomplete };