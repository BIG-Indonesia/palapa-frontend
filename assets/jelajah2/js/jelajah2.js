// Jelajah v2
// 2017. Tejo Damai Santoso
// Agrisoft
// v0.7b

// Init UI

var base_div = "jelajah";
var map_div = "jelajah_map";
var layer = [];
var raw_local_wms;
var raw_out_wms;
var ext_srv;
var basemaps;
var basemap = [];
var front_layers = [];
var list_workspace;
var hasil_cari;
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
var info_layer = [];
var layer_source = [];
var layer_index = [];
var layer_count = 0;
var layeritem = 0;
var draw;
var sketch;
var sketchElement;
var helpTooltipElement;
var helpTooltip;
var measureTooltipElement;
var measureTooltip;
var continuePolygonMsg = 'Klik untuk mulai menggambar area';
var continueLineMsg = 'Klik untuk mulai menggambar garis';
var listener;

// Functions
function getSimpulInfo() {
    $.ajax({
        url: palapa_api_url + "sisteminfo",
        async: false,
        success: function(data) {
            window.map_extent = [parseFloat(data.extent[0]), parseFloat(data.extent[1]), parseFloat(data.extent[2]), parseFloat(data.extent[3])]
        }
    })
}
getSimpulInfo()

function randomNumber() {
    return Math.floor((Math.random() * 10000) + 1);
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function uniqueArray(arr) {
    var a = [];
    for (var i = 0, l = arr.length; i < l; i++)
        if (a.indexOf(arr[i]) === -1 && arr[i] !== '')
            a.push(arr[i]);
    return a;
}


function extToMerc(extent) {
    return ol.proj.transformExtent(extent, ol.proj.get('EPSG:4326'), ol.proj.get('EPSG:3857'))
}

function olAddWMSLayer(serviceUrl, layername, layermark, min_x, min_y, max_x, max_y, layer_nativename) {
    // rndlayerid = randomNumber()
    window.layer_count = layer_count + 1;
    rndlayerid = layer_count;
    layer_source[rndlayerid] = new ol.source.TileWMS({
        url: serviceUrl,
        params: { LAYERS: layername, TILED: true, SRS: 'EPSG:3857' },
        crossOrigin: 'anonymous'
    })
    layer[rndlayerid] = new ol.layer.Tile({
        title: layermark,
        tipe: 'WMS',
        visible: true,
        preload: Infinity,
        extent: extToMerc([min_x, min_y, max_x, max_y]),
        source: layer_source[rndlayerid]
    });
    map.addLayer(layer[rndlayerid]);
    console.log(rndlayerid, layermark, layer[rndlayerid].get('title'))
    setTimeout(() => {
        listappend = "<li id='" + rndlayerid + "'><div class='collapsible-header'><div class='layer_control'><i id='visibility' class='material-icons'>check_box</i>" + layer[rndlayerid].get('title') + "</div><!--<i id='getinfo' class='material-icons right'>comment</i>--><i id='zextent' class='material-icons right'>loupe</i><i id='remove' class='material-icons right'>cancel</i></div></div><div class='collapsible-body'><div class='row opa'><span class='col s4'><i class='material-icons' style='        padding-right: 15px; position: relative; bottom: -6px;'>opacity</i>Opacity</span><div class='col s8 range-field'><input type='range' id='opacity' min='0' max='100' value='100'/></div></div><span id='wmslegend_" + rndlayerid + "'></span></div></li>";
        $('#sortableul').append(listappend);
        info_layer.push(rndlayerid);
        extent = layer[rndlayerid].getExtent();
        map.getView().fit(extent, map.getSize());
        legend_url = serviceUrl + '?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&legend_options=fontAntiAliasing:true&LAYER=' + layer_nativename;
        legend_html = "<img src='" + legend_url + "'>";
        $('#wmslegend_' + rndlayerid).append(legend_html);
        layer_index.push(rndlayerid);
        layer[rndlayerid].setZIndex(layer.length);
    }, 1000);
}

function olAddDEFLayer(layername, layermark, layer_nativename, aktif, min_x, min_y, max_x, max_y) {
    setTimeout(() => {
        console.log(layername, layermark, layer_nativename, aktif, min_x, min_y, max_x, max_y)
            // rndlayerid = randomNumber()
        window.layer_count = layer_count + 1;
        rndlayerid = layer_count;
        layer_source[rndlayerid] = new ol.source.TileWMS({
            url: local_gs,
            params: { LAYERS: layername, TILED: true, SRS: 'EPSG:3857' },
            crossOrigin: 'anonymous'
        })
        layer[rndlayerid] = new ol.layer.Tile({
            title: layermark,
            tipe: 'WMS',
            visible: true,
            preload: Infinity,
            extent: extToMerc([min_x, min_y, max_x, max_y]),
            source: layer_source[rndlayerid]
        });
        map.addLayer(layer[rndlayerid]);
        console.log(rndlayerid, layermark, layer[rndlayerid].get('title'))
        if (aktif) {
            listappend = "<li id='" + rndlayerid + "'><div class='collapsible-header'><div class='layer_control'><i id='visibility' class='material-icons'>check_box</i>" + layer[rndlayerid].get('title') + "</div><!--<i id='getinfo' class='material-icons right'>comment</i>--><i id='zextent' class='material-icons right'>loupe</i><i id='remove' class='material-icons right'>cancel</i></div></div><div class='collapsible-body'><div class='row opa'><span class='col s4'><i class='material-icons' style='        padding-right: 15px; position: relative; bottom: -6px;'>opacity</i>Opacity</span><div class='col s8 range-field'><input type='range' id='opacity' min='0' max='100' value='100'/></div></div><span id='wmslegend_" + rndlayerid + "'></span></div></li>";
            $('#sortableul').append(listappend);
        } else {
            listappend = "<li id='" + rndlayerid + "'><div class='collapsible-header'><div class='layer_control'><i id='visibility' class='material-icons'>check_box_outline_blank</i>" + layer[rndlayerid].get('title') + "</div><!--<i id='getinfo' class='material-icons right'>comment</i>--><i id='zextent' class='material-icons right'>loupe</i><i id='remove' class='material-icons right'>cancel</i></div></div><div class='collapsible-body'><div class='row opa'><span class='col s4'><i class='material-icons' style='        padding-right: 15px; position: relative; bottom: -6px;'>opacity</i>Opacity</span><div class='col s8 range-field'><input type='range' id='opacity' min='0' max='100' value='100'/></div></div><span id='wmslegend_" + rndlayerid + "'></span></div></li>";
            $('#sortableul').append(listappend);
            layer[rndlayerid].setVisible(false);
        }
        info_layer.push(rndlayerid);
        legend_url = local_gs + '?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&legend_options=fontAntiAliasing:true&LAYER=' + layer_nativename;
        legend_html = "<img src='" + legend_url + "'>";
        $('#wmslegend_' + rndlayerid).append(legend_html);
        layer_index.push(rndlayerid);
        layer[rndlayerid].setZIndex(layer.length);
    }, 1000);
}

function olAddRESTLayer(serviceUrl, id) {
    projection = ol.proj.get('EPSG:4326');
    console.log(serviceUrl, id)
    window.layer_count = layer_count + 1;
    rndlayerid = layer_count;
    // layer_source[rndlayerid] = new ol.source.XYZ({
    //     projection: projection,
    //     url: serviceUrl + '/' + id + '/tile/{z}/{y}/{x}'
    // })
    layer_source[rndlayerid] = new ol.source.TileArcGISRest({
        // projection: projection,
        url: serviceUrl,
        crossOrigin: 'anonymous'
    })
    layer[rndlayerid] = new ol.layer.Tile({
        title: id,
        tipe: 'REST',
        visible: true,
        preload: Infinity,
        // extent: extToMerc([min_x, min_y, max_x, max_y]),
        source: layer_source[rndlayerid]
    });
    map.addLayer(layer[rndlayerid]);
    setTimeout(() => {
        listappend = "<li id='" + rndlayerid + "'><div class='collapsible-header'><div class='layer_control'><i id='visibility' class='material-icons'>check_box</i>" + layer[rndlayerid].get('title') + "</div><!--<i id='getinfo' class='material-icons right'>comment</i>--><i id='zextent' class='material-icons right'>loupe</i><i id='remove' class='material-icons right'>cancel</i></div></div><div class='collapsible-body'><div class='row opa'><span class='col s4'><i class='material-icons' style='        padding-right: 15px; position: relative; bottom: -6px;'>opacity</i>Opacity</span><div class='col s8 range-field'><input type='range' id='opacity' min='0' max='100' value='100'/></div></div><span id='wmslegend_" + rndlayerid + "'></span></div></li>";
        $('#sortableul').append(listappend);
        info_layer.push(rndlayerid);
        extent = layer[rndlayerid].getExtent();
        map.getView().fit(extent, map.getSize());
        legend_url = serviceUrl + '?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&legend_options=fontAntiAliasing:true&LAYER=' + layer_nativename;
        legend_html = "<img src='" + legend_url + "'>";
        $('#wmslegend_' + rndlayerid).append(legend_html);
        layer_index.push(rndlayerid);
        layer[rndlayerid].setZIndex(layer.length);
    }, 1000);
}

function layerVis(layerid) {
    if (layer[layerid].getVisible() == true) {
        layer[layerid].setVisible(false);
    } else {
        layer[layerid].setVisible(true);
    }
};

function layerRm(layerid) {
    map.removeLayer(layer[layerid]);
    $("#" + layerid + "").remove();
};

function layerZm(layerid) {
    if (layer[layerid].type == 'TILE') {
        layer_extent = layer[layerid].getExtent();
        map.getView().fit(layer_extent, map.getSize());
    }
    if (layer[layerid].type == 'VECTOR') {
        layer_extent = layer[layerid].getSource().getExtent();
        map.getView().fit(layer_extent, map.getSize());
    }
};

function layerOpa(layerid, opacity) {
    opafrac = opacity / 100;
    layer[layerid].setOpacity(opafrac);
};

function handleFileSelect(evt) {
    console.log(evt)
        // var files = evt.target.files; // FileList object
    console.log('A');
    f = evt;
    // for (var i = 0, f; f = files[i]; i++) {
    console.log(escape(f.name), f.type, f.size);
    // if (uploadedfile == f.name) {
    //     console.log("Sudah diupload!");
    // } else {
    rndlayerid = String(randomNumber());
    is_zip = /(\.zip|\.ZIP)$/i;
    is_gpx = /(\.gpx|\.GPX)$/i;
    is_csv = /(\.csv|\.CSV)$/i;
    if (is_zip.exec(f.name)) {
        console.log('ZIP');
        loadShpZip(f, rndlayerid);
    } else if (is_gpx.exec(f.name)) {
        console.log('GPX');
        loadGpx(f, rndlayerid);
    } else if (is_csv.exec(f.name)) {
        // $("#csv_dialog").dialog("open");
        event.preventDefault();
        loadCSV(f, rndlayerid);
        console.log('CSV');
    } else {
        alert('Type berkas tidak didukung!');
    }
    // }
    // }
    console.log("BLOCKER: ", rndlayerid);
    console.log(layer);
    $('#files').val('');
    // console.log(layer[rndlayerid]);
}


var vector_style = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(170, 34, 34, 0.3)'
    }),
    stroke: new ol.style.Stroke({
        color: '#F22',
        width: 1
    }),
    text: new ol.style.Text({
        font: '12px Calibri,sans-serif',
        fill: new ol.style.Fill({
            color: '#000'
        }),
        stroke: new ol.style.Stroke({
            color: '#fff',
            width: 3
        })
    }),
    image: new ol.style.Circle({
        radius: 5,
        fill: new ol.style.Fill({ color: 'rgba(170, 34, 34, 0.3)' }),
        stroke: new ol.style.Stroke({ color: '#F22', width: 1 })
    })
});

