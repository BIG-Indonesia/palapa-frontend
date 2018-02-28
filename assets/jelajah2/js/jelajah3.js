// Jelajah v3
// 2017. Tejo Damai Santoso
// Agrisoft
// v0.8b

// Init UI

var base_div = "jelajah";
var map_div = "jelajah_map";
var layer = [];
var raw_local_wms;
var raw_out_wms;
var raw_out_wms_url;
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
var box_ukur_visible = false;
var start_measure = false;
var listgeocoding = false;
var cari_val;
var exturl_val, exturl_type;
var simpul_val, simpul_type, simpul_text;
var photos;

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
    if (_proxy) {
        serviceUrl = _proxy + encodeURIComponent(serviceUrl);
    }
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
        listappend = "<li id='" + rndlayerid + "'><div class='collapsible-header'><div class='layer_control'><i id='visibility' class='material-icons'>check_box</i><span class='layer_name'>" + layer[rndlayerid].get('title') + "</span></div><!--<i id='getinfo' class='material-icons right'>comment</i>--><i id='zextent' class='material-icons right'>aspect_ratio</i><i id='remove' class='material-icons right'>cancel</i></div></div><div class='collapsible-body'><div class='row opa'><span class='col s4'><i class='material-icons' style=' padding-right: 15px; position: relative; bottom: -6px;'>opacity</i>Opacity</span><div class='col s8 range-field'><input type='range' id='opacity' min='0' max='100' value='100'/></div></div><span id='wmslegend_" + rndlayerid + "'></span></div></li>";
        $('#sortableul').prepend(listappend);
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

