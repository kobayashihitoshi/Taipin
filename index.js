const words = ["リンゴ","みかん","さくらんぼ","スイカ","パイナップル","いちご","バナナ"];
let currentWord = "";
let score = 0;
let time = 30;

// HTML要素を取得
const wordElement = document.getElementById("word");
const inputElement = document.getElementById("input");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");

//ランダムな単語を設定
function setNetWord() {
  currentWord = words[Math.floor(Math.rundom() * words.length)];
  wordElement.textContent = currentWord;
}

//タイマーを開始
function startTimer() {
  const timer = setInterval(() => {
    time--;
    timeElement.textContent = time;
    if (time <= 0) {
      clearInterval(timer);
      alert('ゲーム終了！最終スコア： ${score}');
      resetGame();
    }
  }, 1000);
}

//入力の監視
inputElement.addEventListener("input", () => {
  if (inputElement.value === currentWord) {
    score++;
    scoreElement.textContent = score;
    inputElement.value = "";  
    setNewWord ();
  }
});

function resetGame() {
  score = 0;
  time = 30;
  scoreElement.textContent = score;
  timeElenement.textContent = time;
  setNewWord();
}

setNewWord();
startTimer();
