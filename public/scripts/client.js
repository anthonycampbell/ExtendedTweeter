/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
(function() {
  $(document).ready(function() {
    $("#tweets-container").on('reload', loadTweets);
    loadTweets();
  });

  const loadTweets = function() {
    $.get('/tweets')
      .then(function(jsonTweets) {
        $("#tweets-container").empty();
        renderTweets(jsonTweets);
      });
  };

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
})();