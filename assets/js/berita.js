// function strip(html) {
//     var tmp = document.createElement("DIV");
//     tmp.innerHTML = html;
//     return tmp.textContent || tmp.innerText || "";
// }

// $.get(_api + 'berita/list', function(data) {
//     items = JSON.parse(data);
//     for (i = 0; i < items.length; i++) {
//         $("#bj_" + i).text(items[i].judul);
//         $("#bi_" + i).text($(items[i].isiberita).text());
//         // $("#bi_" + i).text(strip(items[i].isiberita));
//         console.log(items[i]);
//     }
// });

var $pagination = $('#pagination'),
    totalRecords = 0,
    records = [],
    displayRecords = [],
    recPerPage = 5,
    page = 1,
    totalPages = 0;
$.ajax({
    url: _api + 'berita/listall',
    async: true,
    success: function(data) {
        records = JSON.parse(data);
        console.log(records);
        totalRecords = records.length;
        totalPages = Math.ceil(totalRecords / recPerPage);
        apply_pagination();
    }
});

function generate_table() {
    var tr;
    $('#beritalist').html('');
    for (var i = 0; i < displayRecords.length; i++) {
        console.log(records[i])
        $('#beritalist').append("<li><section class='post'><div class='text-left padding-b-50'><h3 id='bjudul'>" + displayRecords[i].judul + "</h3><div class='title-line'></div></div><div class='row'><div class='col-sm-6'><p class='date-comments' id='btanggal'>" + displayRecords[i].tanggal + "</p></div></div><p class='isiberita' id='bisi_" + displayRecords[i].id + "''></p><p class='read-more'><a href='detail_berita.html?id=" + displayRecords[i].id + "' class='btn btn-default btn-border'>Selengkapnya...</a></p></section></li>");
        $("#bisi_" + displayRecords[i].id).append(decodeURIComponent($(displayRecords[i].isiberita).text()));
    }
}

function apply_pagination() {
    $pagination.twbsPagination({
        totalPages: totalPages,
        visiblePages: 5,
        onPageClick: function(event, page) {
            displayRecordsIndex = Math.max(page - 1, 0) * recPerPage;
            endRec = (displayRecordsIndex) + recPerPage;

            displayRecords = records.slice(displayRecordsIndex, endRec);
            generate_table();
        }
    });
}

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