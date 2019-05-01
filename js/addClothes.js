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
    $.post({
       url: API_URL + 'clothes/' + username,
        username: username,
        password: password,
       data: data
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
            let name = $('#POST-name').value;
            let season = $("#Company11").value;
            let type = $("#Company22").value;
            let color = $("#Company33").value;
            await postItem(
                $("#lg").value,
                $("#pw").value,
                new Clothes(name, color, season, type)
            );
        });
    }
);