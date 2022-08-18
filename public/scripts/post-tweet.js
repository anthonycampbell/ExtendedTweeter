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

$(document).ready(function() {
  $(".new-tweet form").submit(function(e) {
    e.preventDefault();
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
    $.ajax('/tweets', { method: 'POST', data: data })
      .then(function() {
        $.ajax('/tweets', {method: 'GET'}) // render the new tweet
          .then(function(res) {
            const $latestTweet = createTweetElement(res[res.length - 1]);
            $("#tweets-container").prepend($latestTweet);
          });
      });
  });
});

// Toggle form on nav button click
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