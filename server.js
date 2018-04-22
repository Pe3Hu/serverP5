console.log('server up');

let fs = require('fs');
let data = fs.readFileSync('additional.json');
let afinnData = fs.readFileSync('affin111.json');

let additioanl = JSON.parse(data);
let affin = JSON.parse(afinnData);

let express = require('express');
let bodyParser = require('body-parser');

let app = express();

let server = app.listen(3000, listening);

function listening() {
	console.log('listening');
}

app.use(express.static('website'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/analyze', analyzeThis);

function analyzeThis(request, response){
	let txt = request.body.text;
	let words = txt.split(/\W+/);
	let wordList = [];
	let totalScore = 0;
	for (let i = 0; i < words.length; i++){
		let word = words[i];
		let score = 0;
		let found = false;
		if (additioanl.hasOwnProperty(word)) {
			score = Number(additioanl[word]);
			found = true;

		} else if (affin.hasOwnProperty(word)){
				score = Number(affin[word]);
				found = true;
		}
		if (found){
			wordList.push({
				word: word,
				score: score
			});
		}
		totalScore += score;
	}

	let comp = totalScore / words.length;

	let reply = {
		score: totalScore,
		comparative: comp,
		words: wordList
	}
	/*console.log(request.body);
	var reply = {
		msg: 'thx'
	}*/
	response.send(reply);
}

app.get('/add/:word/:score?', addWord);

app.get('/all', sendAll);

function sendAll(request, response){
	let data = {
		additional: additioanl,
		affin : affin
	}
	response.send(words);
}

function addWord(request, response){
	let data = request.params;
	let word = data.word;
	let score = Number(data.score);
	let reply;
	if (!score){
		let reply = {
			msg: "Score is required."
		}
		response.send(reply);
	}
	else {
		additioanl[word] = score;
		let data = JSON.stringify(additioanl, null, 2);
		fs.writeFile('additional.json', data, finished);
		function finished(err){
			console.log('all set.');
			reply = {
				word: word,
				score: score,
				status: "success"
			}
			response.send(reply);
		}
		/*let reply = {
			msg: "thx for your word."
		}*/
	}
}
