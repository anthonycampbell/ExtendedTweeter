$(document).ready(function() {
  $('.new-tweet textarea').on('input', function() {
    const newVal = 140 - $(this).val().length;
    let counter = $(this).parent().find('.counter');
    if (newVal < 0) {
      counter.addClass('bad-counter');
    }
    newVal < 0 ? counter.addClass('red') : counter.removeClass('red');
    counter.val(newVal);
  });
});