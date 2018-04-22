let table;
let affin = {};

function preload(){
	table = loadTable('AFINN-111.txt', 'tsv');
}

function setup() {
	noCanvas();
	for (let i = 0; i < table.getRowCount(); i++){
		let row = table.getRow(i);
		let word = row.get(0);
		let score = row.get(1);
		affin[word] = score;
		//console.log(word, score);
	}
	console.log(affin);
	save(affin, 'affin111.json');

	let txt = select('#txt');
	txt.input(typing);

	function typing() {
		let textinput = txt.value();
		let words = textinput.split(/\W/);
		console.log(words);
		for (let i = 0; i < words.length; i++){
			let word = words[i].toLowerCase();
		}
	}

	let buttonS = select('#submit');
	buttonS.mousePressed(submitWord);

}

function analyzeThis() {
		let txt = select('#txt').value();

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

function analyzeThis(data) {
		console.log(data);
}

function draw() {

}
