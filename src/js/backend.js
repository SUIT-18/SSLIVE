$(document).ready(function () {
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    })
    mySwiper.scrollbar.$el.css('background', 'rgba(0,160,233,.5)');
    mySwiper.on("slideChange", function () {
        $(".swiper-tab").find("div").removeClass("selectedtab");
        $(".swiper-tab").find("div").eq(mySwiper.activeIndex).addClass("selectedtab");
    });
});