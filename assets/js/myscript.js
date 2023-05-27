$(document).ready(function () {

});

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

    if(checked){
        new_date.setDate(new_date.getDate() + 1);
    } else {
        new_date.setDate(new_date.getDate() - 1);
    }
    
    new_date = formatDate(new_date);
    $('input[name=flight_date]', form).val(new_date);
}

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

function changeRandomDate(parent) {
    let form = $('.' + parent);
    let rStart = new Date(2022, 0, 1);
    let rEnd = new Date(2024, 12, 31);

    let new_date = new Date(rStart.getTime() + Math.random() * (rEnd.getTime() - rStart.getTime()));
    new_date = formatDate(new_date);
    $('input[name=flight_date]', form).val(new_date);
}

function formatDate(objectDate) {
    let day = objectDate.getDate();
    let month = objectDate.getMonth()+1;
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