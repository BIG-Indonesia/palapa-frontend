$.get(palapa_api_url + "sisteminfo", function (data) {
    //listdata = JSON.parse(data);
    console.log(data);

    $("#brandlogoimg").attr('src', data['logo'])
    $("#brandlogotxt").text('Geoportal '+data['organization'])

    var t = $("#brandlogotxt").text();
    var res = "", cls = "";
    var orange = ['G']
    for (i=0; i<t.length; i++) {
        for (j=0; j<orange.length; j++) {
            if (t[i] == orange[j]) {cls = "orange" + "prefix";}
        }
        res += "<span class='"+cls+"'>"+t[i]+"</span>";
        cls="";
    }
    $("#brandlogotxt").html(res);

    // $('#title-index').text('Home :: Geoportal ' + data['organization']);
    // $('#title-jelajah').text('Jelajah :: Geoportal ' + data['organization']);
    // $('#title-pencarian').text('Pencarian Data :: Geoportal ' + data['organization']);
    // $('#title-kontak').text('Kontak Kami :: Geoportal ' + data['organization']);
  
    // $('#organisasi').text(data['organization']);
    // $('#organisasi-body').text(data['organization']);
    // $('#country').text(data['country'])
    // $('#alamat-body').text(data['address'] + ', ' + data['city'] + ', ' + data['postalcode'] + ', ' + data['administrativearea']);
    // $('#alamat-footer').text(data['address'] + ', ' + data['city'] + ', ' + data['postalcode'] + ', ' + data['administrativearea'] + ', ' + data['country']);
    // $('#email-body').text(data['email']);
    // $('#email-footer').text('Email: ' + data['email']);
    // $('#phone-body').text('Telp: ' + data['phone']);
    // $('#phone').text('Telp: ' + data['phone']);
    // $('#fax').text('Fax: ' + data['fax']);
    // $('#fax-body').text('Fax: ' + data['fax']);
    // $('#footer-tentang-kami').text(data['deskripsi']);
  
    // $('#organisasi-logo').empty();
    // $('#organisasi-logo').text('EOPORTAL ' + data['organization']);
    // $('#logos').attr('src', data['logo']);
  
    // $('#judul-slider-depan').text('Geoportal ' + data['organization']);
  
    // for (e=0;e<data['extent'].length;e++) {
    //   console.log(data['extent'][e])
    //   window.simpulextent.push(parseFloat(data['extent'][e])); 
    // }
  });