function olAddFrontWMSLayer(serviceUrl, layername, layermark, min_x, min_y, max_x, max_y, layer_nativename, aktif) {
    // rndlayerid = randomNumber()
    // if (_proxy) {
    //     serviceUrl = _proxy + encodeURIComponent(serviceUrl);
    // }
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
        visible: aktif,
        preload: Infinity,
        extent: extToMerc([min_x, min_y, max_x, max_y]),
        source: layer_source[rndlayerid]
    });
    map.addLayer(layer[rndlayerid]);
    console.log(rndlayerid, layermark, layer[rndlayerid].get('title'))
    setTimeout(() => {
        listappend = "<li id='" + rndlayerid + "'><div class='collapsible-header'><div class='layer_control'><i id='visibility' class='material-icons'>check_box</i><span class='layer_name'>" + layer[rndlayerid].get('title') + "</span></div><!--<i id='getinfo' class='material-icons right'>comment</i>--><i id='zextent' class='material-icons right'>aspect_ratio</i><i id='remove' class='material-icons right'>cancel</i></div></div><div class='collapsible-body'><div class='row opa'><span class='col s4'><i class='material-icons' style=' padding-right: 15px; position: relative; bottom: -6px;'>opacity</i>Opacity</span><div class='col s8 range-field'><input type='range' id='opacity' min='0' max='100' value='100'/></div></div><span id='wmslegend_" + rndlayerid + "'></span></div></li>";
        $('#sortableul').prepend(listappend);
        info_layer.push(rndlayerid);
        // extent = layer[rndlayerid].getExtent();
        // map.getView().fit(extent, map.getSize());
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
            listappend = "<li id='" + rndlayerid + "'><div class='collapsible-header'><div class='layer_control'><i id='visibility' class='material-icons'>check_box</i><span class='layer_name'>" + layer[rndlayerid].get('title') + "</span></div><!--<i id='getinfo' class='material-icons right'>comment</i>--><i id='zextent' class='material-icons right'>aspect_ratio</i><i id='remove' class='material-icons right'>cancel</i></div></div><div class='collapsible-body'><div class='row opa'><span class='col s4'><i class='material-icons' style=' padding-right: 15px; position: relative; bottom: -6px;'>opacity</i>Opacity</span><div class='col s8 range-field'><input type='range' id='opacity' min='0' max='100' value='100'/></div></div><span id='wmslegend_" + rndlayerid + "'></span></div></li>";
            $('#sortableul').prepend(listappend);
        } else {
            listappend = "<li id='" + rndlayerid + "'><div class='collapsible-header'><div class='layer_control'><i id='visibility' class='material-icons'>check_box_outline_blank</i><span class='layer_name'>" + layer[rndlayerid].get('title') + "</span></div><!--<i id='getinfo' class='material-icons right'>comment</i>--><i id='zextent' class='material-icons right'>aspect_ratio</i><i id='remove' class='material-icons right'>cancel</i></div></div><div class='collapsible-body'><div class='row opa'><span class='col s4'><i class='material-icons' style=' padding-right: 15px; position: relative; bottom: -6px;'>opacity</i>Opacity</span><div class='col s8 range-field'><input type='range' id='opacity' min='0' max='100' value='100'/></div></div><span id='wmslegend_" + rndlayerid + "'></span></div></li>";
            $('#sortableul').prepend(listappend);
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
        listappend = "<li id='" + rndlayerid + "'><div class='collapsible-header'><div class='layer_control'><i id='visibility' class='material-icons'>check_box</i>" + layer[rndlayerid].get('title') + "</div><!--<i id='getinfo' class='material-icons right'>comment</i>--><i id='zextent' class='material-icons right'>aspect_ratio</i><i id='remove' class='material-icons right'>cancel</i></div></div><div class='collapsible-body'><div class='row opa'><span class='col s4'><i class='material-icons' style='        padding-right: 15px; position: relative; bottom: -6px;'>opacity</i>Opacity</span><div class='col s8 range-field'><input type='range' id='opacity' min='0' max='100' value='100'/></div></div><span id='wmslegend_" + rndlayerid + "'></span></div></li>";
        $('#sortableul').prepend(listappend);
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

function wrapLon(value) {
    var worlds = Math.floor((value + 180) / 360);
    return value - (worlds * 360);
}

function onMoveEnd(evt) {
    var map = evt.map;
    var extent = map.getView().calculateExtent(map.getSize());
    var bottomLeft = ol.proj.transform(ol.extent.getBottomLeft(extent),
        'EPSG:3857', 'EPSG:4326');
    var topRight = ol.proj.transform(ol.extent.getTopRight(extent),
        'EPSG:3857', 'EPSG:4326');
    console.log('left', wrapLon(bottomLeft[0]), 'bottom', bottomLeft[1], wrapLon(topRight[0]), topRight[1]);
    if (photosmodal_stat) {
        getPhotos(wrapLon(bottomLeft[0]), bottomLeft[1], wrapLon(topRight[0]), topRight[1]);
    }
}

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
            listappend = "<li id='" + rndlayerid + "'><div class='collapsible-header'><div class='layer_control'><i id='visibility' class='material-icons'>check_box</i>" + layer[rndlayerid].get('title') + "</div><!--<i id='getinfo' class='material-icons right'>comment</i>--><i id='zextent' class='material-icons right'>aspect_ratio</i><i id='remove' class='material-icons right'>cancel</i></div></div><div class='collapsible-body'><div class='row opa'><span class='col s4'><i class='material-icons' style=' padding-right: 15px; position: relative; bottom: -6px;'>opacity</i>Opacity</span><div class='col s8 range-field'><input type='range' id='opacity' min='0' max='100' value='100'/></div></div><span id='wmslegend_" + rndlayerid + "'></span></div></li>";
            $('#sortableul').prepend(listappend);
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
            listappend = "<li id='" + rndlayerid + "'><div class='collapsible-header'><div class='layer_control'><i id='visibility' class='material-icons'>check_box</i>" + layer[rndlayerid].get('title') + "</div><!--<i id='getinfo' class='material-icons right'>comment</i>--><i id='zextent' class='material-icons right'>aspect_ratio</i><i id='remove' class='material-icons right'>cancel</i></div></div><div class='collapsible-body'><div class='row opa'><span class='col s4'><i class='material-icons' style=' padding-right: 15px; position: relative; bottom: -6px;'>opacity</i>Opacity</span><div class='col s8 range-field'><input type='range' id='opacity' min='0' max='100' value='100'/></div></div><span id='wmslegend_" + rndlayerid + "'></span></div></li>";
            $('#sortableul').prepend(listappend);
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
                listappend = "<li id='" + rndlayerid + "'><div class='collapsible-header'><div class='layer_control'><i id='visibility' class='material-icons'>check_box</i>" + layer[rndlayerid].get('title') + "</div><!--<i id='getinfo' class='material-icons right'>comment</i>--><i id='zextent' class='material-icons right'>aspect_ratio</i><i id='remove' class='material-icons right'>cancel</i></div></div><div class='collapsible-body'><div class='row opa'><span class='col s4'><i class='material-icons' style=' padding-right: 15px; position: relative; bottom: -6px;'>opacity</i>Opacity</span><div class='col s8 range-field'><input type='range' id='opacity' min='0' max='100' value='100'/></div></div><span id='wmslegend_" + rndlayerid + "'></span></div></li>";
                $('#sortableul').prepend(listappend);
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
            console.log(basetitle, default_layers[i].get('title'), isit);
            if (photosmodal_stat) {
                photoslayer.setVisible('true');
            }
            draw_vector.setVisible('true');
        }
    }, 500);
}

function getGeocoding() {
    $.ajax({
        url: "http://nominatim.openstreetmap.org/search?format=jsonv2&polygon_geojson=1&q=" + $("#cari_geocoding_input").val(),
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
        }
    });
}

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

function getPhotos(minx, miny, maxx, maxy) {
    $(".photosmodal").empty();
    $.ajax({
        url: palapa_api_url + "photos/query?minx=" + minx + "&miny=" + miny + "&maxx=" + maxx + "&maxy=" + maxy,
        async: true,
        success: function(data) {
            console.log(data);
            photosSource.clear();
            for (i = 0; i < data.length; i++) {
                var feature = new ol.Feature(data[i]);
                feature.set('nama', data[i].nama);
                var coordinate = [parseFloat(data[i].lon), parseFloat(data[i].lat)];
                var geometry = new ol.geom.Point(ol.proj.fromLonLat(coordinate, 'EPSG:3857'));
                feature.setGeometry(geometry);
                photosSource.addFeature(feature);
                photos_html = "<div id='photo_" + data[i].id + "'><div class='card photoscard'><div class='card-image'><img style='height:85px; width: auto;' src='data:image/jpeg;base64," + data[i].photo + "'/><span id='photo_" + data[i].id + "' class='card-title basemap'>" + data[i].nama + "</span></div></div></div></div>";
                $(".photosmodal").append(photos_html);
            }
        }
    })
}

