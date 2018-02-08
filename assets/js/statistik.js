var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

var photos;
var overlay = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
});

$.get(_api + 'statistik/query?jenis=lain&hari=0', function(data) {
    console.log(data);
    for (i = 0; i < data.length; i++) {
        var feature = new ol.Feature(data[i]);
        // feature.set('nama', data[i].nama);
        var coordinate = [parseFloat(data[i].longitude), parseFloat(data[i].latitude)];
        var geometry = new ol.geom.Point(coordinate);
        feature.setGeometry(geometry);
        photosSource.addFeature(feature);
    }
});

$.get(_api + 'statistik/query?jenis=lain&hari=1', function(data) {
    console.log(data);
    var totalpengunjung = 0;
    for (i = 0; i < data.length; i++) {
        totalpengunjung = totalpengunjung + Number(data[i].jumlah);
    }
    createpie('stat_a_pie', data);
    $("#stat_a_p").text(totalpengunjung);
});

$.get(_api + 'statistik/query?jenis=download&hari=1', function(data) {
    console.log(data);
    var totaldownload = 0;
    for (i = 0; i < data.length; i++) {
        totaldownload = totaldownload + Number(data[i].jumlah);
        //
    }
    $("#stat_a_d").text(totaldownload);
});

$.get(_api + 'statistik/query?jenis=lain&hari=7', function(data) {
    console.log(data);
    var totalpengunjung = 0;
    for (i = 0; i < data.length; i++) {
        totalpengunjung = totalpengunjung + Number(data[i].jumlah);
        //
    }
    createpie('stat_b_pie', data);
    $("#stat_b_p").text(totalpengunjung);
});

$.get(_api + 'statistik/query?jenis=download&hari=7', function(data) {
    console.log(data);
    var totaldownload = 0;
    for (i = 0; i < data.length; i++) {
        totaldownload = totaldownload + Number(data[i].jumlah);
        //
    }
    $("#stat_b_d").text(totaldownload);
});

$.get(_api + 'statistik/query?jenis=lain&hari=30', function(data) {
    console.log(data);
    var totalpengunjung = 0;
    for (i = 0; i < data.length; i++) {
        totalpengunjung = totalpengunjung + Number(data[i].jumlah);
        //
    }
    createpie('stat_c_pie', data);
    $("#stat_c_p").text(totalpengunjung);
});

$.get(_api + 'statistik/query?jenis=download&hari=30', function(data) {
    console.log(data);
    var totaldownload = 0;
    for (i = 0; i < data.length; i++) {
        totaldownload = totaldownload + Number(data[i].jumlah);
        //
    }
    $("#stat_c_d").text(totaldownload);
});

var photosSource = new ol.source.Vector();
var photosstyle = new ol.style.Style({
    image: new ol.style.Circle({
        radius: 6,
        stroke: new ol.style.Stroke({
            color: 'white',
            width: 2
        }),
        fill: new ol.style.Fill({
            color: 'green'
        })
    })
});
var photoslayer = new ol.layer.Vector({
    source: photosSource,
    style: photosstyle
});
var raster = new ol.layer.Tile({
    source: new ol.source.OSM()
});
var source = new ol.source.Vector({
    wrapX: false
});
var vector = new ol.layer.Vector({
    source: source
});
var map = new ol.Map({
    layers: [raster, vector, photoslayer],
    target: 'stat_map',
    overlays: [overlay],
    view: new ol.View({
        projection: 'EPSG:4326',
        center: [110, -6],
        zoom: 5
    })
});

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function createpie(dom, arrayd) {
    console.log(arrayd)
    var content = [];
    for (i = 0; i < arrayd.length; i++) {
        co = {}
        co['label'] = arrayd[i].city;
        co['value'] = Number(arrayd[i].jumlah);
        co['color'] = getRandomColor();
        content.push(co);
    }
    console.log(content);
    var pie = new d3pie(dom, {
        "header": {
            "title": {
                "text": "Lokasi Pengunjung",
                "fontSize": 24,
                "font": "Arial"
            },
            "subtitle": {
                "text": "Berdasarkan Geo IP",
                "color": "#999999",
                "fontSize": 12,
                "font": "Arial"
            },
            "titleSubtitlePadding": 9
        },
        "footer": {
            "color": "#999999",
            "fontSize": 10,
            "font": "Arial",
            "location": "bottom-left"
        },
        "size": {
            "canvasWidth": 590,
            "pieInnerRadius": "60%",
            "pieOuterRadius": "83%"
        },
        "data": {
            "sortOrder": "value-desc",
            "smallSegmentGrouping": {
                "enabled": true
            },
            "content": content
        },
        "labels": {
            "outer": {
                "format": "label-value1",
                "pieDistance": 32
            },
            "inner": {
                "hideWhenLessThanPercentage": 3
            },
            "mainLabel": {
                "fontSize": 11
            },
            "percentage": {
                "color": "#ffffff",
                "decimalPlaces": 0
            },
            "value": {
                "color": "#adadad",
                "fontSize": 11
            },
            "lines": {
                "enabled": true
            },
            "truncation": {
                "enabled": true
            }
        },
        "tooltips": {
            "enabled": true,
            "type": "placeholder",
            "string": "{label}: {value}, {percentage}%"
        },
        "effects": {
            "pullOutSegmentOnClick": {
                "effect": "linear",
                "speed": 400,
                "size": 8
            }
        },
        "misc": {
            "gradient": {
                "enabled": true,
                "percentage": 100
            }
        }
    });
}