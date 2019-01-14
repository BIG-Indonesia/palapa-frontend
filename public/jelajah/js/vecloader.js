var layeritem = 0;
var layer = [];

function loadShpZip(files, rndid) {
    // var epsg = ($('#epsg').val() == '') ? 4326 : $('#epsg').val(),
    // encoding = ($('#encoding').val() == '') ? 'UTF-8' : $('#encoding').val();
    // console.log(files.name);
    //   if(files.name.split('.')[1] == 'zip') {
    // if(file) $('.dimmer').addClass('active');
    loadshp({
        url: files,
        encoding: 'UTF-8',
        EPSG: 4326
    }, function(data) {
        URL = window.URL || window.webkitURL || window.mozURL || window.msURL,
            url = URL.createObjectURL(new Blob([JSON.stringify(data)], { type: "application/json" }));

        feature = new ol.format.GeoJSON().readFeatures(data, {
            featureProjection: 'EPSG:3857'
        });

        // layeritem = layeritem + 1;
        layeritem = rndid;
        layer[layeritem] = new ol.layer.Vector({
            title: String(files.name),
            source: new ol.source.Vector({
                features: feature,
                params: {
                    'LAYERS': 'Shapefile: ' + String(files.name)
                }
            })
        });
        setTimeout(function() {
            console.log(layeritem);
            map.addLayer(layer[layeritem]);
            extent = layer[layeritem].getSource().getExtent();
            map.getView().fit(extent, map.getSize());
        }, 2000);
        //   delete layer;
    });
    console.log('C');
    console.log(layer);
    // map.addControl(layerSwitcher);
    console.log('B');

    //   } else {
    // $('.modal').modal('show');
    //   }
}

function loadGpx(files, rndid) {
    gpxformat = new ol.format.GPX();
    gpxreader = new FileReader();
    gpxreader.readAsText(files, "UTF-8");
    gpxreader.onload = function(e) {
        gpxreaderresult = gpxreader.result;
        gpxfeatures = gpxformat.readFeatures(gpxreaderresult, {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857'
        }); // console.log(gpxreaderresult);    
        layer[rndid] = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: gpxfeatures,
                params: {
                    'LAYERS': 'GPX: ' + String(files.name)
                }

            })
        });
        setTimeout(function() {
            console.log(rndid);
            map.addLayer(layer[rndid]);
            extent = layer[rndid].getSource().getExtent();
            map.getView().fit(extent, map.getSize());
        }, 2000);
    };

}

function loadCSV(files, rndid) {
    csvreader = new FileReader();
    csvreader.readAsText(files, "UTF-8");
    csvreader.onload = function(e) {
        csvreaderresult = csvreader.result;
        console.log(csvreaderresult);
        lines = csvreaderresult.split("\r");
        console.log(lines);
        for (var count = 0; count < lines.length; count++) {
            rowContent = lines[count].split(",");
            for (var i = 0; i < rowContent.length; i++) {
                if (count == 0) {
                    console.log(rowContent[i])
                    $('#csv_select_x').append($("<option></option>").attr("value", rowContent[i]).text(rowContent[i]));
                    $('#csv_select_y').append($("<option></option>").attr("value", rowContent[i]).text(rowContent[i]));
                } else {
                    // console.log(rowContent[i])
                }
            } //end rowContent for loop
        }
        csvasgeojson = csv2geojson.csv2geojson(csvreaderresult, {
            latfield: 'Y',
            lonfield: 'X'
        }, function(err, data) {
            console.log(data);
            feature = new ol.format.GeoJSON().readFeatures(data, {
                featureProjection: 'EPSG:3857'
            });
            layeritem = rndid;
            layer[layeritem] = new ol.layer.Vector({
                title: String(files.name),
                source: new ol.source.Vector({
                    features: feature,
                    params: {
                        'LAYERS': 'CSV: ' + String(files.name)
                    }
                })
            });
            setTimeout(function() {
                console.log(layeritem);
                map.addLayer(layer[layeritem]);
                extent = layer[layeritem].getSource().getExtent();
                map.getView().fit(extent, map.getSize());
            }, 2000);
        });
    }
}