function getPhotobyid(photoid) {
    $.ajax({
        url: palapa_api_url + "photos/id?id=" + photoid,
        async: true,
        success: function(data) {
            console.log(data);
            var coordinate = [parseFloat(data[0].lon), parseFloat(data[0].lat)];
            console.log(ol.proj.fromLonLat(coordinate, 'EPSG:3857'));
            var merc_coordinate = ol.proj.fromLonLat(coordinate, 'EPSG:3857');
            var geometry = new ol.geom.Point(ol.proj.fromLonLat(coordinate, 'EPSG:3857'));
            $('#popup-content').empty();
            var tabel_info_head = "<table class='highlight'><thead><tr><th>Key</th><th>Value</th></tr></thead><tbody id='isiinfo'></tbody></table>";
            $('#popup-content').append(tabel_info_head)
            $.each(data[0], function(k, v) {
                if (k != 'geometry') {
                    if (photosmodal_stat) {
                        if (k == 'photo') {
                            content_html = "<tr><td>" + data[0].nama + "</td><td><img style='width: 250px;' src='data:image/jpeg;base64," + data[0].photo + "'/></td></tr>";
                        } else {
                            content_html = "<tr><td>" + k + "</td><td>" + v + "</td></tr>";
                        }
                    } else {
                        content_html = "<tr><td>" + k + "</td><td>" + v + "</td></tr>";
                    }
                    $('#isiinfo').append(content_html)
                }
            });
            $('#popup-content').append(content_html)
            overlay.setPosition(merc_coordinate);
        }
    })
}

function findIndexInData(data, property, value) {
    for (var i = 0, l = data.length; i < l; i++) {
        if (data[i][property] === value) {
            return i;
        }
    }
    return -1;
}

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
    source: new ol.source.XYZ({
        url: 'http://basemap.big.go.id/geoserver/gwc/service/tms/1.0.0/basemap_rbi:basemap@EPSG:3857@png/{z}/{x}/{-y}.png'
    }),
    // source: new ol.source.TileWMS({
    //     url: 'http://202.4.179.123:8080/geoserver/gwc/service/wms',
    //     params: { LAYERS: 'basemap_rbi:basemap', VERSION: '1.1.1' }
    // }),
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
    title: 'Photos',
    source: photosSource,
    style: photosstyle,
    zIndex: 10000
});

var default_layers = [layer_osm, layer_rbi, layer_esri, layer_rbibaru, draw_vector, photoslayer];

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

// Init MAP

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

map.on('moveend', onMoveEnd);

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
                    if (photosmodal_stat) {
                        if (fkeys[i] == 'photo') {
                            content_html = "<tr><td>" + fkeys[i] + "</td><td><img style='width: 250px;' src='data:image/jpeg;base64," + feature.get(fkeys[i]) + "'/></td></tr>";
                        } else {
                            content_html = "<tr><td>" + fkeys[i] + "</td><td>" + feature.get(fkeys[i]) + "</td></tr>";
                        }
                    } else {
                        content_html = "<tr><td>" + fkeys[i] + "</td><td>" + feature.get(fkeys[i]) + "</td></tr>";
                    }
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
                    try {
                        data = JSON.parse(decodeURIComponent(data))
                    } catch (error) {
                        //
                    }
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

// Init UI Controls

