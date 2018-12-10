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
  var nextArrival = "";
  var minutesAway = "";
  

  // var randomDate = "02/23/1999";
  // var randomFormat = "DD/MM/YYYY";
  // var convertedDate = moment(randomDate, rendomFormat);

  $("#add-user").on("click", function (event) {
      event.preventDefault();

      console.log(name)
      console.log(destination)
      console.log(frequency);
      console.log(firstTrain);
      console.log(nextArrival);
      console.log(minutesAway);
      

      name = $("#name-input").val().trim();
      destination = $("#destination-input").val().trim();
      frequency = $("#frequency-input").val().trim();
      firstTrain = $("#first-train-input").val().trim();
      nextArrival = 0;
      minutesAway = 0;

      $("#tableBody").append("<tr> <td>" + name + "</td> <td>" + destination + "</td> <td>" + frequency + "</td> <td>" + firstTrain + "</td> <td>" + nextArrival + "</td> <td>" + minutesAway + "</td> <td>");

      database.ref().push({
          name: name,
          destination: destination,
          frequency: frequency,
          firstTrain: firstTrain,
          nextArrival: nextArrival,
          minutesAway: minutesAway,
          dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
      //Clears out textbox
      $("#name-input, #destination-input, #first-train-input, #frequency-input").val('');
  });

  database.ref().on("child_added", function (childSnapshot) {

      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().frequency);
      console.log(childSnapshot.val().firstTrain);
      console.log(childSnapshot.val().nextArrival);
      console.log(childSnapshot.val().minutesAway);

    //displays data to table body
      $("#tableBody").append(
          "<tr class='well'><td class='train-name'> " + childSnapshot.val().name +
          " </td><td class='train-destination'> " + childSnapshot.val().destination +
          " </td><td class='train-frequency'> " + childSnapshot.val().frequency +
          " </td><td class='train-firstTrain'> " + childSnapshot.val().firstTrain +
          " </td><td class='train-nextArrival'> " + childSnapshot.val().nextArrival +
          " </td><td class='train-minutesAway'> " + childSnapshot.val().minutesAway +
          " </td></tr>");

      // Handle the errors
  }, function (errorObject) {
      console.log("Errors handled: " + errorObject.code);
  });

  database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {

      //   // Change the HTML to reflect
      // $("#name-input").text(snapshot.val().name);
      // $("#role-input").text(snapshot.val().role);
      // $("#startDate-input").text(snapshot.val().startDate);
      // $("#monthsWorked-input").text(snapshot.val().monthsWorked);
      // $("#monthlyRate-input").text(snapshot.val().monthlyRate);
      // $("#totalBilled-input").text(snapshot.val().totalBilled);

  });

  // console.log(moment().format("DD/MM/YYYY"));

  // //date math
  // moment('2016-03-12 13:00:00').add(1, 'day').format('LLL')
  // "March 13, 2016 1:00 PM"

  // Assumptions
  var frequency = "";

  // Time is 3:30 AM
  var firstTime = "";

  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
