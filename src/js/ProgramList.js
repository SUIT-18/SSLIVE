$(document).ready(function () {
    $(".like").click(function () {
        console.log($(this).parent().attr("id"));
        $.ajax({
            url: "src/console/server.php",
            dataType: "text",
            success: function (data) {
                console.log(data);
            }
        });
    });
});