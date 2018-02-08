//API untuk walidata http://192.168.100.55:8000/api/

$.ajax({
    url: _api + "sisteminfo",
    async: false
}).success(function(data) {
    window.extent1 = data['extent'];
    console.log(extent1);
});



$('document').ready(function() {

    setTimeout(function() {
        $('#demo').jplist({
            itemsBox: '.list',
            itemPath: '.list-item',
            panelPath: '.jplist-panel'
        });
    }, 2000);

});
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
if (getUrlParameter('keyword')) {
    $(".keyword").val('');
    $(".keyword").val(getUrlParameter('keyword'));
}

jQuery.ajax({
    url: _api + 'group/listl',
    success: function(result) {
        var listdata = (result);

        var selectw = false;

        for (var i = 0; i < listdata.length; i++) {
            //  console.log(listdata[i]);

            if (listdata[i]['name'] == getUrlParameter('walidata')) {
                selectw = true;
            } else {
                selectw = false;
            }
            $('#walidata-logo-slider').append('<div class="item"><div class="client-face"><img src="data:;base64,' + listdata[i]['logo'] + '" alt="" style="height:80px;"></div><div class="client-text"><a href="#"><h4><strong>' + listdata[i]['name'] + ' </strong></h4></a><h6>' + listdata[i]['jumlah_data'] + ' dataset</h6></div></div>');
            $('#basic').append('<option selected=' + selectw + ' value="' + listdata[i]['name'] + '" data-path=".' + listdata[i]['name'] + '">' + listdata[i]['name'] + '</option>');
            $('#ul_walidata').append('<li><div class="col-md-3 col-sm-3 col-xs-3 blg-thumb p0"><a href="pencarian.html?walidata=' + encodeURIComponent(listdata[i]['name']) + '&kategori=&keyword=&bbox="><img src="data:;base64,' + listdata[i]['logo'] + '" alt="" style="height:80px;"></a></div><div class="col-md-8 col-sm-8 col-xs-8 blg-entry"><h6><a href="pencarian.html?walidata=' + encodeURIComponent(listdata[i]['name']) + '&kategori=&keyword=&bbox=">' + listdata[i]['name'] + '</a></h6><span class="property-price">' + listdata[i]['jumlah_data'] + ' dataset</span></div></li>');
        }
        $('#jumlah_wali_data').text(String(listdata.length));

    },
    async: false
});


// $.get( _api + "group/listl", function( data ) {
//   listdata = (data);
//   //console.log(listdata);
//     var selectw=false;
//   for (i=0; i < listdata.length; i++){
//     //console.log(listdata[i]);

//     if(listdata[i]['name']==getUrlParameter('lunchBegins2')){
//       selectw = true;
//     }else{
//       selectw = false;
//     }

//     $('#walidata-logo-slider').append('<div class="item"><div class="client-face"><img src="data:;base64,'+listdata[i]['logo']+'" alt="" style="height:80px;"></div><div class="client-text"><a href="#"><h4><strong>'+listdata[i]['name']+' </strong></h4></a><h6>'+listdata[i]['jumlah_data']+' dataset</h6></div></div>');


//         $('#lunchBegins2').append('<option>'+listdata[i]['name']+'</option>')

//         $('#basic').append('<option selected='+selectw+' value="'+listdata[i]['name']+'" data-path=".'+listdata[i]['name']+'">'+listdata[i]['name']+'</option>');  



//        $('#ul_walidata').append('<li><div class="col-md-3 col-sm-3 col-xs-3 blg-thumb p0"><a href="single.html"><img src="data:;base64,'+listdata[i]['logo']+'" alt="" style="height:80px;"></a></div><div class="col-md-8 col-sm-8 col-xs-8 blg-entry"><h6><a href="single.html">'+listdata[i]['name']+'</a></h6><span class="property-price">'+listdata[i]['jumlah_data']+' dataset</span></div></li>'); 
//     }

//        $('#jumlah_wali_data').text(String(listdata.length));
// });

//API untuk Kagori

jQuery.ajax({
    url: _api + 'jumlahdataset',
    success: function(result) {
        var listdata = (result);

        var select = false;
        var p_kategori = getUrlParameter('kategori');
        console.log(p_kategori);
        for (var i = 0; i < listdata.length; i++) {
            //  console.log(listdata[i]);
            console.log(listdata[i]['keywords']);

            if (listdata[i]['keywords'] == getUrlParameter('kategori')) {
                select = true;
            } else {
                select = false;
            }
            $('#lunchBegins').append('<option selected=' + select + ' value="' + listdata[i]['keywords'] + '" data-path=".' + listdata[i]['keywords'] + '">' + listdata[i]['keywords'] + '</option>');

            $('#kategori_dataset').append('<div class="col-sm-2 col-xs-6"><div class="count-item"><div class="count-item-circle"><img src="data:;base64,' + listdata[i]['logo'] + '" alt="" style="height:80px;"></div><div class="chart"><h6><a href="pencarian.html?kategori=' + listdata[i]['keywords'] + '&keyword=&walidata=&bbox=">' + listdata[i]['keywords'] + '</a></h6><span class="jumlah_dataset badge badge-pill badge-danger">' + listdata[i]['jumlah'] + '</span></div></div></div>');

            $('#ul_kategori').append('<li><div class="col-md-12 col-sm-12 col-xs-12"><ul class="footer-menu"><li><a href="pencarian.html?kategori=' + listdata[i]['keywords'] + '&keyword=&walidata=&bbox=">&raquo; ' + listdata[i]['keywords'] + ' </a><span class="jumlah_dataset_pencarian badge badge-pill badge-primary pull-right">' + listdata[i]['jumlah'] + '</span></li></ul></div></li>');

        }
    },
    async: false
});




