/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const renderTweets = function(tweets) {
  $(document).ready(function (){
    for (const tweet of tweets){
      const $tweet = createTweetElement(tweetData);
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
  const $timestamp = $(`<span>${tweetData.created_at}</span>`);
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

renderTweets([tweetData]);