function loadShpZip(files, rndid) {
    // var epsg = ($('#epsg').val() == '') ? 4326 : $('#epsg').val(),
    // encoding = ($('#encoding').val() == '') ? 'UTF-8' : $('#encoding').val();
    // console.log(files.name);
    //   if(files.name.split('.')[1] == 'zip') {
    // if(file) $('.dimmer').addClass('active');
    window.layer_count = layer_count + 1;
    rndlayerid = layer_count;
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
        layeritem = rndlayerid;
        layer[layeritem] = new ol.layer.Vector({
            title: String(files.name),
            tipe: 'SHP',
            source: new ol.source.Vector({
                features: feature,
                style: vector_style,
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
            layer_index.push(rndlayerid);
            layer[rndlayerid].setZIndex(layer.length);
            layer[rndlayerid].setStyle(vector_style);
            listappend = "<li id='" + rndlayerid + "'><div class='collapsible-header'><div class='layer_control'><i id='visibility' class='material-icons'>check_box</i>" + layer[rndlayerid].get('title') + "</div><!--<i id='getinfo' class='material-icons right'>comment</i>--><i id='zextent' class='material-icons right'>loupe</i><i id='remove' class='material-icons right'>cancel</i></div></div><div class='collapsible-body'><div class='row opa'><span class='col s4'><i class='material-icons' style=' padding-right: 15px; position: relative; bottom: -6px;'>opacity</i>Opacity</span><div class='col s8 range-field'><input type='range' id='opacity' min='0' max='100' value='100'/></div></div><span id='wmslegend_" + rndlayerid + "'></span></div></li>";
            $('#sortableul').append(listappend);
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
    window.layer_count = layer_count + 1;
    rndlayerid = layer_count;
    layeritem = rndlayerid;
    gpxformat = new ol.format.GPX();
    gpxreader = new FileReader();
    gpxreader.readAsText(files, "UTF-8");
    gpxreader.onload = function(e) {
        gpxreaderresult = gpxreader.result;
        gpxfeatures = gpxformat.readFeatures(gpxreaderresult, {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857'
        }); // console.log(gpxreaderresult);    
        layer[rndlayerid] = new ol.layer.Vector({
            tipe: 'GPX',
            source: new ol.source.Vector({
                features: gpxfeatures,
                params: {
                    'LAYERS': 'GPX: ' + String(files.name)
                }

            })
        });
        setTimeout(function() {
            console.log(rndlayerid);
            map.addLayer(layer[rndlayerid]);
            extent = layer[rndlayerid].getSource().getExtent();
            map.getView().fit(extent, map.getSize());
            layer_index.push(rndlayerid);
            layer[rndlayerid].setZIndex(layer.length);
            layer[rndlayerid].setStyle(vector_style)
            listappend = "<li id='" + rndlayerid + "'><div class='collapsible-header'><div class='layer_control'><i id='visibility' class='material-icons'>check_box</i>" + layer[rndlayerid].get('title') + "</div><!--<i id='getinfo' class='material-icons right'>comment</i>--><i id='zextent' class='material-icons right'>loupe</i><i id='remove' class='material-icons right'>cancel</i></div></div><div class='collapsible-body'><div class='row opa'><span class='col s4'><i class='material-icons' style=' padding-right: 15px; position: relative; bottom: -6px;'>opacity</i>Opacity</span><div class='col s8 range-field'><input type='range' id='opacity' min='0' max='100' value='100'/></div></div><span id='wmslegend_" + rndlayerid + "'></span></div></li>";
            $('#sortableul').append(listappend);
        }, 2000);
    };

}

function loadCSV(files, rndid) {
    window.layer_count = layer_count + 1;
    rndlayerid = layer_count;
    layeritem = rndlayerid;
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
                tipe: 'CSV',
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
                listappend = "<li id='" + rndlayerid + "'><div class='collapsible-header'><div class='layer_control'><i id='visibility' class='material-icons'>check_box</i>" + layer[rndlayerid].get('title') + "</div><!--<i id='getinfo' class='material-icons right'>comment</i>--><i id='zextent' class='material-icons right'>loupe</i><i id='remove' class='material-icons right'>cancel</i></div></div><div class='collapsible-body'><div class='row opa'><span class='col s4'><i class='material-icons' style=' padding-right: 15px; position: relative; bottom: -6px;'>opacity</i>Opacity</span><div class='col s8 range-field'><input type='range' id='opacity' min='0' max='100' value='100'/></div></div><span id='wmslegend_" + rndlayerid + "'></span></div></li>";
                $('#sortableul').append(listappend);
            }, 2000);
        });
    }
}

function createHelpTooltip() {
    if (helpTooltipElement) {
        helpTooltipElement.parentNode.removeChild(helpTooltipElement);
    }
    helpTooltipElement = document.createElement('div');
    helpTooltipElement.className = 'olm_tooltip hidden';
    helpTooltip = new ol.Overlay({
        element: helpTooltipElement,
        offset: [15, 0],
        positioning: 'center-left'
    });
    map.addOverlay(helpTooltip);
}


/**
 * Creates a new measure tooltip
 */
function createMeasureTooltip() {
    if (measureTooltipElement) {
        measureTooltipElement.parentNode.removeChild(measureTooltipElement);
    }
    measureTooltipElement = document.createElement('div');
    measureTooltipElement.className = 'olm_tooltip olm_tooltip-measure';
    measureTooltip = new ol.Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center'
    });
    map.addOverlay(measureTooltip);
}

function addInteraction() {
    typeSelect = $('#select_ukur').val();
    var type = (typeSelect == '2' ? 'Polygon' : 'LineString');
    draw = new ol.interaction.Draw({
        source: draw_source,
        type: /** @type {ol.geom.GeometryType} */
            (type),
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: 'rgba(0, 0, 0, 0.5)',
                lineDash: [10, 10],
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 5,
                stroke: new ol.style.Stroke({
                    color: 'rgba(0, 0, 0, 0.7)'
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                })
            })
        })
    });
    map.addInteraction(draw);

    createMeasureTooltip();
    createHelpTooltip();

    var listener;
    draw.on('drawstart',
        function(evt) {
            // set sketch
            sketch = evt.feature;

            /** @type {ol.Coordinate|undefined} */
            var tooltipCoord = evt.coordinate;

            listener = sketch.getGeometry().on('change', function(evt) {
                var geom = evt.target;
                var output;
                if (geom instanceof ol.geom.Polygon) {
                    output = formatArea(geom);
                    tooltipCoord = geom.getInteriorPoint().getCoordinates();
                } else if (geom instanceof ol.geom.LineString) {
                    output = formatLength(geom);
                    tooltipCoord = geom.getLastCoordinate();
                }
                measureTooltipElement.innerHTML = output;
                measureTooltip.setPosition(tooltipCoord);
            });
        }, this);

    draw.on('drawend',
        function() {
            measureTooltipElement.className = 'olm_tooltip olm_tooltip-static';
            measureTooltip.setOffset([0, -7]);
            // unset sketch
            sketch = null;
            // unset tooltip so that a new one can be created
            measureTooltipElement = null;
            createMeasureTooltip();
            ol.Observable.unByKey(listener);
        }, this);

}


