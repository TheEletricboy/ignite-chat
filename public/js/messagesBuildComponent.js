
function messagesBuildComponent() {

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
    
    // DISPLAY IMAGES
    //listen for incoming messages
    firebase.database().ref("messages").on("child_added", function (snapshot) {
        var htmlCustom = "";
        var closeDiv = '</div>';
    
        // SENDER (Me)
        if (snapshot.val().sender === myName) {
            htmlCustom += buildChatBubbles.senderContainer;
                htmlCustom += "<button data-id='" + snapshot.key + "' class='delete_icon' onclick='deleteMessage(this)'></button>",
                htmlCustom += buildChatBubbles.senderBubble + snapshot.key + '">';
                htmlCustom += snapshot.val().sender + ": " + snapshot.val().message;
                    htmlCustom += buildChatBubbles.senderTimeSent;
                htmlCustom += buildChatBubbles.senderPicContainer;
                    htmlCustom += buildChatBubbles.senderPic;
                
                htmlCustom += closeDiv;
                htmlCustom += closeDiv;
                htmlCustom += closeDiv;
                htmlCustom += closeDiv;
                htmlCustom += closeDiv;
                
        } else { // OTHER PEOPLE
            htmlCustom += buildChatBubbles.receiverContainer;
                htmlCustom += buildChatBubbles.receiverPicContainer;
                    htmlCustom += buildChatBubbles.receiverPic + closeDiv;
                htmlCustom += buildChatBubbles.receiverBubble + " id='message-" + snapshot.key + "'" + '">';
                htmlCustom += snapshot.val().sender + ": " + snapshot.val().message;
                    htmlCustom += buildChatBubbles.receiverTimeSent;
            
            htmlCustom += closeDiv;
            htmlCustom += closeDiv;
            htmlCustom += closeDiv;
            htmlCustom += closeDiv;
            htmlCustom += closeDiv;
        }
    
    
        //give each message a unique ID
        //  htmlCustom += "<li id='message-" + snapshot.key + "'>";
        //       //show delete vutton if message is sent by me
        //       if (snapshot.val().sender === myName) {
        //            htmlCustom += "<button data-id='" + snapshot.key + "' onclick='deleteMessage(this)'>";
        //                 htmlCustom += "Delete"
        //            htmlCustom += "</button>";
        //       }
        //  //display message
        //  htmlCustom += snapshot.val().sender + ": " + snapshot.val().message;
        //  htmlCustom += "</li>";
    
        document.getElementById("chat_wrapper").innerHTML += htmlCustom;
        autoScrollDown();
    });
    
    //attach listener for delete message
    firebase.database().ref("messages").on("child_removed", function (snapshot) {
        // remove message node
        document.getElementById("message-" + snapshot.key).innerHTML = "This message has been removed";
    })
}