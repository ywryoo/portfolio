/**
 * Created by Yangwook Ryoo on 2/15/16.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
$(document).foundation();

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-58935543-4', 'auto');
ga('send', 'pageview');

function touchEventHandler() {
  if (Modernizr.touchevents) {
  $(".close-overlay").removeClass("hidden");
    $(".overlay-container").click(function(e){
      if (!$(this).hasClass("hover")) {
        $(this).addClass("hover");
      }
    });
    $(".close-overlay").click(function(e){
      e.preventDefault();
      e.stopPropagation();
      if ($(this).closest(".overlay-container").hasClass("hover")) {
        $(this).closest(".overlay-container").removeClass("hover");
      }
    });
  } else {
    $(".overlay-container").mouseenter(function(){
      $(this).addClass("hover");
    })
    .mouseleave(function(){
      $(this).removeClass("hover");
    });
  }
}

/*https://codyhouse.co/gem/vertical-timeline/*/
function timeline() {
  var timelineBlocks = $('.cd-timeline-block'),
    offset = 0.8;

  hideBlocks(timelineBlocks, offset);

  $(window).on('scroll', function(){
    (!window.requestAnimationFrame)
      ? setTimeout(function(){ showBlocks(timelineBlocks, offset); }, 100)
      : window.requestAnimationFrame(function(){ showBlocks(timelineBlocks, offset); });
  });

  function hideBlocks(blocks, offset) {
    blocks.each(function(){
      ( $(this).offset().top > $(window).scrollTop()+$(window).height()*offset ) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
    });
  }

  function showBlocks(blocks, offset) {
    blocks.each(function(){
      ( $(this).offset().top <= $(window).scrollTop()+$(window).height()*offset && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
    });
  }
}

function magellan () {
  var elem = new Foundation.Magellan($("#magellan"), {animationDuration:1000, animationEasing:"ease-in-out"});
  var elem2 = new Foundation.Sticky($("#sticky"));
  elem.reflow();
  addEventListener(window, "resize", function(event) {
    elem.reflow();
    elem2.reflow();
  });
  $(window).on('scroll', function(){
    elem.reflow();
  });
}

$(document).ready(function(){
  var location = window.location.pathname;
  if(location ===  "/kr" || location === "/kr/"){
    touchEventHandler();
  } else if(location === "/kr/timeline"){
    timeline();
  }
  $.post(location, {async: true}, function(data) {
    $('#customcss').attr('href','../css' + ((location === '/kr/' || location === '/kr') ? '/index' : location.substr(3))+ '.css');
    $('.content').html(data);
  }).done(function(){
    $('.afterload').fadeIn(800);
    $('.content').foundation();
    if(location === "/kr/summary"){
      magellan();
    }
  });
});

$(document).ajaxComplete(function() {
  var location = window.location.pathname;
  if(location ===  "/kr" || location === "/kr/"){
    touchEventHandler();
  } else if(location === "/kr/timeline"){
    timeline();
  } else if(location === "/kr/summary"){
    magellan();
  }
  $('html, body').animate({ scrollTop: 0 }, 0);
});

$(".link").click(function(){
  document.title = '유양욱 | '+ $(this).data('title');
  var that = $(this);
  history.pushState({},'유양욱 | '+ $(this).data('title'),'/kr'+$(this).data('href'));
  $.post('/kr'+$(this).data('href'),{async: true}, function(data) {
    $('#customcss').attr('href','../css' + (that.data('href') === '/' ? '/index' : that.data('href'))+ '.css');
    $('.afterload').hide();
    $('.content').html(data);
  }).done(function(){
    $('.afterload').fadeIn(800);
    $('.content').foundation();
  });
});