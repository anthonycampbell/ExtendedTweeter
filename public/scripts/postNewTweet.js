
(function() {
  $(document).ready(function() {
    $(".new-tweet form").on('submit', submitNewTweet);
  });

  const esc = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const isError = function(text) {
    if (text === null || text.length === 0) {
      return "Tweet must contain content";
    }
    if (text.length > 140) {
      return "Tweet is too long";
    }
    return "";
  };

  const submitNewTweet = function(event) {
    event.preventDefault();
    const $error = $('.error');
    $error.hide();
    let $tweetText = $(this.text); // text input of form
    const tweetTextVal = $tweetText.val();
    const err = isError(tweetTextVal);
    if (err) {
      $error.html(err);
      $error.slideDown();
      return;
    }
    $tweetText.val(esc(tweetTextVal));
    const data = $(this).serialize();  // serialize form
    $tweetText.val('').trigger('input'); // reset text of form
    $tweetText.focus();
    $.post('/tweets', data)
      .then(function() {
        $("#tweets-container").trigger('reload');
      });
  };
})();