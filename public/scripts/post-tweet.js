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
    const $error = $('.error');
    $error.hide();

    e.preventDefault();
    let $tweetText = $(this.text);
    const text = $tweetText.val();
    $tweetText.val(esc(text));
    const data = $(this).serialize();
    const err = isError(text);

    if (err){
      $error.html(err);
      $error.slideDown();
      return;
    }

    $tweetText.val('');
    $tweetText.focus();
    $.ajax('/tweets', { method: 'POST', data: data })
    .then(function (e, r) {
      $.ajax('/tweets', {method: 'GET'})
      .then(function (res){
        $("#tweets-container").prepend(createTweetElement(res[res.length-1]));
      });
    });
  });
});