var basemapbox = "<div class='basemapbox'><span class='basemapbtn'><i class='material-icons lrbox'>perm_media</i> Basemap</span><span class='photos'><i class='material-icons lrbox'>photo_camera</i> Foto</span></div>";
var basemapmodal = "<div class='basemapmodal'><div id='base_osm'><div class='card basemapcard'><div class='card-image'><img src='images/osm.png'><span class='card-title basemap'>OSM</span></div></div></div><div id='base_rbi'><div class='card basemapcard'><div class='card-image'><img src='images/rbi.png'><span class='card-title basemap'>RBI</span></div></div></div><div id='base_esri'><div class='card basemapcard'><div class='card-image'><img src='images/esri_i.png'><span class='card-title basemap'>ESRI</span></div></div></div><div id='base_rbibaru'><div class='card basemapcard'><div class='card-image'><img src='images/rbios.png'><span class='card-title basemap'>RBI OS</span></div></div></div></div>";
var photosmodal = "<div class='photosmodal'></div>";
var cari_geocoding = "<div class='cari_geocoding'></div>";
var cari_geocoding_input = "<input id='cari_geocoding_input' type='text' class='validate cari_geocoding_input'>";
var cari_geocoding_submit = "<i class='material-icons cari_geocoding_submit'>search</i><i class='material-icons cari_geocoding_tutup'>close</i>";
var hasil_cari_geocoding = "<div class='row geocoding_wrap'><div id='hasil_cari_geocoding' class='col s12 white'><ul id='list_hasil'></ul></div>"
var leftsidebarburger = "<i class='material-icons leftsidebarburger'>menu</i>"
var leftsidebar = "<div class='leftsidebar'><span class='daftarlayer'>Daftar Layer</span><a class='right waves-effect waves-light btn addlayerbtn tooltipped' data-position='right' data-delay='50' data-tooltip='Tambah Layer' id='addlayerbtn'><i class='material-icons left addlayerbtni'>add_box</i></a><a class='right waves-effect waves-light btn-flat tutupbtn tooltipped' data-position='right' data-delay='50' data-tooltip='Tutup Sidebar' id='tutupbtn'><i class='material-icons tutupbtni'>chevron_left</i></a><ul id='sortableul' class='collapsible' data-collapsible='expandable'></ul></div>";
var layerwindow = "<div id='layerwindow'><div id='layerwindowheader'>Tambah Layer <i class='material-icons layerwindowclose right'>close</i></div><div id='layerwindowcontent'><ul class='tabs' id='addlayerstab'><li class='tab col s3'><a class='active'  href='#locallayer'>Dataset</a></li><li class='tab col s3'><a href='#simpul'>Simpul</a></li><li class='tab col s3'><a href='#localfiles'>File</a></li><li class='tab col s3'><a href='#extlayer'>URL</a></li></ul><div id='tabsubheader'></div><div class='col s12 grey lighten-4 addlayercontentpad' id='locallayer'></div><div class='col s12 grey lighten-4 addlayercontentpad' id='extlayer'><ul class='collection' id='wms_item_list'></ul></div><div class='col s12 grey lighten-4 addlayercontentpad' id='localfiles'><div id='dropzone'></div></div><div class='col s12 white addlayercontentpad' id='simpul'><div class='col s2' id='ext_srv_t'></div><div class='col s2' id='ext_srv_url' style='display:none;'></div><div class='col s12'><ul class='collection' id='ext_wms_item_list'></ul></div></div></div></div>";
var layerwindow_lokal = "<ul class='collapsible' data-collapsible='expandable' id='layerwindow_lokal'></ul>";
var tablayerlokal = "<div class='input-field col s12 textinputnolab'><input placeholder='Cari layer ...' id='layername_lokal' type='text' class='validate tabsub' style='margin:0px;'/></div>";
var tablayersimpul = "<div class='input-field col s12 textinputnolab'><select id='ext_srv_type' name='ext_srv_type'><option disable='' selected='selected' value='WMS'>Pilih Servis</option></select></div>";
if (embedded) {
    var tablayerurl = "<div class='input-field col s12 textinputnolab' style='padding: 0px;'><div class='row' style='margin-left:15px;margin-right:15px'><div class='col s12 taburl'><div class='row' style='margin-bottom: 0px !important;'><div class='input-field col s12 textinputnolab' style='padding: 0px;'><input class='validate' style='margin-bottom: 0px;' id='url_servis' placeholder='URL servis' type='text'/></div></div></div></div><div class='row' style='margin-left:15px;margin-right:15px;'><div class='input-field col s8 textinputnolab'><select id='srv_type'><option disable='' selected='selected' value='WMS'>OGC WMS</option><option value='ESRI'>ESRI REST</option></select></div><div class='col s4 textinputnolab'><a class='waves-effect waves-light btn' id='getwmslist'>Ambil List</a></div></div></div>";
} else {
    var tablayerurl = "<div class='input-field col s12 textinputnolab' style='padding: 0px;'><div class='row'><div class='col s12 taburl'><div class='row' style='margin-bottom: 0px !important;'><div class='input-field col s12 textinputnolab' style='padding: 0px;'><input class='validate' style='margin-bottom: 0px;' id='url_servis' placeholder='URL servis' type='text'/></div></div></div></div><div class='row'><div class='input-field col s8 textinputnolab'><select id='srv_type'><option disable='' selected='selected' value='WMS'>OGC WMS</option><option value='ESRI'>ESRI REST</option></select></div><div class='col s4 textinputnolab'><a class='waves-effect waves-light btn' id='getwmslist'>Ambil List</a></div></div></div>";
}
var box_ukur = "<div id='box_ukur'><div class='input-field'><select id='select_ukur'><option value='' disabled selected>Pilih pengukuran</option><option value='1'>Panjang</option><option value='2'>Luas</option></select><label>Geometri</label></div><div id='panjang' class='input-field' style='display:none;'><select id='satuan_panjang'><option value=0 disabled selected>Satuan</option><option value=1>Meter (m)</option><option value=2>Kilometer (km)</option><option value=3>Mil</option></select><label>Satuan</label></div><div id='luas' class='input-field' style='display:none;'><select id='satuan_luas'><option value=0 disabled selected>Satuan</option><option value=4>Meter Persegi (m2)</option><option value=5>Kilometer Persegi (km2)</option><option value=6>Mil Persegi</option></select><label>Satuan</label></div></div>";

$("#jelajah").append(basemapbox);
$("#jelajah").append(basemapmodal);
$("#jelajah").append(photosmodal);
$("#jelajah").append(cari_geocoding);
$(".cari_geocoding").append(leftsidebarburger);
$(".cari_geocoding").append(cari_geocoding_input);
$(".cari_geocoding").append(cari_geocoding_submit);
$("#jelajah").append(leftsidebar);
$("#jelajah").append(layerwindow);
$("#jelajah").append(box_ukur);
$("#locallayer").append(layerwindow_lokal);
$("#tabsubheader").append(tablayerlokal);
// $("#jelajah").append(hasil_cari_geocoding);
$("#dropzone").append("<div id='dropinfo'>Klik di sini, atau Taruh berkas ZIP (Shapefile), GPX, atau CSV.<p><strong>Perhatikan:</strong></p><p>Shapefile, minimal terdiri dari set .shp .shx .dbf; tidak memiliki dimensi Z; proyeksi EPSG:4326</p><p>Memuat shapefile dengan geometri kompleks tidak dianjurkan</p></div>");

