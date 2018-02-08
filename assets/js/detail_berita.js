// function strip(html) {
//     var tmp = document.createElement("DIV");
//     tmp.innerHTML = html;
//     return tmp.textContent || tmp.innerText || "";
// }

$.get(_api + 'berita/listall', function(data) {
    items = JSON.parse(data);
    bid = Number(getParameterByName('id'));
    for (i = 0; i < items.length; i++) {
        if (items[i].id == bid) {
            $("#bjudul").text(items[i].judul);
            tgl = new Date(items[i].tanggal);
            dtgl = tgl.toLocaleDateString("ja-JP");
            $("#btanggal").text(dtgl);
            $("#beritaisi").append(items[i].isiberita);
        }
        // $("#bj_" + i).text(items[i].judul);
        // $("#bi_" + i).text($(items[i].isiberita).text());
        // // $("#bi_" + i).text(strip(items[i].isiberita));
        // console.log(items[i]);
    }
});

$.get(_api + "sisteminfo", function(data) {
    //listdata = JSON.parse(data);
    console.log(data);
    $('#title-index').text('Home :: Geoportal ' + data['organization']);
    $('#title-jelajah').text('Jelajah :: Geoportal ' + data['organization']);
    $('#title-pencarian').text('Pencarian Data :: Geoportal ' + data['organization']);
    $('#title-kontak').text('Kontak Kami :: Geoportal ' + data['organization']);
    $('#title-login').text('Login :: Geoportal ' + data['organization']);

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
    $('#footer-tentang-kami').text(data['tentangkami']);

    $('#organisasi-logo').empty();
    $('#organisasi-logo').text('EOPORTAL ' + data['organization']);
    $('#logos').attr('src', data['logo']);
    $('#logosbawah').attr('src', data['logo']);

    $('#judul-slider-depan').text('Geoportal ' + data['organization']);
    // var ex = "";
    // for (e = 0; e < data['extent'].length; e++) {
    //     console.log(data['extent'][e])
    //     window.simpulextent.push(parseFloat(data['extent'][e]));
    // }
});

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}