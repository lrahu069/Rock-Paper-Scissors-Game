let score = JSON.parse(localStorage.getItem('score'))||{
  wins: 0,
  losses: 0,
  draw: 0,				
};
let isAutoplay = false;
let intervalID;

updateScoreElement();

/*	
if(score === null){
  score = {
    wins: 0,
    losses: 0,
    draw: 0
  };
}*/

document.body.addEventListener('keydown', (e)=>{
  if(e.key === 'r'){
    gameplay('Rock');
  }else if(e.key === 'p'){
    gameplay('Paper');
  }else if(e.key === 's'){
    gameplay('Scissors');
  }
})

document.querySelector('.js-rock-button').addEventListener('click', ()=>{
  gameplay('Rock');
  });

document.querySelector('.js-paper-button').addEventListener('click', ()=>{
  gameplay('Paper');
  });  

document.querySelector('.js-scissors-button').addEventListener('click', ()=>{
  gameplay('Scissors');
  });  

function pickRandomMove(){
  let randomMove = Math.random();
  
  if(randomMove >= 0 && randomMove < 0.33){
    return randomMove = 'Rock';
  } else if(randomMove >= 0.33 && randomMove < 0.66){
    return randomMove = 'Paper';
  }	else if(randomMove >= 0.66 && randomMove < 1){
    return randomMove = 'Scissors';
  }
}

function gameplay(playermove){
  const computermove = pickRandomMove();
  let result = '';

  if(playermove === 'Rock'){
    if(computermove === playermove){
      result='it\'s a DRAW';
    } else if(computermove === 'Paper'){
      result='you LOSE';
    } else{
      result='you WIN';
    }
  }
  
  else if(playermove === 'Paper'){
    if(computermove === playermove){
      result='it\'s a DRAW';
    } else if(computermove === 'Scissors'){
      result='you LOSE';
    } else{
      result='you WIN';
    }
  }
  
  else{
    if(computermove === playermove){
      result='it\'s a DRAW';
    } else if(computermove === 'Rock'){
      result='you LOSE';
    } else{
      result='you WIN';
    }
  } 

  if(result === 'you WIN'){
    score.wins += 1;
  } else if (result === 'you LOSE') {
    score.losses += 1;
  } else if (result === 'it\'s a DRAW') {
    score.draw += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `you <img src="emoji/${playermove}-emoji.png"> <img src="emoji/${computermove}-emoji.png"> computer`;
  
  //alert(`You picked ${playermove}. Computer picked ${computermove}. ${result}\nWINS: ${score.wins}, LOSSES: ${score.losses}, DRAWS: ${score.draw}`); 
}

function updateScoreElement(){
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Draw: ${score.draw}`;
}

function autoplay(){
  if(isAutoplay === false){
    intervalID = setInterval(()=>{
      let playermove = pickRandomMove();
      gameplay(playermove);
    }, 1000);
    isAutoplay = true;
  }else{
    clearInterval(intervalID);
    isAutoplay = false;
  }
}