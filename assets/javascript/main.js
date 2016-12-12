// Initialize Firebase
var config = {
    apiKey: "AIzaSyDdM3dm3A_ChXvGA7G4CYwhG3Nv4gVk1eE",
    authDomain: "trainschedule-5714d.firebaseapp.com",
    databaseURL: "https://trainschedule-5714d.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "1027151791440"
};
firebase.initializeApp(config);


$(document).ready(function(){

var database = firebase.database();

	var now = moment().format("HH:mm");

	var newTrain;
	var newTrainDestination;
	var newTrainFrequency;
	var newTrainFirst;

	$("#formSubmit").on("click", function(){
		//prevent the page from refreshing
		event.preventDefault();

		//assign the user input values to variables
		newTrain = $("#trainName").val().trim();
		newTrainDestination = $("#trainDestination").val().trim();
		newTrainFrequency = $("#trainFrequency").val().trim();
		newTrainFirst = $("#trainFirst").val().trim();
		//push the variables to the firebase database
		database.ref().push({
			train: newTrain,
			destination: newTrainDestination,
			frequency: newTrainFrequency,
			firstTrain: newTrainFirst
		});
		//empty the form for the next entry
		$("#trainName").val('');
		$("#trainDestination").val('');
		$("#trainFirst").val('');
		$("#trainFrequency").val('');

	}); // form submit event listener ends here

	database.ref().on("child_added", function(snapshot){

		var trainName = snapshot.val().train;
		var destination = snapshot.val().destination;
		var frequency = parseInt(snapshot.val().frequency);
		console.log("frequency: " + frequency);
		var firstTrain = snapshot.val().firstTrain;

		var firstArrival = moment(firstTrain, "HH:mm").subtract(1, "years");
		console.log("first Train: " + firstArrival.format("HH:mm"));

		console.log("current Time: " + moment().format("HH:mm"));

		var elapsedTime = moment().diff(firstArrival, "minutes");
		console.log("elapsedTime: " + elapsedTime);
				
		var timeRemaining = frequency - elapsedTime%frequency;

		console.log(timeRemaining);
		var nextTrain = moment().add(timeRemaining, "minutes").format("hh:mm a");

		var row = $("<tr>");

		var trainCell = $("<td>");
		var destinationCell = $("<td>");
		var frequencyCell = $("<td>");
		var arrivalCell = $("<td>");
		var minutesAwayCell = $("<td>");

		trainCell.html(trainName);
		destinationCell.html(destination);
		frequencyCell.html(frequency);
		arrivalCell.html(nextTrain);
		minutesAwayCell.html(timeRemaining);

		row.append(trainCell);
		row.append(destinationCell);
		row.append(frequencyCell);
		row.append(arrivalCell);
		row.append(minutesAwayCell);

		$("#trainSchedule").append(row);

	}); //event listener for the database update ends here

});