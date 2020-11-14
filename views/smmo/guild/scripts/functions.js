function updateTable() {
  if (!members.length) {
    $(info).text("Couldn't find any members!");

    $("#tableContent div.loading").hide();
    $(info).show();
    $("#tableContent div.wrapper").hide();
    return;
  }

  const players = members;
  $(table).empty();

  for (let i = 0; i < players.length; i++) {
    const o = players[i];

    const el = $(tplTR).clone(false).removeAttr('id');
    el.find(".pos").text(i+1);
    el.find(".name").text(o[1]);
    el.find(".level").text(o[3]);
    el.find(".update").text(o[5].replace(' ago', ''));
    $(table).append(el);
  }

  $("#tableContent div.loading").hide();
  $("#tableContent div.wrapper").show();
}
