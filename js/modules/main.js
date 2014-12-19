console.log("Hello World!");

$(document).ready(function() {
    $('.bxslider').bxSlider();
});

$(document).ready(function() {
    $('.tabs').easytabs({
        defaultTab: ".default-tab",
    });
});

$(function() {
    Grid.init();
});

// Smooth Scrolling

$(function() {
    $('nav a').bind('click', function(event) {
        var $anchor = $(this);

        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1200, 'easeInOutExpo');
        event.preventDefault();
    });
});

$(function() {
    $(".mobile-nav").click(function(e) {
        e.preventDefault();
        $(this).toggleClass("mobile-nav--toggled");
        $(".site-nav").toggleClass("site-nav--visible");
    });
});

$( 'li .tab' ).click(function( e ) {
  e.preventDefault();
});

$(document).ready(function() {
    var section1 = $('#about');
        section1.waypoint(function() {
            $(".site-nav").toggleClass("site-nav--stuck");
});

/*$(document).ready(function() {
    $('#about').waypoint(function() {
        $(".site-nav").toggleClass("site-nav--stuck");
        notify('yup');
    });*/

$(window).load(function() {
    $(".site-nav").addClass("site-nav--loaded");
    });
});

// Overlay

// $(".tile").click(function(e) {
//     var tile = $(this),
//         name = tile.data("title"),
//         img = tile.data("img"),
//         desc = tile.data("desc"),
//         link = tile.data("link");
//     e.preventDefault();
//     $("html").addClass("hide-overflow");
//     $("body").append("<div class='overlay'><a href='#' class='overlay__close'>Close</a><div class='col-1-2'><img class='overlay__image' src='" + img + "' alt='" + name + "' /></div><div class='col-1-2'><div class='overlay__copy'><h4>" + name + "</h4><p>" + desc + "</p></div></div></div>");
// });

$('.tile-list').click(function(e){
    e.preventDefault();
    var $this = $(this);
    var image = $this.data('image');
    var title = $this.data('title');
    var description = $this.data('description');
    console.log(title);
    return false;
});

$("body").on("click", ".overlay__close", function(e) {
    e.preventDefault();
    $("html").removeClass("hide-overflow");
    $(this).parent().remove();
});
