
// ----------------- Public Vars -----------------
var myName = '';
var isSignedIn = true;
// var myName = prompt("Enter your Name:");
var date = new Date();
var now = pad(date.getHours(),2) + ':' + pad(date.getMinutes(),2);

var imgUrl = 'images/';
var senderPictures = {
    default: imgUrl += 'Chat_Heads/Logo_ignite_chat.png'
}

var backgroundImages = [
    'images/mountain11.jpg',
    'images/mountain22.jpg',
    'images/mountain33.jpg'
]



// Build Bubble vars
var buildChatBubbles = {
    // Sender
    senderContainer: '<div class="d-flex justify-content-end mb-4">',
        senderBubble: '<div class="msg_cotainer_send" id="message-',
            senderTimeSent: '<span class="msg_time_send">' + now + '</span></div>',

        senderPicContainer: '<div class="img_cont_msg">',
            senderPic: '<img src="' + senderPictures.default + '" class="rounded-circle user_img_msg">',

    // Receiver
    receiverContainer: '<div class="d-flex justify-content-start mb-4">',
        receiverPicContainer: '<div class="img_cont_msg">',
             receiverPic: '<img src="' + senderPictures.default + '" class="rounded-circle user_img_msg">',
        receiverBubble: '<div class="msg_cotainer"',
             receiverTimeSent: '<span class="msg_time">' + now + '</span></div>'
            
}

if (myName === null) {
   myName = "Anonymous";
}

if (myName) {
   $( document ).ready(function() {
       console.log( "ready!" );
       console.log(senderPictures.default);
       autoScrollDown();
   });
}








// ----------------- Functions -----------------
    //onWindow load hide the loader
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader');
        loader.className += ' invisible';
    });

    function setUserName() {
        var userNameInput = document.getElementById('userInput');
        var warningMessage = document.getElementById('userNameAlert');
        var triangle = '<div class="triangle"></div>';

        if (userNameInput.value === '') { //nothing is written
            warningMessage.style.removeProperty('display'); //display alert
            warningMessage.textContent = '';
            warningMessage.innerHTML += triangle + '<strong>Oof!</strong> Set your name here and try again';
        } else { //set username
            //max character limit
            if (userNameInput.value.length > 20) {
                warningMessage.textContent = ''; //reset
                warningMessage.innerHTML += triangle + '<strong>Oof!</strong> Max Character Limit is 20 sorry :/';
                warningMessage.style.removeProperty('display'); //display alert
            } else {
                var popupWrapper = document.getElementById('popupWrapper');

                myName = userNameInput.value;
                document.getElementById('chat').style.removeProperty('display');
                popupWrapper.style.display = "none"; //reset alertbox
                isSignedIn = true;

                messagesBuildComponent();
            }
        }
    }

function cycleBackground() {
    var imageDiv = document.getElementById('popupWrapper');
    var i = Math.floor(backgroundImages.length * Math.random());

    if (isSignedIn === false) { //if Im signed in stop this function
        imageDiv.style.backgroundImage = "url(" + backgroundImages[i] + ")" + ", url(images/Logo_stamped.jpg)";
        i = i + 1;
        if (i == backgroundImages.length) {
            i =  0;
        }
    }

}

function deleteMessage(self) {
     //get message ID
     var messageId = self.getAttribute("data-id");

     //delete message
     firebase.database().ref("messages").child(messageId).remove();
}

// autoscroll down function
function autoScrollDown() {
    var cardBody = document.getElementsByClassName('msg_card_body')[0];
    cardBody.scrollTop = cardBody.scrollHeight;
}

function pad(num, size){ 
    return ('000000000' + num).substr(-size);
}