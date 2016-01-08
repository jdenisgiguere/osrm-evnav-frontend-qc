

var map = L.map('map');

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);


L.Routing.control({
    router: L.Routing.osrm({
            serviceUrl: 'http://evroute.ddns.net:5000/viaroute'
    }),
    waypoints: [
        L.latLng(45.487851, -75.50122),
        L.latLng(45.587851, -75.60122)
    ],
    routeWhileDragging: true,
    geocoder: L.Control.Geocoder.nominatim()
}).addTo(map);

// TODO: add custom icon png
var stationMarkerOptions = {
};

var markers = L.markerClusterGroup();

var stationsLayer = L.geoJson.ajax('stations-ce.json', {
    middleware: function(stationsCE) {
        var stationsGeoJSON = {
            "type": "FeatureCollection",
            "features" : []
        };
        for (i = 0; i < stationsCE.length; i++) {
            var ce = stationsCE[i];
            stationsGeoJSON.features.push({
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [ce.LatLng.Lng, ce.LatLng.Lat]
                },
                "properties" : {
                    "emplacement" : ce.ParkName
                }
            });
        }
        return stationsGeoJSON;
    },
    pointToLayer: function(feature, latlng) {
        var marker = L.marker(latlng, stationMarkerOptions);
        markers.addLayer(marker)
        return marker;
    }
});

map.addLayer(markers);