/**
 * format length output
 * @param {ol.geom.LineString} line
 * @return {string}
 */
var formatLength = function(line) {
    var length = ol.Sphere.getLength(line);
    var output;
    if ($("#satuan_panjang").val() == '1') {
        output = (Math.round(length * 100) / 100) +
            ' ' + 'm';
    }
    if ($("#satuan_panjang").val() == '2') {
        output = (Math.round(length / 1000 * 100) / 100) +
            ' ' + 'km';
    }
    if ($("#satuan_panjang").val() == '3') {
        output = (Math.round(length / 1000 * 100) / 100) * 0.621371 +
            ' ' + 'mil';
    }
    // if (length > 100) {
    //     output = (Math.round(length / 1000 * 100) / 100) +
    //         ' ' + 'km';
    // } else {
    //     output = (Math.round(length * 100) / 100) +
    //         ' ' + 'm';
    // }
    return output;
};


/**
 * Format area output.
 * @param {ol.geom.Polygon} polygon The polygon.
 * @return {string} Formatted area.
 */
var formatArea = function(polygon) {
    var area = ol.Sphere.getArea(polygon);
    var output;
    if ($("#satuan_luas").val() == '4') {
        output = (Math.round(area * 100) / 100) +
            ' ' + 'm<sup>2</sup>';
    }
    if ($("#satuan_luas").val() == '5') {
        output = (Math.round(area / 1000000 * 100) / 100) +
            ' ' + 'km<sup>2</sup>';
    }
    if ($("#satuan_luas").val() == '6') {
        output = (Math.round(area / 1000000 * 100) / 100) * 0.386102 +
            ' ' + 'mil<sup>2</sup>';
    }
    // if (area > 10000) {
    //     output = (Math.round(area / 1000000 * 100) / 100) +
    //         ' ' + 'km<sup>2</sup>';
    // } else {
    //     output = (Math.round(area * 100) / 100) +
    //         ' ' + 'm<sup>2</sup>';
    // }
    return output;
};

function switchbaselayer(basetitle) {
    setTimeout(() => {
        for (i = 0; i < default_layers.length; i++) {
            if (basetitle == default_layers[i].get('title')) {
                isit = true;
                default_layers[i].setVisible(true);
            } else {
                isit = false;
                default_layers[i].setVisible(false);
            }
            console.log(basetitle, default_layers[i].get('title'), isit)
        }
    }, 500);
}

// Init slider

var slider_content = "<ul id='slide-out' class='side-nav'><li><h5> Layer</h5></li><a id='addlayer2' class='btn-floating btn-large waves-effect waves-light red'><i class='material-icons'>layers</i></a><li id='layers_item'></li></ul><a href='#' data-activates='slide-out' class='button-collapse' style='display:none';><i class='material-icons'>menu</i></a>";

// Init geocoding UI
var geocoding_content = "<div class='row'><div class='col s12'><div class='row'><div class='col s4 l5'></div><div id='inputcaribox' class='input-field col s8 m6 l3'><input placeholder='Cari lokasi' id='cari_geocoding' type='text' class='validate'></div><a id='caribtn' class='col s3 m2 l1 waves-effect waves-light btn'><i class='material-icons left'>search</i>Cari</a></div></div></div>"

// eksperimen
var fab_button = "<div class='fixed-action-btn vertical'><a id='main_menu' class='btn-floating btn-large cyan darken-4 tooltipped' data-position='left' data-tooltip='Menu Utama'><i class='material-icons'>menu</i></a><ul><li><a class='btn-floating cyan lighten-1 modal-trigger tooltipped' href='#modal_addlayer' data-position='left' data-tooltip='Tambah Layer'><i class='material-icons'>playlist_add</i></a></li><li><a class='btn-floating cyan tooltipped button-collapse' data-position='left' data-tooltip='Layer' href='#' data-activates='slide-out'><i class='material-icons'>layers</i></a></li><li><a id='ukur_btn' class='btn-floating cyan darken-1 tooltipped' data-position='left' data-tooltip='Ukur'><i class='material-icons'>border_color</i></a></li><!--<li><a class='btn-floating cyan darken-2 tooltipped' data-position='left' data-tooltip='Cetak'><i class='material-icons'>print</i></a></li>--><li><a class='btn-floating cyan darken-3 modal-trigger tooltipped' href='#modal_basemap' data-position='left'  data-tooltip='Basemap'><i class='material-icons'>public</i></a></li></ul></div>"

var modal_addlayer = "<div id='modal_addlayer' class='modal bottom-sheet'><div class='modal-content'><h4>Tambah Layer</h4><ul id='tabs_addlayer' class='tabs'><li class='tab col s3'><a class='active' href='#add_dataset'>Dataset</a></li><li class='tab col s3'><a href='#add_url'>URL</a></li><li class='tab col s3'><a href='#add_file'>File</a></li><li class='tab col s3'><a href='#add_simpul'>Simpul</a></li></ul><div id='add_dataset' class='col s12'><div class='row'><div class='col s12'><div class='row'><div class='input-field col s4'><select id='list_workspace'><option value='SEMUA' disable selected>Semua Walidata</option></select></div><div class='input-field col s8'><input id='cari_lokal_layer' type='text' class='validate'><label for='cari_lokal_layer'>Cari Layer</label></div></div></div><div class='col s12'> <ul id='layers_item_list'  class='collection'></ul></div></div></div><div id='add_url' class='col s12'><div class='row'><div class='col s12'><div class='row'><div class='input-field col s2'><select id='srv_type'><option value='WMS' disable selected>OGC WMS</option><option value='ESRI'>ESRI REST</option></select></div><div class='input-field col s8'><input id='url_servis' type='text' class='validate'><label for='url_servis'>URL servis</label></div><div class='col s2'><a id='getwmslist' class='waves-effect waves-light btn'>Ambil List</a></div><div class='col s12'> <ul id='wms_item_list' class='collection'></ul></div></div></div></div></div><div id='add_file' class='col s12'><div id='dropzone'></div></div><div id='add_simpul' class='col s12'><div class='row'><div class='col s12'><div class='row'><div class='input-field col s4'><select id='ext_srv_type'><option value='WMS' disable selected>Pilih Servis</option></select></div><div id='url_ext_srv' class='input-field col s6'></div><div class='col s2' id='ext_srv_t'></div><div class='col s12'> <ul id='ext_wms_item_list' class='collection'></ul></div></div></div></div></div></div></div>"

var modal_cari = "<div id='modal_cari' class='modal bottom-sheet'><div class='modal-content'><h4>Hasil pencarian</h4><ul id='list_hasil'></ul></div></div>"

var modal_basemap = "<div id='modal_basemap' class='modal bottom-sheet'><div class='modal-content basemap'><div id='listbaselayers' class='row'><div id='base_osm' class='col s6 m4 l2'><div class='card'><div class='card-image'><img src='images/osm.png'><span class='card-title basemap'>OSM</span></div></div></div><div class='col s6 m4 l2' id='base_rbi'><div class='card'><div class='card-image'><img src='images/osm.png'><span class='card-title basemap'>RBI</span></div></div></div><div id='base_esri' class='col s6 m4 l2'><div class='card'><div class='card-image'><img src='images/osm.png'><span class='card-title basemap'>ESRI</span></div></div></div><div id='base_rbibaru' class='col s6 m4 l2'><div class='card'><div class='card-image'><img src='images/osm.png'><span class='card-title basemap'>RBI OS</span></div></div></div></div></div></div>"

var ukur_drop = "<ul id='ukur' class='dropdown-content'><li><a href='#!'>one</a></li><li><a href='#!'>two</a></li><li class='divider'></li><li><a href='#!'>three</a></li><li><a href='#!'><i class='material-icons'>view_module</i>four</a></li><li><a href='#!'><i class='material-icons'>cloud</i>five</a></li></ul>"

var layers = "<ul id='sortableul' class='collapsible' data-collapsible='expandable'></ul>"

var box_ukur = "<div id='box_ukur'><div class='input-field'><select id='select_ukur'><option value='' disabled selected>Pilih pengukuran</option><option value='1'>Panjang</option><option value='2'>Luas</option></select><label>Geometri</label></div><div id='panjang' class='input-field' style='display:none;'><select id='satuan_panjang'><option value=0 disabled selected>Satuan</option><option value=1>Meter (m)</option><option value=2>Kilometer (km)</option><option value=3>Mil</option></select><label>Satuan</label></div><div id='luas' class='input-field' style='display:none;'><select id='satuan_luas'><option value=0 disabled selected>Satuan</option><option value=4>Meter Persegi (m2)</option><option value=5>Kilometer Persegi (km2)</option><option value=6>Mil Persegi</option></select><label>Satuan</label></div></div>"

