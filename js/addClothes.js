const API_URL = 'http://34.76.238.18:8080/';

class Clothes {
    static hex2rgb(hexStr) {
        const hex = parseInt(hexStr.substring(1), 16);
        const r = (hex & 0xff0000) >> 16;
        const g = (hex & 0x00ff00) >> 8;
        const b = hex & 0x0000ff;
        return {
            red: r,
            green: g,
            blue: b
        };
    }

    constructor(name, color, season, type) {
        this.name = name;
        this.color = Clothes.hex2rgb(color);
        this.season = season;
        this.type = type;
    }
}


async function postItem(username, password, data) {
    $.ajax({
        type: 'POST',
        url: API_URL + 'clothes/' + username,
        xhrFields: {
            withCredentials: true
        },
        dataType: "json",
        username: username,
        password: password,
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (data) {}
    });
}

async function getSeasons(fun) {
    $.get({
        url: API_URL + 'dropdowns/seasons',
        success: (data) => {
            fun(data.map(s => s.id));
        }
    });
}

async function getClothesTypes(fun) {
    $.get({
        url: API_URL + 'dropdowns/clothestypes',
        success: (data) => {
            fun(data.map(s => s.id));
        }
    });
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
        let $seasons = $("#Company11");
        await getSeasons(function (seasonIds) {
            seasonIds.forEach(id => $seasons.append(`<option value='${id}'>${id}</option>`));
        });

        let $types = $("#Company22");
        await getClothesTypes(function (typeIds) {
            typeIds.forEach(id => $types.append(`<option value='${id}'>${id}</option>`))

        });

        $('#post-item').click(async function () {
            let name = $('#postname').val();
            let season = $("#Company11").children("option:selected").val();
            let type = $("#Company22").children("option:selected").val();
            let color = $("#Company33").children("option:selected").val();

            let lg = $("#lg").text();
            let pw = $("#pw").text();
            await postItem(
                lg,
                pw,
                new Clothes(name, color, season, type)
            );
        });
    }
);