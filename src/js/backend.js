$(document).ready(function () {
    $(".swiper-tab div").css("line-height", $(".swiper-tab div").height() + "px");
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal'
    })
    mySwiper.on("slideChange", function () {
        $(".swiper-tab").find("div").removeClass("selectedtab");
        $(".swiper-tab").find("div").eq(mySwiper.activeIndex).addClass("selectedtab");
    });
    $(".swiper-tab div").click(function () {
        mySwiper.slideTo($(".swiper-tab div").index(this));
    })
});