$('#' + base_div).append(slider_content);
$('#' + base_div).append(geocoding_content);
$('#' + base_div).append(modal_addlayer);
$('#' + base_div).append(modal_cari);
$('#' + base_div).append(modal_basemap);
$('#' + base_div).append(ukur_drop);
$('#' + base_div).append(box_ukur);
$('#layers_item').append(layers);
$('#' + base_div).append(fab_button);

var box_ukur_visible = false;
var start_measure = false;


// $("#dropzone").dropzone({ url: palapa_api_url + "fakepath" });
$(function() {
    var dropzone = new Dropzone("#dropzone", {
        url: palapa_api_url + "fakepath",
        acceptedFiles: '.zip,.ZIP,.gpx,.GPX,.csv,.CSV'
    });
    dropzone.on("success", function(file) {
        handleFileSelect(file);
        Materialize.toast('Berkas terupload!', 3000, 'rounded');
        console.log('ADDED FILE')
    });
    dropzone.on("error", function(file) {
        Materialize.toast('Berkas Tidak Sesuai!', 3000, 'rounded');
        console.log('ERROR')
    });
})

$("#dropzone").append("<div id='dropinfo'>Klik di sini, atau Taruh berkas ZIP (Shapefile), GPX, atau CSV.</div>");

$(document).ready(function() {
    $('.modal').modal();
    $('.collapsible').collapsible();
    var sortableel = document.getElementById('sortableul');
    var sortableul = Sortable.create(sortableel, {
        handle: ".collapsible-header",
        onEnd: function(e) {
            listindex = $("#sortableul li");
            listindex.each(function(index, li) {
                layer[li.id].setZIndex(index)
            })
        }
    });
    // $('ul.collapsible').sortable();
    $('select').material_select();
    $('.button-collapse').sideNav({
        menuWidth: 500, // Default is 300
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true, // Choose whether you can drag to open on touch screens,
        onOpen: function(el) {}, // A function to be called when sideNav is opened
        onClose: function(el) {}, // A function to be called when sideNav is closed
    });

    $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrainWidth: true, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: true, // Displays dropdown below the button
        alignment: 'center', // Displays dropdown with edge aligned to the left of button
        stopPropagation: false // Stops event propagation
    });

    $('.ol-overlaycontainer-stopevent').append("<div id='zoomextent' class='ol-control'></div>")
    $('#zoomextent').append("<button id='zoomextentbtn' type='button' title='Zoom To Extent'><i id='zoomextenbtni' class='material-icons'>aspect_ratio</i></button></div>");
    $('#zoomextenbtni').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('ZE')
        map.getView().fit(merc_extent, map.getSize());
    });

    for (var key in basemap) {
        if (key === 'length' || !basemap.hasOwnProperty(key)) continue;
        console.log(basemap[key])
        default_layers.push(basemap[key]);
        map.addLayer(basemap[key]);
        item_html = "<div id='" + key + "' class='col s6 m4 l2'><div class='card'><div class='card-image'><img src='images/osm.png'><span class='card-title basemap'>" + basemap[key].get('title') + "</span></div></div></div>";
        $("#listbaselayers").append(item_html);
    }

    $('#ukur_btn').on('click', function() {
        draw_vector.setVisible(true);
        if (box_ukur_visible) {
            $('#box_ukur').hide();
            box_ukur_visible = false;
            start_measure = false;
            map.removeInteraction(draw);
            draw_source.clear();
            $('.olm_tooltip.olm_tooltip-static').remove()
        } else {
            $('#box_ukur').show();
            box_ukur_visible = true;
            start_measure = true;
            // addInteraction();
        }
    });

    $("#select_ukur").on('change', function() {
        draw_vector.setVisible(true);
        console.log($("#select_ukur").val())
        if ($("#select_ukur").val() == 1) {
            $('#panjang').show();
            $('#luas').hide();
        } else {
            $('#panjang').hide();
            $('#luas').show();
        }
        if ($("#satuan_panjang").val() || $("#satuan_luas").val()) {
            map.removeInteraction(draw);
            draw_source.clear();
            $('.olm_tooltip.olm_tooltip-static').remove()
            addInteraction();
        }
    });

    $("#satuan_panjang").on('change', function() {
        draw_vector.setVisible(true);
        map.removeInteraction(draw);
        draw_source.clear();
        $('.olm_tooltip.olm_tooltip-static').remove()
        addInteraction();
    })

    $("#satuan_luas").on('change', function() {
        draw_vector.setVisible(true);
        map.removeInteraction(draw);
        draw_source.clear();
        $('.olm_tooltip.olm_tooltip-static').remove()
        addInteraction();
    })

    $('#main_menu').on('click', function() {
        if (box_ukur_visible) {
            $('#box_ukur').hide();
            box_ukur_visible = false;
            start_measure = false;
            map.removeInteraction(draw);
            draw_source.clear();
            $('.olm_tooltip.olm_tooltip-static').remove()
        } else {
            $('#box_ukur').hide();
            box_ukur_visible = false;
            start_measure = false;
            map.removeInteraction(draw);
            draw_source.clear();
            $('.olm_tooltip.olm_tooltip-static').remove()
        }
    });

    setTimeout(() => {
        getDefLayers();

    }, 1000);

});


// Get Data
// $.get(palapa_api_url + "getWMSlayers", function(data) {

// });


function getLocalLayers() {
    $.ajax({
        url: palapa_api_url + "getWMSlayers",
        async: false,
        success: function(data) {
            window.raw_local_wms = data;
            listw = [];
            for (j = 0; j < data.length; j++) {
                listw.push(data[j].workspace);
            }
            list_workspace = uniqueArray(listw);
            console.log(list_workspace);
            for (i = 0; i < data.length; i++) {
                if (data[i].layer_advertised) {
                    item_html = "<li id='" + data[i].layer_nativename + "' class='collection-item'><i id='add_check' class='material-icons'>check_box_outline_blank</i> <span class='layermark' id='" + data[i].layer_nativename + "'>" + data[i].workspace + " " + data[i].layer_name + "</span></li>";
                    $('#layers_item_list').append(item_html);
                }
            }
            for (k = 0; k < list_workspace.length; k++) {
                w_html = "<option value='" + list_workspace[k] + "'>" + list_workspace[k] + "</option>";
                console.log(w_html)
                $('#list_workspace').append(w_html);
            }
            $('select').material_select();
            $('.modal').modal();
        }
    })
}
getLocalLayers();
// $.get(palapa_api_url + "extsrv/list", function(data) {

// })

function getExtService() {
    $.ajax({
        url: palapa_api_url + "extsrv/list",
        async: false,
        success: function(data) {
            window.ext_srv = JSON.parse(data);
            tipe = 'WMS';
            for (i = 0; i < ext_srv.length; i++) {
                if (ext_srv[i].type == 'OGC WMS') { tipe = 'WMS' } else { tipe = 'ESRI' };
                item_html = "<option value='" + ext_srv[i].url + "'>" + ext_srv[i].name + "</option>";
                $('#ext_srv_type').append(item_html);
            }
        }
    })
}
getExtService();

function getBasemaps() {
    $.ajax({
        url: palapa_api_url + "basemaps/list",
        async: false,
        success: function(data) {
            window.basemaps = JSON.parse(data);
            for (i = 0; i < basemaps.length; i++) {
                basename = basemaps[i].name.replace(' ', '_').toLowerCase();
                if (basemaps[i].type == 'TMS') {
                    window.basemap[basename] = new ol.layer.Tile({
                        title: basemaps[i].name,
                        visible: false,
                        preload: Infinity,
                        source: new ol.source.XYZ({
                            url: basemaps[i].url
                        }),
                        zIndex: -10
                    });
                } else {
                    window.basemap[basename] = new ol.layer.Tile({
                        title: basemaps[i].name,
                        visible: false,
                        preload: Infinity,
                        source: new ol.source.TileWMS({
                            url: basemaps[i].url,
                            params: { LAYERS: basemaps[i].params, VERSION: '1.1.1' }
                        }),
                        zIndex: -10
                    });
                }
            }
        }
    })
}
getBasemaps();

function getDefLayers() {
    $.ajax({
        url: palapa_api_url + "front_layers",
        async: false,
        success: function(data) {
            window.front_layers = data;
            console.log(front_layers)
            for (i = 1; i < front_layers.length; i++) {
                // setTimeout(() => {
                layer.push(front_layers[i]);
                for (j = 1; j < raw_local_wms.length; j++) {
                    if (raw_local_wms[j].layer_nativename == layer.layer_nativename) {
                        console.log(raw_local_wms[j], layer.layer_nativename, layer.layer_title, layer.layer_nativename, layer.aktif, raw_local_wms[j].layer_minx, raw_local_wms[j].layer_miny, raw_local_wms[j].layer_maxx, raw_local_wms[j].layer_maxy)
                        olAddDEFLayer(layer.layer_nativename, layer.layer_title, layer.layer_nativename, layer.aktif, raw_local_wms[j].layer_minx, raw_local_wms[j].layer_miny, raw_local_wms[j].layer_maxx, raw_local_wms[j].layer_maxy);
                    }
                }
                // }, 1000);
            }
        }
    })
}