// UI Function

var basemapmodal_stat = false;
var photosmodal_stat = false;
var leftsidebar_stat = false;
var box_ukur_visible = false;
var start_measure = false;

$(function() {
    var dropzoneOptions = {
        url: palapa_api_url + "fakepath",
        acceptedFiles: '.zip,.ZIP,.gpx,.GPX,.csv,.CSV',
        clickable: true
    };
    dropzoneOptions.clickable = '#dropinfo';
    var dropzone = new Dropzone("#dropzone", dropzoneOptions);
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

function layertabswitch(tab) {
    if (tab == 'Dataset') {
        console.log('Dataset');
        $("#tabsubheader").empty();
        $("#tabsubheader").append(tablayerlokal);
        layer_cari();
        if (layer_cari) {
            $("#layername_lokal").val(cari_val);
        }
    }
    if (tab == 'Simpul') {
        console.log('Simpul');
        $("#tabsubheader").empty()
        $("#tabsubheader").append(tablayersimpul)
        for (i = 0; i < ext_srv.length; i++) {
            if (ext_srv[i].type == 'OGC WMS') { tipe = 'WMS' } else { tipe = 'ESRI' };
            item_html = "<option value='" + ext_srv[i].url + "'>" + ext_srv[i].name + "</option>";
            $('#ext_srv_type').append(item_html);
            extChanged();
        }
        if (simpul_val) {
            console.log(simpul_type, simpul_val, simpul_text);
            $("#ext_srv_type").val(simpul_val);
            // $("#srv_type").val(simpul_type);
            // $("[name=ext_srv_type]").text(simpul_text);
        }
        $('select').material_select();
    }
    if (tab == 'URL') {
        console.log('URL');
        $("#tabsubheader").empty();
        $("#tabsubheader").append(tablayerurl);
        getwmslist();
        if (exturl_val) {
            console.log(exturl_type, exturl_val);
            $("#url_servis").val(exturl_val);
            $("#srv_type").val(exturl_type);
        }
        $('select').material_select();
    }
    if (tab == 'File') {
        console.log('File');
        $("#tabsubheader").empty()
    }
}

function basemapstoggle() {
    if (!basemapmodal_stat) {
        $(".ol-zoom").css('bottom', '9.5em');
        $("#zoomextent").css('bottom', '217px');
        $(".basemapbox").css('bottom', '100px');
        $(".basemapmodal").css('height', '100px');
        $(".photosmodal").css('height', '0px');
        basemapmodal_stat = true;
        if (photosmodal_stat) {
            photosSource.clear();
            photosmodal_stat = false;
        }
    } else {
        $(".ol-zoom").css('bottom', '5em');
        $("#zoomextent").css('bottom', '150px');
        $(".basemapbox").css('bottom', '35px')
        $(".basemapmodal").css('height', '0px');
        basemapmodal_stat = false;
    }
}

function photostoggle() {
    if (!photosmodal_stat) {
        $(".ol-zoom").css('bottom', '9.5em');
        $("#zoomextent").css('bottom', '217px');
        $(".basemapbox").css('bottom', '100px');
        $(".photosmodal").css('height', '100px');
        $(".basemapmodal").css('height', '0px');
        photosmodal_stat = true;
        var extent = map.getView().calculateExtent(map.getSize());
        var bottomLeft = ol.proj.transform(ol.extent.getBottomLeft(extent),
            'EPSG:3857', 'EPSG:4326');
        var topRight = ol.proj.transform(ol.extent.getTopRight(extent),
            'EPSG:3857', 'EPSG:4326');
        getPhotos(wrapLon(bottomLeft[0]), bottomLeft[1], wrapLon(topRight[0]), topRight[1]);
        photoslayer.setVisible('true');
        if (basemapmodal_stat) {
            basemapmodal_stat = false;
        }
    } else {
        $(".ol-zoom").css('bottom', '5em');
        $("#zoomextent").css('bottom', '150px');
        $(".basemapbox").css('bottom', '35px')
        $(".photosmodal").css('height', '0px');
        photosSource.clear();
        photosmodal_stat = false;
    }
}

function leftsidebartoggle() {
    if (!leftsidebar_stat) {
        $(".cari_geocoding").css('left', '325px');
        $(".leftsidebar").css('width', '300px');
        $(".geocoding_wrap").css('left', '300px')
        $("i cari_geocoding_tutup").css('display', 'unset');
        $("#sortableul").show();
        $(".daftarlayer").show();
        leftsidebar_stat = true;
    } else {
        $(".cari_geocoding").css('left', '25px');
        $(".leftsidebar").css('width', '0px');
        $(".geocoding_wrap").css('left', '0px')
        $("i cari_geocoding_tutup").css('display', 'none');
        $("#sortableul").hide();
        $(".daftarlayer").hide();
        leftsidebar_stat = false;
    }
}

function dragElement(elmnt) {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        console.log("OFFRIGHT", elmnt.offsetLeft + 400, elmnt.offsetTop, w, h);
        e = e || window.event;
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        if (elmnt.offsetLeft + 400 <= w && elmnt.offsetTop > 0) {
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        } else {
            if (elmnt.offsetTop <= 0) {
                elmnt.style.top = 1 + "px";
            } else {
                elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            }
            elmnt.style.left = (w - 401) + "px";
        }
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

$('.ol-overlaycontainer-stopevent').append("<div id='zoomextent' class='ol-control'></div>");
$('#zoomextent').append("<button id='zoomextentbtn' type='button' title='Zoom To Extent'><i id='zoomextenbtni' class='material-icons'>public</i></button></div>");
$('#zoomextenbtni').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('ZE')
    map.getView().fit(merc_extent, map.getSize());
});

$('.ol-overlaycontainer-stopevent').append("<div id='ukuran' class='ol-control'></div>");
$('#zoomextent').append("<button id='ukuranbtn' type='button' title='Pengukuran'><i id='ukuranbtni' class='material-icons'>straighten</i></button></div>");
$('#ukuranbtni').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('ME')
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

$(".basemapbtn").on('click', function() {
    basemapstoggle();
})

$(".photos").on('click', function() {
    photostoggle();
})

$(".leftsidebarburger").on('click', function() {
    leftsidebartoggle();
})

$(".tutupbtni").on('click', function() {
    leftsidebartoggle();
})

$("#addlayerstab a").on('click', function(e) {
    seltab = $(e.target).text();
    layertabswitch(seltab)
})

$("#addlayerbtn").on('click', function() {
    $("#layerwindow").show();
})

$(".layerwindowclose").on('click', function() {
    $("#layerwindow").hide();
})

function geocoding_cari() {
    $(".geocoding_wrap").remove();
    $("#hasil_cari_geocoding").remove();
    $("#jelajah").append(hasil_cari_geocoding);
    if (leftsidebar_stat) {
        $(".geocoding_wrap").css('left', '300px')
    } else {
        $(".geocoding_wrap").css('left', '0px')
    }
    if (listgeocoding) {
        getGeocoding();
        setTimeout(() => {
            list_hasil_event()

        }, 500);
    } else {
        $(".cari_geocoding_tutup").show();
        $(".cari_geocoding_submit").css('right', '32px');
        getGeocoding();
        setTimeout(() => {
            list_hasil_event()

        }, 500);
        window.listgeocoding = true;
    }
}

$(".cari_geocoding_submit").on('click', function() {
    geocoding_cari()
})

$("#cari_geocoding_input").on("keydown", function(event) {
    if (event.which == 13)
        geocoding_cari();
});

$(".cari_geocoding_tutup").on('click', function() {
    $(".geocoding_wrap").remove();
    // $("#jelajah").append(hasil_cari_geocoding);
    if (listgeocoding) {
        $(".cari_geocoding_tutup").hide();
        $(".cari_geocoding_submit").css('right', '0px');
        window.listgeocoding = false;
    } else {
        $(".cari_geocoding_tutup").show();
        $(".cari_geocoding_submit").css('right', '32px');
        window.listgeocoding = true;
    }

})

$("#hasil_cari_geocoding").on('click', function() {
    console.log('CLICK');
})

$(".basemapmodal").on('click', function(e) {
    base_id = $(e.target).siblings().text();
    console.log($(e.target).siblings().text());
    switchbaselayer(base_id);
})

$(".photosmodal").on('click', function(e) {
    base_id = $(e.target).siblings().attr('id');
    console.log($(e.target).siblings().attr('id').split('_')[1]);
    getPhotobyid(base_id.split('_')[1]);
    // overlay.setPosition(coordinate);
    // switchbaselayer(base_id);
})


function list_hasil_event() {
    $("#list_hasil").on('click', function(e) {
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
                listappend = "<li id='" + rndlayerid + "'><div class='collapsible-header'><div class='layer_control'><i id='visibility' class='material-icons'>check_box</i>" + layer[rndlayerid].get('title') + "</div><!--<i id='getinfo' class='material-icons right'>comment</i>--><i id='zextent' class='material-icons right'>aspect_ratio</i><i id='remove' class='material-icons right'>cancel</i></div></div><div class='collapsible-body'><div class='row opa'><span class='col s4'><i class='material-icons' style='padding-right: 15px; position: relative; bottom: -6px;'>opacity</i>Opacity</span><div class='col s8 range-field'><input type='range' id='opacity' min='0' max='100' value='100'/></div></div><span id='wmslegend_" + rndlayerid + "'></span></div></li>";
                $('#sortableul').prepend(listappend);
                layer_index.push(rndlayerid);
                layer[rndlayerid].setZIndex(layer.length)
            }
        }
    });
}

