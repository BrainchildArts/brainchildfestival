$(document).ready(function() {
    $('.bxslider').bxSlider();
});

$(document).ready(function() {
    $('.tabs').easytabs({
        defaultTab: ".default-tab",
    });
});

$(document).ready(function() {
  // init Isotope
  var $container = $('.tiles-small');
  // init
  if ($(window).innerWidth() > 440) {
    $container.isotope({
      itemSelector: '.tile',
      masonry: {
        isFitWidth: true
      }
    });
  }
  $(window).resize(function () {
    if ($(window).innerWidth() < 440) {
        $container.isotope('destroy');
    } else {
        $container.isotope({
            itemSelector: '.tile'
        });
    }
  });
  // bind filter button click
  $('.filter').on( 'click', function() {
    var filterValue = $( this ).attr('data-filter');
    // use filterFn if matches value
    $container.isotope({ filter: filterValue });
    console.log('click');
  });
  // change is-checked class on buttons
  $('.filter-buttons').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'button', function() {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $( this ).addClass('is-checked');
    });
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
        }, 900, 'easeInOutExpo');
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
    $('.site-nav-wrap').waypoint(function() {
        $(".site-nav").toggleClass("site-nav--stuck");
    });
});

$(document).ready(function() {
    $('#about').waypoint(function() {
        $(".billboard").toggle();
    });
});

// Overlay

$("#events .tile").click(function(e) {
    var tile = $(this),
        name = tile.data("title"),
        img = tile.data("img"),
        desc = tile.data("desc"),
        link = tile.data("link");
    e.preventDefault();
    $("html").addClass("hide-overflow");
    $("body").append("<div class='overlay'><a href='#' class='overlay__close'>Close</a><div class='col-1-2'><div class='overlay__copy'><h4>" + name + "</h4><p>" + desc + "</p></div></div><div class='col-1-2'><img class='overlay__image' src='" + img + "' alt='" + name + "' /></div></div>");
});

$("#friends .tile").click(function(e) {
    var tile = $(this),
        name = tile.data("title"),
        img = tile.data("img"),
        desc = tile.data("desc"),
        link = tile.data("link");
    e.preventDefault();
    $("html").addClass("hide-overflow");
    $("body").append("<div class='overlay'><a href='#' class='overlay__close'>Close</a><div class='col-1-2'><div class='overlay__copy'><h4>" + name + "</h4><p>" + desc + "</p><p><a target='_blank' class='overlay__link' href='" + link + "'>" + name + "</a></p></div></div><div class='col-1-2'><img class='overlay__image' src='" + img + "' alt='" + name + "' /></div></div>");
});

$("#lineup .tile").click(function(e) {
    var tile = $(this),
        name = tile.data("title"),
        img = tile.data("img"),
        desc = tile.data("desc"),
        link = tile.data("link"),
        soundcloud = tile.data("sc");
    e.preventDefault();
    $("html").addClass("hide-overflow");
    $("body").append("<div class='overlay'><a href='#' class='overlay__close'>Close</a><div class='col-1-2'><div class='overlay__copy'><h4>" + name + "</h4><p>" + desc + "</p><p><a target='_blank' class='overlay__link' href='" + link + "'>" + name + "</a></p><p><iframe id='sc-widget' src='https://w.soundcloud.com/player/?url=https://soundcloud.com/" + soundcloud + "' width='100%' height='150' scrolling='no' frameborder='no'></iframe></p></div></div><div class='col-1-2'><img class='overlay__image' src='" + img + "' alt='" + name + "' /></div></div>");
});

$(".info-overlay").click(function(e) {
    var tile = $(this),
        name = tile.data("title"),
        img = tile.data("img"),
        desc = tile.data("desc");
    e.preventDefault();
    $("html").addClass("hide-overflow");
    $("body").append("<div class='overlay'><a href='#' class='overlay__close'>Close</a><div class='col-1-2'><div class='overlay__copy'><h4>" + name + "</h4><p>" + desc + "</p></div></div><div class='col-1-2'><img class='overlay__image' src='" + img + "' alt='" + name + "' /></div></div>");
});

$("body").on("click", ".overlay__close", function(e) {
    e.preventDefault();
    $("html").removeClass("hide-overflow");
    $(this).parent().remove();
});