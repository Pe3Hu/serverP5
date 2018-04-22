let affin;

function preload(){
	affin = loadJSON('affin111.json');
}

function setup() {
	noCanvas();

	let txt = select('#txt');
	//txt.input(typing);

	function typing() {
		let textinput = txt.value();
		let words = textinput.split(/\W/);
		console.log(words);
		let scoredWords = [];
		let totalScore = 0;
		for (let i = 0; i < words.length; i++){
			let word = words[i].toLowerCase();
			if (affin.hasOwnProperty(word)) {
				let score = affin[word];
				totalScore += Number(score);
				scoredWords.push(word + ": " + score);
			}
		}
		let scorePar = select('#scoreP');
		scorePar.html('score: ' + totalScore);
		let comp = select('#comparativeP');
		comp.html('comparative: ' + totalScore / words.length);
		let wordList = select('#wordList');
		wordList.html(scoredWords);
	}

	let buttonS = select('#submit');
	buttonS.mousePressed(submitWord);

	let button = select('#analyze');
	button.mousePressed(analyzeThis);
}

function analyzeThis() {
		let txt = select('#txtinput').value();

		let data = {
			text: txt
		}
		httpPost('analyze/', data, 'json', dataPosted, postErr)
}

function dataPosted(result) {
		console.log(result);
}

function postErr(err) {
		console.log(err);
}

function submitWord() {
		let word = select('#word').value();
		let score = select('#score').value();

		console.log(word, score);

		loadJSON('add/' + word + '/' + score, finished);
		function finished(data) {
				console.log(data);
		}
}

function draw() {

}
