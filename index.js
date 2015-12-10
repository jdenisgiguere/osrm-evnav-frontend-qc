

var map = L.map('map');

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);


L.Routing.control({
    router: L.Routing.osrm({
            serviceUrl:  'http://router.project-osrm.org/viaroute'
    }),
    waypoints: [
        L.latLng(45.487851, -75.50122),
        L.latLng(45.587851, -75.60122)
    ],
    routeWhileDragging: true,
    geocoder: L.Control.Geocoder.nominatim()
}).addTo(map);

var stationMarkerOptions = {
    icon : L.divIcon({
        html : '<div class="map-marker-icon map-marker-icon-legend-CE"></div>'
    })
};

L.geoJson.ajax('stations-ce.json', {
    middleware: function(stationsCE) {
        var stationsGeoJSON = { "type": "FeatureCollection",
            "features" : []
        };
        for (i = 0; i < stationsCE.length; i++) {
            var ce = stationsCE[i];
            stationsGeoJSON.features.push({ "type": "Feature",
                "geometry": {"type": "Point", "coordinates": [ce.LatLng.Lng, ce.LatLng.Lat]},
                "properties" : { "emplacement" : ce.ParkName }
            });
        }
        return stationsGeoJSON;
    },
    pointToLayer: function(feature, latlng) {
        return L.marker(latlng, stationMarkerOptions);
    }
}).addTo(map);


