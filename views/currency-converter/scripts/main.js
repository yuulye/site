const baseUrl = "https://www.countryflags.io/";

function formatState (state) {
  if (!state.id) {
    return state.text;
  }
  let ellipsis = "...";
  if (state.text.length <= 6) {
    ellipsis = "";
  }
  var $state = $(
    '<span><img src="'
    + baseUrl + state.element.value.toLowerCase()
    + '/shiny/16.png" class="img-flag" /> '
    + state.text.substring(0, 6) + ellipsis + '</span>'
  );
  return $state;
};

$(".country").select2({
  templateResult: formatState,
});

update();