// $.get(palapa_api_url + "basemaps/list", function(data) {

// })

// Custom control

// Init map

// var layers = [];

var layer_osm = new ol.layer.Tile({
    title: 'OSM',
    visible: true,
    preload: Infinity,
    source: new ol.source.OSM(),
    zIndex: -10
});

var layer_rbi = new ol.layer.Tile({
    title: 'RBI',
    visible: false,
    preload: Infinity,
    source: new ol.source.XYZ({
        url: 'http://portal.ina-sdi.or.id/arcgis/rest/services/IGD/RupabumiIndonesia/MapServer/tile/{z}/{y}/{x}'
    }),
    zIndex: -10
});

var layer_esri = new ol.layer.Tile({
    title: 'ESRI',
    visible: false,
    preload: Infinity,
    source: new ol.source.XYZ({
        url: 'http://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
    }),
    zIndex: -10
});

var layer_rbibaru = new ol.layer.Tile({
    title: 'RBI OS',
    visible: false,
    preload: Infinity,
    source: new ol.source.TileWMS({
        url: 'http://202.4.179.123:8080/geoserver/gwc/service/wms',
        params: { LAYERS: 'basemap_rbi:basemap', VERSION: '1.1.1' }
    }),
    zIndex: -10
});

var overlay = new ol.Overlay({
    title: 'Overlay',
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
});

var draw_source = new ol.source.Vector();
var draw_vector = new ol.layer.Vector({
    source: draw_source,
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new ol.style.Stroke({
            color: '#ffcc33',
            width: 2
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: '#ffcc33'
            })
        })
    }),
    zIndex: 666666
});

var default_layers = [layer_osm, layer_rbi, layer_esri, layer_rbibaru, draw_vector];

closer.onclick = function() {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};

var scline = new ol.control.ScaleLine({
    units: 'metric',
    minWidth: 100
});

merc_extent = ol.proj.transformExtent(map_extent, ol.proj.get('EPSG:4326'), ol.proj.get('EPSG:3857'))

var mouseMoveHandler = function(evt) {
    if (sketch) {
        var output;
        var geom = (sketch.getGeometry());
        if (geom instanceof ol.geom.Polygon) {
            output = formatArea( /** @type {ol.geom.Polygon} */ (geom));

        } else if (geom instanceof ol.geom.LineString) {
            output = formatLength( /** @type {ol.geom.LineString} */ (geom));
        }
        sketchElement.innerHTML = output;
    }
};

var pointerMoveHandler = function(evt) {
    draw_vector.setVisible(true);
    if (evt.dragging) {
        return;
    }
    /** @type {string} */
    var helpMsg = 'Klik untuk mulai menggambar';

    if (sketch) {
        var geom = (sketch.getGeometry());
        if (geom instanceof ol.geom.Polygon) {
            helpMsg = continuePolygonMsg;
        } else if (geom instanceof ol.geom.LineString) {
            helpMsg = continueLineMsg;
        }
    }

    if (start_measure && $("#select_ukur").val() && ($("#satuan_panjang").val() || $("#satuan_luas").val())) {
        helpTooltipElement.innerHTML = helpMsg;
        helpTooltip.setPosition(evt.coordinate);
        helpTooltipElement.classList.remove('hidden');
    }
};

var map = new ol.Map({
    layers: default_layers,
    target: map_div,
    overlays: [overlay],
    view: new ol.View({
        // projection: 'EPSG:4326',
        // center: [116.5, -4],
        extent: merc_extent,
        zoom: 5,
        minZoom: 4,
        maxZoom: 22
    }),
    controls: ol.control.defaults().extend([scline])
});

map.getView().fit(merc_extent, map.getSize());

// $(map.getViewport()).on('mousemove', mouseMoveHandler);

map.on('pointermove', pointerMoveHandler);

map.getViewport().addEventListener('mouseout', function() {
    if (start_measure && $("#select_ukur").val() && ($("#satuan_panjang").val() != 0 || $("#satuan_luas").val() != 0)) {
        helpTooltipElement.classList.add('hidden');
    }
});


map.on('singleclick', function(evt) {
    var coordinate = evt.coordinate;
    var hdms = ol.coordinate.toStringHDMS(coordinate);
    console.log()

    if (!start_measure) {
        map.forEachLayerAtPixel(evt.pixel, function(layer) {
            console.warn('CALLBACK')
        }, this, function(layer) {
            console.log('FILTER')
            var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
                return feature;
            });
            console.log(layer, feature);
            if (feature) {
                return true
            } else {
                return false
            }
        })

        var layerWithWmsSource = map.forEachLayerAtPixel(evt.pixel,
            function(layer) {
                // return only layers with ol.source.TileWMS
                var source = layer.getSource();
                if (source instanceof ol.source.TileWMS) {
                    return layer;
                }
            });
        if (layerWithWmsSource) {
            $('#popup-content').empty();
            getInfo(evt, layerWithWmsSource);
            overlay.setPosition(coordinate);
        }

        // Attempt to find a feature in one of the visible vector layers
        var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
            return feature;
        });

        var content_html;
        if (feature) {
            console.log(feature)
            $('#popup-content').empty();
            fkeys = feature.getKeys();
            var tabel_info_head = "<table class='highlight'><thead><tr><th>Key</th><th>Value</th></tr></thead><tbody id='isiinfo'></tbody></table>";
            $('#popup-content').append(tabel_info_head)
            for (i = 0; i < fkeys.length; i++) {
                if (fkeys[i] != 'geometry') {
                    // content_html = "<p>" + fkeys[i] + ": " + feature.get(fkeys[i]) + "</p>";
                    // $('#popup-content').append(content_html)
                    content_html = "<tr><td>" + fkeys[i] + "</td><td>" + feature.get(fkeys[i]) + "</td></tr>";
                    $('#isiinfo').append(content_html)
                }
            }
            // $.each(feature.S, function(index, value) {
            //     console.log(index, value);
            //     content_html = "<p>" + index + ": " + value + "</p>";
            //     $('#popup-content').append(content_html)
            // });
            // var content_html = '<p>You clicked here:</p><code>' + hdms + '</code>';
            $('#popup-content').append(content_html)
            overlay.setPosition(coordinate);
        }
    }
});

function getInfo(evt, layer) {
    var resolution = map.getView().getResolution();
    var url = layer.getSource().getGetFeatureInfoUrl(evt.coordinate,
        resolution, 'EPSG:3857', { 'INFO_FORMAT': 'application/json' });
    if (url) {
        console.log(url)
        var infos;
        var tabel_info_head = "<table class='highlight'><thead><tr><th>Key</th><th>Value</th></tr></thead><tbody id='isiinfo'></tbody></table>";
        $('#popup-content').append(tabel_info_head)

        function getInnerInfo() {
            $.ajax({
                url: url,
                async: false,
                success: function(data) {
                    infos = data.features[0].properties;
                    for (var key in infos) {
                        var value = infos[key];
                        content_html = "<tr><td>" + key + "</td><td>" + value + "</td></tr>";
                        $('#isiinfo').append(content_html)
                    }
                }
            });
        }
        getInnerInfo();
        // $.get(url, function(data) {
        //     console.log(data)
        //     infos = data.features[0].properties;
        //     for (var key in infos) {
        //         var value = infos[key];
        //         content_html = "<tr><td>" + key + "</td><td>" + value + "</td></tr>";
        //         $('#isiinfo').append(content_html)
        //     }
        // })
    }
}

// EVENT HANDLING

// $('#base_osm').on('click', function() {
//     layer_osm.setVisible(true);
//     layer_rbi.setVisible(false);
//     layer_esri.setVisible(false);
//     layer_rbibaru.setVisible(false);
// });

// $('#base_rbi').on('click', function() {
//     layer_osm.setVisible(false);
//     layer_rbi.setVisible(true);
//     layer_esri.setVisible(false);
//     layer_rbibaru.setVisible(false);
// });

// $('#base_esri').on('click', function() {
//     layer_osm.setVisible(false);
//     layer_rbi.setVisible(false);
//     layer_esri.setVisible(true);
//     layer_rbibaru.setVisible(false);
// });

// $('#base_rbibaru').on('click', function() {
//     layer_osm.setVisible(false);
//     layer_rbi.setVisible(false);
//     layer_esri.setVisible(false);
//     layer_rbibaru.setVisible(true);
// });


