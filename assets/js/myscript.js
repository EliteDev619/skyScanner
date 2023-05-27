$(document).ready(function () {

});

function changeDate(parent) {
    let form = $('.' + parent);
    let date = $('input[name=flight_date]', form).val();

    switch (parent) {
        case 'flight1':
            {
                $('input[name=flight_date]', '.flight2').attr('min', date);
                $('input[name=flight_date]', '.flight3').attr('min', date);
            }
            break;
        case 'flight2':
            {
                $('input[name=flight_date]', '.flight1').attr('max', date);
                $('input[name=flight_date]', '.flight3').attr('min', date);
            }
            break;
        case 'flight3':
            {
                $('input[name=flight_date]', '.flight1').attr('max', date);
                $('input[name=flight_date]', '.flight2').attr('max', date);
            }
            break;
        default:
            break;
    }
}

function changeDateIncrement(parent) {
    let form = $('.' + parent);
    let date = $('input[name=flight_date]', form).val();

    if (date == '') {
        alert('Please set date at first!');
        $('input[name=data_increment]', form).prop('checked', false);;
        return;
    }

    let checked = $('input[name=data_increment]', form).prop('checked');
    let new_date = new Date(date);

    if (checked) {
        new_date.setDate(new_date.getDate() + 1);
    } else {
        new_date.setDate(new_date.getDate() - 1);
    }

    new_date = formatDate(new_date);
    $('input[name=flight_date]', form).val(new_date);
}

function changeRandomDate(parent) {
    let form = $('.' + parent);
    let rStart = new Date(2022, 0, 1);
    let rEnd = new Date(2024, 12, 31);

    let new_date = new Date(rStart.getTime() + Math.random() * (rEnd.getTime() - rStart.getTime()));
    new_date = formatDate(new_date);
    $('input[name=flight_date]', form).val(new_date);
}

function changeIATAReverse(parent) {
    let form = $('.' + parent);
    let fromIATA = $('input[name=from_iata]', form).val();
    let toIATA = $('input[name=to_iata]', form).val();

    $('input[name=from_iata]', form).val(toIATA);
    $('input[name=to_iata]', form).val(fromIATA);
}

function importIATA(parent) {
    var url = '../IATA_List.csv';
    var request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send(null);

    console.log(request);
    var csvData = new Array();
    var jsonObject = request.responseText.split(/\r?\n|\r/);
    for (var i = 0; i < jsonObject.length; i++) {
        csvData.push(jsonObject[i].split(','));
    }
    // Retrived data from csv file content
    console.log(csvData);
}

function formatDate(objectDate) {
    let day = objectDate.getDate();
    let month = objectDate.getMonth() + 1;
    let year = objectDate.getFullYear();

    if (day < 10) {
        day = '0' + day;
    }

    if (month < 10) {
        month = `0${month}`;
    }

    let date = `${year}-${month}-${day}`;
    return date
}