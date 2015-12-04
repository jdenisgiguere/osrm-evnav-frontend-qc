var map = L.map('map');

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

L.Routing.control({
    waypoints: [
        L.latLng(45.487851, -75.70122),
        L.latLng(45.587851, -75.80122)
    ],
    routeWhileDragging: true
}).addTo(map);
