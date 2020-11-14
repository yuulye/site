let currentPage = 1;
let perPage = false;
let rows = false;
let maxPage = 1;

function setPerPage() {
  perPage = $(inputPerPage).val();
  if (!Number(perPage)) alert(`${perPage} is not a number`);
  perPage = Number(perPage);
}

function update() {
  rows.hide();
  const startIndex = (currentPage - 1) * perPage;
  const until = startIndex + perPage;
  for (let i = startIndex; i < until; i++) {
    $(rows[i]).show();
  }
  $(tablePagination).find(".current").text(currentPage);
  maxPage = Math.ceil(rows.length / perPage);
  $(tablePagination).find(".total").text(maxPage);
}

$(tableMenuShowPerPage).click(() => {
  setPerPage();
  rows = $(table).find("tr");
  currentPage = 1;
  update();
  $(tablePagination).show();
});

$(pageNext).click(() => {
  currentPage++;
  if (currentPage > maxPage) currentPage = 1;
  update();
});

$(pagePrevious).click(() => {
  currentPage--;
  if (currentPage < 1) currentPage = maxPage;
  update();
});

$(pageFirst).click(() => {
  currentPage = 1;
  update();
});

$(pageLast).click(() => {
  currentPage = maxPage;
  update();
});
