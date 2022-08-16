$(document).ready(function(){
  $(".new-tweet form").submit(function(e){
    e.preventDefault();
    const data = $(this).serialize();
    $.ajax('/tweets', { method: 'POST', data: data })
    .then(function (res) {
      console.log('Success', res);
    });
  });
});