let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let buttonDx = 10;
let buttonDy = 400;
let keyDownColor = "#f15cff";
let keyUpColor = "#fcd6ff";
let keyButtonColor = [keyDownColor];
let l5x = 30; 
let l4x = 95;
let l3x = 155;
let l2x = 215;
let r2x = 335;
let r3x = 395;
let r4x = 455;
let r5x = 515;
let x = 0; // boll x  
let y = 0; // boll y
let dy = 5; // speed
let keyName = ['A', 'S', 'D', 'F', 'J', 'K', 'L', '+;'];
let score = [0, 0, 0, 0, 0, 0, 0, 0];
let maxScore = 2;
let temp = 0;
let setBtn = -2;　
let crtBtn = -1; 
let random = getRandomInt(4);
let newRandom = -1;

let key = new Object();
for (let i = 0; i < 8; i++) {
  key[i] = false;
}
key.push = false;
key.value = -1;

canvas.width = 550; // canvas 幅
canvas.height = 460;// canvas 高さ

function main() {
  allFunctions();
  drawbuttons();
  drawScore();
  requestAnimationFrame(main);
}
requestAnimationFrame(main);

//ボタンをcanvasに表示
function drawbuttons() {
  for (let i = 0; i < 8; i++) {
    ctx.beginPath();
    ctx.rect(buttonDx, buttonDy, 50, 50);
    ctx.fillStyle = keyButtonColor[i];
    ctx.fill();
    ctx.closePath();
    buttonDx += 60;
    if (i == 3) {
      buttonDx += 60;
    }
  }
  buttonDx = 10;
}
//scoreをcanvasに表示
function drawScore() {
  for (let i = 0; i < 8; i++) {
    ctx.beginPath();
    ctx.font = "16px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText(keyName[i], buttonDx + 20, buttonDy + 30);
    ctx.fillText(score[i], buttonDx, buttonDy + 14);
    ctx.closePath();
    buttonDx += 60;
    if (i == 3) {
      buttonDx += 60;
    }
  }
  buttonDx = 10;
}
//ballをcanvasに表示
function drawBall() {
  if (key.value === 1) {
    switch (random) {
      case 0: x = l5x; break;
      case 1: x = l4x; break;
      case 2: x = l3x; break;
      case 3: x = l2x; break;
    }
  }
  else if (key.value === 2) {
    switch (random) {
      case 0: x = r2x; break;
      case 1: x = r3x; break;
      case 2: x = r4x; break;
      case 3: x = r5x; break;
    }
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fillStyle = '#000000';
  ctx.fill();
  ctx.closePath();
  if (y < canvas.height - 50) {
    y += dy;
  }
}

//メインループ内で実行する関数をまとめた関数
function allFunctions() {
  addEventListener("keydown", keydownfunc, false);
  addEventListener("keyup", keyupfunc, false);
  buttonsColor(); 
  //キーボードの左側ボタンがすべて押された場合の処理
  if (key[0] && key[1] && key[2] && key[3]) {
    key.push = true;
    key.value = 1;
  }
  //キーボードの右側ボタンがすべて押された場合の処理
  if (key[7] && key[6] && key[5] && key[4]) {
    key.push = true;
    key.value = 2;
  }
  //ballがy軸方向に進んで、canvas以内ならtempに1を代入
  if ((y > canvas.height - 70)) {
    temp = 1;
  }
  //scoreがmaxScoreより大きければtempに2を代入
  if ((score[0] >= maxScore && score[1] >= maxScore && score[2] >= maxScore && score[3] >= maxScore) 
    || (score[4] >= maxScore && score[5] >= maxScore && score[6] >= maxScore && score[7] >= maxScore)) {
    temp = 2;
  }  
  //全てのボタンが押されらボール落下
  if (key.push) {
    drawBall();
    if (key.value === 1) {
      releaseButtons(3); 
      differentButtons(3);
    } 
    else if (key.value === 2) {
      releaseButtons(7); 
      differentButtons(7);
    }
  }
  //tempの値を判定してalertを出す
  if (temp > 0) {
    if (temp === 1) {
      alert('はじめから');
    }
    else if (temp === 2){
      alert('終了');
    }
    score = [0, 0, 0, 0, 0, 0, 0, 0]; 
    y = -10; 
    temp = 0;
    document.location.reload();
  }
  getChengedRandom();
}
//ランダム値を変更する
function getChengedRandom() {
  if (random !== newRandom) {
    if (key[crtBtn]) {
      while(true) {
        newRandom = getRandomInt(4);
        if (newRandom !== random) break; 
      }
      random = newRandom;
    }
  }
}
/**
 * ランダム数値を生成して返却。
 * @param {int} max 
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
//ランダムで落ちてくる値と違う指が離されたときの処理
function differentButtons(n) {
  switch (random) {
    case 0: if (!key[n - 2] || !key[n - 1] || !key[n - 0]) {
      temp = 1;   
      key.push = false; 
    } break;
    case 1: if (!key[n - 3] || !key[n - 1] || !key[n - 0]) {
      temp = 1;   
      key.push = false; 
    } break;
    case 2: if (!key[n - 3] || !key[n - 2] || !key[n - 0]) {
      temp = 1;   
      key.push = false; 
    } break;
    case 3: if (!key[n - 3] || !key[n - 2] || !key[n - 1]) {
      temp = 1;   
      key.push = false; 
    } break;  
  }
}

function inReleaseButtons() {
  if (y < canvas.height - 50) {
    if (setBtn !== crtBtn) { 
      score[crtBtn]++;
      setBtn = crtBtn;
    }
    y = -10;
    newRandom = -1;
  }
} 
//ボタンが離されたときときの処理
function releaseButtons(n) {
  if (!key[n - 3] && key[n - 2] && key[n - 1] && key[n - 0] && random === 0) { 
    crtBtn = n - 3;
    inReleaseButtons();
  } 
  else if (!key[n - 2] && key[n - 3] && key[n - 1] && key[n - 0] && random === 1) {
    crtBtn = n - 2;
    inReleaseButtons();
  } 
  else if (!key[n - 1] && key[n - 3] && key[n - 2] && key[n - 0] && random === 2) {
    crtBtn = n - 1;
    inReleaseButtons();
  } 
  else if (!key[n - 0] && key[n - 3] && key[n - 2] && key[n - 1] && random === 3) {
    crtBtn = n - 0;
    inReleaseButtons();
  }
}
// ボタンを押したときの色を変更する
function buttonsColor() {
  for (let i = 0; i < 8; i++) {
    if (key[i]) {
      keyButtonColor[i] = keyDownColor;
    } else {
      keyButtonColor[i] = keyUpColor;
    }
  }
}

function keydownfunc(event) {
  let key_code = event.keyCode;
  if (key_code === 65)  key[0] = true;
  if (key_code === 83)  key[1] = true;
  if (key_code === 68)  key[2] = true;
  if (key_code === 70)  key[3] = true;
  if (key_code === 74)  key[4] = true;
  if (key_code === 75)  key[5] = true;
  if (key_code === 76)  key[6] = true;
  if (key_code === 187) key[7] = true;
}
function keyupfunc(event) {
  let key_code = event.keyCode;
  if (key_code === 65)  key[0] = false;
  if (key_code === 83)  key[1] = false;
  if (key_code === 68)  key[2] = false;
  if (key_code === 70)  key[3] = false;
  if (key_code === 74)  key[4] = false;
  if (key_code === 75)  key[5] = false;
  if (key_code === 76)  key[6] = false;
  if (key_code === 187) key[7] = false;
}

function speedUp() {
  if (dy < 20) {
    dy++;
    document.getElementById("speed").innerHTML = `速度 ${dy}`;
  }
}

function speedDown() {
  if (dy > 1) {
    dy--;
    document.getElementById("speed").innerHTML = `速度 ${dy}`;
  }
}

function countUp() {
  if (maxScore < 20) {
    maxScore++;
    document.getElementById("count").innerHTML = `回数 ${maxScore}`;
  }
}

function countDown() {
  if (maxScore > 1) {
    maxScore--;
    document.getElementById("count").innerHTML = `回数 ${maxScore}`;
  }
}