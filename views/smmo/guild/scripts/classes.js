class Rows {
  constructor(members) {
    this.members = members;
    this.rows = [];
    this.sortToggles = [];

    this.currentPage = 1;
    this.perPage = members.length;
    this.maxPage = 1;

    this.init();
  }

  hide() {
    this.rows.forEach(e => e.el.hide());
  }

  update(page = false) {
    switch (page) {
      case 'next':
        this.currentPage++;
        if (this.currentPage > this.maxPage) this.currentPage = 1;
      break;
      case 'prev':
        this.currentPage--;
        if (this.currentPage < 1) this.currentPage = this.maxPage;
      break;
      case 'first':
        this.currentPage = 1;
      break;
      case 'last':
        this.currentPage = this.maxPage;
      break;
    }
    this.hide();
    const startIndex = (this.currentPage - 1) * this.perPage;
    let until = startIndex + this.perPage;
    if (until > this.rows.length) until = this.rows.length;
    let shown = 0;
    for (let i = startIndex; i < until; i++) {
      this.rows[i].el.show();
      shown++;
    }
    $(tablePagination).find(".current").text(this.currentPage);
    this.maxPage = Math.ceil(this.rows.length / this.perPage);
    $(tablePagination).find(".total").text(this.maxPage);
    if (shown < this.rows.length) {
      $(tablePagination).show();
    } else {
      $(tablePagination).hide();
    }
  }

  initPagination() {
    this.perPage = $(inputPerPage).val();
    if (!Number(this.perPage)) alert(`${perPage} is not a number`);
    this.perPage = Number(this.perPage);
    if (this.perPage > this.rows.length) {
      this.perPage = Number(this.rows.length);
    }
    this.currentPage = 1;
    this.update();
  }

  sort(index) {
    if (!this.rows.length) return null;
    const sampleRowData = this.rows[0].data[index];

    if (!isNaN(Number(sampleRowData))) {
      if (this.sortToggles[index]) {
        this.rows.sort((a, b) => a.data[index] - b.data[index]);
      } else {
        this.rows.sort((a, b) => b.data[index] - a.data[index]);
      }
    } else {
      if (this.sortToggles[index]) {
        this.rows.sort((a, b) => {
          a = a.data[index].toUpperCase();
          b = b.data[index].toUpperCase();
          if (a > b) return -1;
          if (a < b) return 1;
          return 0;
        });
      } else {
        this.rows.sort((a, b) => {
          a = a.data[index].toUpperCase();
          b = b.data[index].toUpperCase();
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        });
      }
    }

    $(table).empty();
    for (let i = 0; i < this.rows.length; i++) {
      this.rows[i].el.find(".pos").text(i + 1);
      $(table).append(this.rows[i].el);
    }
    this.update();
    return this.sortToggles[index] = !this.sortToggles[index];
  }

  init() {
    const members = this.members;
    if (!members.length) {
      $(info).text("Couldn't find any members!");

      $("#tableContent div.loading").hide();
      $(info).show();
      $("#tableContent div.wrapper").hide();
      return;
    }

    const players = members;
    $(table).empty();

    const samplePlayer = players[0];
    for (let i = 0; i < samplePlayer.length; i++) {
      this.sortToggles.push(false);
    }

    for (let i = 0; i < players.length; i++) {
      const o = players[i];

      const el = $(tplTR).clone(false).removeAttr('id');
      el.find(".pos").text(i+1);
      el.find(".name").text(o[1]);
      el.find(".level").text(o[3]);
      el.find(".update").text(o[5].replace(' ago', ''));
      $(table).append(el);

      this.rows.push(new Row(o, el));
    }

    $("#tableContent div.loading").hide();
    $("#tableContent div.wrapper").show();
  }
}

class Row {
  constructor(data, el) {
    this.data = data;
    this.el = el;
  }
}
