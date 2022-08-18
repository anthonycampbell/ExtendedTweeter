
$(document).ready(function() {
  $('nav button').click(function() {
    const $newTweet = $(".new-tweet");
    if (!$newTweet.is(':visible')) {
      $newTweet.slideDown();
      const $form = $newTweet.children('form');
      const $textArea = $form.children('textarea');
      $textArea.focus();
      return;
    }
    $newTweet.slideUp();
  });
});

