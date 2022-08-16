const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready(function(){
  $(".new-tweet form").submit(function(e){
    e.preventDefault();
    const text = $(this.text).val();
    $(this.text).val(escape(text));
    const data = $(this).serialize();
    if (text === null || text.length === 0){
      return alert("Tweet must contain content");
    }
    if (text.length > 140){
      return alert("Tweet is too long");
    }
    $.ajax('/tweets', { method: 'POST', data: data })
    .then(function () {
      const $tweets = $(`<section id="tweets-container"></section>`);
      $("#tweets-container").replaceWith($tweets);
      loadTweets();
    });
  });
});