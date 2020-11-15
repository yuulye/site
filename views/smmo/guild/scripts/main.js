let storageMembers = JSON.parse(localStorage.getItem('members'));
if (!storageMembers) storageMembers = [[]];

<%- include('classes.js') %>

let rows = new Rows(storageMembers[storageMembers.length - 1]);

<%- include('menuFetchEvent.js') %>
<%- include('tablePaginationEvent.js') %>
