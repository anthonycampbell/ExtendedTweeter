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
      $("#tweets-container").append($tweet);
    }
  });
}

const createTweetElement = function (tweetData){
  const $tweet = $(`<article></article>`);
  const $header = $(`<header></header`);
  const $user = $(`<div class="user"></div>`);
  const $userPic = $(`<img src=${tweetData.user.avatars}/>`);
  const $username = $(`<span>${tweetData.user.name}</span>`);
  $user.append($userPic);
  $user.append($username);
  const $handle = $(`<span>${tweetData.user.handle}</span>`);
  $header.append($user);
  $header.append($handle);
  const $content = $(`<div class="content">${tweetData.content.text}</div>`);
  const $footer = $(`<footer></footer`);
  const daysAgo = timeago.format(tweetData.created_at);
  const $timestamp = $(`<span>${daysAgo}</span>`);
  const $icons = $(`<div class="icons">
                      <i class="fa-solid fa-flag"></i>
                      <i class="fa-solid fa-retweet"></i>
                      <i class="fa-solid fa-heart"></i>
                    </div>`);
  $footer.append($timestamp);
  $footer.append($icons);

  $tweet.append($header);
  $tweet.append($content);
  $tweet.append($footer);
  return $tweet;
}


loadTweets();