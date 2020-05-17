
// ----------------- Public Vars -----------------
var myName = prompt("Enter your Name:");





if (!myName) {
   myName = "Anonymous";
}

if (myName) {
   $( document ).ready(function() {
       console.log( "ready!" );
       autoScrollDown();
   });
}


// ----------------- Functions -----------------

// send the message
$('#message_form').submit(function(e){
   // prevent form from submitting
   e.preventDefault();
   // get message
   var messageInput = document.getElementById("message");
   var message = messageInput.value;

   console.log(message);

   //save in database
   firebase.database().ref('messages').push().set({
       "sender": myName,
       "message": message
   });

   // delete message after sending
   messageInput.value = '';
});


//listen for incoming messages
firebase.database().ref("messages").on("child_added", function (snapshot) {
     var htmlCustom = "";
     // give each message a unique ID
     htmlCustom += "<li id='message-" + snapshot.key + "'>";
          //show delete vutton if message is sent by me
          if (snapshot.val().sender === myName) {
               htmlCustom += "<button data-id='" + snapshot.key + "' onclick='deleteMessage(this)'>";
                    htmlCustom += "Delete"
               htmlCustom += "</button>";
          }
          htmlCustom += snapshot.val().sender + ": " + snapshot.val().message;
     htmlCustom += "</li>";

     document.getElementById("messages").innerHTML += htmlCustom;
     autoScrollDown();
});

function deleteMessage(self) {
     //get message ID
     var messageId = self.getAttribute("data-id");

     //delete message
     firebase.database().ref("messages").child(messageId).remove();
}


//attach listener for delete message
firebase.database().ref("messages").on("child_removed", function (snapshot) {
    // remove message node
    document.getElementById("message-" + snapshot.key).innerHTML = "This message has been removed";
})

// autoscroll down function
function autoScrollDown() {
    var cardBody = document.getElementsByClassName('msg_card_body')[0];
    cardBody.scrollTop = cardBody.scrollHeight;
}