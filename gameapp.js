  const app = Vue.createApp({
    data() {
      return {
        game: new PasswordGuess(),
        log: [],
        guess: '',
      }
    },
    computed: {
      terminal() {
        return `
          ${this.log.join('<br>')}<br>
          <span class="prompt">#${this.game.attempts+1}:</span>
          <strong>${this.guess}</strong>
        `
      }
    },
    methods: {
      key(n) {
        if (n === 'Enter') {
          let result = this.game.guess(this.guess);
          this.log.push(`
            <span class="prompt">#${this.game.attempts}:</span>
            <strong>${this.guess} </strong> -
            <span class="bulls">${result.bulls}</span>B
            <span class="cows">${result.cows}</span>C
          `);
          this.guess = '';
          if(result.bulls === 4) {
            this.log.push(`
              <span class="bulls">Congratulations!</span><br>
              You cracked the password in ${this.game.attempts} attempts.
            `);
            this.game = new PasswordGuess();
          }
        } else {
          this.guess += n;
          this.guess = this.guess.slice(-4);
        }
      }
    },
    mounted() {
      this.log.push(`
        <span class="prompt">Password Guess</span><br>
        Welcome to the game. Try to guess the 4-digit password.<br>
        Enter a number and press <strong>Enter</strong> to submit your guess.<br>
        <span class="bulls">B</span> means correct number and position.<br>
        <span class="cows">C</span> means correct number but wrong position.<br>
      `);
      window.addEventListener('keydown', e => {
        if (e.key >= '0' && e.key <= '9' || e.key === 'Enter') {
          this.key(e.key);
        }
      });
    }
  });
  app.mount('#app');

