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

		//pulling the values from the database and assigning to variables for easier manipulation
		var trainName = snapshot.val().train;
		var destination = snapshot.val().destination;
		var frequency = parseInt(snapshot.val().frequency);
		var firstTrain = snapshot.val().firstTrain;

		//first arrival time of the train converted to moment for time manipulation.
		var firstArrival = moment(firstTrain, "HH:mm").subtract(1, "years");
		
		//calculate the time that has passed since first train and current time.
		var elapsedTime = moment().diff(firstArrival, "minutes");
		
		//time remaining for the next train is calcuated by the following
		var timeRemaining = frequency - elapsedTime%frequency;

		//next train will arrive at current time + time remaining
		var nextTrain = moment().add(timeRemaining, "minutes").format("hh:mm a");

		// create jQuery element for DOM manipulation
		var row = $("<tr>");
		var trainCell = $("<td>");
		var destinationCell = $("<td>");
		var frequencyCell = $("<td>");
		var arrivalCell = $("<td>");
		var minutesAwayCell = $("<td>");

		//pushing the values to cells
		trainCell.html(trainName);
		destinationCell.html(destination);
		frequencyCell.html(frequency);
		arrivalCell.html(nextTrain);
		minutesAwayCell.html(timeRemaining);

		//pushing the cells to a row
		row.append(trainCell);
		row.append(destinationCell);
		row.append(frequencyCell);
		row.append(arrivalCell);
		row.append(minutesAwayCell);

		//pushing the row to the page
		$("#trainSchedule").append(row);

	}); //event listener for the database update ends here

});