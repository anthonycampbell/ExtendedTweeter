$(document).ready(function() {
  $(window).scroll(function() {
    if ($('nav').offset().top === 0) {
      $('#jump').hide();
      $('nav button').show();
      return;
    }
    $('#jump').show();
    $('nav button').hide();
  });
  
  $('#jump').click(function() {
    $(window).scrollTop(0);
    $('.new-tweet').slideDown();
    $(".new-tweet textarea").focus();
  });
});

