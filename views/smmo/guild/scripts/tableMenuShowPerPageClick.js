function updateSort(e, index) {
  $(".sortToggle").find(".fa").remove();
  let state = 'down';
  const status = rows.sort(index);
  if (status === null) return;
  if (status === true) {
    state = 'up';
  }
  $(e).append(`<i class="fa fa-caret-${state}">&nbsp;</i>`);
}

$(sortUpdate).click(function() {
  updateSort(this, 7);
});
$(sortLevel).click(function() {
  updateSort(this, 3);
});
$(sortName).click(function() {
  updateSort(this, 1);
});

$(tableMenuShowPerPage).click(() => {
  rows.initPagination();
});

$(pageNext).click(() => {
  rows.update('next');
});

$(pagePrevious).click(() => {
  rows.update('prev');
});

$(pageFirst).click(() => {
  rows.update('first');
});

$(pageLast).click(() => {
  rows.update('last');
});
