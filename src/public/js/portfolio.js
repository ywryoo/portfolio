/**
 * Created by Yangwook Ryoo on 2/15/16.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
$(document).foundation();

function touchEventHandler() {
  if (Modernizr.touchevents) {
    // show the close overlay button
    $(".close-overlay").removeClass("hidden");
    // handle the adding of hover class when clicked
    $(".overlay-container").click(function(e){
      if (!$(this).hasClass("hover")) {
        $(this).addClass("hover");
      }
    });
    // handle the closing of the overlay
    $(".close-overlay").click(function(e){
      e.preventDefault();
      e.stopPropagation();
      if ($(this).closest(".overlay-container").hasClass("hover")) {
        $(this).closest(".overlay-container").removeClass("hover");
      }
    });
  } else {
    // handle the mouseenter functionality
    $(".overlay-container").mouseenter(function(){
      $(this).addClass("hover");
    })
    // handle the mouseleave functionality
    .mouseleave(function(){
      $(this).removeClass("hover");
    });
  }
}

function timeline() {
  var timelineBlocks = $('.cd-timeline-block'),
    offset = 0.8;

  //hide timeline blocks which are outside the viewport
  hideBlocks(timelineBlocks, offset);

  //on scolling, show/animate timeline blocks when enter the viewport
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

$(document).ready(function(){
  touchEventHandler();
  timeline();
  var location = window.location.pathname;
  $.post(location,{async: true}, function(data) {
    $('#custom').attr('href','../css' + (location.substr(3) === '/' ? '/index' : location.substr(3))+ '.css');
    $('.content').html(data);
  }).done(function(){
    $('.afterload').fadeIn(800);
    $('.content').foundation();
  });
});
$(document).ajaxComplete(function() {
  touchEventHandler();
  timeline();
});
$(".link").click(function(){
  document.title = '유양욱 | '+ $(this).data('title');
  var that = $(this);
  history.pushState({},'유양욱 | '+ $(this).data('title'),'/kr'+$(this).data('href'));
  $.post('/kr'+$(this).data('href'),{async: true}, function(data) {
    $('#custom').attr('href','../css' + (that.data('href') === '/' ? '/index' : that.data('href'))+ '.css');
    $('.afterload').hide();
    $('.content').html(data);
  }).done(function(){
    $('.afterload').fadeIn(800);
    $('.content').foundation();
  });
});
