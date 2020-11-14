$(menuFetch).click(() => {
  $("#header div.wrapper").hide();
  $("#header div.loading").show();

  $(info).hide();
  $("#tableContent div.wrapper").hide();
  $("#tableContent div.loading").show();

  $.post(`/simple-mmo/guild/${<%- data.id %>}`, data => {
    const guild = data.guild;
    $("#header img").attr('src', guild.img);
    $("#header span").attr('src', guild.title);
    $("#header small").text(guild.count);
    $("#header div.loading").hide();
    $("#header div.wrapper").show();

    if (Array.isArray(data.members) && data.members.length) {
      members = data.members;
      storageMembers.push(members);
      localStorage.setItem(
        'members', JSON.stringify(storageMembers)
      );
    }
    updateTable();
  });
});