//API untuk sistem info http://192.168.100.55:8000/api/
$.get(_api + "sisteminfo", function(data) {
    //listdata = JSON.parse(data);
    console.log(data);
    $('#title-index').text('Home :: Geoportal ' + data['organization']);
    $('#title-jelajah').text('Jelajah :: Geoportal ' + data['organization']);
    $('#title-pencarian').text('Pencarian Data :: Geoportal ' + data['organization']);
    $('#title-kontak').text('Kontak Kami :: Geoportal ' + data['organization']);

    $('#organisasi').text(data['organization']);
    $('#organisasi-body').text(data['organization']);
    $('#country').text(data['country'])
    $('#alamat-body').text(data['address'] + ', ' + data['city'] + ', ' + data['postalcode'] + ', ' + data['administrativearea']);
    $('#alamat-footer').text(data['address'] + ', ' + data['city'] + ', ' + data['postalcode'] + ', ' + data['administrativearea'] + ', ' + data['country']);
    $('#email-body').text(data['email']);
    $('#email-footer').text('Email: ' + data['email']);
    $('#phone-body').text('Telp: ' + data['phone']);
    $('#phone').text('Telp: ' + data['phone']);
    $('#fax').text('Fax: ' + data['fax']);
    $('#fax-body').text('Fax: ' + data['fax']);
    $('#footer-tentang-kami').text(data['deskripsi']);

    $('#organisasi-logo').empty();
    $('#organisasi-logo').text('EOPORTAL ' + data['organization']);
    $('#logos').attr('src', data['logo']);

    $('#judul-slider-depan').text('Geoportal ' + data['organization']);
});


jQuery.ajax({
    type: 'GET',
    url: _api + 'listmetalayer',
    data: {
        'keyword': getUrlParameter('keyword'),
        'kategori': getUrlParameter('kategori'),
        'walidata': getUrlParameter('walidata'),
        'bbox': getUrlParameter('bbox')
    },
    success: function(data) {
        listdata = (data);
        //console.log(listdata);
        // var str = "AGRISOFT:jalan_semarang_320020171126130704";

        var str = "";
        var str2 = "";
        var str3 = "";
        var image2 = "";
        var array = [];;
        //array[1] = str.split(":");
        for (i = 0; i < listdata.length; i++) {
            //console.log(listdata[i]);

            str = "";
            array = [];
            image2 = "";

           
            //pengambilan id csw
            str = listdata[i]['identifier'];
           // =====================

            array[0] = str.split(":");
            
            str2 = "";
            str3 = "";

            str2 = listdata[i]['links'];
            image2 = str2.split('^')[1].split(',')[3].split('?')[0];
            image2 = image2 + '/reflect?format=image/png&layers=' + listdata[i]['identifier']


            download = "";
            str3 = listdata[i]['links'];
            download = str3.split('^')[0].split(',')[3];
            download = download + 'service=WFS&version=1.0.0&request=GetFeature&typeName=' + listdata[i]['identifier'] + '&outputFormat=shape-zip';

            // console.log(image2);
            //    console.log(download);

            $('#list-type').append(' <div class="list-item"> <div class="col-sm-6 col-md-4 p0"><div class="box-two proerty-item"><div class="item-thumb"><a href="#"><img src="' + image2 + '"</a></div><div class="item-entry overflow"><h5><a href="" class="title">' + listdata[i]['title'] + ' </a></h5><div class="dot-hr"></div><span class="pull-left"><b class="' + listdata[i]['keywords'] + '">' + listdata[i]['keywords'] + '</b></span><span class="proerty-price pull-right"><img src="assets/img/maps_look.png" width="20px" height="20px" title="Lihat peta" data-toggle="modal" data-target="#viewPeta" class="cursor_pointer"><img src="assets/img/metadata.png" id="' + listdata[i]['identifier'] + '" width="20px" height="20px" title="Lihat metadata" data-toggle="modal" data-target="#metaDatalengkap" class="cursor_pointer"><img src="assets/img/download.png" width="20px" height="20px" title="Download" data-toggle="modal" data-target="#downloadModal" class="cursor_pointer"></span><p style="display: none;">' + listdata[i]['abstract'] + '</p><div class="property-icon"><b class="' + array[0][0] + '">' + array[0][0] + '</b></div></div></div></div> ');
        }
    },
    async: false
});

// $.get( _api + "listmetalayer", function( data ) {
//   listdata = (data);
//   //console.log(listdata);
//   // var str = "AGRISOFT:jalan_semarang_320020171126130704";

//   var str ="";
//   var str2 = "";
//   var str3 ="";
//   var image2 ="";
//   var array = [];;
//     //array[1] = str.split(":");
//   for (i=0; i < listdata.length; i++){
//     //console.log(listdata[i]);

//      str = "";
//      array =[];
//      image2 = "";
//      str =listdata[i]['identifier'];
//      array[0] = str.split(":");
//      str2 ="";
//      str3 = "";

//      str2 =listdata[i]['links']; 
//      image2 =str2.split('^')[1].split(',')[3].split('?')[0];
//      image2 = image2+'/reflect?format=image/png&layers='+listdata[i]['identifier']


