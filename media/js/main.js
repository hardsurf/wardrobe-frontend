// var userDb = {
//     "Alex" : "123"
// };
//
// function checkCredentials(username, password) {
//     var userPass = userDb[username];
//     if (userPass == undefined) {
//         alert("user ${username} doesn't exist!");
//     }
//     if (userPass === password) {
//         document.location.href = "html/index.html";
//     }
// }
//
// $(document).ready(function () {
//
//     // Show password Button
//
//     $("#showpassword").on('click', function(){
//
//         var pass = $("#password");
//         var fieldtype = pass.attr('type');
//         if (fieldtype == 'password') {
//             pass.attr('type', 'text');
//             $(this).text("Hide Password");
//         }else{
//             pass.attr('type', 'password');
//             $(this).text("Show Password");
//         }
//     });
//
//     //Sign in
//
//     $("#submit").click(function() {
//         var username = $("#username")[0].value;
//         var password = $("#password")[0].value;
//         checkCredentials(username, password);
//     });


// $('#myModal').on('shown.bs.modal', function () {
//     $('#myInput').trigger('focus')
// })