const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const DIE_WIDTH = 50;
const X_OFFSET = 12;
const Y_OFFSET = 39;

const diceFaces = ['AAEEGN', 'ELRTTY', 'AOOTTW', 'ABBJOO', 'EHRTVW', 'CIMOTU',
  'DISTTY', 'EIOSST', 'DELRVY', 'ACHOPS', 'HIMNQU', 'EEINSU', 'EEGHNW', 'AFFKPS', 'HLNNRZ', 'DEILRX'];
// ctx.fillStyle = '#000000';
// ctx.fillRect(100, 100, 50, 50);


function DieFace(char) {
  this.char = char;
}


DieFace.prototype.draw = function draw(xPos, yPos, chosen) {
  ctx.rect(xPos * DIE_WIDTH, yPos * DIE_WIDTH, DIE_WIDTH, DIE_WIDTH);
  ctx.stroke();
  if (chosen) {
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(xPos * DIE_WIDTH, yPos * DIE_WIDTH, DIE_WIDTH, DIE_WIDTH);
    ctx.fillStyle = '#000000';
  }
  ctx.font = '40px Arial';
  ctx.fillText(this.char, xPos * DIE_WIDTH + X_OFFSET, yPos * DIE_WIDTH + Y_OFFSET);
};


function Dice(diceChars, xPos, yPos) {
  this.face0 = new DieFace(diceChars[0]);
  this.face1 = new DieFace(diceChars[1]);
  this.face2 = new DieFace(diceChars[2]);
  this.face3 = new DieFace(diceChars[3]);
  this.face4 = new DieFace(diceChars[4]);
  this.face5 = new DieFace(diceChars[5]);
  this.pos = { x: xPos, y: yPos };
  this.chosen = false;
}

Dice.prototype.draw = function draw(faceNumber) {
  switch (faceNumber) {
    case 0:
      this.face0.draw(this.pos.x, this.pos.y, this.chosen);
      break;
    case 1:
      this.face1.draw(this.pos.x, this.pos.y, this.chosen);
      break;
    case 2:
      this.face2.draw(this.pos.x, this.pos.y, this.chosen);
      break;
    case 3:
      this.face3.draw(this.pos.x, this.pos.y, this.chosen);
      break;
    case 4:
      this.face4.draw(this.pos.x, this.pos.y, this.chosen);
      break;
    case 5:
      this.face5.draw(this.pos.x, this.pos.y, this.chosen);
      break;
    default:
  }
};

Dice.prototype.isIntersect = function isIntersect(point) {
  if (point.x < (this.pos.x + 1) * DIE_WIDTH && point.x > (this.pos.x) * DIE_WIDTH) {
    if (point.y < (this.pos.y + 1) * DIE_WIDTH && point.y > (this.pos.y) * DIE_WIDTH) {
      this.chosen = !this.chosen;
      return true;
    }
  }
  return false;
};

function DiceBoard(allDiceFaces) {
  this.diceArr = [];
  let index = 0;
  for (let i = 0; i < Math.sqrt(allDiceFaces.length); i += 1) {
    for (let j = 0; j < Math.sqrt(allDiceFaces.length); j += 1) {
      const workingDie = new Dice(allDiceFaces[index], j, i);
      this.diceArr.push(workingDie);
      index += 1;
    }
  }
}

DiceBoard.prototype.draw = function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < this.diceArr.length; i += 1) {
    this.diceArr[i].draw(5);
  }
};

DiceBoard.prototype.randomize = function randomize() {
  let j;
  let x;
  let i;
  for (i = this.diceArr.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    x = this.diceArr[i].pos;
    this.diceArr[i].pos = this.diceArr[j].pos;
    this.diceArr[j].pos = x;
  }
};


// Actually Run this shit
const game = new DiceBoard(diceFaces);
game.draw();
game.randomize();
game.draw();


canvas.addEventListener('click', (e) => {
  const pos = {
    x: e.clientX,
    y: e.clientY,
  };
  for (let i = 0; i < game.diceArr.length; i += 1) {
    game.diceArr[i].isIntersect(pos);
  }
  game.draw();
});