//      download="";
//      str3 =listdata[i]['links'];
//      download=str3.split('^')[0].split(',')[3];
//      download = download + 'service=WFS&version=1.0.0&request=GetFeature&typeName='+listdata[i]['identifier']+'&outputFormat=shape-zip';

//     // console.log(image2);
//   //    console.log(download);

//      $('#list-type').append(' <div class="list-item"> <div class="col-sm-6 col-md-4 p0 wow fadeInUp animated" data-wow-delay="0.2s"><div class="box-two proerty-item"><div class="item-thumb"><a href="#"><img src="'+image2+'"</a></div><div class="item-entry overflow"><h5><a href="property-1.html" class="title">'+listdata[i]['title']+' </a></h5><div class="dot-hr"></div><span class="pull-left"><b class="'+listdata[i]['keywords']+'">'+listdata[i]['keywords']+'</b></span><span class="proerty-price pull-right"><img src="assets/img/maps_look.png" width="20px" height="20px" title="Lihat peta" data-toggle="modal" data-target="#viewPeta" class="cursor_pointer"><img src="assets/img/metadata.png" width="20px" height="20px" title="Lihat metadata" data-toggle="modal" data-target="#metaData" class="cursor_pointer"><img src="assets/img/download.png" width="20px" height="20px" title="Download" data-toggle="modal" data-target="#downloadModal" class="cursor_pointer"></span><p style="display: none;">'+listdata[i]['abstract']+'</p><div class="property-icon"><b class="'+array[0][0]+'">'+array[0][0]+'</b></div></div></div></div> ');


//     }

//     // $('#jumlah_dataset').text(String(listdata.length));
// });



$(".sort-asc").on('click', function() {
    $(".sort-desc").removeClass('active');
    $(".sort-asc").addClass('active');
});

$(".sort-desc").on('click', function() {
    $(".sort-asc").removeClass('active');
    $(".sort-desc").addClass('active');
});

if ($("#lunchBegins option[value='" + getUrlParameter('kategori') + "']").length > 0) {
    // $("#lunchBegins").val('');
    console.log('fdas' + 'exists');
    $("#lunchBegins").val(getUrlParameter('kategori'));
} else {
    $("#lunchBegins").val("");
}

if ($("#basic option[value='" + getUrlParameter('walidata') + "']").length > 0) {
    // $("#lunchBegins").val('');
    console.log('exist');
    $("#basic").val(getUrlParameter('walidata'));
} else {
    $("#basic").val("");
}

$("#bbox").val("");
$("#bbox").val(getUrlParameter('bbox'));
console.log(getUrlParameter('bbox'));

var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    controls: ol.control.defaults({
        attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
            collapsible: false
        })
    }),
    view: new ol.View({
        //center: ol.proj.fromLonLat([118,5]),
        center: ol.proj.transform([118, 5], 'EPSG:4326', 'EPSG:3857'),
        zoom: 3
    })
});
var bxp = getUrlParameter('bbox');
var bx = "";


if (bxp === undefined) {
    console.log('un');
    extent2 = extent1;
} else {
    console.log('no un');
    bx = getUrlParameter('bbox');
    bx = bx.split(",");
    extent2 = bx;
}


$(document).ready(function() {

    
      $(document).on('click', '.proerty-price.pull-right img', function() {

         m_id = $(this).attr('id');

         open_metadata(m_id);


      });



    console.log('halo2', extent2);

    // Compute the current extent of the view given the map size


    var minlon = parseInt(extent2[0]);
    var minlat = parseInt(extent2[1]);
    var maxlon = parseInt(extent2[2]);
    var maxlat = parseInt(extent2[3]);

    // Trasnform extent to EPSG:3857
    var extent = [minlon, minlat, maxlon, maxlat];
    extent = ol.extent.applyTransform(extent, ol.proj.getTransform("EPSG:4326", "EPSG:3857"));

    map.getView().fit(extent, map.getSize());
});

map.getView().on('propertychange', function(e) {
    var glbox = map.getView().calculateExtent(map.getSize()); // doesn't look as expected.
    var box = ol.proj.transformExtent(glbox, 'EPSG:3857', 'EPSG:4326');
    console.log(box);

    // box.toString();
    // $("#bbox").val('');
    $("#bbox").val(box);

});
// console.log(box);


function search() {
    alert($("#kata_kunci").val());
    alert($("#lunchBegins").val());
    alert($("#basic").val());

    console.log('search');
    event.preventDefault();
}



