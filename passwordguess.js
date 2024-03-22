function PasswordGuess(){
  this.password = Math.random().toString().slice(-4);
  this.attempts = 0;
  this.guess = function(guess){
    this.attempts++;
    let password = this.password.split('');
    let bulls = 0;
    let cows = 0;
    guess = guess.split('');
    for(let i = 0; i < 4; i++){
      if(password[i] === guess[i]){
        bulls++;
        password[i] = null;
        guess[i] = null;
      }
    }
    for(let i = 0; i < 4; i++){
      if(password[i] === null) continue;
      let index = guess.indexOf(password[i]);
      if(index > -1){
        cows++;
        guess[index] = null;
        password[i] = null;
      }
    }
    return {bulls, cows, attempts: this.attempts};
  }
}

let p = new PasswordGuess();

