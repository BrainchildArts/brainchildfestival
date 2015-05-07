$(document).ready(function() {
    $('.bxslider').bxSlider();
});

$(document).ready(function() {
    $('.tabs').easytabs({
        defaultTab: ".default-tab",
    });
});

$( 'li .tab' ).click(function( e ) {
  e.preventDefault();
});

$(document).ready(function() {

  // init Isotope
  var $container = $('.tiles');
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
      // permalink to a track
      var track_url = "https://soundcloud.com/" + soundcloud;

      SC.get('/resolve/', { url: track_url }, function (track) {
        console.log(track);
        console.log(track.user);
        var track_img = track.artwork_url;
        if ( track.artwork_url === null) {
          track_img = track.user.avatar_url;
        }
        $(".overlay__embeds").append("<div class='sc-link'><img class='sc-img' src='" + track_img + "'></img><div class='sc-right'><a href='https://soundcloud.com/" + soundcloud + "' class='stratus'></a><div class='sc-titles'><a target='_blank' class='sc-username' href='" + track.user.permalink_url + "'>" + track.user.username + "</a><br/><a target='_blank' class='sc-trackname' href='" + track_url + "'>" + track.title + "</a></div></div></div>");
      });

    }
    if ($( this ).data("utube-id")) {
      $(".overlay__embeds").append("<p><div class='embed-container'><iframe src='http://www.youtube.com/embed/" + utube + "' frameborder='0' allowfullscreen></iframe></div></p>");
    }
});

$(".reveal-button").click(function(e) {
    e.preventDefault();
    $(this).next('.reveal').slideToggle(330);
    $(this).toggleClass('active');
});

$("#manifesto .reveal-button").on("click", function() {
  var el = $(this);
  if (el.text() == el.data("text-swap")) {
    el.text(el.data("text-original"));
  } else {
    el.data("text-original", el.text());
    el.text(el.data("text-swap"));
  }
});

$("body").on("click", ".overlay__close", function(e) {
    e.preventDefault();
    $("html").removeClass("hide-overflow");
    $(this).parent().remove();
});



// SC.get(PATH, function (track, err){
//   IMG_URL = track.artwork;
// });

// SC.get('/resolve', { url: track_url }, function(track) {
//   SC.get('/tracks/' + track.id + '/comments', function(comments) {
//     for (var i = 0; i < comments.length; i++) {
//       console.log('Someone said: ' + comments[i].body);
//     }
//   });
// });

//start stratus with one link
$(document).ready(function() {
  $.stratus({
    links: 'https://soundcloud.com/total-refreshment/the-comet-is-coming-through',
    theme: 'http://brainchildfestival.co.uk/stratus/stratus.css',
    buying: false,
    color: 'F7426B',
    download: false,
    stats: false,
  });
});

//send all sc links to stratus //

//make an array from all data-sc attributes
data_array =[ ];
data_array = $.makeArray($(".lineup-tiles > .music").map(function()
{
      return $(this).attr("data-sc");
})) ;
//add soundcloud url
for ( var i = 0; i < data_array.length; i++ ) {
    data_array[i] = "https://soundcloud.com/" + data_array[i];
}

//make it into a list
var sc_array = data_array.join(",");

//send all the links
$('body').on("click", "a.stratus", function() {
  $.stratus({
    links: sc_array,
    theme: 'http://brainchildfestival.co.uk/stratus/stratus.css',
    buying: false,
    color: 'F7426B',
    download: false,
    stats: false,
  });
});