$("#caribtn").click(function() {
    geocaritext = document.getElementById('cari_geocoding').value;

    function getGeocoding() {
        $.ajax({
            url: "http://nominatim.openstreetmap.org/search?format=jsonv2&polygon_geojson=1&q=" + geocaritext,
            async: false,
            success: function(data) {
                window.hasil_cari = data;
                // console.log(data);
                $('#list_hasil').empty();
                for (i = 0; i < data.length; i++) {
                    lihtml = "<li id='" + data[i].place_id + "' class='collection-item avatar'><i id='" + data[i].place_id + "' class='material-icons circle green piccari'>add_location</i><div id='" + data[i].place_id + "' class='title'>" + data[i].display_name + "</div></li>";
                    $('#list_hasil').append(lihtml);
                    console.log(data[i]);
                }
                $('#modal_cari').modal('open');
            }
        });
    }
    getGeocoding()
        // $.get("http://nominatim.openstreetmap.org/search?format=jsonv2&polygon_geojson=1&q=" + geocaritext, function(data, status) {
        //     window.hasil_cari = data;
        //     // console.log(data);
        //     $('#list_hasil').empty();
        //     for (i = 0; i < data.length; i++) {
        //         lihtml = "<li id='" + data[i].place_id + "' class='collection-item avatar'><i id='" + data[i].place_id + "' class='material-icons circle green piccari'>add_location</i><div id='" + data[i].place_id + "' class='title'>" + data[i].display_name + "</div></li>";
        //         $('#list_hasil').append(lihtml);
        //         console.log(data[i]);
        //     }
        //     $('#modal_cari').modal('open');
        // });
});

$('#list_hasil').on('click', function(e) {
    p_id = $(e.target).attr('id');
    console.log($(e.target).attr('id'));
    for (i = 0; i < hasil_cari.length; i++) {
        if (hasil_cari[i].place_id == String(p_id)) {
            feature = new ol.format.GeoJSON().readFeatures(hasil_cari[i].geojson, {
                featureProjection: 'EPSG:3857'
            });

            rndlayerid = randomNumber();
            layer[rndlayerid] = new ol.layer.Vector({
                title: hasil_cari[i].display_name,
                source: new ol.source.Vector({
                    tipe: 'cari',
                    features: feature,
                    params: {
                        'LAYERS': String(hasil_cari[i].display_name)
                    }
                })
            });

            map.addLayer(layer[rndlayerid]);
            extent = layer[rndlayerid].getSource().getExtent();
            map.getView().fit(extent, map.getSize());
            listappend = "<li id='" + rndlayerid + "'><div class='collapsible-header'><div class='layer_control'><i id='visibility' class='material-icons'>check_box</i>" + layer[rndlayerid].get('title') + "</div><!--<i id='getinfo' class='material-icons right'>comment</i>--><i id='zextent' class='material-icons right'>loupe</i><i id='remove' class='material-icons right'>cancel</i></div></div><div class='collapsible-body'><div class='row opa'><span class='col s4'><i class='material-icons' style='        padding-right: 15px; position: relative; bottom: -6px;'>opacity</i>Opacity</span><div class='col s8 range-field'><input type='range' id='opacity' min='0' max='100' value='100'/></div></div><span id='wmslegend_" + rndlayerid + "'></span></div></li>";
            $('#sortableul').append(listappend);
            // listappend = "<li id='" + rndlayerid + "'><div class='collapsible-header'><div class='layer_control'><i id='visibility' class='material-icons'>check_box</i>" + hasil_cari[i].display_name + "</div><i class='material-icons right'>comment</i><i id='zextent' class='material-icons right'>loupe</i><i id='remove' class='material-icons right'>cancel</i></div></div><div class='collapsible-body'><div class='row opa'><span class='col s4'><i class='material-icons' style='        padding-right: 15px; position: relative; bottom: -6px;'>opacity</i>Opacity</span><div class='col s8 range-field'><input type='range' id='opacity' min='0' max='100' value='100'/></div><span>Lorem ipsum dolor sit amet.</span></div></li>"
            // $('#sortableul').append(listappend);
            layer_index.push(rndlayerid);
            layer[rndlayerid].setZIndex(layer.length)
        }
    }
});

$("#listbaselayers").on('click', function(e) {
    base_id = $(e.target).next('span').text();
    if (!base_id) {
        base_id = $(e.target).text();
    }
    switchbaselayer(base_id);
    draw_vector.setVisible(true);
})

$('#layers_item_list').on('click', function(e) {
    p_id = $(e.target).attr('id');
    if (p_id == '' || typeof(p_id) == 'undefined' || p_id == 'add_check') {
        p_id = $(e.target).closest('li').attr('id');
    }
    var min_x, min_y, max_x, max_y, layer_nativename;
    for (i = 0; i < raw_local_wms.length; i++) {
        // console.log(raw_local_wms[i].layer_nativename)
        if (raw_local_wms[i].layer_nativename.indexOf(p_id) >= 0) {
            min_x = raw_local_wms[i].layer_minx;
            min_y = raw_local_wms[i].layer_miny;
            max_x = raw_local_wms[i].layer_maxx;
            max_y = raw_local_wms[i].layer_maxy;
            layer_nativename = raw_local_wms[i].layer_nativename;
        }
    }
    p_name = $(e.target).find('.layermark').first().text();
    if (p_name == '' || typeof(p_name) == 'undefined') {
        p_name = $(e.target).closest('.layermark').first().text();
        if (p_name == '' || typeof(p_name) == 'undefined') {
            p_name = $(e.target).siblings('.layermark').first().text();
        }
    }
    p_state = $(e.target).find('#add_check').first().text();
    if (p_state == '' || typeof(p_state) == 'undefined') {
        p_state = $(e.target).siblings('#add_check').first().text();
        console.log(p_state, 'A')
        if (p_state == 'check_box') {
            $(e.target).siblings('#add_check').first().text('check_box_outline_blank');
        } else {
            $(e.target).siblings('#add_check').first().text('check_box');
        }
        if (p_state == '' || typeof(p_state) == 'undefined') {
            console.log('B')
            p_state = $(e.target).text();
            if (p_state == 'check_box') {
                $(e.target).text('check_box_outline_blank');
            } else {
                $(e.target).text('check_box');
            }
        }
    } else {
        if (p_state == 'check_box') {
            $(e.target).find('#add_check').first().text('check_box_outline_blank');
        } else {
            $(e.target).find('#add_check').first().text('check_box');
        }
    }
    console.log(p_state, p_id, p_name, min_x, min_y, max_x, max_y, layer_nativename);
    if (layer.length > 0) {
        breaked = false;
        for (j = 0; j < layer.length; j++) {
            if (typeof(layer[j]) != 'undefined' && layer[j].getSource().i.LAYERS == p_id) {
                console.log('RM')
                layerRm(j);
                delete layer[j];
                breaked = true;
                break;
            }
        }
        if (!breaked) {
            console.log('AD')
            olAddWMSLayer(local_gs, p_id, p_name, min_x, min_y, max_x, max_y, layer_nativename);
        }
    } else {
        olAddWMSLayer(local_gs, p_id, p_name, min_x, min_y, max_x, max_y, layer_nativename);
    }
})

$("#list_workspace").on('change', function() {
    s_workspace = $("#list_workspace").val();
    $('#layers_item_list').empty();
    for (k = 0; k < raw_local_wms.length; k++) {
        if (raw_local_wms[k].workspace == s_workspace) {
            console.log(s_workspace, raw_local_wms[k].workspace, layer.length)
            if (layer.length < 1) {
                item_html = "<li id='" + raw_local_wms[k].layer_nativename + "' class='collection-item'><i id='add_check' class='material-icons'>check_box_outline_blank</i> <span class='layermark' id='" + raw_local_wms[k].layer_nativename + "'>" + raw_local_wms[k].workspace + " " + raw_local_wms[k].layer_name + "</span></li>";
            }
            for (j = 0; j < layer.length; j++) {
                checked = [];
                try {
                    if (layer[j].getSource().i.LAYERS == raw_local_wms[k].layer_nativename) {
                        checked[j] = true;
                    } else {
                        // checked = false;
                    }
                } catch (error) {
                    // checked = false;
                }
                console.log(raw_local_wms[k].layer_nativename, checked[raw_local_wms[k].layer_nativename])
                if (checked[j]) {
                    item_html = "<li id='" + raw_local_wms[k].layer_nativename + "' class='collection-item'><i id='add_check' class='material-icons'>check_box</i> <span class='layermark' id='" + raw_local_wms[k].layer_nativename + "'>" + raw_local_wms[k].workspace + " " + raw_local_wms[k].layer_name + "</span></li>";
                } else {
                    item_html = "<li id='" + raw_local_wms[k].layer_nativename + "' class='collection-item'><i id='add_check' class='material-icons'>check_box_outline_blank</i> <span class='layermark' id='" + raw_local_wms[k].layer_nativename + "'>" + raw_local_wms[k].workspace + " " + raw_local_wms[k].layer_name + "</span></li>";
                }
            }
            $('#layers_item_list').append(item_html);
        } else if (s_workspace == 'SEMUA') {
            if (layer.length < 1) {
                item_html = "<li id='" + raw_local_wms[k].layer_nativename + "' class='collection-item'><i id='add_check' class='material-icons'>check_box_outline_blank</i> <span class='layermark' id='" + raw_local_wms[k].layer_nativename + "'>" + raw_local_wms[k].workspace + " " + raw_local_wms[k].layer_name + "</span></li>";
            }
            for (j = 0; j < layer.length; j++) {
                checked = [];
                try {
                    if (layer[j].getSource().i.LAYERS == raw_local_wms[k].layer_nativename) {
                        checked[j] = true;
                    } else {
                        // checked = false;
                    }
                } catch (error) {
                    // checked = false;
                }
                if (checked[j]) {
                    item_html = "<li id='" + raw_local_wms[k].layer_nativename + "' class='collection-item'><i id='add_check' class='material-icons'>check_box</i> <span class='layermark' id='" + raw_local_wms[k].layer_nativename + "'>" + raw_local_wms[k].workspace + " " + raw_local_wms[k].layer_name + "</span></li>";
                } else {
                    item_html = "<li id='" + raw_local_wms[k].layer_nativename + "' class='collection-item'><i id='add_check' class='material-icons'>check_box_outline_blank</i> <span class='layermark' id='" + raw_local_wms[k].layer_nativename + "'>" + raw_local_wms[k].workspace + " " + raw_local_wms[k].layer_name + "</span></li>"
                }
            }
            $('#layers_item_list').append(item_html);;
        }
    }
});

