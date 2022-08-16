const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready(function(){
  $(".new-tweet form").submit(function(e){
    $(".error").hide();
    e.preventDefault();
    const text = $(this.text).val();
    $(this.text).val(escape(text));
    const data = $(this).serialize();
    if (text === null || text.length === 0){
      $(".error").html("Tweet must contain content");
      $(".error").slideDown();
      return;
    }
    if (text.length > 140){
      $(".error").html("Tweet is too long");
      $(".error").slideDown();
      return;
    }
    $.ajax('/tweets', { method: 'POST', data: data })
    .then(function () {
      const $tweets = $(`<section id="tweets-container"></section>`);
      $("#tweets-container").replaceWith($tweets);
      loadTweets();
    });
  });
});