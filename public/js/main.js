var socket = io();
socket.on('connect', function (){
  console.log('connected to server');
});


socket.on('disconnect', function() {
  console.log('disconnected from server');
});


socket.on('newMessage', function(message, data){
  var formatedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#messageTemplate').html();
  var html = Mustache.render(template,{
    // from: message.user,
    text: message.text,
    from: message.from,
    createdAt: formatedTime
  });

  jQuery('#messages').append(html);
});


socket.on('newLocationMessage', function(message){
  var formatedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#locationMessageTemplate').html();
  var html = Mustache.render(template,{
    from: message.from,
    url: message.url,
    createdAt: formatedTime
  });

  jQuery('#messages').append(html);
  // var li = jQuery('<li></li>');
  // var a= jQuery('<a target="_blank">my current location</a>');
  //
  // li.text(`${message.from} ${formatedTime}: `);
  // a.attr('href', message.url);
  // li.append(a);
  // jQuery('#messages').append(li)
});


jQuery('#message-form').on('submit',function(e){
  e.preventDefault();

  var messageTextBox = jQuery('[name=message]')

  socket.emit('createMessage',{
    from: 'User',
    text: messageTextBox.val()
  }, function(){
    messageTextBox.val('');
  });
});


var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser')
  } else {
    locationButton.attr('disabled', 'disabled').text('Sending Location..');

    navigator.geolocation.getCurrentPosition(function(position){
      locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage',{
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
    }, function(){
      locationButton.removeAttr('disabled').text('Send Location')
      alert('Unable to fetch location');
    });
  }
});
