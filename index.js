const words = [
  { kanji: "リンゴ", hiragana: "りんご", romaji: "ringo" },
  { kanji: "みかん", hiragana: "みかん", romaji: "mikan" },
  { kanji: "さくらんぼ", hiragana: "さくらんぼ", romaji: "sakuranbo" },
  { kanji: "スイカ", hiragana: "すいか", romaji: "suika" },
  { kanji: "パイナップル", hiragana: "ぱいなっぷる", romaji: "painappuru" },
  { kanji: "いちご", hiragana: "いちご", romaji: "itigo" },
  { kanji: "バナナ", hiragana: "ばなな", romaji: "banana" },
  { kanji: "キウイ", hiragana: "きうい", romaji: "kiui" },
  { kanji: "ぶどう", hiragana: "ぶどう", romaji: "budou" },
  { kanji: "マンゴー", hiragana: "まんごー", romaji: "mango-" },
  { kanji: "もも", hiragana: "もも", romaji: "momo" },
  { kanji: "メロン", hiragana: "めろん", romaji: "meron" }
];


let currentWord = "";
let score = 0;
let time = 30;
let usedWords = [];
let gameStarted = false;

// HTML要素を取得
const wordElement = document.getElementById("word");
const inputElement = document.getElementById("input");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const startButton = document.getElementById("start");

//スタートボタンを押したときの処理
startButton.addEventListener("click", () => {
  if (!gameStarted) {
    resetGame();
    startTimer();
    gameStarted = true;
    inputElement.disabled = false; // 入力欄を有効化
    inputElement.focus(); // 自動的に入力欄にフォーカス
  }
})


//ランダムな単語を設定
function setNewWord() {
  if (usedWords.length === words.length) {
    // 全単語wp使い切った場合リセット
    usedWords = [];
  }
  
  let newWord;
  do {
    newWord = words[Math.floor(Math.random() * words.length)];
  } while (usedWords.includes(newWord.kanji)); //　使用済みに単語を避ける
  
  currentWord = newWord;
  wordElement.textContent = currentWord.kanji; //kanji部分を表示
  usedWords.push(currentWord.kanji);
}

//タイマーを開始
function startTimer() {
  const timer = setInterval(() => {
    time--;
    timeElement.textContent = time;
    if (time <= 0) {
      clearInterval(timer);
      alert(`ゲーム終了！最終スコア(文字数)：${score}`);
      inputElement.disabled = true; // 入力欄を無効化
      gameStarted = false;
    }
  }, 1000);
}

//入力の監視
inputElement.addEventListener("input", () => {
  // 入力を小文字の半角英字に正規化
  const normalizedInput = inputElement.value.trim().toLowerCase();
  
  if (normalizedInput === currentWord.romaji) {
    // スコアに単語のローマ字文字数を加算
    score += currentWord.romaji.length;
    scoreElement.textContent = score;
    
    inputElement.value = "";  //入力欄をクリア
    setNewWord ();
  }
});

// ゲームのリセット
function resetGame() {
  score = 0;
  time = 30;
  usedWords = [];
  scoreElement.textContent = score;
  timeElement.textContent = time;
  setNewWord();
  inputElement.value = ""; // 入力欄をクリア
  inputElement.disabled = true; //スタート前は無効化
}