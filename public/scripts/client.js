/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const loadTweets = function(){
  $.ajax('/tweets', {method: 'GET'})
  .then(function(jsonTweets){
    renderTweets(jsonTweets);
  });
}

const renderTweets = function(tweets) {
  $(document).ready(function (){
    for (const tweet of tweets){
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").prepend($tweet);
    }
  });
}

const createTweetElement = function (tweetData){
  const daysAgo = timeago.format(tweetData.created_at);
  const $tweet = $(
    `<article>
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
    </article>`
  );
  return $tweet;
}

loadTweets();