function open_metadata($id)
{



   $.ajax({
                    //url : "sumbawa.json",
                    url :"http://dev1.agrisoft-cb.com:81/csw?service=CSW&version=2.0.2&request=GetRecordById&ElementSetName=full&Id="+$id+"&outputSchema=http://www.isotc211.org/2005/gmd&outputFormat=application/json",
                    type: "GET",
                    dataType: "JSON",
                    success: function(data)
                    {
                              //Metadata
                            try {   
                               $('#fileIdentifier').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:fileIdentifier"]["gco:CharacterString"]);
                            }
                            catch(err)
                            {
                                $('#fileIdentifier1').hide();
                            }   
                            try {
                               $('#language').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:language"]["gmd:LanguageCode"][ "#text"]);
                                 }
                            catch(err)
                            {
                                $('#language1').hide();
                            }
                            
                            try {     
                               $('#characterSet').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:characterSet"]["gmd:MD_CharacterSetCode"]["#text"]);
                               }
                            catch(err)
                            {
                                $('#characterSet1').hide()
                            } 

                            try {  
                               $('#hierarchyLevel').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:hierarchyLevel"]["gmd:MD_ScopeCode"]["#text"]);
                            }   
                            catch(err)
                            {
                                $('#hierarchyLevel1').hide();
                            }

                            try {   
                               $('#metadataStandardName').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:metadataStandardName"]["gco:CharacterString"]);
                             }   
                            catch(err)
                            {
                                $('#metadataStandardName1').hide();
                            }

                             try {  
                               $('#metadataStandardVersion').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:metadataStandardVersion"]["gco:CharacterString"]);
                             }  
                              catch(err)
                             {
                                $('#metadataStandardVersion1').hide();
                             } 
                               
                            try {  
                               $('#datestamp').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:dateStamp"]["gco:DateTime"]);   
                            }
                            catch(err)
                             {
                               $('#datestamp1').hide();
                             }  
                            
                            try {                              
                               $('#dataSetURI').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:dataSetURI"]["gco:CharacterString"]);
                            }
                            catch(err)
                             {
                              $('#dataSetURI1').hide();
                             }     

                               //Contac
                            try {  
                               $('#individualName').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"]["gmd:individualName"]["gco:CharacterString"]);
                                }
                            catch(err)
                             {
                                $('#individualName1').hide();
                             }     

                            try { 
                                 $('#organisationName').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"]["gmd:organisationName"]["gco:CharacterString"]);
                                }
                              catch(err)
                             {
                                $('#organisationName1').hide();
                             }  

                             try { 
                               $('#positionName').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"]["gmd:positionName"]["gco:CharacterString"]);
                                }
                              catch(err)
                             {
                                 $('#positionName1').hide();
                             }  

                             try {
                               $('#phone').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"][ "gmd:contactInfo"][ "gmd:CI_Contact"][ "gmd:phone"]["gmd:CI_Telephone"][ "gmd:voice"]["gco:CharacterString"]);
                             }
                             catch(err)
                             {
                                 $('#phone1').hide();
                             }    
                               
                             try {
                               $('#facsimile').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"][ "gmd:contactInfo"][ "gmd:CI_Contact"][ "gmd:phone"]["gmd:CI_Telephone"][ "gmd:facsimile"]["gco:CharacterString"]);
                             }
                             catch(err)
                             {
                                $('#facsimile1').hide();
                             } 

                            try {
                               $('#deliveryPoint').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"][ "gmd:contactInfo"][ "gmd:CI_Contact"][ "gmd:address"][ "gmd:CI_Address"]["gmd:deliveryPoint"]["gco:CharacterString"]);
                             }
                             catch(err)
                             {
                               $('#deliveryPoint1').hide();
                             } 
   
                             try {  
                               $('#city').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"][ "gmd:contactInfo"][ "gmd:CI_Contact"][ "gmd:address"][ "gmd:CI_Address"]["gmd:city"]["gco:CharacterString"]);
                               }
                             catch(err)
                             {
                               $('#city1').hide();
                             } 

                             try {
                               $('#postalCode').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"][ "gmd:contactInfo"][ "gmd:CI_Contact"][ "gmd:address"][ "gmd:CI_Address"]["gmd:postalCode"]["gco:CharacterString"]);
                               }
                             catch(err)
                             {
                              $('#postalCode1').hide();
                             } 

                            try {
                                  $('#country').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"][ "gmd:contactInfo"][ "gmd:CI_Contact"][ "gmd:address"][ "gmd:CI_Address"]["gmd:country"]["gco:CharacterString"]);
                            }
                            catch(err)
                               {
                                $('#country1').hide();
                               }  

                               try { 
                                 $('#electronicMailAddress').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"][ "gmd:contactInfo"][ "gmd:CI_Contact"][ "gmd:address"][ "gmd:CI_Address"]["gmd:electronicMailAddress"]["gco:CharacterString"]);
                                }
                              catch(err)
                               {
                                $('#electronicMailAddress1').hide();
                               }  


                              try { 
                                 $('#linkage').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"][ "gmd:contactInfo"][ "gmd:CI_Contact"][ "gmd:onlineResource"][ "gmd:CI_OnlineResource"]["gmd:linkage"]["gmd:URL"]);
                                }
                              catch(err)
                               {
                                  $('#linkage1').hide();
                               }                                


                              try { 
                               $('#protocol').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"][ "gmd:contactInfo"][ "gmd:CI_Contact"][ "gmd:onlineResource"][ "gmd:CI_OnlineResource"]["gmd:protocol"]["gco:CharacterString"]);
                               }
                              catch(err)
                               {
                                 $('#protocol1').hide();
                               }                                


                              try { 
                               $('#function').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"][ "gmd:contactInfo"][ "gmd:CI_Contact"][ "gmd:onlineResource"][ "gmd:CI_OnlineResource"]["gmd:function"][ "gmd:CI_OnLineFunctionCode"]["#text"]);
                              } 
                               catch(err)
                               {
                                 $('#function1').hide();
                               }         


                              try {
                               $('#hoursOfService').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"][ "gmd:contactInfo"][ "gmd:CI_Contact"]["gmd:hoursOfService"]["gco:CharacterString"]);
                                } 
                               catch(err)
                               {
                                  $('#hoursOfService1').hide();
                               }          

                               try { 
                                 $('#contactInstructions').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"][ "gmd:contactInfo"][ "gmd:CI_Contact"]["gmd:contactInstructions"]["gco:CharacterString"]);
                                } 
                               catch(err)
                               {
                                  $('#contactInstructions1').hide();
                               }          


                               try { 
                                 $('#rolecontact').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"]["gmd:role"][ "gmd:CI_RoleCode"][ "#text"]);
                                 } 
                               catch(err)
                               {
                                  $('#rolecontact1').hide();
                               }             

                               //SpatialRepresentationinfo
                               
                               try {   
                                $('#topologiLevel').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:spatialRepresentationInfo"]["gmd:MD_VectorSpatialRepresentation"]["gmd:topologyLevel"]["gmd:MD_TopologyLevelCode"]["#text"]);
                                  } 
                               catch(err)
                               {
                                 $('#topologiLevel').hide();
                               }             

                               
                               try { 
                                 $('#geometriObjects').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:spatialRepresentationInfo"]["gmd:MD_VectorSpatialRepresentation"]["gmd:geometricObjects"]["gmd:MD_GeometricObjects"]["gmd:geometricObjectType"]["gmd:MD_GeometricObjectTypeCode"]["#text"]);
                                  } 
                               catch(err)
                               {
                                 $('#geometriObjects1').hide();
                               }               

                               //  ReferenceSystemInfo
                              try { 
                                 $('#title_refsystem').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"][ "gmd:referenceSystemInfo"]["gmd:MD_ReferenceSystem"]["gmd:referenceSystemIdentifier"]["gmd:RS_Identifier"]["gmd:authority"]["gmd:CI_Citation"]["gmd:title"]["gco:CharacterString"]);
                               }
                               catch(err)
                               {
                                 $('#title_refsystem1').hide();
                               }          
                               
                             try {    
                               $('#date_refsystem').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"][ "gmd:referenceSystemInfo"]["gmd:MD_ReferenceSystem"]["gmd:referenceSystemIdentifier"]["gmd:RS_Identifier"]["gmd:authority"]["gmd:CI_Citation"]["gmd:date"]["gmd:CI_Date"]["gmd:date"][ "gco:Date"]);
                              }
                               catch(err)
                               {
                                 $('#date_refsystem1').hide();
                               }          

                              try {    
                                $('#dateType_refsystem').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"][ "gmd:referenceSystemInfo"]["gmd:MD_ReferenceSystem"]["gmd:referenceSystemIdentifier"]["gmd:RS_Identifier"]["gmd:authority"]["gmd:CI_Citation"]["gmd:date"]["gmd:CI_Date"][ "gmd:dateType"][ "gmd:CI_DateTypeCode"][ "#text"]);
                                }
                               catch(err)
                               {
                                 $('#dateType_refsystem1').hide();
                               }          


                              try {    
                                 $('#organisationName_refsystem').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"][ "gmd:referenceSystemInfo"]["gmd:MD_ReferenceSystem"]["gmd:referenceSystemIdentifier"]["gmd:RS_Identifier"]["gmd:authority"]["gmd:CI_Citation"]["gmd:citedResponsibleParty"][ "gmd:CI_ResponsibleParty"]["gmd:organisationName"]["gco:CharacterString"]);
                               }
                               catch(err)
                               {
                                 $('#organisationName_refsystem1').hide();
                               }          

                               try {
                                   $('#linkage_refsystem').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"][ "gmd:referenceSystemInfo"]["gmd:MD_ReferenceSystem"]["gmd:referenceSystemIdentifier"]["gmd:RS_Identifier"]["gmd:authority"]["gmd:CI_Citation"]["gmd:citedResponsibleParty"][ "gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"][ "gmd:onlineResource"]["gmd:CI_OnlineResource"][ "gmd:linkage"]["gmd:URL"]);
                               }
                               catch(err)
                               {
                                  $('#linkage_refsystem1').hide();
                               }          


                              try {
                                  $('#role_refsystem').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"][ "gmd:referenceSystemInfo"]["gmd:MD_ReferenceSystem"]["gmd:referenceSystemIdentifier"]["gmd:RS_Identifier"]["gmd:authority"]["gmd:CI_Citation"]["gmd:citedResponsibleParty"][ "gmd:CI_ResponsibleParty"][ "gmd:role"]["gmd:CI_RoleCode"]["#text"]);
                               }
                               catch(err)
                               {
                                  $('#role_refsystem1').hide();
                               }          
    
                               try {
                                  $('#code_refsystem').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"][ "gmd:referenceSystemInfo"]["gmd:MD_ReferenceSystem"]["gmd:referenceSystemIdentifier"]["gmd:RS_Identifier"]["gmd:code"]["gco:CharacterString"]);
                               }
                               catch(err)
                               {
                                  $('#code_refsystem1').hide();
                               }          

                                try {
                                  $('#version_refsystem').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"][ "gmd:referenceSystemInfo"]["gmd:MD_ReferenceSystem"]["gmd:referenceSystemIdentifier"]["gmd:RS_Identifier"]["gmd:version"]["gco:CharacterString"]);
                                }
                               catch(err)
                               {
                                  $('#version_refsystem1').hide();
                               }             




                               //Identification Info
                               
                              try {  
                               $('#title_identification').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"][ "gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:citation"]["gmd:CI_Citation"]["gmd:title"]["gco:CharacterString"]);
                               }
                               catch(err)
                               {
                                  $('#title_identification1').hide();
                               }              
                               
                              try {  
                                 $('#date_identification').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"][ "gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:citation"]["gmd:CI_Citation"]["gmd:date"]["gmd:CI_Date"]["gmd:date"]["gco:DateTime"]);
                                }
                               catch(err)
                               {
                                  $('#date_identification1').hide();
                               }               
                                
                                

                               try {  
                                $('#dateType_identification').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"][ "gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:citation"]["gmd:CI_Citation"]["gmd:date"]["gmd:CI_Date"]["gmd:dateType"]["gmd:CI_DateTypeCode"]["#text"]);
                               }
                               catch(err)
                               {
                                  $('#date_identification1').hide();
                               }       

                                
                               try { 
                                $('#abstract_identification').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"][ "gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:abstract"]["gco:CharacterString"]);
                                 }
                               catch(err)
                               {
                                  $('#abstract_identification1').hide();
                               }       

                                // $('#status_identification').val(data);
                              
                              try {   
                                $('#resourceMaintenance_identification').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"][ "gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:resourceMaintenance"]["gmd:MD_MaintenanceInformation"]["gmd:maintenanceAndUpdateFrequency"]["gmd:MD_MaintenanceFrequencyCode"]["#text"]);
                                  }
                               catch(err)
                               {
                                  $('#resourceMaintenance_identification1').hide();
                               }       

                               try { 
                                   $('#descriptiveKeywords_identification').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"][ "gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:descriptiveKeywords"]["gmd:MD_Keywords"]["gmd:keyword"]["gmd:PT_FreeText"]["gmd:textGroup"]["gmd:LocalisedCharacterString"]["@locale"]);
                                  }
                               catch(err)
                               {
                                  $('#descriptiveKeywords_identification1').hide();
                               }       


                              try {   
                                $('#resourceConstraints_identification').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"][ "gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:resourceConstraints"]["gmd:MD_LegalConstraints"]["gmd:accessConstraints"]["gmd:MD_RestrictionCode"]["#text"]);  
                                 }
                               catch(err)
                               {
                                  $('#resourceConstraints_identification1').hide();
                               }       

  
                               try {  
                                  $('#spatialRepresentationType_identification').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"][ "gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:spatialRepresentationType"]["gmd:MD_SpatialRepresentationTypeCode"]["#text"]);
                                 }
                               catch(err)
                               {
                                  $('#spatialRepresentationType_identification1').hide();
                               }       


                              try {   
                                $('#language_identification').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"][ "gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:language"]["gmd:LanguageCode"]["#text"]);
                               }
                               catch(err)
                               {
                                 $('#language_identification1').hide();
                               }       
 
                                
                              try { 
                                $('#CharacterSetCode_identification').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"][ "gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:characterSet"]["gmd:MD_CharacterSetCode"]["#text"]);
                                 }
                               catch(err)
                               {
                                 $('#CharacterSetCode_identification1').hide();
                               }       
 
                                
                               try {  
                                $('#topicCategory_identification').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"][ "gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:topicCategory"]["gmd:MD_TopicCategoryCode"]);
                                 }
                               catch(err)
                               {
                                $('#topicCategory_identification1').hide();
                               }       
                                
                               
                              try { 
                                $('#westBoundLongitude_identification').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"][ "gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:extent"]["gmd:EX_Extent"]["gmd:geographicElement"]["gmd:EX_GeographicBoundingBox"][ "gmd:westBoundLongitude"]["gco:Decimal"]);
                               }
                               catch(err)
                               {
                                 $('#westBoundLongitude_identification1').hide();
                               }       
                                 

                              try {  
                                $('#eastBoundLongitude_identification').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"][ "gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:extent"]["gmd:EX_Extent"]["gmd:geographicElement"]["gmd:EX_GeographicBoundingBox"][ "gmd:eastBoundLongitude"]["gco:Decimal"]);
                               }
                               catch(err)
                               {
                                 $('#eastBoundLongitude_identification1').hide();
                               }       
                                   
                               
                              try {
                                $('#southBoundLatitude_identification').val(data ["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"][ "gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:extent"]["gmd:EX_Extent"]["gmd:geographicElement"]["gmd:EX_GeographicBoundingBox"]["gmd:southBoundLatitude"]["gco:Decimal"]);
                               }
                               catch(err)
                               {
                                 $('#southBoundLatitude_identification1').hide();
                               }         
                               

                              try { 
                                $('#northBoundLatitude_identification').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"][ "gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:extent"]["gmd:EX_Extent"]["gmd:geographicElement"]["gmd:EX_GeographicBoundingBox"][ "gmd:northBoundLatitude"]["gco:Decimal"]);
                              }
                               catch(err)
                               {
                                $('#northBoundLatitude_identification1').hide();
                               }         

                              //====================================================================================================================
                                
                               //distributionInfo
                                    //Distributor
                               try {   
                                $('#Distributor_individualName').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["@id"]);
                               }
                               catch(err)
                               {
                                $('#Distributor_individualName1').hide();
                               }  


                              try {  
                               $('#Distributor_organisationName').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:organisationName"]["gco:CharacterString"]);
                               }
                               catch(err)
                               {
                                 $('#Distributor_organisationName1').hide();
                               }   
                               
                              try { 
                               $('#Distributor_positionName').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:positionName"]["gco:CharacterString"]);
                                }
                               catch(err)
                               {
                                 $('#Distributor_positionName1').hide();
                               }  
 
                               try {  
                                  $('#Distributor_phone').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:phone"]["gmd:CI_Telephone"]["gmd:voice"]["gco:CharacterString"]);
                                }
                               catch(err)
                               {
                                 $('#Distributor_phone1').hide();
                               }  

                               try {
                                  $('#Distributor_facsimile').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:phone"]["gmd:CI_Telephone"]["gmd:facsimile"]["gco:CharacterString"]);
                                 }
                               catch(err)
                               {
                                   $('#Distributor_facsimile1').hide();
                               }  

                                try {
                                      $('#Distributor_deliveryPoint').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:address"]["gmd:CI_Address"]["gmd:deliveryPoint"]["gco:CharacterString"]);
                                 }
                               catch(err)
                               {
                                     $('#Distributor_deliveryPoint').hide();
                               }  
                               
                                     
                              try {
                                     $('#Distributor_city').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:address"]["gmd:CI_Address"]["gmd:city"]["gco:CharacterString"]);
                                }
                               catch(err)
                               {
                                     $('#Distributor_city1').hide();
                               }         
                               

                                try {      
                                     $('#Distributor_postalCode').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:address"]["gmd:CI_Address"]["gmd:postalCode"]["gco:CharacterString"]);
                                 }
                               catch(err)
                               {
                                    $('#Distributor_postalCode').hide();
                               }              
                                     
                                     
                                try {
                                     $('#Distributor_country').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:address"]["gmd:CI_Address"]["gmd:country"]["gco:CharacterString"]);
                                  }
                               catch(err)
                               {
                                    $('#Distributor_country1').hide();
                               }                  
                                     
                                 try {    
                                     $('#Distributor_electronicMailAddress').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:address"]["gmd:CI_Address"]["gmd:electronicMailAddress"]["gco:CharacterString"]);
                                   }
                               catch(err)
                               {
                                     $('#Distributor_electronicMailAddress1').hide();
                               }    

                                
                               try {     
                                    $('#Distributor_linkage').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:onlineResource"]["gmd:CI_OnlineResource"]["gmd:linkage"]["gmd:URL"]);
                                   }
                               catch(err)
                               {
                                     $('#Distributor_linkage1').hide();
                               }    


                               try {     
                                     $('#Distributor_protocol').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:onlineResource"]["gmd:CI_OnlineResource"]["gmd:protocol"]["gco:CharacterString"]);
                                    }
                               catch(err)
                               {
                                     $('#Distributor_protocol1').hide();
                               }      
                                     
                                     
                                 try {
                                     $('#Distributor_function').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:onlineResource"]["gmd:CI_OnlineResource"]["gmd:function"]["gmd:CI_OnLineFunctionCode"]["#text"]);
                                   }
                                 catch(err)
                                 {
                                       $$('#Distributor_function1').hide();
                                 }         
                                     
                                  try {    
                                     $('#Distributor_hoursOfService').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:hoursOfService"]["gco:CharacterString"]);
                                   }
                                 catch(err)
                                 {
                                       $('#Distributor_hoursOfService1').hide();
                                 }           
                                  
                                  try {   
                                     $('#Distributor_contactInstructions').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:contactInstructions"]["gco:CharacterString"]);
                                }
                                catch(err)
                                 {
                                      $('#Distributor_contactInstructions1').hide();
                                 }           



                                try {    
                                     $('#Distributor_role').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:role"]["gmd:CI_RoleCode"]["#text"]);
                                  }
                                  catch(err)
                                 {
                                      $('#Distributor_role1').hide();
                                 }           
     

                                //distributionInfo
                                    //Distributor
                                    //wms

                                try {     
                                    $('#wfs_linkage').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][0]["gmd:CI_OnlineResource"]["gmd:linkage"]["gmd:URL"]);
                                 }
                                  catch(err)
                                 {
                                       $('#wfs_linkage1').hide();
                                 }               
                                    
                                try {   
                                    $('#wfs_protocol').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][0]["gmd:CI_OnlineResource"]["gmd:protocol"]["gco:CharacterString"]);
                                    }
                                  catch(err)
                                 {
                                      $('#wfs_protocol1').hide();
                                 }                 

                                
                                try {    
                                    $('#wfs_name').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][0]["gmd:CI_OnlineResource"]["gmd:name"]["gco:CharacterString"]);
                                   }
                                  catch(err)
                                 {
                                      $('#wfs_name1').hide();
                                 }                     
                                    
                                try {                                   
                                    $('#wfs_description').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][0]["gmd:CI_OnlineResource"]["gmd:description"]["gco:CharacterString"]);
                                 }  
                                    catch(err)
                                 {
                                      $('#wfs_description1').hide();
                                 }                   
                                    
                                  try {
                                       $('#wfs_function').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][0]["gmd:CI_OnlineResource"]["gmd:function"]["gmd:CI_OnLineFunctionCode"]["#text"]);
                                  }  
                                    catch(err)
                                 {
                                       $('#wfs_function1').hide();
                                 }                     
                                    
                                  


                                    //===============================================================================


                                    //wms

                                  try {   
                                    $('#wms_linkage').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][1]["gmd:CI_OnlineResource"]["gmd:linkage"]["gmd:URL"]);

                                  }  
                                    catch(err)
                                 {
                                       $('#wms_linkage1').hide();
                                 }             


                                  try {                                    
                                    $('#wms_protocol').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][1]["gmd:CI_OnlineResource"]["gmd:protocol"]["gco:CharacterString"]);
                                  }  
                                    catch(err)
                                 {
                                      $('#wms_protocol1').hide();
                                 }             


                                  try {  
                                    $('#wms_name').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][1]["gmd:CI_OnlineResource"]["gmd:name"]["gco:CharacterString"]);
                                  }  
                                    catch(err)
                                 {
                                        $('#wms_name1').hide();
                                 }               
                                  
                                  try {   
                                    $('#wms_description').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][1]["gmd:CI_OnlineResource"]["gmd:description"]["gco:CharacterString"]);
                                  }  
                                    catch(err)
                                 {
                                        $('#wms_description1').hide();
                                 }             


                                  try {   
                                    $('#wms_function').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][1]["gmd:CI_OnlineResource"]["gmd:function"]["gmd:CI_OnLineFunctionCode"]["#text"]);

                                  }  
                                    catch(err)
                                 {
                                       $('#wms_function1').hide();
                                 }             


                                    //=============================================================================

                                    //zip
                                  try {   
                                    $('#zip_linkage').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][2]["gmd:CI_OnlineResource"]["gmd:linkage"]["gmd:URL"]);
                                  }  
                                    catch(err)
                                 {
                                      $('#zip_linkage1').hide();
                                 }               
                                  
                                  try {   
                                    $('#zip_protocol').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][2]["gmd:CI_OnlineResource"]["gmd:protocol"]["gco:CharacterString"]);
                                  }  
                                    catch(err)
                                 {
                                       $('#zip_protocol1').hide();
                                 }             

                                  try {  
                                    $('#zip_name').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][2]["gmd:CI_OnlineResource"]["gmd:name"]["gco:CharacterString"]);
                                  }  
                                    catch(err)
                                 {
                                        $('#zip_name1').hide();
                                 }               
                                  
                                  try {   
                                    $('#zip_description').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][2]["gmd:CI_OnlineResource"]["gmd:description"]["gco:CharacterString"]);
                                  }  
                                    catch(err)
                                 {
                                      $('#zip_description1').hide();
                                 }             

                                  try {   
                                    $('#zip_function').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][2]["gmd:CI_OnlineResource"]["gmd:function"]["gmd:CI_OnLineFunctionCode"]["#text"]);
                                  }  
                                    catch(err)
                                 {
                                       $('#zip1_function').hide();
                                 }               

                                    //==============================================================================

                                    

                                    //img
                                  try {   
                                    $('#img_linkage').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][3]["gmd:CI_OnlineResource"]["gmd:linkage"]["gmd:URL"]);
                                  }  
                                    catch(err)
                                 {
                                      $('#img_linkage1').hide();
                                 }               
                                    
                                  try { 
                                    $('#img_protocol').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][3]["gmd:CI_OnlineResource"]["gmd:protocol"]["gco:CharacterString"]);
                                  }  
                                    catch(err)
                                 {
                                      $('#img_protocol1').hide();
                                 }             


                                  try {  
                                    $('#img_name').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][3]["gmd:CI_OnlineResource"]["gmd:name"]["gco:CharacterString"]);
                                  }  
                                    catch(err)
                                 {
                                       $('#img_name1').hide();
                                 }               
                                    
                                  try {   
                                    $('#img_description').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][3]["gmd:CI_OnlineResource"]["gmd:description"]["gco:CharacterString"]);
                                  }  
                                    catch(err)
                                 {
                                       $('#img_description1').hide();
                                 }             


                                  try { 
                                       $('#img_function').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][3]["gmd:CI_OnlineResource"]["gmd:function"]["gmd:CI_OnLineFunctionCode"]["#text"]);
                                  }  
                                    catch(err)
                                 {
                                       $('#img_function1').hide();
                                 }               

                                    //=======================================================



                                   



                               

                               //MetadataMaintenance
                                   
                                try
                                  {
                                   $('#maintenanceAndUpdateFrequency').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:metadataMaintenance"]["gmd:MD_MaintenanceInformation"]["gmd:maintenanceAndUpdateFrequency"][ "gmd:MD_MaintenanceFrequencyCode"]["#text"]);
                                   
                                  }
                                   catch(err) {
                                        
                                        $('#maintenanceAndUpdateFrequency1').hide(); 
                                   }     

                                   try
                                  {
                                       $('#maintenanceNote').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:metadataMaintenance"]["gmd:MD_MaintenanceInformation"]["gmd:maintenanceNote"]["gco:CharacterString"]); 
                                  } 
                                   catch(err) {
                                        
                                        $('#maintenanceNote1').hide(); 
                                   }     

                                 
                                 //MetadataConstrains
                                  try
                                  {
                                         $('#classification').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"][ "gmd:metadataConstrains"]["gmd:MD_SecurityConstraints"]["gmd:classification"]["gmd:MD_ClassClassificationCode"][ "@codeListValue"]);
                                   }
                                  catch(err) {
                                        $('#classification1').hide();
                                  }  

                                 try
                                  {
                                      $('#usernote').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:metadataConstraints"]["gmd:MD_SecurityConstraints"][ "gmd:userNote"]["gco:CharacterString"]);
                                  }
                                  catch(err)
                                  {
                                       $('#usernote1').hide();
                                  }    
   
                               // ===================================================================================================================   

                             
                    },
                    error: function (jqXHR, textStatus, errorThrown)
                    {
                        alert('Error get data from ajax');
                    }
                });
}