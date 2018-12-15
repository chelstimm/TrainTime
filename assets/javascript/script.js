 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyCNXp49pTAJo_D0mlI3wmCrY0x3ig-IO2k",
    authDomain: "chelshw-eedc0.firebaseapp.com",
    databaseURL: "https://chelshw-eedc0.firebaseio.com",
    projectId: "chelshw-eedc0",
    storageBucket: "chelshw-eedc0.appspot.com",
    messagingSenderId: "373232910790"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var name = "";
  var destination = "";
  var frequency = "";
  var firstTrain = "";

  $("#add-train").on("click", function (event) {
    event.preventDefault();
    
      console.log(name)
      console.log(destination)
      console.log(frequency);
      console.log(firstTrain);

      name = $("#name-input").val().trim();
      destination = $("#destination-input").val().trim();
      frequency = $("#frequency-input").val().trim();
      firstTrain = $("#first-train-input").val().trim();

       //Clears out textbox
       $("#name-input, #destination-input, #first-train-input, #frequency-input").val('');

      database.ref().push({
          name: name,
          destination: destination,
          frequency: frequency,
          firstTrain: firstTrain,
          date_added: firebase.database.ServerValue.TIMESTAMP
      });
  });

  database.ref().on("child_added", function (childSnapshot) {

      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().frequency);
      console.log(childSnapshot.val().firstTrain);

// displays data to table body
          name = childSnapshot.val().name;
          destination = childSnapshot.val().destination;
          frequency = childSnapshot.val().frequency;
          firstTrain = childSnapshot.val().firstTrain;

var convertedTime = moment(firstTrain, "hh:mm A");
console.log("TIME CONVERTED: " + convertedTime);

 // It is Now - moment
 var currentTime = moment();
 console.log("Now TIME: " + currentTime);

var minuteArrival = currentTime.diff(convertedTime, 'minutes');
console.log("Minutes: " + minuteArrival);

var minuteLast = minuteArrival % frequency;
console.log("Minutes Last: " + minuteLast);

var minutesAway = frequency - minuteLast;
console.log("Away Train: " + minutesAway);

var arrivalTime = currentTime.add(minutesAway, 'minutes');
console.log("Away Arrival: " + arrivalTime);

var nextArrival = arrivalTime.format("h:mm A");
console.log("Arrival Time: " + nextArrival);

//Display to table
$("#tableBody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td><tr>");

// Handle the errors
  }, function (errorObject) {
console.log("Errors handled: " + errorObject.code);

//    // Only adds buttons if input field is not blank and topic has not already been added
//    if (name.length === 0 || destination.length === 0 || frequency.length === 0 || firstTrain.length === 0) {
//     alert("Please Fill All Required Fields");
// }
});
