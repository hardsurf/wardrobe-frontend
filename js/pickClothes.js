const API_URL = 'http://localhost:8080/';

async function allWardrobe(username, password, fun) {
    $.ajax({
        type: 'GET',
        url: API_URL + 'clothes/' + username,
        xhrFields: {
            withCredentials: true
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
    $.ajax({
        type: 'GET',
        url: API_URL + 'clothes/' + username + '/generate/Lviv',
        xhrFields: {
            withCredentials: true
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


$(window).on('load', async function () {
    const username = $('#lg').text();
    const password = $('#pw').text();

    $('#pic').click(async function () {
        await pickClothes(username, password, function (data) {
            $(".unit").css('display', 'none');

            data.forEach(item => {
                let $item = $(`#${item.icon}`);
                $item.css('display', 'true');
                $item.css('fill', rgbToHex(item.color));
            });
        })
    });
});