$('#ext_wms_item_list').on('click', function(e) {
    p_id = $(e.target).attr('id');
    srv_type = $('#ext_srv_t').text();
    srv_url = $('#ext_srv_url').text();
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
        console.log(srv_url, p_state, p_id, p_name, min_x, min_y, max_x, max_y, layer_nativename);
        olAddWMSLayer(srv_url, p_id, p_name, min_x, min_y, max_x, max_y, layer_nativename);
    } else {
        olAddRESTLayer(srv_url, p_id);
    }
})

function getwmslist() {
    $('#getwmslist').on('click', function() {
        srv_type = $('#srv_type').val();
        srv_url = $('#url_servis').val();
        window.exturl_val = srv_url;
        window.exturl_type = srv_type;
        console.log('CLICKED', srv_type, srv_url);
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
                        window.raw_out_wms_url = wmslayerlist;
                        console.log(wmslayerlist)
                        $('#wms_item_list').empty();
                        for (i = 0; i < wmslayerlist.length; i++) {
                            item_html = "<li id='" + wmslayerlist[i].Name + "' class='collection-item'><i id='add_check' class='material-icons ilist2'>add_circle</i> <span class='layermark lilist2' id='" + wmslayerlist[i].Name + "'>" + wmslayerlist[i].Title + "</span></li>";
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
                            item_html = "<li id='" + layers[i].id + "' class='collection-item'><i id='add_check' class='material-icons ilist2'>add_circle</i> <span class='layermark lilist2' id='" + layers[i].id + "'>" + layers[i].name + "</span></li>";
                            $('#wms_item_list').append(item_html);
                        }
                    }
                })
            }
            getRESTdata();
        }
    })

}

