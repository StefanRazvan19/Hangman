document.getElementById("winnText").style.display = "none";
document.getElementById("lossText").style.display = "none";
document.getElementById("restart").style.display = "none";
var cnt = 0, badLetter = 5, k = 0, heartLeft = [], gameWord, hiddenWord;
for(let i = 0; i < 5; ++i) {
  heartLeft[i] = "&#9825";
}


function createGame() {
  document.getElementById("subTittle").style.display = "none";
  gameWord = document.getElementById("userInput").value.toUpperCase(), hiddenWord = "";
  document.getElementById("userInput").value = "";
  document.getElementById("lifesLeft").innerHTML = heartLeft.join('');
  for (let i = 0; i < gameWord.length; ++i) {
    hiddenWord += "_";
  }
  displayWordInLines(hiddenWord);
  displayAlphabet();
  displayLife();
}

function displayWordInLines(result) {
  return document.getElementById("wordInLines").innerHTML = result;
}


function displayAlphabet() {
  const buttonsContainer = document.getElementById("alphabet");
  var element = document.getElementById("alphabet");
  let buttonsWanted = 26;
  let doc = document;
  let docFrag = document.createDocumentFragment();
  let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for(let i = 0; i < buttonsWanted; i++){
    let letter = alphabet.charAt(i);
    var button = doc.createElement('button');
    button.setAttribute("onclick", "check(id);");
    button.setAttribute("id", letter);
    button.innerText = letter;
    button.classList.add("letters");
    docFrag.appendChild(button);
  }
  doc.getElementById('alphabet').appendChild(docFrag);
}

String.prototype.replaceAt = function(index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function check(id) {
  var goodLetter = false;
  for (let i = 0; i < gameWord.length; ++i) {
    if((id.localeCompare(gameWord.charAt(i)) == 0) && (id.localeCompare(hiddenWord.charAt(i)) != 0)) {
      hiddenWord = hiddenWord.replaceAt(i, id);
      goodLetter = true;
      ++cnt;
      document.getElementById(id).disabled = true;
    }
  }
  if(!goodLetter) {
    --badLetter;
    --heartLeft.length;
    document.getElementById("lifesLeft").innerHTML = heartLeft.join('');
    document.getElementById(id).disabled = true;
  }
  if(cnt == gameWord.length) {
    document.getElementById("restart").style.display = "block";
    document.getElementById("winnText").style.display = "block";
  }
  if(badLetter == k) {
    document.getElementById("restart").style.display = "block";
    document.getElementById("lossText").style.display = "block";
  }
  displayWordInLines(hiddenWord);
}

function restartGame() {
  location.reload();
}