$("#cari_lokal_layer").on('input', function() {
    s_workspace = $("#list_workspace").val();
    carilayer = $("#cari_lokal_layer").val()
    $('#layers_item_list').empty();
    for (k = 0; k < raw_local_wms.length; k++) {
        if (raw_local_wms[k].workspace == s_workspace) {
            console.log(s_workspace, raw_local_wms[k].workspace, layer.length)
            if (raw_local_wms[k].layer_name.toLowerCase().indexOf(carilayer) >= 0) {
                // for (j = 0; j < layer.length; j++) {
                checked = [];
                try {
                    if (layer[j].getSource().i.LAYERS == raw_local_wms[k].layer_nativename) {
                        checked[j] = true;
                    } else {
                        // checked = false;
                    }
                } catch (error) {
                    // checked = false;
                }
                if (raw_local_wms[k].layer_advertised) {
                    if (checked[j]) {
                        item_html = "<li id='" + raw_local_wms[k].layer_nativename + "' class='collection-item'><i id='add_check' class='material-icons'>check_box</i> <span class='layermark' id='" + raw_local_wms[k].layer_nativename + "'>" + raw_local_wms[k].workspace + " " + raw_local_wms[k].layer_name + "</span></li>";
                    } else {
                        item_html = "<li id='" + raw_local_wms[k].layer_nativename + "' class='collection-item'><i id='add_check' class='material-icons'>check_box_outline_blank</i> <span class='layermark' id='" + raw_local_wms[k].layer_nativename + "'>" + raw_local_wms[k].workspace + " " + raw_local_wms[k].layer_name + "</span></li>";
                    }
                }
                // $('#layers_item_list').append(item_html);
                // }
                $('#layers_item_list').append(item_html);
            } else if (carilayer == '') {
                // for (j = 0; j < layer.length; j++) {
                checked = [];
                try {
                    if (layer[j].getSource().i.LAYERS == raw_local_wms[k].layer_nativename) {
                        checked[j] = true;
                    } else {
                        // checked = false;
                    }
                } catch (error) {
                    // checked = false;
                }
                if (raw_local_wms[k].layer_advertised) {
                    if (checked[j]) {
                        item_html = "<li id='" + raw_local_wms[k].layer_nativename + "' class='collection-item'><i id='add_check' class='material-icons'>check_box</i> <span class='layermark' id='" + raw_local_wms[k].layer_nativename + "'>" + raw_local_wms[k].workspace + " " + raw_local_wms[k].layer_name + "</span></li>";
                    } else {
                        item_html = "<li id='" + raw_local_wms[k].layer_nativename + "' class='collection-item'><i id='add_check' class='material-icons'>check_box_outline_blank</i> <span class='layermark' id='" + raw_local_wms[k].layer_nativename + "'>" + raw_local_wms[k].workspace + " " + raw_local_wms[k].layer_name + "</span></li>";
                    }
                }
                // $('#layers_item_list').append(item_html);
                // }
                $('#layers_item_list').append(item_html);
            }
        } else if (s_workspace == 'SEMUA') {
            console.log(s_workspace, raw_local_wms[k].workspace, layer.length)
            if (raw_local_wms[k].layer_name.toLowerCase().indexOf(carilayer) >= 0) {
                // for (j = 0; j < layer.length; j++) {
                checked = [];
                try {
                    if (layer[j].getSource().i.LAYERS == raw_local_wms[k].layer_nativename) {
                        checked[j] = true;
                    } else {
                        // checked = false;
                    }
                } catch (error) {
                    // checked = false;
                }
                if (raw_local_wms[k].layer_advertised) {
                    if (checked[j]) {
                        item_html = "<li id='" + raw_local_wms[k].layer_nativename + "' class='collection-item'><i id='add_check' class='material-icons'>check_box</i> <span class='layermark' id='" + raw_local_wms[k].layer_nativename + "'>" + raw_local_wms[k].workspace + " " + raw_local_wms[k].layer_name + "</span></li>";
                    } else {
                        item_html = "<li id='" + raw_local_wms[k].layer_nativename + "' class='collection-item'><i id='add_check' class='material-icons'>check_box_outline_blank</i> <span class='layermark' id='" + raw_local_wms[k].layer_nativename + "'>" + raw_local_wms[k].workspace + " " + raw_local_wms[k].layer_name + "</span></li>";
                    }
                }
                // $('#layers_item_list').append(item_html);
                // }
                $('#layers_item_list').append(item_html);
            } else if (carilayer == '') {
                // for (j = 0; j < layer.length; j++) {
                checked = [];
                try {
                    if (layer[j].getSource().i.LAYERS == raw_local_wms[k].layer_nativename) {
                        checked[j] = true;
                    } else {
                        // checked = false;
                    }
                } catch (error) {
                    // checked = false;
                }
                if (raw_local_wms[k].layer_advertised) {
                    if (checked[j]) {
                        item_html = "<li id='" + raw_local_wms[k].layer_nativename + "' class='collection-item'><i id='add_check' class='material-icons'>check_box</i> <span class='layermark' id='" + raw_local_wms[k].layer_nativename + "'>" + raw_local_wms[k].workspace + " " + raw_local_wms[k].layer_name + "</span></li>";
                    } else {
                        item_html = "<li id='" + raw_local_wms[k].layer_nativename + "' class='collection-item'><i id='add_check' class='material-icons'>check_box_outline_blank</i> <span class='layermark' id='" + raw_local_wms[k].layer_nativename + "'>" + raw_local_wms[k].workspace + " " + raw_local_wms[k].layer_name + "</span></li>";
                    }
                }
                // $('#layers_item_list').append(item_html);
                // }
                $('#layers_item_list').append(item_html);
            }
        }
    }
})

$('#getwmslist').on('click', function() {
    srv_type = $('#srv_type').val();
    srv_url = $('#url_servis').val();
    if (srv_type == 'WMS') {
        function getWMSdata() {
            wmscapurl = srv_url + '?service=wms&request=GetCapabilities';
            $.ajax({
                url: _proxy + encodeURIComponent(wmscapurl),
                async: false,
                success: function(wmscapobj) {
                    wmscap = new WMSCapabilities().parse(wmscapobj);
                    console.log(wmscap)
                    wmslayerlist = wmscap.Capability.Layer.Layer;
                    window.raw_out_wms = wmslayerlist;
                    console.log(wmslayerlist)
                    $('#wms_item_list').empty();
                    for (i = 0; i < wmslayerlist.length; i++) {
                        item_html = "<li id='" + wmslayerlist[i].Name + "' class='collection-item'><i id='add_check' class='material-icons'>add_circle</i> <span class='layermark' id='" + wmslayerlist[i].Name + "'>" + wmslayerlist[i].Title + "</span></li>";
                        $('#wms_item_list').append(item_html);
                    }
                }
            })
        }
        getWMSdata();
    } else {
        esricapurl = srv_url + '?f=pjson';

        function getRESTdata() {
            $.ajax({
                url: esricapurl,
                async: false,
                success: function(data) {
                    layers = JSON.parse(data).layers;
                    console.log(layers)
                    for (i = 0; i < layers.length; i++) {
                        item_html = "<li id='" + layers[i].id + "' class='collection-item'><i id='add_check' class='material-icons'>add_circle</i> <span class='layermark' id='" + layers[i].id + "'>" + layers[i].name + "</span></li>";
                        $('#wms_item_list').append(item_html);
                    }
                }
            })
        }
        getRESTdata();
        // $.get(esricapurl, function(data) {
        //     console.log(JSON.parse(data));
        //     layers = JSON.parse(data).layers;
        //     for (i = 0; i < layers.length; i++) {
        //         item_html = "<li id='" + layers[i].id + "' class='collection-item'><i id='add_check' class='material-icons'>add_circle</i> <span class='layermark' id='" + layers[i].id + "'>" + layers[i].name + "</span></li>";
        //         $('#ext_wms_item_list').append(item_html);
        //     }
        // });
    }
})

