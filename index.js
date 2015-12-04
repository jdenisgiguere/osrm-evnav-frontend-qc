var map = L.map('map');

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

L.Routing.control({
    waypoints: [
        L.latLng(45.487851, -75.50122),
        L.latLng(45.587851, -75.60122)
    ],
    routeWhileDragging: true
}).addTo(map);

var stationsGeojson = { "type": "FeatureCollection",
    "features" : [
        { "type": "Feature",
            "geometry": {"type": "Point", "coordinates": [-75.70122, 45.487851]},
            "properties" : { "voltage" : 240 }
        },
    ]
}

var stationMarkerOptions = {
    icon : L.divIcon({
        html : '<div class="map-marker-icon map-marker-icon-legend-CE"></div>'
    })
};

L.geoJson(stationsGeojson, {
    pointToLayer : function(feature, latlng) {
        return L.marker(latlng, stationMarkerOptions);
    }
}).addTo(map);


