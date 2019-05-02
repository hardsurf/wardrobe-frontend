const API_URL = 'http://localhost:8080/';

$(window).on('load', function () {

    $("#log-in").click(function () {
        const text1 = $("#login").val();
        const text2 = $("#email").val();
        const text3 = $("#password").val();

        $.ajax({
            type: "GET",
            url: API_URL + 'users/' + text2,
            xhrFields: {
              withCredentials: true
            },
            username:text2,
            password:text3,
            contentType: 'application/json',
            success: function () {
                document.location.href = `index.html?email=${text2}&password=${text3}`;
            },
            dataType: "json"
        });
    });

    $("#sign-up").click(function () {
        const text1 = $("#login").val();
        const text2 = $("#email").val();
        const text3 = $("#password").val();

        $.ajax({
            type: "POST",
            url: API_URL + 'signup',
            data: JSON.stringify({
                "nickName": text1,
                "email": text2,
                "password": text3
            }),
            contentType: 'application/json',
            complete : function() {
              document.location.href = `wardrobe.html?email=${text2}&password=${text3}`;
            },
            dataType: "json"
        });
    });
});
