(function() {
  $(document).ready(function() {
    $('.new-tweet textarea').on('input', updateCounter);
  });
  
  const updateCounter = function() {
    const newVal = 140 - $(this).val().length;
    let counter = $(this).next().find('.counter');
    newVal < 0 ? counter.addClass('red') : counter.removeClass('red');
    counter.val(newVal);
  };
})();