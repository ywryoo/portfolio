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
$(document).ready(function(){
  touchEventHandler();
});
$(document).ajaxComplete(function() {
  touchEventHandler();
});
$(".link").click(function(){
  document.title = '유양욱 | '+ $(this).data('title');
  history.pushState({},'유양욱 | '+ $(this).data('title'),$(this).data('href'));
  $.post($(this).data('href'), function(data) {
    $('.content').hide().html(data).fadeIn('slow');
    if($(this).data('href') === "/kr") {
      touchEventHandler();
    }
  });
});
