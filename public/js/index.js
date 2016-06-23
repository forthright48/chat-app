(function() {
  'use strict';
  const socket = io();

  $('form').submit(function() {
    const msg = $('#m').val();

    ///Don't allow blank strings
    if (msg === '') return false;

    socket.emit('chat message', msg);

    ///Don't wait for server, append it right now
    $('.messages').append($('<li>').text(msg));
    ///Scroll the document down
    $('html,body').scrollTop(100000000000000000);

    ///Clear the input form
    $('#m').val('');

    return false;
  });

  socket.on('chat message', function(msg) {
    $('.messages').append($('<li>').text(msg));

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
}());