$('#wms_item_list').on('click', function(e) {
    p_id = $(e.target).attr('id');
    srv_type = $('#srv_type').val();
    srv_url = $('#url_servis').val();
    if (srv_type == 'WMS') {
        if (p_id == '' || typeof(p_id) == 'undefined' || p_id == 'add_check') {
            p_id = $(e.target).closest('li').attr('id');
        }
        var min_x, min_y, max_x, max_y, layer_nativename;
        for (i = 0; i < raw_out_wms.length; i++) {
            // console.log(raw_local_wms[i].layer_nativename)
            try {
                if (raw_out_wms[i].Name.indexOf(p_id) >= 0) {
                    min_x = raw_out_wms[i].EX_GeographicBoundingBox[0];
                    min_y = raw_out_wms[i].EX_GeographicBoundingBox[1];
                    max_x = raw_out_wms[i].EX_GeographicBoundingBox[2];
                    max_y = raw_out_wms[i].EX_GeographicBoundingBox[3];
                    layer_nativename = raw_out_wms[i].Name;
                }
            } catch (error) {
                // if (raw_out_wms[i].Title.indexOf(p_id) >= 0) {
                min_x = raw_out_wms[i].EX_GeographicBoundingBox[0];
                min_y = raw_out_wms[i].EX_GeographicBoundingBox[1];
                max_x = raw_out_wms[i].EX_GeographicBoundingBox[2];
                max_y = raw_out_wms[i].EX_GeographicBoundingBox[3];
                layer_nativename = raw_out_wms[i].Title;
                // }    
            }
        }
        p_name = $(e.target).find('.layermark').first().text();
        if (p_name == '' || typeof(p_name) == 'undefined') {
            p_name = $(e.target).closest('.layermark').first().text();
            if (p_name == '' || typeof(p_name) == 'undefined') {
                p_name = $(e.target).siblings('.layermark').first().text();
            }
        }
        p_state = $(e.target).find('#add_check').first().text();
        if (p_state == '' || typeof(p_state) == 'undefined') {
            p_state = $(e.target).siblings('#add_check').first().text();
            if (p_state == '' || typeof(p_state) == 'undefined') {
                p_state = $(e.target).text();
            }
        }
        console.log(p_state, p_id, p_name, min_x, min_y, max_x, max_y, layer_nativename);
        olAddWMSLayer(srv_url, p_id, p_name, min_x, min_y, max_x, max_y, layer_nativename);
    } else {
        olAddRESTLayer(srv_url, p_id);
    }
})

$("#ext_srv_type").on('change', function() {
    tipe = 'WMS';
    $("#url_ext_srv").text($("#ext_srv_type").val())
    $('#ext_wms_item_list').empty();
    for (i = 0; i < ext_srv.length; i++) {
        if (ext_srv[i].url == $("#ext_srv_type").val()) {
            if (ext_srv[i].type == 'OGC WMS') { tipe = 'WMS' } else { tipe = 'ESRI' };
            $("#ext_srv_t").text(ext_srv[i].type);
            if (tipe == 'WMS') {
                function getWMSdata() {
                    wmscapurl = ext_srv[i].url + '?service=wms&request=GetCapabilities';
                    $.ajax({
                        url: _proxy + encodeURIComponent(wmscapurl),
                        async: false,
                        success: function(wmscapobj) {
                            wmscap = new WMSCapabilities().parse(wmscapobj);
                            wmslayerlist = wmscap.Capability.Layer.Layer;
                            window.raw_out_wms = wmslayerlist;
                            console.log(wmslayerlist)
                            $('#wms_item_list').empty();
                            for (i = 0; i < wmslayerlist.length; i++) {
                                item_html = "<li id='" + wmslayerlist[i].Name + "' class='collection-item'><i id='add_check' class='material-icons'>add_circle</i> <span class='layermark' id='" + wmslayerlist[i].Name + "'>" + wmslayerlist[i].Title + "</span></li>";
                                $('#ext_wms_item_list').append(item_html);
                            }
                        }
                    })
                }
                getWMSdata()
            } else {
                esricapurl = ext_srv[i].url + '?f=pjson';
                var esricapobj;
                $.ajax({
                        url: esricapurl,
                        async: false,
                        success: function(data) {
                            layers = JSON.parse(data).layers;
                            for (i = 0; i < layers.length; i++) {
                                item_html = "<li id='" + layers[i].id + "' class='collection-item'><i id='add_check' class='material-icons'>add_circle</i> <span class='layermark' id='" + layers[i].id + "'>" + layers[i].name + "</span></li>";
                                $('#ext_wms_item_list').append(item_html);
                            }
                        }
                    })
                    // $.get(esricapurl, function(data) {
                    //     console.log(JSON.parse(data));
                    //     layers = JSON.parse(data).layers;
                    //     for (i = 0; i < layers.length; i++) {
                    //         item_html = "<li id='" + layers[i].id + "' class='collection-item'><i id='add_check' class='material-icons'>add_circle</i> <span class='layermark' id='" + layers[i].id + "'>" + layers[i].name + "</span></li>";
                    //         $('#ext_wms_item_list').append(item_html);
                    //     }
                    // });
                    // esricapjson = JSON.parse(esricapobj.responseText);
                    // console.log(esricapobj);
            }
        }
    }
})

$('#ext_wms_item_list').on('click', function(e) {
    p_id = $(e.target).attr('id');
    srv_type = $('#ext_srv_t').text();
    srv_url = $('#url_ext_srv').text();
    if (srv_type == 'OGC WMS') { tipe = 'WMS' } else { tipe = 'ESRI' };
    if (tipe == 'WMS') {
        if (p_id == '' || typeof(p_id) == 'undefined' || p_id == 'add_check') {
            p_id = $(e.target).closest('li').attr('id');
        }
        var min_x, min_y, max_x, max_y, layer_nativename;
        for (i = 0; i < raw_out_wms.length; i++) {
            // console.log(raw_local_wms[i].layer_nativename)
            if (raw_out_wms[i].Name.indexOf(p_id) >= 0) {
                min_x = raw_out_wms[i].EX_GeographicBoundingBox[0];
                min_y = raw_out_wms[i].EX_GeographicBoundingBox[1];
                max_x = raw_out_wms[i].EX_GeographicBoundingBox[2];
                max_y = raw_out_wms[i].EX_GeographicBoundingBox[3];
                layer_nativename = raw_out_wms[i].Name;
            }
        }
        p_name = $(e.target).find('.layermark').first().text();
        if (p_name == '' || typeof(p_name) == 'undefined') {
            p_name = $(e.target).closest('.layermark').first().text();
            if (p_name == '' || typeof(p_name) == 'undefined') {
                p_name = $(e.target).siblings('.layermark').first().text();
            }
        }
        p_state = $(e.target).find('#add_check').first().text();
        if (p_state == '' || typeof(p_state) == 'undefined') {
            p_state = $(e.target).siblings('#add_check').first().text();
            if (p_state == '' || typeof(p_state) == 'undefined') {
                p_state = $(e.target).text();
            }
        }
        console.log(p_state, p_id, p_name, min_x, min_y, max_x, max_y, layer_nativename);
        olAddWMSLayer(srv_url, p_id, p_name, min_x, min_y, max_x, max_y, layer_nativename);
    } else {
        olAddRESTLayer(srv_url, p_id);
    }
})

$("#sortableul").on('click', "li .collapsible-header .layer_control i#visibility", function(e) {
    e.stopPropagation();
    p_id = $(e.target).closest('li').attr('id');
    // console.log($(e.target).text());
    p_state = $(e.target).text();
    layerVis(p_id);
    if (p_state == 'check_box') {
        $(e.target).text('check_box_outline_blank');
    } else {
        $(e.target).text('check_box');
    }
    e.preventDefault();
})

$("#sortableul").on('click', "li .collapsible-header i#zextent", function(e) {
    e.stopPropagation();
    p_id = $(e.target).closest('li').attr('id');
    layerZm(p_id);
    e.preventDefault();
})

$("#sortableul").on('click', "li .collapsible-header i#remove", function(e) {
    e.stopPropagation();
    p_id = $(e.target).closest('li').attr('id');
    p_state = $(e.target).text();
    try {
        p_native = ("#" + layer[p_id].getSource().i.LAYERS).replace(":", "\\\\:");
        console.log(p_native)
        $('[id="' + layer[p_id].getSource().i.LAYERS + '"]').find('i').text('check_box_outline_blank');
    } catch (error) {
        //
    }
    layerRm(p_id);
    delete layer[p_id];
    e.preventDefault();
})

$("#sortableul").on('mouseup', "li .collapsible-body .row .col #opacity", function(e) {
    // e.preventDefault();
    // e.stopPropagation();
    p_id = $(e.target).closest('li').attr('id');
    p_frac = Number($(e.target).closest('input').val());
    console.log(p_id, p_frac);
    layerOpa(p_id, p_frac);
    p_state = $(e.target).text();
})

$("#sortableul").on('change', function(e) {
    p_id = $(e.target).closest('li').attr('id');
    console.log($(e.target).closest('li').attr('id'), $(e.target).closest('li').index())
})

$('#addlayer2').on('click', function(e) {
    $('#modal_addlayer').modal('open');
    e.preventDefault();
    e.stopPropagation();
})

$('#dropzone').on('submit', function(e) {
    console.log('SUBMIT')
    e.preventDefault();
    e.stopPropagation();
})