function changeFlag(e, flagIndex) {
  var data = e.params.data;
  const flag = $($('.flag')[flagIndex]);
  flag.attr(
    'src', 
    baseUrl + data.id + '/shiny/32.png'
  );
  flag.data('id', data.id);

  update();
}

$(from).on('select2:select', e => changeFlag(e, 0));
$(to).on('select2:select', e => changeFlag(e, 1));

$(input).focus(function(){
  var that = this;
  setTimeout(function(){
    that.selectionStart = that.selectionEnd = 10000;
  }, 0);
});

$(convert).click(function() {
  const select1 = $(from).select2('data')[0].id;
  const select2 = $(to).select2('data')[0].id;

  $(from).val(select2).trigger('change');
  $(to).val(select1).trigger('change');

  let flag = $($('.flag')[0]);
  flag.attr(
    'src', 
    baseUrl + select2 + '/shiny/32.png'
  );
  flag.data('id', select2);

  flag = $($('.flag')[1]);
  flag.attr(
    'src', 
    baseUrl + select1 + '/shiny/32.png'
  );
  flag.data('id', select1);

  update();
});

$(input).on('input', function() {
  update();
});

setTimeout(() => {
$(input).focus();
}, 100);
