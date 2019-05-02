const API_URL = 'http://localhost:8080/';

class Clothes {
    static hex2rgb(hex) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            red: parseInt(result[1], 16),
            green: parseInt(result[2], 16),
            blue: parseInt(result[3], 16)
        } : null;
    }

    constructor(name, color, season, type) {
        this.name = name;
        this.color = Clothes.hex2rgb(color);
        this.season = season;
        this.type = type;
    }
}


async function postItem(username, password, data) {
    let token = btoa(`${username}:${password}`);
    $.ajax({
        type: 'POST',
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
        data: JSON.stringify(data),
        complete: function () {
            $('#POST-name').val('');
        }
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

        $("#additem").submit(function () {
            return false;
        });

        $('#add').click(async function () {
            let name = $('#POST-name').val();
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

        $("#save").click(async function () {
            let lg = $("#lg").text();
            let pw = $("#pw").text();

            document.location = `index.html?u=${lg}&p=${pw}`;
        })
    }
);