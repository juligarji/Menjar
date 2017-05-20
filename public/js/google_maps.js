var bogota = {lat: 4.710989, lng: -74.072092};
var map;
var marker;
function initMap() {

    map = new google.maps.Map(document.getElementById('google_map'), {
      zoom: 15,
      center: bogota
    });
    marker = new google.maps.Marker({
      position: bogota,
      map: map
    });
}
