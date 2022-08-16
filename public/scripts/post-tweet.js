$(document).ready(function(){
  $(".new-tweet form").submit(function(e){
    e.preventDefault();
    const data = $(this).serialize();
    const text = $(this.text).val();
    if (text === null || text.length === 0){
      return alert("Tweet must contain content");
    }
    if (text.length > 140){
      return alert("Tweet is too long");
    }
    $.ajax('/tweets', { method: 'POST', data: data })
    .then(function (res) {
      console.log('Success', res);
    });
  });
});