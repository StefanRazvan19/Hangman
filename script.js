document.getElementById("winnText").style.display = "none";
document.getElementById("lossText").style.display = "none";
$(`#restart`).hide();
var cnt = 0, badLetter = 5, k = 0, heartLeft = [], gameWord, hiddenWord;
for(let i = 0; i < 5; ++i) {
  heartLeft[i] = "&#9825";
}
document.getElementById("lifesLeft").innerHTML = heartLeft.join('');

function createGame() {
  $("#alphabet").empty();
  document.getElementById("subTittle").style.display = "none";
  gameWord = document.getElementById("userInput").value.toUpperCase(), hiddenWord = "";
  $("#userInput").val("");
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
  let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < 26; ++i) {
    let letter = alphabet.charAt(i);
    $('#alphabet').append('<button class="btn btn-warning" id=' + letter + ' onclick="check(id);">' + letter + '</button>');
    }
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
    $(`#restart`).show();
    document.getElementById("winnText").style.display = "block";
  }
  if(badLetter == k) {
    $(`#restart`).show();
    document.getElementById("lossText").style.display = "block";
  }
  displayWordInLines(hiddenWord);
}

function restartGame() {
  location.reload();
}
