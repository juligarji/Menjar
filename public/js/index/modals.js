function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
  console.log('Taking a break...');
  await sleep(2000);
  console.log('Two second later');
}

// demo();

$(document).ready(function(){
    $('#modal_map').modal({
        ready: function(){
            var map = document.getElementById("google_map");
            google.maps.event.trigger(map, 'resize');
        }
    });

    $('#modal_map_btn').click(async function(){
        console.log("Clicked");
        await sleep(310);
        map.setCenter(marker.getPosition());
        console.log("Go");
    });

});
