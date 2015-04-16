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
  var $container = $('.lineup-tiles');
  function isolineup() {
    $container.isotope({
      itemSelector: '.tile',
      getSortData: {
      name: '.tile__heading'
      },
      sortBy: 'name',
      masonry: {
        isFitWidth: true
      }
    });
  }
  // init
  if ($(window).innerWidth() > 440) {
    isolineup();
  }
  else {
    $container.isotope({
      itemSelector: '.tile',
      layoutMode: 'vertical',
      sortBy: 'tile__heading',
      vertical: {
        horizontalAlignment: 1,
      }
    });
  }
  $(window).resize(function () {
    if ($(window).innerWidth() < 440) {
        $container.isotope('destroy');
    } else {
        isolineup();
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
  $('.filter').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', function() {
      $('.filter').removeClass('is-checked');
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

/* sticky nav
$(document).ready(function() {
    $('.site-nav-wrap').waypoint(function() {
        $(".site-nav").toggleClass("site-nav--stuck");
    });
});*/

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
    $("body").append("<div class='overlay-wrap'><a href='#' class='overlay__close'>Close</a><div class='overlay'><div class='col-1-2'><div class='overlay__copy'><h4>" + name + "</h4><p>" + desc + "</p></div></div><div class='col-1-2'><img class='overlay__image' src='" + img + "' alt='" + name + "' /></div></div></div>");
});

$("#friends .tile").click(function(e) {
    var tile = $(this),
        name = tile.data("title"),
        img = tile.data("img"),
        desc = tile.data("desc"),
        link = tile.data("link");
    e.preventDefault();
    $("html").addClass("hide-overflow");
    $("body").append("<div class='overlay-wrap'><a href='#' class='overlay__close'>Close</a><div class='overlay'><div class='col-1-2'><div class='overlay__copy'><h4>" + name + "</h4><p>" + desc + "</p><p><a target='_blank' class='overlay__link' href='" + link + "'>" + name + "</a></p></div></div><div class='col-1-2'><img class='overlay__image' src='" + img + "' alt='" + name + "' /></div></div></div>");
});

///////////lineup main bit.
$("#lineup .tile").click(function(e) {
    var tile = $(this),
        name = tile.data("title"),
        img = tile.data("img"),
        desc = tile.data("desc"),
        link = tile.data("link"),
        utube = tile.data("utube-id"),
        soundcloud = tile.data("sc");
    e.preventDefault();
    $("html").addClass("hide-overflow");
    $("body").append("<div class='overlay-wrap'><a href='#' class='overlay__close'>Close</a><div class='overlay'><div class='col-1-2'><div class='overlay__copy'><h4>" + name + "</h4><p>" + desc + "</p></div><div class='overlay__embeds'></div></div><div class='col-1-2'><img class='overlay__image' src='" + img + "' alt='" + name + "' /></div></div></div>");
    if ($( this ).data("link")) {
      $(".overlay__copy").append("<p> See more <a target='_blank' class='overlay__link' href='" + link + "'>here</a>.</p>");
    }
    if ($( this ).data("sc")) {
      $(".overlay__embeds").append("<p><iframe id='sc-widget' src='https://w.soundcloud.com/player/?url=https://soundcloud.com/" + soundcloud + "' width='100%' height='110' scrolling='no' frameborder='no'></iframe></p>");
    }
    if ($( this ).data("utube-id")) {
      $(".overlay__embeds").append("<p><div class='embed-container'><iframe src='http://www.youtube.com/embed/" + utube + "' frameborder='0' allowfullscreen></iframe></div></p>");
    }
});


$(".faq__item .question").click(function(e) {
    e.preventDefault();
    $(this).next('.reveal').slideToggle(400);
});

$("body").on("click", ".overlay__close", function(e) {
    e.preventDefault();
    $("html").removeClass("hide-overflow");
    $(this).parent().remove();
});