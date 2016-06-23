$(document).ready(function() {
  'use strict';

  const socket = io();
  let username;

  $('.messages').hide();
  $('.sendmsg').hide();
  $('.username').focus();

  ///When register form is submitted
  $('.register').submit(function() {
    username = $('.username').val();
    if (username === '') return false;

    ///Register this username
    socket.emit('user register', username);

    $('.username').val('');
    return false;
  });

  $('.sendmsg').submit(function() {
    const msg = $('.msg').val();

    ///Don't allow blank strings
    if (msg === '') return false;

    socket.emit('chat message', msg);

    ///Don't wait for server, append it right now
    $('.messages').append($('<li>').text(`${username} says: ${msg}`));
    ///Scroll the document down
    $('html,body').scrollTop(100000000000000000);

    ///Clear the input form
    $('.m').val('');

    return false;
  });

  socket.on('user register success', function() {
    $('.messages').show();
    $('.sendmsg').show().focus();
    $('.register').hide();
    $('messages').append($('<li>').text('You have entered successfully'));
  });

  socket.on('chat message', function(username, msg) {
    $('.messages').append($('<li>').text(`${username} says: ${msg}`));

    ///Scroll the document down
    $('html,body').scrollTop(100000000000000000);
  });

  socket.on('user enter', function(msg) {
    $('.messages').append($('<li>').addClass('user-enter u-text-small u-text-center').text(msg));
  });

  socket.on('user exit', function(msg) {
    $('.messages')
      .append($('<li>').addClass('user-exit u-text-small u-text-center').text(msg));
  });
});
