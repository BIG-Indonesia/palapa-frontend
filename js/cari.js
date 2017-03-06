
function getCsWRecords(query, bbox, start,callback){
    var bboxFilter = "";
    var stringFilter = "";
    var maxRecords = 10;

    // var _xml ='<?xml version="1.0" encoding="UTF-8" standalone="no"?><csw:GetRecords maxRecords="'+maxRecords+'" startPosition="'+start+'" outputFormat="application/json" outputSchema="http://www.opengis.net/cat/csw/2.0.2" resultType="results" service="CSW" version="2.0.2" xsi:schemaLocation="http://www.opengis.net/cat/csw/2.0.2 http://schemas.opengis.net/csw/2.0.2/CSW-discovery.xsd" xmlns:ogc="http://www.opengis.net/ogc"  xmlns:csw="http://www.opengis.net/cat/csw/2.0.2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><csw:Query typeNames="csw:Record"><csw:ElementSetName>full</csw:ElementSetName><csw:Constraint version="1.1.0"><ogc:Filter>';

    var _xml = '<?xml version="1.0" ?><csw:GetRecords maxRecords="'+maxRecords+'" startPosition="'+start+'" outputFormat="application/json" outputSchema="http://www.opengis.net/cat/csw/2.0.2" resultType="results" service="CSW" version="2.0.2" xmlns:csw="http://www.opengis.net/cat/csw/2.0.2" xmlns:gml311="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/cat/csw/2.0.2 http://schemas.opengis.net/csw/2.0.2/CSW-discovery.xsd"><csw:Query typeNames="csw:Record"><csw:ElementSetName>full</csw:ElementSetName><csw:Constraint version="1.1.0"><ogc:Filter>'

    if (Array.isArray(bbox) && bbox.length >=4){
        bboxFilter = ['<ogc:BBOX>',
                        '<ogc:PropertyName>ows:BoundingBox</ogc:PropertyName>',
                        '<gml311:Envelope>',
                        '<gml311:lowerCorner>'+ bbox[1] +' '+ bbox[0] +'</gml311:lowerCorner>',
                        '<gml311:upperCorner>'+ bbox[3] +' '+ bbox[2] +'</gml311:upperCorner>',
                        '</gml311:Envelope>',
                      '</ogc:BBOX>'].join("");
    }

    if(query.trim()){

        stringFilter = '<ogc:PropertyIsLike escapeChar="\" singleChar="_" wildCard="%"><ogc:PropertyName>csw:AnyText</ogc:PropertyName><ogc:Literal>%'+query.trim()+'%</ogc:Literal></ogc:PropertyIsLike>';
    }


    if(bboxFilter && stringFilter){
        _xml = _xml + '<ogc:And>' + bboxFilter + stringFilter + '</ogc:And>';
    }else{
        _xml = _xml +  bboxFilter ;        
    }

    _xml = _xml +'</ogc:Filter></csw:Constraint></csw:Query></csw:GetRecords>';

    $.post(_cswURL,
        _xml, 
        function(data){
            // var response = data["csw:GetRecordsResponse"];
            var searchresult = data["csw:GetRecordsResponse"]["csw:SearchResults"];

            var totalMatchRecords = searchresult["@numberOfRecordsMatched"];
            var returnMatchRecords = searchresult["@numberOfRecordsReturned"];

            if(start==1){
                nextRecord = searchresult["@nextRecord"]*1;
            }else if(nextRecord+maxRecords<=totalMatchRecords){
                nextRecord = nextRecord+maxRecords;
            }else if(searchresult["@nextRecord"]==0){
                nextRecord = 0;
            }


            // nextRecord = nextRecord+maxRecords>totalMatchRecords?nextRecord+maxRecords:1;
            prevRecord = start-maxRecords;
            if(searchresult["@numberOfRecordsMatched"]>0){
                var records = [];
                if(searchresult["csw:Record"].length>1){
                     records= searchresult["csw:Record"];
                }else{
                    records.push(searchresult["csw:Record"]);
                }
                var results = "";
                $.each(records,function(index, r){
                    var title = r["dc:title"]?r["dc:title"]:"";
                    var abstract = r["dct:abstract"]?r["dct:abstract"]:"";
                    var identifier = r["dc:identifier"];

                    var ref = r["dct:references"];
                    var wmsURL = "";
                    var wfsURL = "";
                    $.each(ref, function(ind, it){
                        if(typeof it["@scheme"] !="undefined" && it["@scheme"]=="OGC:WMS"){
                            wmsURL = it["#text"];
                        }else if(typeof it["@scheme"] !="undefined" && it["@scheme"]=="OGC:WFS"){
                            wfsURL = it["#text"];
                        }
                    });

                    var refBbox = r["ows:BoundingBox"];
                    var srs = refBbox["@crs"].split(":");
                    var bboxLC = refBbox["ows:LowerCorner"].split(" ");
                    var bboxUC = refBbox["ows:UpperCorner"].split(" ");

                    var h = bboxUC[1]-bboxLC[1];
                    var w = bboxUC[0]-bboxLC[0];

                    var w1 = (h/w)*200;
                    var h1 = (w/h)*250;

                    var imgSrc = "http://placehold.it/250x200";
                    if(wmsURL){
                        imgSrc = wmsURL+"request=GetMap&service=WMS&version=1.1.1&layers="+identifier+"&srs=EPSG:"+srs[(srs.length-1)]+"&bbox="+bboxLC[1]+","+bboxLC[0]+","+bboxUC[1]+","+bboxUC[0]+"&&width=250&height="+h1.toFixed(0)+"&format=image/png";
                    }

                    if(wfsURL){
                        zipURL = wfsURL + "service=WFS&version=1.0.0&request=GetFeature&typeName="+identifier+"&outputFormat=SHAPE-ZIP";
                    }

                    results = results + [ "<section> ",
                            '    <div class="shop-list-item">',
                            '        <div class="image">',
                            '            <a href="#">',
                            '                <img src="'+imgSrc+'" alt="'+identifier+'"/>',
                            '            </a>',
                            '        </div>',
                            '        <div class="detail">',
                            '          <div class="title">',
                            '              <h2>'+title+'</h2>',
                            '          </div>',
                            '          <div class="description">'+abstract+'</div>',
                            '          <div class="actions">',
                            '              '+(wmsURL?'<button class="btn btn-primary btn-sm wms-preview" data-toggle="modal" data-target="#wms-preview" data-identifier="'+identifier+'" data-srs="EPSG:'+srs[(srs.length-1)]+'" data-wmsURL="'+wmsURL+'" data-bbox="['+bboxLC[1]+','+bboxLC[0]+','+bboxUC[1]+','+bboxUC[0]+']">Lihat Peta</button> ':''),
                            '              '+(wfsURL?'<button class="btn btn-primary btn-sm wfs-preview" data-zipURL="'+zipURL+'">Unduh</button>':''),
                            '              <button class="btn btn-primary btn-sm metadata-preview"  data-toggle="modal" data-target="#metadata-preview" data-metadata=\''+JSON.stringify(r)+'\' data-wmsurl="'+wmsURL+'" data-wfsurl="'+wfsURL+'" data-bbox="['+bboxLC[1]+','+bboxLC[0]+','+bboxUC[1]+','+bboxUC[0]+']" data-fullmetadata="'+_cswURL+'?service=CSW&version=2.0.2&request=GetRecordById&ElementSetName=full&Id='+identifier+'&outputSchema=http://www.isotc211.org/2005/gmd">Metadata</button>',
                            '          </div>',
                            '        </div>',
                            '        <div class="clear"></div>',
                            '    </div>',
                            '</section>'].join("");
                });

            } 
            if(nextRecord>=1){
                $(".paginate_button.next").removeClass("disabled");
            }else{
                $(".paginate_button.next").addClass("disabled");                    
            }


            if(prevRecord>=1){
                $(".paginate_button.previous").removeClass("disabled");
            }else{
                $(".paginate_button.previous").addClass("disabled");                    
            }

            if(totalMatchRecords>=1){
                $("#content .page-header .row h5").html("Menampilkan "+returnMatchRecords+" dataset dari "+totalMatchRecords+ " dataset");
            }else{
                $("#content .page-header .row h5").html("Data tidak ditemukan.");
            }

            callback(results);
        },
    "json");    
}

