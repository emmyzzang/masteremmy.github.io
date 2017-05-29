//GLOBAL VARIABLES 

//First declare the variables that will include arrays 
//of word options as well as how to handle them.

var wordOptions = ["wagyu", "filet", "prime", "strip", "round", "sirloin"]; 
var selectedWord = ""; 
var lettersinWord = []; //each letter in the word 
var numBlanks = 0; //based on the number of letters in the word  
var blanksAndSuccesses = [];  // W _ _ _ _ 
var wrongLetters = []; 

//Game Counters
var winCount = 0; 
var lossCount = 0; 
var guessesLeft = 9; 

//FUNCTIONS (Reusable code to call upon when needed)

//This initializes and starts the game. 
//The variable, selectedWord, is set equal to the variable wordOptions 
//when wordOptions is randomized with Math.random (it is then simplified
//and rounded down via Math.floor. 
//Then is multiplied with the LENGTH of the array (meaning index number) wordOptions, 
//so that the random number will be one of the index numbers 
//rounded to the nearest whole number
//then break each word apart into individual letters 
//then have array of individual letters 

function startGame () 
{	
	selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
	lettersinWord = selectedWord.split(""); 
	numBlanks = lettersinWord.length; 
	

	// reinitialize variables
	blanksAndSuccesses = []; //this is critical to flush out the blanksAndSuccesses
	//need to flush out blanksAndSuccesses so that the spaces get reloaded 
	//and we are not continuing the same game and pushing over the last one. 
	letterGuessed = [];
	wrongLetters = []; 
	guessesLeft = 9;

	// reinitialize view
	for (var i = 0; i < numBlanks; i++) { 
		blanksAndSuccesses.push("_"); 
	}
	document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
	document.getElementById("letterGuesses").innerHTML = letterGuessed.join(" ");
	document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");
	document.getElementById("numGuesses").innerHTML = guessesLeft; 
	document.getElementById("winCounter").innerHTML = winCount;
	document.getElementById("lossCounter").innerHTML = lossCount;

}


//Reset: this resets the counters of guessesLeft to 
//decrement by one after each guess.
//Also allows for the empty arrays to be filled with data.

//guessesLeft = 9; 
//wrongLetters = []; 
blanksAndSuccesses = []; 

//Populate with blanks and successes with correct number of blanks
//For the variables initializing at zero; continue as long as this is less
//than numBlanks; increment by 1. The ____[method ???]_____ will be called 
//any time there is a push


//Change the HTML to reflect the changes that you made after actions



document.getElementById("winCounter").innerHTML = winCount;
document.getElementById("lossCounter").innerHTML = lossCount;

//Testing / debugging

console.log(selectedWord); 
console.log(lettersinWord);
console.log(numBlanks); 
console.log(blanksAndSuccesses);

//COMPARATOR LOGIC 
//Check if the letter exists anywhere in the word at all. 
//This is important because you don't want to iterate through and 
//populate a letter in mult places if it doesn't even exist in the word. 
//The FOR LOOP checks if the letter we are using matches any of the 
//letters in each word. 
function checkLetters(letter) {
	var isLetterInWord = false; 
	for (var i = 0; i < numBlanks; i++) {
		if (selectedWord[i] == letter) {
			isLetterInWord = true; 
		}
	}
		

//Check where in the word letter exists, 
//then populate out blanksAndSuccesses array. 
//If you don't do previous step to check if letter exists in word, 
//no way of definitely knowing whether or not to reduce the COUNTER.
//If letters used twice - Do not penalize the user
//For using more guesses on the same letter.

	if (isLetterInWord){
		for (var i = 0; i < numBlanks; i++){
			if (selectedWord [i] == letter) { 
				blanksAndSuccesses[i] = letter; 
				document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");   
			}
		}
	}

//After looping through array and letter is NOT found execute this
//The minus minus accounts for extra guesses 
//When we have multiple pushes for same letter

	else {
		wrongLetters.push(letter); 
		guessesLeft--; 
		document.getElementById("numGuesses").innerHTML = guessesLeft; 
	}


//Debugging and testing. 

	console.log(blanksAndSuccesses);
}

//Function at the end of each round that iterates through \
//and reduces guesses, increases our win count and loss count. 

function roundComplete() { 

	console.log("Win Count: " + winCount + "| Loss Count: " + lossCount + "| Guesses Left" + numGuesses);   

	//Update HTML to reflect most recent count stats
	document.getElementById("numGuesses").innerHTML = guessesLeft; 
	document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");   
	document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" "); 
	//Check if user won

	if(lettersinWord.toString() == blanksAndSuccesses.toString()){
		winCount++; 

		//Update the win counter in HTML 
		document.getElementById("winCounter").innerHTML = winCount; 

		setTimeout(function(){ 
			alert("You Won!"); 
			startGame();

		}, 100);

	} 
	//Check if user lost
	else if(guessesLeft == 0) { 
		lossCount++; 
		alert("You Lost!"); 
		//Update the HTML 
		document.getElementById("lossCounter").innerHTML = lossCount; 
		startGame(); 
	}

}

function resetGame() {
	startGame();
}

//MAIN PROCESS (Call upon functions to make something happen)
startGame(); 

	//Register Keyclicks

document.onkeyup = function (event) { 
	var letterInput = String.fromCharCode(event.keyCode).toLowerCase(); 

	if(letterInput.length === 1 && letterInput.match(/[a-z]/i)){

		// update value
		letterGuessed.push(letterInput);
		// update view
		document.getElementById("letterGuesses").innerHTML = letterGuessed.join(" ");

		checkLetters(letterInput); 
		roundComplete();

		//Testing / Debugging
		console.log(letterGuessed); 
	}
}

