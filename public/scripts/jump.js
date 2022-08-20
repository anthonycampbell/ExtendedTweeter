(function() {
  $(document).ready(function() {
    $(window).on('scroll', updateButtons);
    $('#jump').on('click', handleJumpClick);
  });

  const updateButtons = function() {
    if ($('nav').offset().top === 0) {
      $('#jump').hide();
      $('nav button').show();
      return;
    }
    $('#jump').show();
    $('nav button').hide();
  };

  const handleJumpClick = function() {
    $(window).scrollTop(0);
    $('.new-tweet').slideDown();
    $(".new-tweet textarea").focus();
  };
})();

