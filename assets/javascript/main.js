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

	var newTrain;
	var newTraindestination;
	var newTrainFrequency;
	var newTrainFirst;

	$("#formSubmit").on("click", function(){
		event.preventDefault();
		console.log("submit Button is working");

	}); // form submit event listener ends here


});