let storageMembers = JSON.parse(localStorage.getItem('members'));
if (!storageMembers) storageMembers = [[]];

let members = storageMembers[storageMembers.length - 1];

<%- include('functions.js') %>

updateTable();

<%- include('menuFetchClick.js') %>
<%- include('tableMenuShowPerPageClick.js') %>
