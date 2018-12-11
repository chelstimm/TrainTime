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
      });
  });

  database.ref().on("child_added", function (childSnapshot) {

    //   console.log(childSnapshot.val().name);
    //   console.log(childSnapshot.val().destination);
    //   console.log(childSnapshot.val().frequency);
    //   console.log(childSnapshot.val().firstTrain);

// displays data to table body
    //   $("#tableBody").append(
          name = childSnapshot.val().name;
          destination = childSnapshot.val().destination;
          frequency = childSnapshot.val().frequency;
          firstTrain = childSnapshot.val().firstTrain;

//   database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {

  var convertedTime = moment(firstTrain, "HH:mm");
        // console.log("TIME CONVERTED: " + firsttimeMoment);

 // It is Now - moment
 var currentTime = moment();
 // console.log("Now TIME: " + currenttime);

var minuteArrival = currentTime.diff(convertedTime, 'minutes');
var minuteLast = minuteArrival % frequency;
var minutesAway = frequency - minuteLast;

// console.log("Minutes: " + minuteArrival);
// console.log("Minutes Last: " + minuteLast);
// console.log("Away Train: " + awayTrain);

var arrivalTime = currentTime.add(minutesAway, 'minutes');
var nextArrival = arrivalTime.format("HH:mm");
// console.log("Away Arrival: " + nextArrival);
// console.log("Arrival Time: " + arrivaltime);


// full list of items to the well
$("#tableBody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td><tr>");

// // // Handle the errors
  }, function (errorObject) {
console.log("Errors handled: " + errorObject.code);
});

  
//   // Time apart (remainder)
//   var tRemainder = diffTime % tFrequency;
//   console.log(tRemainder);

//   // Minute Until Train
//   var tMinutesTillTrain = tFrequency - tRemainder;
//   console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

//   // Next Train
//   var nextTrain = moment().add(tMinutesTillTrain, "minutes");
//   console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))}
