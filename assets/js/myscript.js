$(document).ready(function () {

});

var IATA_PAIR = [];
var CSV_DATA = [];

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

function importIATA(parent, el) {

    let form = $('.' + parent);
    const reader = new FileReader()
    reader.onload = () => {
        let result = formatCSV(reader.result);
        CSV_DATA[parent] = result;
        $('input[name=from_iata]', form).val(result[0].from);
        $('input[name=to_iata]', form).val(result[0].to);
    }
    reader.readAsBinaryString(el.files[0])
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

function formatCSV(data) {

    let result = [];
    let temp = data.split('\n');
    temp.forEach(item => {
        let obj = {};
        let row = item.split(',');
        obj.from = row[0].trim();
        obj.to = row[1].split('\r')[0].trim();
        result.push(obj);    
    });

    return result;
}

function combineIATAPairs(){

    var array1 = CSV_DATA.flight1;
    var array2 = CSV_DATA.flight2;
    var array3 = CSV_DATA.flight3;
    if(!CSV_DATA.flight3)
    {
        array3 = CSV_DATA.flight2;
    }

    // var array1 = ['A', 'B'];
    // var array2 = ['M', 'N'];
    // var array3 = ['X', 'Y'];

    let results = [];

    for (let i = 0; i < array1.length; i++) {
      for (let j = 0; j < array2.length; j++) {
        for (let k = 0; k < array3.length; k++) {
            let temp = [];
            temp.push(array1[i]);
            temp.push(array2[j]);
            temp.push(array3[k]);
            results.push(temp);
          }
      }
    }

    IATA_PAIR = results;
}

function start() {

    combineIATAPairs(); 
    console.log(IATA_PAIR)
    return;
    let priceAlert = $('#priceAlert').val();
    if (!priceAlert) {
        alert("Please set price alert!");
        return;
    }

    let param = new Object();
    let query = {};
    query.market = "UK";
    query.locale = "en-GB";
    query.currency = "GBP";

    query.queryLegs = [];

    query.adults = $('#adultNumber').val();
    if (query.adults == 0) {
        alert("Please set Adult number. Should be number between 1 with 8.");
        return;
    }

    if ($('#child').val() == '') {
        alert('Please set child ages. Split comma');
        return;
    }

    query.childrenAges = $('#child').val().split(',');

    query.cabinClass = $('#cabinClass').val();
    if (query.cabinClass == 0) {
        alert('Please select Cabin Class!');
        return;
    }

    query.excludedAgentsIds = [];
    query.excludedCarriersIds = [];
    query.includedAgentsIds = [];
    query.includedCarriersIds = [];
    query.nearbyAirports = false;

    param.query = query;
    console.log(param);
}