
// ----------------- Public Vars -----------------
var myName = prompt("Enter your Name:");
var date = new Date();




if (!myName) {
   myName = "Anonymous";
}

if (myName) {
   $( document ).ready(function() {
       console.log( "ready!" );
       autoScrollDown();
       //console.log("NHAAAAAAA" + Ignite.CONSTANTS(imgUrl));
       //console.log(date.getHours());
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

     // SENDER (Me)
     if (snapshot.val().sender === myName) {
        htmlCustom += '<div class="d-flex justify-content-end mb-4">';
            
     } else { // OTHER PEOPLE
        htmlCustom += '<div class="d-flex justify-content-start mb-4">';
     }


     // give each message a unique ID
     htmlCustom += "<li id='message-" + snapshot.key + "'>";
          //show delete vutton if message is sent by me
          if (snapshot.val().sender === myName) {
               htmlCustom += "<button data-id='" + snapshot.key + "' onclick='deleteMessage(this)'>";
                    htmlCustom += "Delete"
               htmlCustom += "</button>";
          }
     //display message
     htmlCustom += snapshot.val().sender + ": " + snapshot.val().message;
     htmlCustom += "</li>";

     document.getElementById("msg_card_body").innerHTML += htmlCustom;
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

function buildChatBubbles() {
    var closeDiv = '</div>';

    // Sender
    var senderContainer = '<div class="d-flex justify-content-end mb-4">';
        var senderBubble = '<div class="msg_cotainer_send">';
            var senderTimeSent = '<span class="msg_time_send">' + 
                date.getHours() + ':' + date.getMinutes + '</span>';

        var senderPicContainer = '<div class="img_cont_msg">';
            var senderPic = '<img src:"' + senderPictures.default + '" class="rounded-circle user_img_msg">';

    // Receiver
    var receiverContainer = '<div class="d-flex justify-content-start mb-4">';
        var receiverPicContainer = '<div class="img_cont_msg">';
            var receiverPic = '<img src:"' + senderPictures.secondary + '" class="rounded-circle user_img_msg">';
        var receiverBubble = '<div class="msg_cotainer">';
            var receiverTimeSent = '<span class="msg_time">' + 
                date.getHours() + ':' + date.getMinutes + '</span>';
            
}