function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer({suppressMarkers: true});
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 17.99458168085098, lng: -76.80154144701312 },
    zoom: 11.5,
    mapId: '37f1e2592a7ca566',
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false

  });



  //Name
  //Latitude, Longitude
  //Image URL
  //scaledSize width, height


  //SETTING MARKERS
  const markers =[

  [
    "ROJ Depot - 21 Rousseau Road",
    17.99451025254291,
    -76.79973900254369,
    "/static/js/bottle.png",
    68,
    61
    
  ],
  [
    "Total Service Station - Red Hills Road",
    18.035137306187757,
    -76.81215879935688,
    "/static/js/bottle.png",
    68,
    61
  ],
  [
    "Total Service Station - 29 Mackville Terrace",
    18.045297656029657,
    -76.82293253109448,
    "/static/js/bottle.png",
    68,
    61
  ],
  [
    "Total Service Station - Manor Park",
    18.051157894977877, 
    -76.79300655340812,
    "/static/js/bottle.png",
    68,
    61
  ],
  [
    "Total Service Station - Stanton Terrace",
    18.007738218909537,
    -76.77324473806301,
    "/static/js/bottle.png",
    68,
    61
  ],
  [
    "Jamaica Environment Trust (JET) - Constant Sprint Road",
    18.03273840513693,
    -76.795992324572,
    "/static/js/bottle.png",
    68,
    61
  ],
  [
    "Chilitos Jamexican Food - 88 Hope Road",
    18.02239169036883, 
    -76.77279897536388,
    "/static/js/bottle.png",
    68,
    61
  ],
  [
    "Seventh Day Adventist Church - Seaview Gardens",
    18.004666611047785, 
    -76.8431888600233,
    "/static/js/bottle.png",
    68,
    61
  ],
  [
    "Mona Anglican Church of Ascension - 1A Dasiy Avenue",
    18.01570929320122, 
    -76.7471918139853,
    "/static/js/bottle.png",
    68,
    61
  ],
  [
    "Boys Town Football Club",
    17.982238063911183,
    -76.80465781795873,
    "/static/js/bottle.png",
    68,
    61
  ],
  [
    "Pembrooke Hall Primary School",
    18.029955739455808, 
    -76.83006762932683,
    "/static/js/bottle.png",
    68,
    61
  ],
  [
    "Tarrant Primary School",
    18.012575207368172, 
    -76.811872067951,
    "/static/js/bottle.png",
    68,
    61
  ],
    [
    "The Queen's School",
    18.032313244862316,
    -76.79716614556301,
    "/static/js/bottle.png",
    68,
    61
  ],
  [
    "Convent of Mercy Academy",
    17.97990747458352, 
    -76.7797451487295,
    "/static/js/bottle.png",
    68,
    61
  ],
  [
    "St. Peter and Paul Preparatory School",
    18.018587156278002,
    -76.76956154861931,
    "/static/js/bottle.png",
    68,
    61
  ],
  [
    "Holy Childhood Preparatory School",
    18.007652597379785, 
    -76.79792410654652,
    "/static/js/bottle.png",
    68,
    61
  ],
  [
    "Allman Town Primary",
    17.98491725666934, 
    -76.78477812394851,
    "/static/js/bottle.png",
    68,
    61
  ],
  [
    "Half Way Tree Primary",
    18.017755996066576, -76.79820409374732,
    "/static/js/bottle.png",
    68,
    61
  ],
  [
    "Norman Manley High School",
    18.00069570025111,
    -76.8076089568967,
    "/static/js/bottle.png",
    68,
    61
  ],
  [
    "St. Georges College",
    17.977339330749036, 
    -76.78462939748555,
    "/static/js/bottle.png",
    68,
    61
  ],
  [
    "Haile Selassie High School",
    17.997467181215676,
    -76.82028381448201,
    "/static/js/bottle.png",
    68,
    61
  ],
  [
    "Meadowbrooke Preparatory School",
    18.04714933840992,
    -76.8138097017014,
    "/static/js/bottle.png",
    68,
    61
  ]
];

  for(let i=0; i<markers.length;i++){
    const currMarker = markers[i];
    new google.maps.Marker({
      position: { lat: currMarker[1], lng: currMarker[2] },
      map,
      title: currMarker[0],
      icon:{
        url: currMarker[3],
        scaledSize: new google.maps.Size(currMarker[4],currMarker[5])
      },
      animation: google.maps.Animation.DROP
  });
  }


//SETTING GEOLOCATION
infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

  locationButton.textContent = " Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          new google.maps.Marker({
          position: { lat: position.coords.latitude, lng: position.coords.longitude},
          map,
          title: "Current Location",
          icon:{
          url: "/static/js/me.png",
          scaledSize: new google.maps.Size(58,51)
      },
      animation: google.maps.Animation.DROP

  });
          place= pos;
          map.setCenter(pos);

//
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });


directionsRenderer.setMap(map);

  const onChangeHandler = function () {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  };

 
  document.getElementById("end").addEventListener("change", onChangeHandler);
}


//Calculate Best Route

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  directionsService
    .route({
      origin:place,

      destination: {
        query: document.getElementById("end").value,
      },
      travelMode: google.maps.TravelMode.DRIVING,
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
    })
    .catch((e) => window.alert("Directions request failed due to " + status));
} 

//Error Message
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);

}


/*
17.99458168085098, -76.80154144701312 Jamaica
17.99451025254291, -76.79973900254369 ROJ Depot - 21 Rousseau Road

18.035137306187757, -76.81215879935688 Total Service Station - Red Hills Road

18.045297656029657, -76.82293253109448 Total Service Station - 29 Mackville Terrace

18.051157894977877, -76.79300655340812 Total Service Station - Manor Park

18.007738218909537, -76.77324473806301 Total Service Station - Stanton Terrace

18.03273840513693, -76.795992324572 Jamaica Environment Trust (JET) - Constant Sprint Road

18.02239169036883, -76.77279897536388 Chilitos Jamexican Food - 88 Hope Road

18.004666611047785, -76.8431888600233 Seventh Day Adventist Church - Seaview Gardens

18.01570929320122, -76.7471918139853 Mona Anglican Church of Ascension - 1A Dasiy Avenue

17.982238063911183, -76.80465781795873 Boys Town Football Club

18.029955739455808, -76.83006762932683 Pembrooke Hall Primary School

18.012575207368172, -76.811872067951 Tarrant Primary School

18.032313244862316, -76.79716614556301 The Queen's School

17.97990747458352, -76.7797451487295 Convent of Mercy Academy

18.018587156278002, -76.76956154861931 St. Peter and Paul Preparatory School

18.007652597379785, -76.79792410654652 Holy Childhood Preparatory School

17.98491725666934, -76.78477812394851 Allman Town Primary

18.017755996066576, -76.79820409374732 Half Way Tree Primary

18.00069570025111, -76.8076089568967 Norman Manley High School

17.977339330749036, -76.78462939748555 St. Georges College

17.997467181215676, -76.82028381448201 Haile Selassie High School

18.04714933840992, -76.8138097017014 Meadowbrooke Preparatory School*/

