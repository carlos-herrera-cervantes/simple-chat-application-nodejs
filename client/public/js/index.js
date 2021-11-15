'use strict';

const socket = io('http://localhost:3000');
const formElement = document.getElementById('form');
const messageElement = document.getElementById('message');
const messageListElement = document.getElementById('messages');

function scrollToBottom() {
  messageListElement.scrollTop = messageListElement.scrollHeight;
}

formElement.onsubmit = event => {
  event.preventDefault();
  socket.emit('from.client', { message: messageElement.value });

  const div = document.createElement('div');
  
  div.innerText = messageElement.value;
  div.className = 'float-right';

  const shouldScroll = messageListElement.scrollTop +
    messageListElement.clientHeight >= messageListElement.scrollHeight;
  
  messageListElement.appendChild(div);
  messageElement.value = '';

  if (shouldScroll) {
    scrollToBottom();
  }

  return false;
};

socket.on('from.server', data => {
  const div = document.createElement('div');
  
  div.innerText = data.message;
  div.className = 'float-left';

  const shouldScroll = messageListElement.scrollTop +
    messageListElement.clientHeight >= messageListElement.scrollHeight;

  messageListElement.appendChild(div);

  if (shouldScroll) {
    scrollToBottom();
  }
});