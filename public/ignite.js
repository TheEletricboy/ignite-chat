// var myName = prompt("Enter your Name: ", "Ex: John Doe");

//      function sendMessage() {
//           // get message
//           var message = document.getElementById("message").value;

//           //save in database
//           firebase.database().ref('messages').push().set({
//                "sender": myName,
//                "message": message
//           });

//           // prevent form from submitting
//           return false;
//      }

//      //listen for incoming messages
//      firebase.database().ref("messages").on("child_added", function (snapshot) {
//           var htmlCustom = "";
//           htmlCustom += "<li>";
//                htmlCustom += snapshot.val().sender + ": " + snapshot.val().message;
//           htmlCustom += "</li>";

//           document.getElementById("messages").innerHTML += htmlCustom;
//      });


$(document).ready(function(){
    $('#action_menu_btn').click(function(){
        $('.action_menu').toggle();
    });
});