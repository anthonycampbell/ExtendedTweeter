/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
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
  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(jsonTweets) {
        $("#tweets-container").empty();
        renderTweets(jsonTweets);
      });
  };

  loadTweets();

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
        loadTweets();
      });
  });

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").prepend($tweet);
    }
  };

  const createTweetElement = function(tweetData) {
    const daysAgo = timeago.format(tweetData.created_at);
    return `<article>
      <header>
        <div class="user">
          <img src=${tweetData.user.avatars}/>
          <span>${tweetData.user.name}</span>
        </div>
        <span>${tweetData.user.handle}</span>
      </header>
      <div class="content">
        ${tweetData.content.text}
      </div>
      <footer>
        <span>${daysAgo}</span>
        <div class="icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>`;
  };
});