$('#wms_item_list').on('click', function(e) {
    p_id = $(e.target).attr('id');
    srv_type = $('#srv_type').val();
    srv_url = $('#url_servis').val();
    if (srv_type == 'WMS') {
        if (p_id == '' || typeof(p_id) == 'undefined' || p_id == 'add_check') {
            p_id = $(e.target).closest('li').attr('id');
        }
        var min_x, min_y, max_x, max_y, layer_nativename;
        for (i = 0; i < raw_out_wms_url.length; i++) {
            // console.log(raw_local_wms[i].layer_nativename)
            try {
                if (raw_out_wms_url[i].Name.indexOf(p_id) >= 0) {
                    min_x = raw_out_wms_url[i].EX_GeographicBoundingBox[0];
                    min_y = raw_out_wms_url[i].EX_GeographicBoundingBox[1];
                    max_x = raw_out_wms_url[i].EX_GeographicBoundingBox[2];
                    max_y = raw_out_wms_url[i].EX_GeographicBoundingBox[3];
                    layer_nativename = raw_out_wms_url[i].Name;
                }
            } catch (error) {
                // if (raw_out_wms[i].Title.indexOf(p_id) >= 0) {
                min_x = raw_out_wms_url[i].EX_GeographicBoundingBox[0];
                min_y = raw_out_wms_url[i].EX_GeographicBoundingBox[1];
                max_x = raw_out_wms_url[i].EX_GeographicBoundingBox[2];
                max_y = raw_out_wms_url[i].EX_GeographicBoundingBox[3];
                layer_nativename = raw_out_wms_url[i].Title;
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

dragElement(document.getElementById(("layerwindow")));

function extChanged() {
    $("#ext_srv_type").on('change', function() {
        console.log('CHANGED');
        tipe = 'WMS';
        $("#ext_srv_url").text($("#ext_srv_type").val())
        $('#ext_wms_item_list').empty();
        for (i = 0; i < ext_srv.length; i++) {
            if (ext_srv[i].url == $("#ext_srv_type").val()) {
                if (ext_srv[i].type == 'OGC WMS') { tipe = 'WMS' } else { tipe = 'ESRI' };
                $("#ext_srv_t").text(ext_srv[i].type);
                window.simpul_val = $("#ext_srv_type").val();
                window.simpul_type = tipe;
                window.simpul_text = ext_srv[i].name;
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
                                for (i = 0; i < wmslayerlist.length; i++) {
                                    item_html = "<li id='" + wmslayerlist[i].Name + "' class='collection-item'><i id='add_check' class='material-icons ilist2'>add_circle</i> <span class='layermark lilist2' id='" + wmslayerlist[i].Name + "'>" + wmslayerlist[i].Title + "</span></li>";
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
                                    item_html = "<li id='" + layers[i].id + "' class='collection-item'><i id='add_check' class='material-icons ilist2'>add_circle</i> <span class='layermark lilist2' id='" + layers[i].id + "'>" + layers[i].name + "</span></li>";
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
}


function layer_cari() {
    $("#layername_lokal").on('input', function() {
        $('#layerwindow_lokal').empty();
        console.log($("#layername_lokal").val())
        carilayer = $("#layername_lokal").val();
        window.cari_val = carilayer;
        listw = [];
        for (j = 0; j < raw_local_wms.length; j++) {
            listw.push(raw_local_wms[j].workspace);
        }
        list_workspace = uniqueArray(listw);
        for (k = 0; k < list_workspace.length; k++) {
            w_html = "<li id='wrk_" + list_workspace[k] + "'><div class='collapsible-header active'><i class='material-icons tiny'>collections</i>" + list_workspace[k] + "</div><div class='collapsible-body'><ul id='id_" + list_workspace[k] + "' class='collection'></ul></div></li>";
            $('#layerwindow_lokal').append(w_html);
            items = 0;
            for (u = 0; u < raw_local_wms.length; u++) {
                if (raw_local_wms[u].layer_name.toLowerCase().indexOf(carilayer) >= 0) {
                    if (raw_local_wms[u].workspace == list_workspace[k] && raw_local_wms[u].layer_advertised == true) {
                        l_html = "<li id='" + raw_local_wms[u].layer_nativename + "' class='collection-item'><i id='" + raw_local_wms[u].layer_nativename + "' class='material-icons ilist'>add_circle</i> <span class='layermark lilist' id='" + raw_local_wms[u].layer_nativename + "'>" + raw_local_wms[u].layer_name + "</span></li>";
                        $('#id_' + list_workspace[k]).append(l_html);
                        items = items + 1;
                    }
                }
            }
            if (items == 0) {
                $('#wrk_' + list_workspace[k]).remove();
            }
        }
        if ($("#layername_lokal").val() == '') {
            $('#layerwindow_lokal').empty();
            getLocalLayers();
        }
        $('.collapsible').collapsible();
    })
}

$("#layerwindow_lokal").on('click', function(e) {
    p_id = $(e.target).attr('id');
    if ($(e.target).find('.layermark').first().text()) {
        p_name = $(e.target).find('.layermark').first().text();
    } else {
        p_name = $(e.target).siblings('.layermark').first().text();
    }
    if (p_name == '') {
        p_name = $(e.target).text();
    }
    console.log($(e.target), p_id);
    var min_x, min_y, max_x, max_y, layer_nativename;
    for (i = 0; i < raw_local_wms.length; i++) {
        if (raw_local_wms[i].layer_nativename.indexOf(p_id) >= 0) {
            min_x = raw_local_wms[i].layer_minx;
            min_y = raw_local_wms[i].layer_miny;
            max_x = raw_local_wms[i].layer_maxx;
            max_y = raw_local_wms[i].layer_maxy;
            layer_nativename = raw_local_wms[i].layer_nativename;
        }
    }
    console.log(p_name, min_x, min_y, max_x, max_y, layer_nativename);
    if (typeof(p_name) == 'undefined' || typeof(p_id) == 'undefined') {
        // pass
    } else {
        olAddWMSLayer(local_gs, p_id, p_name, min_x, min_y, max_x, max_y, layer_nativename);
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
    // try {
    //     p_native = ("#" + layer[p_id].getSource().i.LAYERS).replace(":", "\\\\:");
    //     console.log(p_native)
    //     $('[id="' + layer[p_id].getSource().i.LAYERS + '"]').find('i').text('check_box_outline_blank');
    // } catch (error) {
    //     //
    // }
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

// Get Initial Data

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
            for (k = 0; k < list_workspace.length; k++) {
                w_html = "<li id='wrk_" + list_workspace[k] + "'><div class='collapsible-header'><i class='material-icons tiny'>collections</i>" + list_workspace[k] + "</div><div class='collapsible-body'><ul id='id_" + list_workspace[k] + "' class='collection'></ul></div></li>";
                $('#layerwindow_lokal').append(w_html);
                items = 0;
                for (u = 0; u < data.length; u++) {
                    if (data[u].workspace == list_workspace[k] && data[u].layer_advertised == true) {
                        l_html = "<li id='" + data[u].layer_nativename + "' class='collection-item'><i id='" + raw_local_wms[u].layer_nativename + "' class='material-icons ilist'>add_circle</i> <span class='layermark lilist' id='" + data[u].layer_nativename + "'>" + data[u].layer_name + "</span></li>";
                        $('#id_' + list_workspace[k]).append(l_html);
                        items = items + 1;
                    }
                }
                if (items == 0) {
                    $('#wrk_' + list_workspace[k]).remove();
                }
            }
        }
    })
}
getLocalLayers();

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

getBasemaps();

setTimeout(() => {
    for (var key in basemap) {
        if (key === 'length' || !basemap.hasOwnProperty(key)) continue;
        console.log(basemap[key])
        default_layers.push(basemap[key]);
        map.addLayer(basemap[key]);
        item_html = "<div id='" + key + "'><div class='card basemapcard'><div class='card-image'><img src='images/osm.png'><span class='card-title basemap'>" + basemap[key].get('title') + "</span></div></div></div>";
        $(".basemapmodal").append(item_html);
        console.log(item_html)
    }

}, 1000);

function getFrontlayers() {
    $.ajax({
        url: palapa_api_url + "front_layers",
        async: false,
        success: function(data) {
            console.log(data);
            for (i = 0; i < data.length; i++) {
                // layeritem = {};
                rawlayerid = findIndexInData(raw_local_wms, 'layer_nativename', data[i]['layer_nativename']);
                layeritem = raw_local_wms[rawlayerid];
                aktif = data[i]['aktif']
                console.log(local_gs, layeritem['layer_name'], layeritem['layer_nativename'], layeritem['layer_minx'], layeritem['layer_miny'], layeritem['layer_maxx'], layeritem['layer_maxy'], layeritem['layer_nativename'], aktif);
                olAddDEFLayer(layeritem['layer_nativename'], layeritem['layer_name'], layeritem['layer_nativename'], aktif, layeritem['layer_minx'], layeritem['layer_miny'], layeritem['layer_maxx'], layeritem['layer_maxy'])
                    // olAddFrontWMSLayer(local_gs, layeritem['layer_name'], layeritem['layer_id'], layeritem['layer_minx'], layeritem['layer_miny'], layeritem['layer_maxx'], layeritem['layer_maxy'], layeritem['layer_nativename'], aktif);
            }
        }
    })
}
getFrontlayers();

// DOC READY

$(document).ready(function() {
    $('select').material_select();
    var sortableel = document.getElementById('sortableul');
    var sortableul = Sortable.create(sortableel, {
        handle: ".collapsible-header",
        onEnd: function(e) {
            listindex = $("#sortableul li");
            listindex.reverse();
            listindex.each(function(index, li) {
                layer[li.id].setZIndex(index)
            })
        }
    });
    $('.tooltipped').tooltip({ delay: 50 });
    layer_cari();
});