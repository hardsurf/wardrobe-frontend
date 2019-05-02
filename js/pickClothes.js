const API_URL = 'http://localhost:8080/';

async function allWardrobe(username, password, fun) {
    let token = btoa(`${username}:${password}`);
    $.ajax({
        type: 'GET',
        url: API_URL + 'clothes/' + username,
        xhrFields: {
            withCredentials: true
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + token);
        },
        dataType: "json",
        username: username,
        password: password,
        contentType: 'application/json',
        success: function (data) {
            fun(data);
        },
    });
}

async function pickClothes(username, password, fun) {
    let token = btoa(`${username}:${password}`);
    $.ajax({
        type: 'GET',
        url: API_URL + 'clothes/' + username + '/generate/Lviv',
        xhrFields: {
            withCredentials: true
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + token);
        },
        dataType: "json",
        username: username,
        password: password,
        contentType: 'application/json',
        success: function (data) {
            fun(data);
        },
    });
}

function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(rgb) {
    return "#" + componentToHex(rgb.red) + componentToHex(rgb.green) + componentToHex(rgb.blue);
}

$(document).ready(function () {
    let wdw = window.location.href;
    let lastIndex = wdw.lastIndexOf('?');
    let pathParams = wdw.substring(lastIndex + 1);
    history.pushState(null, '', wdw.substring(0, lastIndex));

    let params = pathParams.split("&");
    $('#lg').text(params[0].substring(params[0].indexOf('=') + 1));
    $('#pw').text(params[1].substring(params[1].indexOf('=') + 1));
});


$(window).on('load', async function () {
    const username = $('#lg').text();
    const password = $('#pw').text();

    $('#pic').click(async function () {
        await pickClothes(username, password, function (data) {
            $(".unit").css('display', 'none');

            data.forEach(item => {
                let $item = $(`#${item.type.icon}`);
                $item.css('display', 'block');
                $item.css('fill', rgbToHex(item.color));
            });
        })
    });

    $('#addFromMain').click(async function () {
        const username = $('#lg').text();
        const password = $('#pw').text();
        document.location.href = `wardrobe.html?email=${username}&password=${password}`;
    })
});