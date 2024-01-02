var socket = io(); // io fn we are getting from cdn
const SENT = 'SENT';
const RECIEVED = 'RECIEVED';

let username = "";
const btn = document.getElementById("join-chat");
const usernameInput = document.getElementById("username-input");
const form = document.getElementById("form");
const chatroomContainer = document.querySelector(".chatroom-container");
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messageContainer = document.querySelector('.messages');

btn.addEventListener("click", (event) => {
  event.preventDefault();
  username = usernameInput.value;
  if (username) {
    form.style.display = "none";
    // make display as block of chatroom
    // container
    chatroomContainer.style.display = "block";
  }
});

sendButton.addEventListener("click", (e) => {
  e.preventDefault();
  let data = {
    id: socket.id,
    username: username,
    message: messageInput.value,
  };
  socket.emit("this is event name", data);
  renderMessage(data, SENT);
});

// align-items will give alignment to all the divs present 
// inside the flex containter

// align self will only add alignment to specific div

// basic server and sockets

// promise combinations

socket.on("this is event name", (data) => {
  if (data.id !== socket.id) {
    renderMessage(data, RECIEVED);
  }
});

// click -> is basically emit
// btn.addEvenListener('click',fn) -> .on
socket.on("this is event name",(data)=>{
  if(data.id!==socket.id){
    renderMessage(data,RECIEVED)
  }
})



function renderMessage(data, messageType) {
  const msgDiv = document.createElement("div");
  msgDiv.innerText = `${data.username} : ${data.message}`;
  if (messageType === SENT) {
    msgDiv.setAttribute("class", "message sent");
  } else {
    msgDiv.setAttribute("class", "message");
  }
  messageContainer.appendChild(msgDiv);
  messageInput.value = "";
}