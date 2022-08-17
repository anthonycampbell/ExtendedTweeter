const esc = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const isError = function(text){
  if (text === null || text.length === 0){
    return "Tweet must contain content";
  }
  if (text.length > 140){
    return "Tweet is too long"
  }
  return "";
}

$(document).ready(function(){
  $(".new-tweet form").submit(function(e){
    e.preventDefault();
    const $error = $('.error');
    $error.hide();
    let $tweetText = $(this.text);
    const tweetTextVal = $tweetText.val();
    const err = isError(tweetTextVal);
    if (err){
      $error.html(err);
      $error.slideDown();
      return;
    }

    $tweetText.val(esc(tweetTextVal));
    const data = $(this).serialize();
    $tweetText.val('').trigger('input');
    $tweetText.focus();
    $.ajax('/tweets', { method: 'POST', data: data })
    .then(function () {
      $.ajax('/tweets', {method: 'GET'})
      .then(function (res){
        const $latestTweet = createTweetElement(res[res.length-1]);
        $("#tweets-container").prepend($latestTweet);
      });
    });
  });
});