function wrapLon(value) {
  var worlds = Math.floor((value + 180) / 360);
  return value - (worlds * 360);
}

var _query = "";
var _bbox = [];

function onMoveEnd(evt) {
    var map = evt.map;
    var extent = map.getView().calculateExtent(map.getSize());
    var bottomLeft = ol.proj.transform(ol.extent.getBottomLeft(extent), 'EPSG:3857', 'EPSG:4326');
    var topRight = ol.proj.transform(ol.extent.getTopRight(extent), 'EPSG:3857', 'EPSG:4326');
    $(".row .shop-list").html("");
  _bbox = [wrapLon(bottomLeft[0]), bottomLeft[1], wrapLon(topRight[0]), topRight[1]]; 
    getCsWRecords(_query, _bbox, 1, function(res){
        $(".row .shop-list").html(res);
    });
}

var map= null;
var map_preview = null;
var wmsLayer = null;
var nextRecord = 1;
var prevRecord = 0;
$(document).ready(function(){
    $(".row .shop-list").html("");

    $(".btn.search").click(function(){
        $(".row .shop-list").html("");
        _query = $("#searchText").val();
        getCsWRecords(_query, _bbox, 1, function(res){
            $(".row .shop-list").html(res);
        });
        return false;
    });

    map = new ol.Map({
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      controls: ol.control.defaults({
        zoom:true,
        attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
          collapsible: false
        })
      }),
      target: 'mapfilter',
      view: new ol.View({
        center: ol.proj.transform([118, -2], 'EPSG:4326', 'EPSG:3857'),
        zoom: 2,
        minZoom:2
      })
    });

    map.on('moveend', onMoveEnd);

    map_preview = new ol.Map({
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      controls     : ol.control.defaults({ attribution: false, zoom: true }),
      target: 'map-preview',
      view: new ol.View({
        projection: 'EPSG:4326',
        center: [118, -2],
        zoom: 5
      })
    });

    $("body")
        .on("click", ".wms-preview", function(){
            var wmsURL = $(this).data("wmsurl");
            var srs = $(this).data("srs");
            var bbox = $(this).data("bbox");
            var identifier = $(this).data("identifier");


            map_preview.removeLayer(wmsLayer);
            wmsLayer = new ol.layer.Tile({
              extent: bbox,
              source: new ol.source.TileWMS({
                url: _wmsURL,
                params: {'LAYERS': identifier},
                serverType: 'geoserver'
              })
            });


            setTimeout(function(){
                map_preview.updateSize();
                map_preview.addLayer(wmsLayer);
                map_preview.getView().fit(wmsLayer.getExtent(), map_preview.getSize());
            },500);
            // var view = map.getView();


        })
        .on("click", ".wfs-preview", function(){
            var zipURL = $(this).data("zipurl");
            location.href = zipURL;
        })
        .on("click", ".metadata-preview", function(){
            var metadata = $(this).data("metadata");
            var wmsURL = $(this).data("wmsurl");
            var wfsURL = $(this).data("wfsurl");
            var bbox = $(this).data("bbox");
            var fullmetadata = $(this).data("fullmetadata");
            $('#metadata-preview td[rel=title]').html(metadata["dc:title"]);
            $('#metadata-preview td[rel=subject]').html(metadata["dc:subject"]["#text"]);
            $('#metadata-preview td[rel=type]').html(metadata["dc:type"]);
            $('#metadata-preview td[rel=abstract]').html(metadata["dct:abstract"]);
            $('#metadata-preview td[rel=identifier]').html(metadata["dc:identifier"]);
            $('#metadata-preview td[rel=wms]').html(wmsURL);
            $('#metadata-preview td[rel=wfs]').html(wfsURL);
            $('#metadata-preview td[rel=bbox]').html("["+bbox.join(",")+"]");
            $('#metadata-preview .btn-primary').attr("rel", fullmetadata);

            $('#metadata-preview')
                .off("click", ".btn-primary")
                .on("click", ".btn-primary", function(){
                    window.open($(this).attr("rel"),"_blank");
                });

        })
        .on("click", ".paginate_button.next a", function(){
            if(!$(this).parent().hasClass("disabled")){
                getCsWRecords(_query, _bbox, nextRecord, function(res){
                    $(".row .shop-list").html(res);
                });
            }
        })
        .on("click", ".paginate_button.previous a", function(){
            if(!$(this).parent().hasClass("disabled")){
                getCsWRecords(_query, _bbox, prevRecord, function(res){
                    $(".row .shop-list").html(res);
                });
            }
        });
});
